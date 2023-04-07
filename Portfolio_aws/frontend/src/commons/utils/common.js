const {format, formatDistanceToNow} = require('date-fns');
const {ko} = require('date-fns/locale');

export const formatDaysAgo = date => {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }
  return format(d, 'PPP EEE p', {locale: ko}); // 날짜 포맷
};

export const formatDate = (date, format) => {
  return format(new Date(date), format); //'yyyy-MM-dd'
};

export const truncate = text => {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
};

export function isEmail(asValue) {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

export function isPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

export function insertJson(orgJson, newObj){
  return JSON.stringify((orgJson ?? []).concat(newObj));
}

export function updateJson(orgJson, updateObj, id){
  return JSON.stringify(orgJson ? orgJson.map(elem => elem.id === id ? updateObj : elem) : []);
}

export function deleteJson(orgJson, id){
  return JSON.stringify(orgJson ? orgJson.filter(elem => elem.id !== id) : []);
}

/*const json = [
  {
    id : "1",
    body : "body1"
  },
  {
    id : "2",
    body : "body2"
  }
];

const newObj = {
  id : "3",
  body : "body3"
}

const updateObj = {
  id : "2",
  body : "body2-1"
}

const insert = insertJson(json, newObj);
const update = updateJson(json, updateObj, "2");
const remove = deleteJson(json, "2");*/

