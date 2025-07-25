// API 기본 URL - json-server용
const API_BASE_URL = 'http://localhost:3001';

// DOM 요소들
const createPostBtn = document.getElementById('create-post');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const postUserId = document.getElementById('post-user-id');
const createStatus = document.getElementById('create-status');
const createResult = document.getElementById('create-result');

const deletePostBtn = document.getElementById('delete-post');
const deletePostId = document.getElementById('delete-post-id');
const deleteStatus = document.getElementById('delete-status');
const deleteResult = document.getElementById('delete-result');

// 상태 표시 함수들
function showStatus(element, message, type) {
    element.className = `status status--${type}`;
    element.textContent = message;
}

function hideStatus(element) {
    element.className = 'status status--hidden';
}

// 1. 새 게시글 작성 (POST)
async function createPost() {
    const title = postTitle.value.trim();
    const body = postBody.value.trim();
    const userId = postUserId.value.trim();
    
    if (!title || !body || !userId) {
        showStatus(createStatus, '모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(createStatus, '게시글을 작성하는 중...', 'loading');
    createResult.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: parseInt(userId)
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newPost = await response.json();
        
        showStatus(createStatus, '게시글이 성공적으로 작성되었습니다!', 'success');
        
        // 작성된 게시글 표시
        createResult.innerHTML = `
            <div class="result-success">
                <h4>작성된 게시글</h4>
                <p><strong>ID:</strong> ${newPost.id}</p>
                <p><strong>제목:</strong> ${newPost.title}</p>
                <p><strong>내용:</strong> ${newPost.body}</p>
                <p><strong>작성자 ID:</strong> ${newPost.userId}</p>
            </div>
        `;
        
        // 입력 필드 초기화
        postTitle.value = '';
        postBody.value = '';
        postUserId.value = '';
        
    } catch (error) {
        showStatus(createStatus, `에러 발생: ${error.message}`, 'error');
        console.error('게시글 작성 실패:', error);
    }
}

// 2. 게시글 삭제 (DELETE)
async function deletePost() {
    const postId = deletePostId.value.trim();
    
    if (!postId) {
        showStatus(deleteStatus, '삭제할 게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    if (!confirm(`정말로 게시글 ${postId}번을 삭제하시겠습니까?`)) {
        return;
    }
    
    showStatus(deleteStatus, '게시글을 삭제하는 중...', 'loading');
    deleteResult.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        showStatus(deleteStatus, '게시글이 성공적으로 삭제되었습니다!', 'success');
        
        // 삭제 결과 표시
        deleteResult.innerHTML = `
            <div class="result-delete">
                <h4>삭제 완료</h4>
                <p>게시글 ID ${postId}번이 삭제되었습니다.</p>
                <p><small>* json-server에서 실제로 삭제됩니다.</small></p>
            </div>
        `;
        
        // 입력 필드 초기화
        deletePostId.value = '';
        
    } catch (error) {
        showStatus(deleteStatus, `에러 발생: ${error.message}`, 'error');
        console.error('게시글 삭제 실패:', error);
    }
}


// 이벤트 리스너 등록
createPostBtn.addEventListener('click', createPost);
deletePostBtn.addEventListener('click', deletePost);

// 엔터 키 이벤트 처리 (수정된 부분)
postUserId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createPost();
    }
});

deletePostId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        deletePost();
    }
});

console.log('REST API 예제가 로드되었습니다!');
console.log('json-server 사용 중:');
console.log('- GET /users: 사용자 목록');
console.log('- GET /posts: 게시글 목록');
console.log('- POST /posts: 새 게시글 작성');
console.log('- PUT /posts/:id: 게시글 수정');
console.log('- DELETE /posts/:id: 게시글 삭제');