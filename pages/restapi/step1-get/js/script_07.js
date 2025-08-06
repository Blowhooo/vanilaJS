const API_BASE_URL = "http://localhost:3001";
const userIdInput = document.getElementById('user-id-input');
const fetchPostsByUseBtn = document.getElementById('fetch-posts-by-user');
const userPostsStatus = document.getElementById('user-posts-status');
const userPostsResult = document.getElementById('user-posts-result');

function showStatus(elem, msg, type){
    elem.className=`status status--${type}`;
    elem.textContent = msg;
}

async function fetchPostsByUse () {
    console.log('특정 유저의 게시물 조회 기능');

    userPostsResult.innerHTML = "";
    const userId = userIdInput.value.trim();

    if(!userId){
        showStatus(userPostsStatus, "유저의 아이디를 입력하세요", "error");
        return;
    }

    showStatus(userPostsStatus, "게시물 조회 중..", "loading");

    try {
        const response = await fetch(`${API_BASE_URL}/posts`);

        if(!response.ok){
            if(response.status === 404) throw new Error('유저가 존재하지 않습니다');
            
            throw new Error(`HTTP ERROR : ${response.status}`);
        }        

        const posts = await response.json();

        const userPosts = posts.filter(item => {
           return item.userId === Number(userId)
        });


        if(userPosts.length === 0){
            showStatus(userPostsStatus, `유저가 존재하지 않습니다 !`, "error");
            return;
        }

        showStatus(userPostsStatus, `유저${userId}님의 ${userPosts.length} 게시글 조회 성공 !`, "success");
        
        const userHTML = userPosts.map(post => `
            <div class="result-card">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <small>게시글 ID: ${post.id} | 작성자 ID: ${post.userId}</small>
            </div>`
        ).join('');

        console.log(userHTML)
        

        
    } catch (err) {
        showStatus(userPostsStatus, `에러 메세지 : ${err.message}` ,"error");
        console.log('게시물 조회 실패.."')
    }
}

fetchPostsByUseBtn.addEventListener('click', fetchPostsByUse);