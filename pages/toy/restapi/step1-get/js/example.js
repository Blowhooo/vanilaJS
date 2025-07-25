// API 기본 URL - json-server용
const API_BASE_URL = 'http://localhost:3001';

// DOM 요소들
const fetchUsersBtn = document.getElementById('fetch-users');
const usersStatus = document.getElementById('users-status');
const usersList = document.getElementById('users-list');

const fetchAllPostsBtn = document.getElementById('fetch-all-posts');
const limitInput = document.getElementById('limit-input');
const allPostsStatus = document.getElementById('all-posts-status');
const allPostsList = document.getElementById('all-posts-list');

const fetchPostsBtn = document.getElementById('fetch-posts');
const userIdInput = document.getElementById('user-id-input');
const postsStatus = document.getElementById('posts-status');
const postsList = document.getElementById('posts-list');

const fetchSinglePostBtn = document.getElementById('fetch-single-post');
const postIdInput = document.getElementById('post-id-input');
const singlePostStatus = document.getElementById('single-post-status');
const singlePostDetail = document.getElementById('single-post-detail');

// 상태 표시 함수들
function showStatus(element, message, type) {
    element.className = `status status--${type}`;
    element.textContent = message;
}

function hideStatus(element) {
    element.className = 'status status--hidden';
}

// 1. 사용자 목록 가져오기 (GET)
async function fetchUsers() {
    showStatus(usersStatus, '사용자 목록을 불러오는 중...', 'loading');
    usersList.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        showStatus(usersStatus, `${users.length}명의 사용자를 불러왔습니다.`, 'success');
        
        // 사용자 목록 HTML 생성
        const usersHTML = users.map(user => `
            <div class="result-card">
                <h4>${user.name} (@${user.username})</h4>
                <p><strong>이메일:</strong> ${user.email}</p>
                <p><strong>전화번호:</strong> ${user.phone}</p>
                <p><strong>웹사이트:</strong> ${user.website}</p>
                <p><strong>회사:</strong> ${user.company.name}</p>
                <p><strong>주소:</strong> ${user.address.city}, ${user.address.street}</p>
            </div>
        `).join('');
        
        usersList.innerHTML = usersHTML;
        
    } catch (error) {
        showStatus(usersStatus, `에러 발생: ${error.message}`, 'error');
        console.error('사용자 목록 가져오기 실패:', error);
    }
}

// 2. 전체 게시글 가져오기 (GET with optional limit)
async function fetchAllPosts() {
    const limit = limitInput.value.trim();
    
    showStatus(allPostsStatus, '전체 게시글을 불러오는 중...', 'loading');
    allPostsList.innerHTML = '';

    try {
        // limit이 있으면 쿼리 파라미터 추가
        const url = limit ? `${API_BASE_URL}/posts?_limit=${limit}` : `${API_BASE_URL}/posts`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        const statusMessage = limit 
            ? `${posts.length}개의 게시글을 불러왔습니다 (제한: ${limit}개)`
            : `${posts.length}개의 게시글을 모두 불러왔습니다.`;
        
        showStatus(allPostsStatus, statusMessage, 'success');
        
        // 게시글 목록 HTML 생성
        const postsHTML = posts.map(post => `
            <div class="result-card">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <small>게시글 ID: ${post.id} | 작성자 ID: ${post.userId}</small>
            </div>
        `).join('');
        
        allPostsList.innerHTML = postsHTML;
        
    } catch (error) {
        showStatus(allPostsStatus, `에러 발생: ${error.message}`, 'error');
        console.error('전체 게시글 가져오기 실패:', error);
    }
}

// 3. 사용자별 게시글 가져오기 (GET with query parameter)
async function fetchPosts() {
    const userId = userIdInput.value.trim();
    
    if (!userId) {
        showStatus(postsStatus, '사용자 ID를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(postsStatus, '게시글을 불러오는 중...', 'loading');
    postsList.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        if (posts.length === 0) {
            showStatus(postsStatus, '해당 사용자의 게시글이 없습니다.', 'error');
            return;
        }
        
        showStatus(postsStatus, `사용자 ${userId}의 게시글 ${posts.length}개를 불러왔습니다.`, 'success');
        
        // 게시글 목록 HTML 생성
        const postsHTML = posts.map(post => `
            <div class="result-card">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <small>게시글 ID: ${post.id} | 작성자 ID: ${post.userId}</small>
            </div>
        `).join('');
        
        postsList.innerHTML = postsHTML;
        
    } catch (error) {
        showStatus(postsStatus, `에러 발생: ${error.message}`, 'error');
        console.error('게시글 목록 가져오기 실패:', error);
    }
}

// 4. 특정 게시글 상세 조회 (GET by ID)
async function fetchSinglePost() {
    const postId = postIdInput.value.trim();
    
    if (!postId) {
        showStatus(singlePostStatus, '게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(singlePostStatus, '게시글 상세 정보를 불러오는 중...', 'loading');
    singlePostDetail.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('존재하지 않는 게시글입니다.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const post = await response.json();
        
        showStatus(singlePostStatus, '게시글 상세 정보를 불러왔습니다.', 'success');
        
        // 게시글 상세 HTML 생성
        singlePostDetail.innerHTML = `
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
        
    } catch (error) {
        showStatus(singlePostStatus, `에러 발생: ${error.message}`, 'error');
        console.error('게시글 상세 조회 실패:', error);
    }
}

// 이벤트 리스너 등록
fetchUsersBtn.addEventListener('click', fetchUsers);
fetchAllPostsBtn.addEventListener('click', fetchAllPosts);
fetchPostsBtn.addEventListener('click', fetchPosts);
fetchSinglePostBtn.addEventListener('click', fetchSinglePost);

// 엔터 키 이벤트 처리
userIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchPosts();
    }
});

postIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchSinglePost();
    }
});

limitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchAllPosts();
    }
});

console.log('REST API GET 예제가 로드되었습니다!');
console.log('json-server 사용 중:');
console.log('- GET /users: 사용자 목록');
console.log('- GET /posts: 게시글 목록');
console.log('- GET /posts?userId={id}: 사용자별 게시글');
console.log('- GET /posts/{id}: 특정 게시글 상세');
console.log('- GET /posts?_limit={num}: 제한된 개수의 게시글');