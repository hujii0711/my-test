const Sequelize = require('sequelize');

//MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야 합니다. 
//MySQL의 테이블은 시퀄라이즈의 모델과 대응됩니다. 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 합니다. 
//모델은 크게 static init 메서드와 static associate 메서드로 나뉩니다.
module.exports = class User extends Sequelize.Model {

  static init(sequelize) {
    // init 메서드에는 테이블에 대한 설정
    // super.init 메서드의 첫 번째 인수가 테이블 컬럼에 대한 설정
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    },
    // 두 번째 인수가 테이블 자체에 대한 설정입니다
    // • sequelize: static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 합니다.
    // 나중에 model/index.js에서 연결합니다.
    // • timestamps: 현재 false로 되어 있으며, 이 속성 값이 true면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가합니다. 
    // 각각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력됩니다. 하지만 예제에서는 직접 created_at 컬럼을 만들었으므로 timestamps 속성이 
    // 필요하지 않습니다. 따라서 속성값을 false로 하여 자동으로 날짜 컬럼을 추가하는 기능을 해제했습니다.
    // • underscored: 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀 케이스(camel case)(예시: createdAt)로 만듭니다.
    // 이를 스네이크 케이스(snake // case)(예시: created_at)로 바꾸는 옵션입니다.
    // • modelName: 모델 이름을 설정할 수 있습니다. 노드 프로젝트에서 사용합니다.
    // • tableName: 실제 데이터베이스의 테이블 이름이 됩니다. 기본적으로는 모델 이름을 소문자 및 복수형으로 만듭니다. 모델 이름이 User라면 
    // 테이블 이름은 users가 됩니다.
    // • paranoid: true로 설정하면 deletedAt이라는 컬럼이 생깁니다. 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록됩니다. 
    // 로우를 조회하는 명령을 내렸을 때는 deletedAt의 값이 null인 로우(삭제되지 않았다는 뜻)를 조회합니다. 이렇게 하는 이유는 나중에 로우를 
    // 복원하기 위해서입니다. 로우를 복원해야 하는 상황이 생길 것 같다면 미리 true로 설정해두세요.
    // • charset과 collate: 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력됩니다. 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 
    // utf8mb4_general_ci를 입력합니다.
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  //associate 메서드에는 다른 모델과의 관계를 적습니다.
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
