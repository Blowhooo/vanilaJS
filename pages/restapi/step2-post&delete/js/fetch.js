import { showStatus, resError, validateChk } from "./function.js";

export async function createFetch({target, titleInput, bodyInput, userIdInput, statusElem, resultElem, api }){

    resultElem.innerHTML = "";

    showStatus(statusElem, "게시물을 등록 시도 중...", "loading")

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const userId = userIdInput.value.trim();
    
    if(target.id === "create-post-1"){
        if(!title | !body | !userId){
            showStatus(statusElem, "모든 필드를 입력해주세요.", "error");
            return;
        }
    }

    if(target.id === "create-post-2") {
        const errors = validateChk({title, body, userId});
        if(errors.length > 0){
            showStatus(statusElem, `${errors.join(', ')}`, "error")
            return ;
        }
    }
        
    



    const postData = {
        title : title,
        body : body,
        userId : parseInt(userId),
    }
    
    return await createPost({api, statusElem, postData});
}

async function createPost({api, statusElem, postData}){
    try {
        const response = await fetch(`${api}/posts`, {
            method : "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(postData),
        })

        if(!response.ok){
            throw new Error(`HTTP ERROR : ${response.status}`);
        }

        showStatus(statusElem, "게시물을 성공적으로 등록했습니다.", "success")

    } catch (err) {
        resError({err, statusElem})
    }
}