const API_BASE_URL = "http://localhost:3001";

function showStatus(elem, msg, type = "loading"){
    if(!elem) return;
    elem.className = `status status--${type}`;
    elem.textContent = msg;
}

function handleError(error, statusEl){
    console.error('오류 : ', error);

    let message = "알 수 없는 오류가 발생했습니다.";
    if(error.name === "TypeError" && error.message.includes('fetch')){
        message = "네트워크 오류가 발생했습니다. json server를 확인해주세요.";
    } else if (error.message.includes('404')){
        message = "요청하신 리소스가 존재하지 않습니다.";
    } else if (error.message.includes('500')){
        message = "서버 내부 오류가 발생했습니다.";
    } else if (error.message){
        message = error.message;
    }

    showStatus(statusEl, `오류 : ${message}`, 'error')
}

function validatePost(title, body, userId){
    const errors = [];
    if(!title || title.length < 5) errors.push('제목은 5자 이상을 입력해주세요.');
    if(!body || body.length < 10) errors.push('내용은 10자 이상을 입력해주세요.');
    if(!userId || userId < 0 || userId > 10) errors.push('유효한 ID를 입력해주세요');

    return errors;
}

async function createPost(postData){
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method : "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(postData)
    });

    if(!response.ok){
        throw new Error(`HTTP ERROR Status : ${response.status}`);
    }

    return response.json()
}

async function createPost1(){

    const title = document.getElementById('post-title-1').value.trim();
    const body = document.getElementById('post-body-1').value.trim();
    const userId = document.getElementById('post-user-id-1').value.trim();
    const statusEl = document.getElementById('post-status-1');

    if(!title || !body || !userId){
        showStatus(statusEl, `모든 필드를 작성해주세요`, 'error')
        return;
    }

    showStatus(statusEl, `게시물 업로드 시도`);

    try {
       
        const newPost = await createPost({
            title : title,
            body : body,
            userId : parseInt(userId),
        })

        console.log(newPost);

        showStatus(statusEl, `게시물 업로드 성공`);

    } catch (error) {
        handleError(error, statusEl)
    }    
}

async function createPost2(){
    console.log('유효성 검사 실행');

    const title = document.getElementById('post-title-2').value.trim();
    const body = document.getElementById('post-body-2').value.trim();
    const userId = document.getElementById('post-user-id-2').value.trim();
    const statusEl = document.getElementById('post-status-2');

    const errors = validatePost(title, body, userId);
    if(errors.length > 0){
        showStatus(statusEl, `검증 실패 : ${errors.join(',')}`, 'error');
        return false;
    }

    showStatus(statusEl, `유저 존재 여부 확인 중..`);

    try {
        const user = await fetch(`${API_BASE_URL}/users/${userId}`);
        if(!user.ok){
            throw new Error(`HTTP Error : ${user.status}`);
        }

        const userInfo = await user.json();

        showStatus(statusEl, `${userInfo.name}님은 가입되어있습니다 !`, 'success');

        showStatus(statusEl, `${userInfo.name}님의 게시글이 작성 시도중`);
            
        const newPost = await createPost({
            title: title,
            body : body,
            userId : parseInt(userId)
        });

        console.log(newPost);

        showStatus(statusEl, `${userInfo.name}님의 게시글이 작성되었습니다`, 'success');

        

    } catch(error) {
        console.error(error)
    }
}

async function fetchUsers(){
    const response = await fetch(`${API_BASE_URL}/users`);
    if(!response.ok){
        throw new Error(`HTTP Error : ${response.status}`);
    }

    return response.json();
}

async function initailizeSelects(){
    const users = await fetchUsers();
    const selects = ['post-user-id-2'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if(select){
            select.innerHTML = '<option value="" hidden>작성자를 선택해주세요.</option>' + 
               users.map(user => 
                `<option value="${user.id}">${user.name} (${user.email})</option>`
               ).join(", ")
        }
    })
}

initailizeSelects();


document.getElementById('create-post-1').addEventListener('click', createPost1);
document.getElementById('create-post-2').addEventListener('click', createPost2);