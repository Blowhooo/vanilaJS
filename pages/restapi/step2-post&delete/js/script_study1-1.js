const API_BASE_URL = "http://localhost:3001";

function showStatus(elem, msg, type = "loading"){
    if(!elem) return;
    elem.className = `status status--${type}`;
    elem.textContent = msg
}

function handleError(error, statusElem){
    console.error('에러가 발생했습니다');

    let msg = "알 수 없는 에러가 발생했습니다";

    if(error.name === "TypeError" & error.message.includes('fetch')){
        msg = "네트워크 오류가 발생했습니다. Json server를 확인해보세요";
    } else if (error.message.includes('404')){
        msg = "요청하신 리소스가 존재하지않습니다";
    } else if (error.message.includes('500')){
        msg = "서버 내부 오류가 발생했습니다";
    } else if (error.message){
        msg = error.message;
    }

    showStatus(statusElem, msg, "error");
}

async function createPost1(){

    const title = document.getElementById('post-title-1').value.trim();
    const body = document.getElementById('post-body-1').value.trim();
    const userId = document.getElementById('post-user-id-1').value.trim();
    const statusEl = document.getElementById('post-status-1')

    if(!title || !body || !userId){
        showStatus(statusEl, "모든 필드를 입력하세요", "error")
        return;
    }

    showStatus(statusEl, "게시물 업로드 시도..")    
    
    try {
        const newPost = await createPost({
            title: title,
            body : body,
            userId : parseInt(userId),
        });        

        showStatus(statusEl, "게시물 업로드 성공 !", "success");        

        console.log(newPost);
        
    } catch (error) {
        handleError(error, statusEl)
    }

}

async function createPost(postData){
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method : "POST",
        headers : {
            "Content-type" : "application/json",
        },
        body : JSON.stringify(postData),
    });

    return response.json();
}

document.getElementById('create-post-1').addEventListener('click', createPost1);