export function showStatus(elem, msg, type){

    elem.className = `status status--${type}`;
    elem.textContent = msg;

}

export function resError({err, statusElem}){
    let message = "알 수 없는 오류가 발생했습니다.";

    if(err.name === "TypeError" & err.message.includes('fetch')){
        message = "FETCH에 오류가 발생했습니다. JSON SERVER가 활성화되어있는지 확인해주세요.";
    } else if (err.message.includes('404')) {
        message = '요청한 리소스를 찾을 수 없습니다.';
    } else if (err.message.includes('500')) {
        message = '서버 내부 오류가 발생했습니다.';
    } else if (err.message) {
        message = error.message;
    }

    showStatus(statusElem, message, "error");
}

export function validateChk({ title, body, userId }) {
  const errors = [];

  if (!title || title.length < 5)
    errors.push('제목은 5글자 이상이어야 합니다.');

  if (!body || body.length < 20)
    errors.push('내용은 20글자 이상이어야 합니다.');

  if (!userId || userId < 1 || userId > 10)
    errors.push('유효한 유저 아이디를 입력하세요.');

  return errors;
}