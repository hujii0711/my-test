const {
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../modules/ddbClient.js");
const com = require("../../modules/common.js");
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
 0. 조회 페이징 처리
**********************************/
exports.selectArticlePagingList = async (query) => {

    const { created_dt } = query;
    console.log("selectArticlePagingList >>> created_dt=======", created_dt);
    const params = {
      TableName: "articles",
      KeyConditionExpression: 'pt_key = :ptKey',
      ExpressionAttributeValues: {
        ':ptKey': 'ALL'
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
    if(Number(created_dt) > 1){
      params.ExclusiveStartKey = {"created_dt": Number(created_dt), "pt_key": "ALL"}
    }

    console.log("yyyy-mm-dd==============", com.formatDate(1680760180448, "yyyy-MM-dd HH:mm:SS"));
    
    try{
      return await ddbClient.send(new QueryCommand(params));
      //result.Items
      //result.LastEvaluatedKey.created_dt
    } catch(err){
      console.log("selectArticlePagingList 오류 발생============", err);
    }
};

/********************************** 
 1. 조회 상세
**********************************/
exports.selectArticle = async (query) => {
  const { id } = query;

  const params = {
    TableName: "articles",
    FilterExpression: "id = :id",
    ExpressionAttributeValues: {":id": id},
  };

   try{
      return await ddbClient.send(new ScanCommand(params));
    } catch(err){
      console.log("selectArticle 오류 발생============", err);
    }
};

/********************************** 
 2. 등록
**********************************/
exports.insertArticle = async (body) => {
  const { title, contents } = body;
  const params = {
    TableName: "articles",
    Item: {
      pt_key: "ALL",
      id: com.uuidv4(),
      user_id: "fujii0711",
      user_name: "김형준",
      title : title,
      contents : contents,
      lookup : 0,
      liked : 0,
      unliked : 0,
      comments : null,
      created_dt : Date.now(),
      updated_dt : null
    },
  };

  const data = await ddbClient.send(new PutCommand(params));
  return data;
};

/********************************** 
 3. 수정
**********************************/
exports.updateArticle = async (body) => {
  const { id, title, contents } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set title = :param1, contents = :param2, updated_dt = :param3",
    ExpressionAttributeValues: {
      ":param1": title,
      ":param2": contents,
      ":param3": com.krDate(),
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 4. 삭제
**********************************/
exports.deleteArticle = async (body) => {
  const { id } = body;

  const params = {
    TableName: "articles",
    Key: {
      id,
    },
  };

  const data = await ddbClient.send(new DeleteCommand(params));
  return data;
};

/********************************** 
 5. 조회수 up
**********************************/
//주의: 위 예시 코드는 단순히 조회수를 1 증가시키는 것이므로, 동시에 여러 클라이언트가 조회수를 update하는 경우,
//race condition 등의 문제가 발생할 수 있습니다. 이를 해결하기 위해서는 DynamoDB의 조건 표현식 등을 사용하여 동시에
//여러 클라이언트가 조회수를 update하지 못하도록 제한하는 작업이 필요합니다.
exports.updateArticleLookUpCnt = async (body) => {
  const { id } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set lookup = lookup + param1",
    ExpressionAttributeValues: {
      ":param1": 1,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 6. 좋아요 up
**********************************/
exports.updateArticleLikeCnt = async (body) => {
  const { id } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set liked = liked + param1",
    ExpressionAttributeValues: {
      ":param1": 1,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 7. 싫어요 up
**********************************/
exports.updateArticleUnLikeCnt = async (body) => {
  const { id } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set unliked = unliked + param1",
    ExpressionAttributeValues: {
      ":param1": 1,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 8. 댓글 등록 (실질 update)
**********************************/
exports.insertArticleComment = async (body) => {
  const { id, comments } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": comments,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 9. 댓글 수정 (실질 update)
**********************************/
exports.updateArticleComment= async (body) => {
  const { id, comments } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": comments,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 10. 댓글 삭제 (실질 update)
**********************************/
exports.deleteArticleComment = async (body) => {
  const { id, comments } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": comments,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 11. 댓글 좋아요 up (실질 update)
**********************************/
exports.updateArticleCommentLikeCnt = async (body) => {
  const { id, comments } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": comments,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

/********************************** 
 12. 댓글 싫어요 up (실질 update)
**********************************/
exports.updateArticleCommentUnLikeCnt = async (body) => {
  const { id, comments } = body;

  const params = {
    TableName: "articles",
    Key: { id },
    UpdateExpression: "set comments = :param1",
    ExpressionAttributeValues: {
      ":param1": comments,
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};