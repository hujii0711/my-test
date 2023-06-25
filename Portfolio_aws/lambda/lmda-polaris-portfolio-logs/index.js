const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const logData = "TESTETSETESTSTST";

  // S3에 저장할 버킷 및 파일 경로
  const bucketName = "srg-polaris-portfolio-repository";
  const key = `logs/error_log(${getTime()}).txt`;

  try {
    // 기존에 파일이 있는지 확인
    const isExist = await checkObjectExists();

    if (isExist) {
      const oldLog = await getExistLog();

      // 업데이트 로그 내용
      const newLog = oldLog + "\n" + logData;

      // 업데이트된 내용을 S3에 저장
      await updatedLog(newLog);
    } else {
      // 새로운 날짜에 대한 신규 로그 + 파일 수명 주기 설정
      await insertLog(logData);
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
  } catch (error) {
    console.error("Error saving log to S3:", error);
  }

  async function getExistLog() {
    const params = { Bucket: bucketName, Key: key };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body.toString();
    } catch (error) {
      throw error; // throw new Error(error);
    }
  }

  async function updatedLog(content) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: content,
    };

    try {
      await s3.putObject(params).promise();
      console.log("Updated content saved to S3");
    } catch (error) {
      console.error("Error saving updated content to S3:", error);
      throw error;
    }
  }

  async function insertLog(content) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: content,
    };

    try {
      await s3.putObject(params).promise();

      const lifecycleConfig = {
        Rules: [
          {
            ID: `error_id__${getTime()}`,
            Status: "Enabled",
            Prefix: key,
            Expiration: {
              Days: 1,
            },
          },
        ],
      };

      const lifecycleParams = {
        Bucket: bucketName,
        LifecycleConfiguration: lifecycleConfig,
      };

      await s3.putBucketLifecycleConfiguration(lifecycleParams).promise();
    } catch (error) {
      console.error(
        "Error storing object or setting lifecycle configuration:",
        error
      );
      throw error;
    }
  }

  async function checkObjectExists() {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    try {
      await s3.headObject(params).promise();
      return true;
    } catch (error) {
      if (error.code === "NotFound") {
        return false;
      }
    }
  }

  function getTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
};
