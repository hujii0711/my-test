const { format, formatDistanceToNow } = require("date-fns");
const { ko } = require("date-fns/locale");

const com = {};

com.uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

com.formatDaysAgo = (timestamp) => {
  const d = new Date(timestamp);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, "PPP EEE p", { locale: ko }); // 날짜 포맷
};

com.formatDate = (date, _format) => {
  return format(new Date(date), _format); //'yyyy-MM-dd'
};

module.exports = com;
