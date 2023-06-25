const {
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../modules/ddbClient");
const com = require("../../modules/common");

/* article table 모델링
  id
  title
  contents
  user_id
  user_name
  lookup(조회수) : number
  liked(좋아요) : number
  unliked(싫어요) : number
  comments : [
    message
    user_id
    user_name
    liked
    unliked
    created_dt
    updated_dt
  ]
  created_dt : Date.now()
  updated_dt : Date.now()

  comment_cnt : comment.length
*/

/********************************** 
 1. 조회 페이징 처리 [완]
**********************************/
exports.selectArticlePagingList = async (query) => {
  console.log("selectArticlePagingList >>>> query===========", query);

  const { createdDt } = query;

  const params = {
    TableName: "articles",
    KeyConditionExpression: "pt_key = :param1",
    ExpressionAttributeValues: {
      ":param1": "ALL",
    },
    Limit: 10,
    ScanIndexForward: false, // 내림차순: false | 오름차순: true
    //ProjectionExpression: 'attribute1, attribute2', // 필요한 속성들만 선택
  };
  // 첫페이지는 created_dt = 1로 보냄
  // 마지막 페이지는 data.LastEvaluatedKey가 없다.
  //"LastEvaluatedKey": {
  //  "created_dt": 1680760208400,
  //  "pt_key": "ALL"
  //}
  if (Number(createdDt) > 1) {
    params.ExclusiveStartKey = { created_dt: Number(createdDt), pt_key: "ALL" };
  }

  return await ddbClient.send(new QueryCommand(params));
  //result.Items
  //result.LastEvaluatedKey.created_dt
};

/********************************** 
 2. 조회 상세 [완]
**********************************/
exports.selectArticle = async (query) => {
  console.log("selectArticle >>>> query===========", query);

  const { id } = query;

  const params = {
    TableName: "articles",
    IndexName: "id-index",
    KeyConditionExpression: "id = :param1",
    ExpressionAttributeValues: {
      ":param1": id,
    },
  };
  return await ddbClient.send(new QueryCommand(params));
};

/********************************** 
 2-1. 조회 상세 scan 방식
**********************************/
exports.selectArticleScan = async (query) => {
  console.log("selectArticleScan >>>> query===========", query);

  const { id } = query;

  const params = {
    TableName: "articles",
    FilterExpression: "id = :param1",
    ExpressionAttributeValues: {
      ":param1": id,
    },
  };

  return await ddbClient.send(new ScanCommand(params));
};

/********************************** 
 3. 등록 [완]
**********************************/
exports.insertArticle = async (body) => {
  console.log("insertArticle >>>> body===========", body);

  const { title, contents } = body;

  const params = {
    TableName: "articles",
    Item: {
      pt_key: "ALL",
      id: com.uuidv4(),
      user_id: "fujii0711",
      user_name: "김형준",
      title: title,
      contents: contents,
      lookup: 0,
      liked: 0,
      unliked: 0,
      comments: null,
      created_dt: Date.now(),
      updated_dt: null,
    },
  };

  try {
    const result = await ddbClient.send(new PutCommand(params)); //result.$metadata.httpStatusCode === 200

    // insert 수행이 정상이면 방금 등록한 내용 리턴
    if (result.$metadata.httpStatusCode === 200) {
      return params.Item;
    }
  } catch (err) {
    return null;
  }
};

/********************************** 
 4. 수정 [완]
**********************************/
exports.updateArticle = async (body) => {
  console.log("updateArticle >>>> body===========", body);

  const { createdDt, title, contents } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(createdDt),
    },
    UpdateExpression:
      "set title = :param1, contents = :param2, updated_dt = :param3",
    ExpressionAttributeValues: {
      ":param1": title,
      ":param2": contents,
      ":param3": com.krDate(),
    },
  };

  const result = await ddbClient.send(new UpdateCommand(params));

  // update 수행이 정상이면 방금 수정 내용 조회한 데이터 리턴
  if (result.$metadata.httpStatusCode === 200) {
    const _params = {
      TableName: "articles",
      KeyConditionExpression: "pt_key = :param1 AND created_dt = :param2",
      ExpressionAttributeValues: {
        ":param1": "ALL",
        ":param2": Number(createdDt),
      },
    };
    const updatedData = await ddbClient.send(new QueryCommand(_params));
    return updatedData.Items[0];
  }
};

