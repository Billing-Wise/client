// 2024.07.12 형식의 문자열로 날짜 데이터 변환
function toDateFromDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}.${month < 10? "0" + month : month}.${day < 10? "0"+ day : day}`
}

// 2024-07-12 형식의 문자열로 날짜 데이터 변환
function toInputDateFromDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}-${month < 10? "0" + month : month}-${day < 10? "0"+ day : day}`
}

// 숫자 통화 표시
function formatNumber(amount) {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

export {toDateFromDateTime, toInputDateFromDateTime, formatNumber}