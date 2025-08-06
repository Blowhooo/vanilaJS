// 여기에 REST API GET 실습 코드를 작성하세요!

// API 기본 URL
const API_BASE_URL = 'http://localhost:3001';

// 힌트:
// 1. 기본 GET 요청 사용법
// const response = await fetch('URL');
// const data = await response.json();

// 2. 쿼리 파라미터를 사용한 GET 요청 예시
// const response = await fetch('URL?userId=1');
// const response = await fetch('URL?_limit=10');

// 3. 특정 ID로 조회하는 GET 요청 예시
// const response = await fetch('URL/123');

// 4. 에러 처리와 상태 확인
// try {
//     const response = await fetch('URL');
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
// } catch (error) {
//     console.error('에러:', error);
// }

// 5. 로딩 상태 표시 함수 (이미 구현됨)
function showStatus(element, message, type) {
    element.className = `status status--${type}`;
    element.textContent = message;
}

// ==================== 과제 1: 사용자 목록 가져오기 ====================
// API URL: http://localhost:3001/users
// 목표: 모든 사용자 정보를 가져와서 화면에 표시하기

const fetchUsersBtn = document.getElementById('fetch-users');
const usersStatus = document.getElementById('users-status');
const usersResult = document.getElementById('users-result');

async function fetchUsers() {
    // TODO: 여기에 사용자 목록을 가져오는 코드를 작성하세요
    console.log('사용자 목록 가져오기 함수 실행됨');    
    
    // 힌트:
    // 1. showStatus로 로딩 상태 표시
    showStatus(usersStatus, '유저 정보 불러오는 중...', 'loading');
    usersResult.innerHTML = "";

    // 2. fetch로 /users 엔드포인트 호출
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        
        // 3. 응답 상태 확인 (response.ok)
        if(!response.ok) throw new Error(`HTML ERROR : status:${response.status}!`);

        const users = await response.json();

        if(users){
            showStatus(usersStatus, `${users.length}명의 데이터를 조회했습니다.`, 'success');
        }

        
        
        const usersHTML = users.map(item => 
            `
                <div class="result-card">
                    <h4>${item.name}</h4>
                    <p>${item.username}</p>
                    <p>${item.email}</p>
                    <p>${item.address.city} / ${item.address.street}</p>
                    <p>${item.phone}</p>
                    <p>${item.website}</p>
                </div>
            `
        ).join('');

        usersResult.innerHTML = usersHTML;
    } catch(error) {
        showStatus(usersStatus, "유저 정보 불러오기 실패", 'error');
        console.error('사용자 목록 가져오기 실패:', error);
    }

    // 4. JSON 파싱 (response.json())
    // 5. HTML 생성하여 결과 표시
    // 6. 에러 발생 시 에러 메시지 표시
}

fetchUsersBtn.addEventListener('click', fetchUsers);

// ==================== 과제 2: 전체 게시글 가져오기 ====================
// API URL: http://localhost:3001/posts
// 목표: 모든 게시글을 가져와서 화면에 표시하기
// 추가: limit 입력값이 있으면 ?_limit=숫자 쿼리 파라미터 사용

async function fetchAllPosts() {
    // TODO: 여기에 전체 게시글을 가져오는 코드를 작성하세요
    console.log('전체 게시글 가져오기 함수 실행됨');
    
    // 힌트:
    // 1. limitInput.value로 제한 개수 확인
    // 2. limit 값이 있으면 ?_limit=숫자 추가
    // 3. 게시글 목록을 카드 형태로 표시
}

// ==================== 과제 3: 사용자별 게시글 가져오기 ====================
// API URL: http://localhost:3001/posts?userId=숫자
// 목표: 특정 사용자의 게시글만 필터링해서 가져오기

async function fetchPostsByUser() {
    // TODO: 여기에 사용자별 게시글을 가져오는 코드를 작성하세요
    console.log('사용자별 게시글 가져오기 함수 실행됨');
    
    // 힌트:
    // 1. userIdInput.value로 사용자 ID 확인
    // 2. 입력값이 없으면 에러 메시지 표시
    // 3. ?userId=숫자 쿼리 파라미터 사용
    // 4. 결과가 없으면 "게시글이 없습니다" 메시지 표시
}

// ==================== 과제 4: 특정 게시글 상세 조회 ====================
// API URL: http://localhost:3001/posts/숫자
// 목표: 게시글 ID로 특정 게시글의 상세 정보 가져오기

async function fetchSinglePost() {
    // TODO: 여기에 특정 게시글 상세 조회 코드를 작성하세요
    console.log('게시글 상세 조회 함수 실행됨');
    
    // 힌트:
    // 1. postIdInput.value로 게시글 ID 확인
    // 2. /posts/ID 형태의 URL 사용
    // 3. 404 에러 처리 (존재하지 않는 게시글)
    // 4. 상세 정보를 보기 좋게 표시
}

// ==================== DOM 요소들 (참고용) ====================
// 버튼들
// const fetchUsersBtn = document.getElementById('fetch-users');
// const fetchAllPostsBtn = document.getElementById('fetch-all-posts');
// const fetchPostsBtn = document.getElementById('fetch-posts');
// const fetchSinglePostBtn = document.getElementById('fetch-single-post');

// 입력 필드들
// const limitInput = document.getElementById('limit-input');
// const userIdInput = document.getElementById('user-id-input');
// const postIdInput = document.getElementById('post-id-input');

// 상태 및 결과 표시 영역들
// const usersStatus = document.getElementById('users-status');
// const usersList = document.getElementById('users-list');
// const allPostsStatus = document.getElementById('all-posts-status');
// const allPostsList = document.getElementById('all-posts-list');
// const postsStatus = document.getElementById('posts-status');
// const postsList = document.getElementById('posts-list');
// const singlePostStatus = document.getElementById('single-post-status');
// const singlePostDetail = document.getElementById('single-post-detail');

// ==================== 이벤트 리스너 등록 (직접 구현해보세요!) ====================
// TODO: 각 버튼에 클릭 이벤트 리스너를 연결하세요
// 예시: fetchUsersBtn.addEventListener('click', fetchUsers);

// TODO: 입력 필드에 엔터 키 이벤트 리스너를 연결하세요
// 예시: userIdInput.addEventListener('keypress', (e) => { ... });

// ==================== 유틸리티 함수들 ====================
// 상태 표시 함수 (사용 가능)
function showStatus(element, message, type) {
    element.className = `status status--${type}`;
    element.textContent = message;
}

function hideStatus(element) {
    element.className = 'status status--hidden';
}

// ==================== 실습 가이드 ====================
console.log('🚀 GET 요청 실습을 시작하세요!');
console.log('');
console.log('📋 실습 순서:');
console.log('1. fetchUsers() 함수 완성하기');
console.log('2. fetchAllPosts() 함수 완성하기');
console.log('3. fetchPostsByUser() 함수 완성하기');
console.log('4. fetchSinglePost() 함수 완성하기');
console.log('5. 이벤트 리스너 연결하기');
console.log('');
console.log('🔧 사용 가능한 API 엔드포인트:');
console.log('- GET /users : 모든 사용자');
console.log('- GET /posts : 모든 게시글');
console.log('- GET /posts?userId=1 : 사용자별 게시글');
console.log('- GET /posts?_limit=5 : 제한된 개수의 게시글');
console.log('- GET /posts/1 : 특정 게시글');
console.log('');
console.log('💡 json-server가 localhost:3001에서 실행 중인지 확인하세요!');
console.log('   명령어: json-server --watch db.json --port 3001');