/********************************** 
 5. 삭제 [완]
**********************************/
exports.deleteArticle = async (body) => {
  console.log("deleteArticle >>>> body===========", body);

  const { createdDt } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(createdDt),
    },
  };

  return await ddbClient.send(new DeleteCommand(params));
};

/********************************** 
 6. 조회수 up [완]
**********************************/
//주의: 위 예시 코드는 단순히 조회수를 1 증가시키는 것이므로, 동시에 여러 클라이언트가 조회수를 update하는 경우,
//race condition 등의 문제가 발생할 수 있습니다. 이를 해결하기 위해서는 DynamoDB의 조건 표현식 등을 사용하여 동시에
//여러 클라이언트가 조회수를 update하지 못하도록 제한하는 작업이 필요합니다.
exports.updateArticleLookUpCnt = async (body) => {
  console.log("updateArticleLookUpCnt >>>> body===========", body);

  const { createdDt } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(createdDt),
    },
    UpdateExpression: "set lookup = lookup + :lookup",
    ExpressionAttributeValues: {
      ":lookup": 1,
    },
  };

  return await ddbClient.send(new UpdateCommand(params));
};

/********************************** 
 7. 좋아요 싫어요 up, down [완]
**********************************/
exports.updateArticleLikeUpDown = async (body) => {
  console.log("updateArticleLikeUpDown >>>> body===========", body);

  const { createdDt, type } = body;

  let _UpdateExpression;

  switch (type) {
    case "likeUp":
      _UpdateExpression = "set liked = liked + :param1";
      break;
    case "likeDown":
      _UpdateExpression = "set liked = liked - :param1";
      break;
    case "hateUp":
      _UpdateExpression = "set unliked = unliked + :param1";
      break;
    case "hateDown":
      _UpdateExpression = "set unliked = unliked - :param1";
      break;
    case "likeUpAndhateDown":
      _UpdateExpression =
        "set liked = liked + :param1, unliked = unliked - :param1";
      break;
    case "likeDownAndhateUp":
      _UpdateExpression =
        "set liked = liked - :param1, unliked = unliked + :param1";
      break;
  }

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(createdDt),
    },
    UpdateExpression: _UpdateExpression,
    ExpressionAttributeValues: {
      ":param1": 1,
    },
  };

  return await ddbClient.send(new UpdateCommand(params));
};

/********************************** 
 8. 댓글 등록
**********************************/
exports.insertArticleComment = async (body) => {
  console.log("insertArticleComment >>>> body===========", body);

  const { articleCreatedDt, commentBody } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(articleCreatedDt),
    },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": commentBody,
    },
  };

  const result = await ddbClient.send(new UpdateCommand(params));

  // update 수행이 정상이면 방금 수정 내용 조회한 데이터 리턴
  if (result.$metadata.httpStatusCode === 200) {
    return commentBody;
  }
};

/********************************** 
 9. 댓글 수정
**********************************/
exports.updateArticleComment = async (body) => {
  console.log("updateArticleComment >>>> body===========", body);

  const { articleCreatedDt, commentBody } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(articleCreatedDt),
    },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": commentBody,
    },
  };

  const result = await ddbClient.send(new UpdateCommand(params));

  // update 수행이 정상이면 방금 수정 내용 조회한 데이터 리턴
  if (result.$metadata.httpStatusCode === 200) {
    return commentBody;
  }
};

/********************************** 
 10. 댓글 삭제
**********************************/
exports.deleteArticleComment = async (body) => {
  console.log("deleteArticleComment >>>> body===========", body);

  const { articleCreatedDt, commentBody } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(articleCreatedDt),
    },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": commentBody,
    },
  };

  return await ddbClient.send(new UpdateCommand(params));
};

/********************************** 
 11. 댓글 좋아요 싫어요 up, down
**********************************/
exports.updateArticleCommentLikeUpDown = async (body) => {
  console.log("updateArticleCommentLikeUpDown >>>> body===========", body);

  const { articleCreatedDt, commentBody } = body;

  const params = {
    TableName: "articles",
    Key: {
      pt_key: "ALL",
      created_dt: Number(articleCreatedDt),
    },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": commentBody,
    },
  };

  return await ddbClient.send(new UpdateCommand(params));
};
