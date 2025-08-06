const API_BASE_URL = 'http://localhost:3001';

const limitInput = document.getElementById('limit-input');
const fetchAllPostsBtn = document.getElementById('fetch-all-posts');
const allPostsStatus = document.getElementById('all-posts-status');
const allPostsResult = document.getElementById('all-posts-result');

function showStatus(elem, msg, type){
    elem.className = `status status--${type}`;
    elem.textContent = `${msg}`;
}

async function fetchAllPosts () {
    console.log('게시글 전체 조회 기능 실행됌!')

    const limit = limitInput.value.trim();



    try {
        const url = limit 
            ? `${API_BASE_URL}/posts?_limit=${limit}`
            : `${API_BASE_URL}/posts`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTML ERROR : ${response.status}`);
        }

        const posts = await response.json();

        const statusMessage = limit 
            ? `${posts.length}개의 게시글을 불러왔습니다 (제한: ${limit}개)`
            : `${posts.length}개의 게시글을 모두 불러왔습니다.`;

        showStatus(allPostsStatus, statusMessage, "success");

        const postsHTML = posts.map(item => 
            `
                <div class="result-card">
                    <h4>${item.title}</h4>
                    <p>${item.body}</p>
                </div>
            `
        ).join('');

        allPostsResult.innerHTML = postsHTML;

    } catch(err) {
        showStatus(allPostsStatus, `에러메시지 : ${err.message}`, "error");
        console.log('전체 게시글 불러오기 실패');
    }
}

fetchAllPostsBtn.addEventListener('click', fetchAllPosts);