// ============================================================================
// REST API POST & DELETE 실습 - JavaScript 구현
// ============================================================================

// API 기본 설정
const API_BASE_URL = 'http://localhost:3001';

// ============================================================================
// 유틸리티 함수들 (공통으로 사용)
// ============================================================================

/**
 * 상태 메시지를 표시하는 함수
 * @param {HTMLElement} element - 상태를 표시할 요소
 * @param {string} message - 표시할 메시지
 * @param {string} type - 상태 타입 (loading, success, error, info)
 */
function showStatus(element, message, type = 'loading') {
    // TODO: 구현해보세요!
    // 힌트: element.className과 element.textContent 사용
    
}

/**
 * 상태 메시지를 숨기는 함수
 * @param {HTMLElement} element - 숨길 요소
 */
function hideStatus(element) {
    // TODO: 구현해보세요!
    // 힌트: 'status--hidden' 클래스 추가
    
}

/**
 * 입력값 유효성 검증 함수
 * @param {string} title - 게시글 제목
 * @param {string} body - 게시글 내용
 * @param {string} userId - 사용자 ID
 * @returns {Array} 에러 메시지 배열
 */
function validateInput(title, body, userId) {
    const errors = [];
    
    // TODO: 유효성 검증 로직을 구현해보세요!
    // 힌트:
    // - 제목이 5글자 미만이면 에러 추가
    // - 내용이 10글자 미만이면 에러 추가
    // - 사용자ID가 1-10 범위가 아니면 에러 추가
    
    return errors;
}

// ============================================================================
// 서버 상태 확인
// ============================================================================

async function checkServerStatus() {
    const statusEl = document.getElementById('server-status');
    
    try {
        showStatus(statusEl, 'JSON Server 연결을 확인하는 중...', 'loading');
        
        // TODO: API_BASE_URL로 요청을 보내서 서버 상태 확인
        // 힌트: fetch(API_BASE_URL + '/posts')
        
        showStatus(statusEl, '✅ JSON Server가 정상적으로 실행 중입니다!', 'success');
        
    } catch (error) {
        showStatus(statusEl, '❌ JSON Server에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.', 'error');
        console.error('Server check failed:', error);
    }
}

// ============================================================================
// 과제 1: 기본 게시글 작성 (POST)
// ============================================================================

