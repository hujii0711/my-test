import type { AWS } from "@serverless/typescript";

const layers = [
  "arn:aws:lambda:ap-northeast-2:804048088346:layer:better-sqlite3:4",
];

const subnetIds = [
  "subnet-8c55ece7",
  "subnet-9385efe8",
  "subnet-a70ee3e8",
  "subnet-77926c28",
];
const securityGroupIds = ["sg-29bb2654"];

const vpc = {
  subnetIds,
  securityGroupIds,
};

const functions = {
  createPost: {
    // 권한 부여자 사용
    handler: "handler.createPost",
    events: [
      { httpApi: { path: "/api/post", method: "post", authorizer: "auth" } },
    ],
    layers,
    vpc,
  },
  readPost: {
    handler: "handler.readPost",
    events: [{ httpApi: { path: "/api/post/{title}", method: "get" } }],
    layers,
  },
  updatePost: {
    // 권한 부여자 사용
    handler: "handler.updatePost",
    events: [
      {
        httpApi: {
          path: "/api/post/{title}",
          method: "put",
          authorizer: "auth",
        },
      },
    ],
    layers,
    vpc,
  },
  deletePost: {
    // 권한 부여자 사용
    handler: "handler.deletePost",
    events: [
      {
        httpApi: {
          path: "/api/post/{title}",
          method: "delete",
          authorizer: "auth",
        },
      },
    ],
    layers,
    vpc,
  },
  listPosts: {
    handler: "handler.listPosts",
    events: [{ httpApi: { path: "/api/post", method: "get" } }],
    layers,
  },
  loginGoogle: {
    handler: "authHandler.loginGoogle",
    events: [{ httpApi: { path: "/api/login/google", method: "post" } }],
  },
  logout: {
    // 권한 부여자 사용
    handler: "authHandler.logout",
    events: [
      { httpApi: { path: "/api/logout", method: "post", authorizer: "auth" } },
    ],
  },
  grant: {
    handler: "authHandler.grant",
    events: [{ httpApi: { path: "/api/grant", method: "post" } }],
  },
  authorize: {
    handler: "authHandler.authorize",
  },
};

const S3Bucket = {
  Type: "AWS::S3::Bucket",
  Properties: {
    BucketName: process.env.BUCKET_NAME!,
  },
};

const RedisInstance = {
  Type: "AWS::ElastiCache::ReplicationGroup",
  Properties: {
    ReplicationGroupId: process.env.REDIS_NAME!,
    ReplicationGroupDescription: "Redis instance for simple locking",
    CacheNodeType: "cache.t3.micro",
    Engine: "redis",
    ReplicasPerNodeGroup: 0,
    AutomaticFailoverEnabled: false,
    SecurityGroupIds: securityGroupIds,
  },
};

const config: AWS = {
  service: "simple-blog-sqlite-auth",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-2",
    environment: {
      BUCKET_NAME: process.env.BUCKET_NAME!,
      REDIS_HOST: {
        "Fn::GetAtt": ["RedisInstance", "PrimaryEndPoint.Address"],
      },
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["s3:PutObject", "s3:GetObject"],
            Effect: "Allow",
            Resource: `arn:aws:s3:::${process.env.BUCKET_NAME}/*`,
          },
        ],
      },
    },
    httpApi: {
      authorizers: {
        auth: {
          type: "request", //요청 유형: request(요청헤더의 전체) | token(요청헤더의 Authorization)
          functionName: "authorize", //권한 부여자로 사용할 함수 이름
          enableSimpleResponses: true, // 권한 부여자 응답 형태를 IAM 형식이 아닌 허가 여부만 boolean으로 반환
          identitySource: ["$request.header.cookie"], // 자격 증명 원본으로 권한을 부여하는 데 필요한 데이터 위치를 지정
          // 쿠키 기반: $request.header.cookie | 토큰 기반: $request.header.authorization: 이 값을 캐시키로 사용
        },
      },
    },
    logs: {
      httpApi: {
        format: `$context.identity.sourceIp - - [$context.requestTime] "$context.routeKey $context.protocol" $context.status $context.responseLength $context.requestId $context.authorizer.error`,
      },
    },
  },
  functions,
  package: {
    individually: true,
  },
  plugins: ["serverless-webpack", "serverless-s3-local", "serverless-offline"],
  resources: {
    Resources: {
      S3Bucket,
      RedisInstance,
    },
  },
};

export = config;
