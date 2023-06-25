const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ region: 'ap-northeast-2' });

exports.handler = async (event) => {
  //const { message, targetArn } = event;

  const payload = {
    GCM: JSON.stringify({
      data: {
        message: "11111111111",
      },
    }),
  };

  const params = {
    MessageStructure: 'json',
    Message: JSON.stringify(payload),
    TargetArn: "arn:aws:sns:ap-northeast-2:455569416380:app/GCM/polaris-portfolio-push",
  };

  try {
    await SNS.publish(params).promise();
    console.log('Message sent successfully.');
    return {
      statusCode: 200,
      body: JSON.stringify('Message sent successfully.'),
    };
  } catch (error) {
    console.log('Error sending message: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error sending message.'),
    };
  }
};

Amazon SNS로 앱에 알림을 푸시하려면 먼저 플랫폼 엔드포인트 생성 작업을 호출해 Amazon SNS에 해당 앱의 디바이스 토큰을 등록해야 합니다.

AAAAhES0vjs:APA91bECXOziEk-MJwBKQmHmKz0IGpsnwQLXvoL64jwD6zktBV9F31eGOEhVzXCpCB4d8L8i_xOKQFoeM4dylLPeeC9uRnK-Guu7j1ccTsinnzaSpboWDCTPzc8bIcwY9dh1oS6xrkK0


- Amazon SNS topic 역할
Amazon SNS (Simple Notification Service)는 분산형 애플리케이션, 마이크로서비스, 서버리스 애플리케이션 및 기타 대규모 클라우드 애플리케이션에서
메시징 패턴을 구현하는 데 사용되는 완전 관리형 메시징 서비스입니다.
AWS SNS 주제(Topic)는 한 번에 여러 개의 메시지를 다른 AWS 서비스 및 애플리케이션에 게시할 수 있는 역할을 합니다.
즉, 한 번의 메시지 게시로 여러 개의 구독자(Subscriber)에게 메시지를 전달할 수 있습니다. 이러한 구독자는 이메일, SMS, HTTP/HTTPS, Lambda 함수 등 다양한 방법으로 메시지를 받을 수 있습니다.
SNS 주제는 메시지 게시를 시작하려는 Amazon SNS 사용자 또는 클라이언트의 논리적 끝점으로서, 해당 주제로 메시지를 게시할 때, 해당 주제에 구독된 모든 구독자에게 메시지가 전송됩니다.
따라서, SNS 주제는 특정 주제와 관련된 메시지를 게시하는 데 사용됩니다.


- Amazon SNS의 subscription 역할
Amazon SNS (Simple Notification Service)는 분산형 애플리케이션, 마이크로서비스, 서버리스 애플리케이션 및 기타 대규모 클라우드 애플리케이션에서
메시징 패턴을 구현하는 데 사용되는 완전 관리형 메시징 서비스입니다.
AWS SNS 구독(Subscription)은 SNS 주제(Topic)로 게시된 메시지를 받을 수 있는 역할을 합니다. SNS 구독은 메시지를 수신하는 엔드포인트를 나타내며, 이메일, SMS, HTTP/HTTPS, Lambda 함수 등 다양한 방법으로 메시지를 수신할 수 있습니다.
SNS 주제에 구독을 등록하면 해당 주제로 메시지가 게시될 때마다, 해당 구독에 등록된 엔드포인트로 메시지가 전송됩니다.
이를 통해, SNS 주제로 게시된 메시지를 특정한 애플리케이션 또는 서비스에 효율적으로 전달할 수 있습니다.
SNS 구독은 SNS 주제와 관련된 메시지를 받을 수 있도록 구성됩니다. 이를 위해서는 먼저 구독자(Subscriber)로 등록하고, 구독자가 받을 메시지를 수신할 수 있는 엔드포인트를 지정해야 합니다.
SNS 구독을 등록하면 해당 주제에 대한 모든 메시지를 구독자가 받을 수 있으므로, 이를 통해 애플리케이션에서 효율적으로 메시지를 처리할 수 있습니다.