async function createPost1() {
    // DOM 요소 가져오기
    const title = document.getElementById('post-title-1').value.trim();
    const body = document.getElementById('post-body-1').value.trim();
    const userId = document.getElementById('post-user-id-1').value.trim();
    const statusEl = document.getElementById('post-status-1');
    const resultEl = document.getElementById('post-result-1');
    
    // 기본 입력값 체크
    if (!title || !body || !userId) {
        showStatus(statusEl, '모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        // TODO: POST 요청을 구현해보세요!
        // 힌트:
        // const response = await fetch(API_BASE_URL + '/posts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         title: title,
        //         body: body,
        //         userId: parseInt(userId)
        //     })
        // });
        
        // TODO: 응답 상태 확인
        // 힌트: if (!response.ok) throw new Error(...)
        
        // TODO: 응답 데이터를 JSON으로 파싱
        // 힌트: const newPost = await response.json();
        
        showStatus(statusEl, '게시글이 성공적으로 작성되었습니다!', 'success');
        
        // TODO: 결과를 화면에 표시
        // 힌트: resultEl.innerHTML = `<div>...</div>`;
        
        // TODO: 입력 필드 초기화
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Create post failed:', error);
    }
}

// ============================================================================
// 과제 2: 입력 검증 포함 게시글 작성
// ============================================================================

async function createPost2() {
    const title = document.getElementById('post-title-2').value.trim();
    const body = document.getElementById('post-body-2').value.trim();
    const userId = document.getElementById('post-user-id-2').value.trim();
    const statusEl = document.getElementById('post-status-2');
    const resultEl = document.getElementById('post-result-2');
    
    // TODO: validateInput 함수를 사용하여 입력값 검증
    // 힌트: const errors = validateInput(title, body, userId);
    
    // TODO: 검증 실패 시 에러 메시지 표시 후 return
    
    showStatus(statusEl, '입력값 검증 완료, 게시글을 작성하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        // TODO: 과제 1과 동일한 POST 요청 구현
        
        showStatus(statusEl, '입력 검증 후 게시글이 작성되었습니다!', 'success');
        
        // TODO: 검증된 데이터 정보와 함께 결과 표시
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Create post with validation failed:', error);
    }
}

// ============================================================================
// 과제 3: 기본 게시글 삭제 (DELETE)
// ============================================================================

async function deletePost1() {
    const postId = document.getElementById('delete-post-id-1').value.trim();
    const statusEl = document.getElementById('delete-status-1');
    const resultEl = document.getElementById('delete-result-1');
    
    if (!postId) {
        showStatus(statusEl, '삭제할 게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    // TODO: 삭제 확인 대화상자 표시
    // 힌트: if (!confirm('...')) return;
    
    showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        // TODO: DELETE 요청을 구현해보세요!
        // 힌트:
        // const response = await fetch(API_BASE_URL + `/posts/${postId}`, {
        //     method: 'DELETE'
        // });
        
        // TODO: 응답 상태 확인
        
        showStatus(statusEl, '게시글이 성공적으로 삭제되었습니다!', 'success');
        
        // TODO: 삭제 결과 표시
        
        // TODO: 입력 필드 초기화
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Delete post failed:', error);
    }
}

// ============================================================================
// 과제 4: 안전한 게시글 삭제
// ============================================================================

async function deletePost2() {
    const postId = document.getElementById('delete-post-id-2').value.trim();
    const statusEl = document.getElementById('delete-status-2');
    const resultEl = document.getElementById('delete-result-2');
    
    if (!postId) {
        showStatus(statusEl, '삭제할 게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '게시글 존재 여부를 확인하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        // TODO: 1단계 - GET 요청으로 게시글 존재 확인
        // 힌트: const response = await fetch(API_BASE_URL + `/posts/${postId}`);
        
        // TODO: 404 에러인 경우 처리
        // 힌트: if (response.status === 404) { ... }
        
        // TODO: 응답 데이터 파싱
        // 힌트: const post = await response.json();
        
        // TODO: 2단계 - 게시글 정보와 함께 삭제 확인
        // 힌트: const confirmMessage = `제목: ${post.title}\n정말 삭제하시겠습니까?`;
        
        showStatus(statusEl, '게시글을 안전하게 삭제하는 중...', 'loading');
        
        // TODO: 3단계 - 실제 DELETE 요청
        
        showStatus(statusEl, '게시글이 안전하게 삭제되었습니다!', 'success');
        
        // TODO: 삭제된 게시글 정보와 함께 결과 표시
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Safe delete failed:', error);
    }
}

// ============================================================================
// 도전 과제: 종합 실습 - 완전한 게시판 구현
// ============================================================================

// 게시글 목록 조회
async function loadChallengeList() {
    const listEl = document.getElementById('challenge-list');
    const statusEl = document.getElementById('challenge-status');
    
    try {
        showStatus(statusEl, '게시글 목록을 불러오는 중...', 'loading');
        
        // TODO: GET 요청으로 게시글 목록 조회
        // 힌트: fetch(API_BASE_URL + '/posts?_limit=5&_sort=id&_order=desc')
        
        // TODO: 응답 데이터 파싱
        
        // TODO: 게시글 목록을 HTML로 렌더링
        // 힌트: 
        // listEl.innerHTML = posts.map(post => `
        //     <div class="challenge-item">
        //         <h6>${post.title}</h6>
        //         <p>${post.body}</p>
        //         <div class="item-actions">
        //             <button onclick="deleteChallengePost(${post.id})">삭제</button>
        //         </div>
        //     </div>
        // `).join('');
        
        hideStatus(statusEl);
        
    } catch (error) {
        showStatus(statusEl, `목록 로드 실패: ${error.message}`, 'error');
        listEl.innerHTML = '<p>게시글을 불러올 수 없습니다.</p>';
    }
}

// 새 게시글 작성
async function createChallengePost() {
    const title = document.getElementById('challenge-title').value.trim();
    const body = document.getElementById('challenge-body').value.trim();
    const userId = document.getElementById('challenge-user-id').value.trim();
    const statusEl = document.getElementById('challenge-status');
    
    // TODO: 입력값 검증
    
    try {
        showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
        
        // TODO: POST 요청 구현
        
        showStatus(statusEl, '게시글이 작성되었습니다!', 'success');
        
        // TODO: 폼 초기화
        
        // TODO: 목록 새로고침
        // 힌트: loadChallengeList();
        
        // 성공 메시지 자동 숨김
        setTimeout(() => hideStatus(statusEl), 3000);
        
    } catch (error) {
        showStatus(statusEl, `작성 실패: ${error.message}`, 'error');
    }
}

// 게시글 삭제 (전역 함수로 선언)
async function deleteChallengePost(postId) {
    const statusEl = document.getElementById('challenge-status');
    
    if (!confirm('이 게시글을 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
        
        // TODO: DELETE 요청 구현
        
        showStatus(statusEl, '게시글이 삭제되었습니다!', 'success');
        
        // TODO: 목록 새로고침
        
        // 성공 메시지 자동 숨김
        setTimeout(() => hideStatus(statusEl), 3000);
        
    } catch (error) {
        showStatus(statusEl, `삭제 실패: ${error.message}`, 'error');
    }
}

// ============================================================================
// 이벤트 리스너 등록 및 초기화
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 REST API POST & DELETE 실습 페이지가 로드되었습니다!');
    console.log('💡 할 일:');
    console.log('1. JSON Server 실행: json-server --watch data/db.json --port 3001');
    console.log('2. TODO 주석을 찾아서 코드를 완성해보세요!');
    console.log('3. 막히면 example.html을 참고하세요.');
    
    // 이벤트 리스너 등록
    
    // 서버 상태 확인
    document.getElementById('check-server')?.addEventListener('click', checkServerStatus);
    
    // 과제 1: 기본 POST
    document.getElementById('create-post-1')?.addEventListener('click', createPost1);
    
    // 과제 2: 검증 포함 POST
    document.getElementById('create-post-2')?.addEventListener('click', createPost2);
    
    // 과제 3: 기본 DELETE
    document.getElementById('delete-post-1')?.addEventListener('click', deletePost1);
    
    // 과제 4: 안전한 DELETE
    document.getElementById('delete-post-2')?.addEventListener('click', deletePost2);
    
    // 도전 과제
    document.getElementById('challenge-create')?.addEventListener('click', createChallengePost);
    document.getElementById('challenge-refresh')?.addEventListener('click', loadChallengeList);
    
    // 엔터 키 이벤트 처리
    const inputElements = [
        'post-user-id-1',
        'post-user-id-2', 
        'delete-post-id-1',
        'delete-post-id-2',
        'challenge-user-id'
    ];
    
    inputElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    // 해당 섹션의 버튼 찾아서 클릭
                    const button = element.closest('.test__area, .challenge-board').querySelector('.btn');
                    if (button) button.click();
                }
            });
        }
    });
    
    // 초기 데이터 로드
    checkServerStatus();
    loadChallengeList();
});

