const AWS = require("aws-sdk");

// AWS SNS 클라이언트 생성
const sns = new AWS.SNS();

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const deviceToken = body.token;
  // body=========== {
  //   token: 'dKfKEFy2RD2D9U77betPs1:APA91bFCOc0582Gw7NaOvsEIgHsp8aRoGrbcL5ICoZV99HbVYSHSLQ2-yoWl7shwRPUH_ntwkDlzWweZ9NRbZxFnn-fOSBLqMVkpE-nT6sP0Ol5On4XUZ3cxLzV5dixFnViwCHpsL7aS'
  // }

  try {
    // 플랫폼 어플리케이션 생성
    const platformApplicationParams = {
      Name: "push_test", // 플랫폼 어플리케이션 이름
      Platform: "GCM", // 플랫폼 종류 (APNS, FCM 등)
      Attributes: {
        PlatformCredential: process.env.SERVER_KEY, // FCM 서버 키
        //EventEndpointCreated: "YOUR_ENDPOINT_CREATED_LAMBDA_ARN", // 플랫폼 엔드포인트 생성 시 호출할 Lambda 함수의 ARN
      },
    };

    const platformApplicationResponse = await sns
      .createPlatformApplication(platformApplicationParams)
      .promise();
    const platformApplicationArn =
      platformApplicationResponse.PlatformApplicationArn;
    //platformApplicationArn================ arn:aws:sns:ap-northeast-2:455569416380:app/GCM/push_test

    // 플랫폼 엔드포인트 생성
    const endpointParams = {
      PlatformApplicationArn: platformApplicationArn,
      Token: deviceToken, // 디바이스 토큰 또는 등록 ID
      CustomUserData: "CUSTOM_USER_DATA", // 사용자 지정 데이터 (옵션)
    };
    // endpointParams================ {
    //   PlatformApplicationArn: 'arn:aws:sns:ap-northeast-2:455569416380:app/GCM/push_test',
    //   Token: 'dKfKEFy2RD2D9U77betPs1:APA91bFCOc0582Gw7NaOvsEIgHsp8aRoGrbcL5ICoZV99HbVYSHSLQ2-yoWl7shwRPUH_ntwkDlzWweZ9NRbZxFnn-fOSBLqMVkpE-nT6sP0Ol5On4XUZ3cxLzV5dixFnViwCHpsL7aS',
    //   CustomUserData: 'CUSTOM_USER_DATA'
    // }
    const endpointResponse = await sns
      .createPlatformEndpoint(endpointParams)
      .promise();
    const endpointArn = endpointResponse.EndpointArn;
    // endpointArn========================= arn:aws:sns:ap-northeast-2:455569416380:endpoint/GCM/push_test/6e6f4a42-3a99-3441-a616-158944d4d01a

    // 푸시 알림 보내기
    const message = {
      default: "Default message", // 기본 메시지
      GCM: JSON.stringify({
        data: {
          message: "Push notification message", // FCM 푸시 알림 메시지
        },
      }),
    };
    const publishParams = {
      Message: JSON.stringify(message),
      MessageStructure: "json",
      TargetArn: endpointArn,
    };
    // publishParams================ {
    //   Message: '{"default":"Default message","GCM":"{\\"data\\":{\\"message\\":\\"Push notification message\\"}}"}',
    //   MessageStructure: 'json',
    //   TargetArn: 'arn:aws:sns:ap-northeast-2:455569416380:endpoint/GCM/push_test/6e6f4a42-3a99-3441-a616-158944d4d01a'
    // }
    const publish = await sns.publish(publishParams).promise();
    console.log("publish===========", publish);

    const response = {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify("Success!!!!!!!!!!!!!!"),
    };
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//'YOUR_PLATFORM_CREDENTIAL': FCM 서버 키를 제공해야 합니다. FCM 콘솔에서 서버 키를 생성하고 해당 값으로 대체해야 합니다.
//'YOUR_ENDPOINT_CREATED_LAMBDA_ARN': 플랫폼 엔드포인트 생성 시 호출할 Lambda 함수의 ARN을 제공해야 합니다. 이 함수는 엔드포인트 생성 후 추가 작업을 수행할 때 유용할 수 있습니다.
//'DEVICE_TOKEN': 푸시 알림을 받을 안드로이드 디바이스의 토큰 또는 등록 ID로 대체해야 합니다.
//'CUSTOM_USER_DATA': 필요에 따라 사용자 지정 데이터를 제공할 수 있습니다. 이는 선택 사항이며 필요 없을 경우 코드에서 제거할 수 있습니다.