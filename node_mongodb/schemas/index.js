const mongoose = require('mongoose');

const user= 'fujii0711';
const pwd = 'hj%401560813';
const server='localhost:27017';
const database='example';

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  //  mongodb://[username:pwd@]localhost[:port][/database][?options]
  mongoose.connect(`mongodb://${server}/${database}`, {
    //dbName: 'local',
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
//mongoose.connection.on('disconnected', () => {
//  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
//  connect();
//});

module.exports = connect;