// 전역 함수로 노출 (HTML에서 호출용)
window.deleteChallengePost = deleteChallengePost;

// ============================================================================
// 학습 가이드 및 힌트
// ============================================================================

/*
🎯 학습 목표:
1. fetch API와 async/await 문법 익히기
2. HTTP 메서드 (POST, DELETE) 이해하기
3. JSON 데이터 형태 처리하기
4. 에러 처리 및 사용자 피드백 구현하기
5. 실무에서 사용하는 API 연동 패턴 익히기

📝 완성해야 할 TODO 목록:
□ showStatus() 함수 구현
□ hideStatus() 함수 구현
□ validateInput() 함수 구현
□ createPost1() 함수의 POST 요청 구현
□ createPost2() 함수의 검증 로직과 POST 요청 구현
□ deletePost1() 함수의 DELETE 요청 구현
□ deletePost2() 함수의 GET + DELETE 연속 요청 구현
□ loadChallengeList() 함수의 GET 요청 구현
□ createChallengePost() 함수 구현
□ deleteChallengePost() 함수 구현

🔧 디버깅 팁:
- 브라우저 개발자 도구 (F12) → Network 탭에서 HTTP 요청 확인
- Console 탭에서 에러 메시지 확인
- JSON Server 터미널에서 요청 로그 확인

🚀 추가 도전 과제:
- 로딩 스피너 애니메이션 추가
- 토스트 메시지 구현
- 페이지네이션 구현
- 검색 기능 추가
- 실시간 업데이트 (WebSocket)

📚 참고 자료:
- MDN fetch API: https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
- JSON Server: https://github.com/typicode/json-server
- async/await: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
*/