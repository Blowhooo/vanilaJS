const API_BASE_URL = 'http://localhost:3001';
const postIdInput = document.getElementById('post-id-input');
const fetchSinglePostBtn = document.getElementById('fetch-single-post')
const singlePostStatus = document.getElementById('single-post-status');
const singlePostResult = document.getElementById('single-post-result');

function showStatus(elem, msg, type){
    elem.className = `status status--${type}`;
    elem.textContent = msg;
}

async function fetchSinglePost(){
    console.log('특정 게시글 상세 조회하기');

    const postId = postIdInput.value.trim();

    showStatus(singlePostStatus, "게시물 조회 중..", "loading");
    singlePostResult.innerHTML = "";

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

        if(!response.ok){
            if(response.status == 404){
                throw new Error('존재하지 않는 게시글입니다');
            }
            throw new Error(`HTTP ERROR : ${response.status}`);
        }

        showStatus(singlePostStatus, "게시물 조회 성공", "success");

        const post = await response.json();

        singlePostResult.innerHTML = `
            <div class="result-card result-card--detail">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span><strong>게시글 ID:</strong> ${post.id}</span>
                    <span><strong>작성자 ID:</strong> ${post.userId}</span>
                </div>
                <div class="post-content">
                    <p>${post.body}</p>
                </div>
            </div>
        `;
    } catch (err) {
        showStatus(singlePostStatus, `에러메시지 : ${err.message}`, "error");
    }
}

fetchSinglePostBtn.addEventListener('click', fetchSinglePost);