// ============================================================================
// REST API POST & DELETE 실습 - JavaScript 구현
// 10개 실습 과제 (example.html과 1:1 매칭)
// ============================================================================

// API 기본 설정
const API_BASE_URL = 'http://localhost:3001';

// 전역 상태 관리
let autoRefreshInterval = null;
let isAutoRefreshing = false;

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
    // 힌트: element.className = `status status--${type}`;
    //      element.textContent = message;
    
}

/**
 * 상태 메시지를 숨기는 함수
 * @param {HTMLElement} element - 숨길 요소
 */
function hideStatus(element) {
    // TODO: 구현해보세요!
    // 힌트: element.className = 'status status--hidden';
    
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
    // if (!title || title.trim().length < 5) {
    //     errors.push('제목은 5글자 이상이어야 합니다.');
    // }
    // if (!body || body.trim().length < 10) {
    //     errors.push('내용은 10글자 이상이어야 합니다.');
    // }
    // if (!userId || userId < 1 || userId > 10) {
    //     errors.push('유효한 작성자를 선택해주세요.');
    // }
    
    return errors;
}

/**
 * 시간 포맷팅 함수
 * @param {Date} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜 문자열
 */
function formatTime(date) {
    // TODO: 구현해보세요!
    // 힌트: return new Date(date).toLocaleString('ko-KR');
    
}

// ============================================================================
// 서버 상태 확인
// ============================================================================

async function checkServerStatus() {
    const statusEl = document.getElementById('server-status');
    
    try {
        showStatus(statusEl, 'JSON Server 연결을 확인하는 중...', 'loading');
        
        // TODO: API_BASE_URL/posts로 요청을 보내서 서버 상태 확인
        // 힌트: const response = await fetch(API_BASE_URL + '/posts');
        //      if (!response.ok) throw new Error('서버 응답 오류');
        
        showStatus(statusEl, '✅ JSON Server가 정상적으로 실행 중입니다!', 'success');
        
    } catch (error) {
        showStatus(statusEl, '❌ JSON Server에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.', 'error');
        console.error('Server check failed:', error);
    }
}

// ============================================================================
// 실습 1: 기본 게시글 작성 (POST)
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
        // 힌트: if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        // TODO: 응답 데이터를 JSON으로 파싱
        // 힌트: const newPost = await response.json();
        
        showStatus(statusEl, '게시글이 성공적으로 작성되었습니다!', 'success');
        
        // TODO: 결과를 화면에 표시
        // 힌트: 
        // resultEl.innerHTML = `
        //     <div class="result-success">
        //         <h4>✅ 작성된 게시글</h4>
        //         <p><strong>ID:</strong> ${newPost.id}</p>
        //         <p><strong>제목:</strong> ${newPost.title}</p>
        //         <p><strong>내용:</strong> ${newPost.body}</p>
        //         <p><strong>작성자 ID:</strong> ${newPost.userId}</p>
        //     </div>
        // `;
        
        // TODO: 입력 필드 초기화
        // 힌트: document.getElementById('post-title-1').value = '';
        
        // 통계 업데이트
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Create post failed:', error);
    }
}

// ============================================================================
// 실습 2: 유효성 검증 포함 게시글 작성
// ============================================================================

async function createPost2() {
    const title = document.getElementById('post-title-2').value.trim();
    const body = document.getElementById('post-body-2').value.trim();
    const userId = document.getElementById('post-user-id-2').value;
    const statusEl = document.getElementById('post-status-2');
    const resultEl = document.getElementById('post-result-2');
    
    // TODO: validateInput 함수를 사용하여 입력값 검증
    // 힌트: const errors = validateInput(title, body, userId);
    
    // TODO: 검증 실패 시 에러 메시지 표시 후 return
    // 힌트: 
    // if (errors.length > 0) {
    //     showStatus(statusEl, `검증 실패: ${errors.join(', ')}`, 'error');
    //     return;
    // }
    
    showStatus(statusEl, '사용자 존재 확인 중...', 'loading');

    try {
        // TODO: 먼저 사용자가 존재하는지 확인
        // 힌트: const userResponse = await fetch(API_BASE_URL + `/users/${userId}`);
        //      if (!userResponse.ok) throw new Error('존재하지 않는 사용자입니다.');
        //      const userData = await userResponse.json();
        
        showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
        
        // TODO: POST 요청 구현 (실습 1과 동일)
        
        showStatus(statusEl, '유효성 검증 완료 후 게시글이 작성되었습니다!', 'success');
        
        // TODO: 검증된 데이터 정보와 함께 결과 표시
        // 힌트: 사용자 정보(userData.name, userData.email, userData.company.name)도 함께 표시
        
        // TODO: 필드 초기화
        
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Create post with validation failed:', error);
    }
}

// ============================================================================
// 실습 3: 여러 게시글 한번에 작성 (배치 처리)
// ============================================================================

async function createBatchPosts() {
    const batchData = document.getElementById('batch-posts').value.trim();
    const statusEl = document.getElementById('batch-status');
    const resultEl = document.getElementById('batch-result');
    
    if (!batchData) {
        showStatus(statusEl, '게시글 데이터를 입력해주세요.', 'error');
        return;
    }
    
    // TODO: 데이터 파싱
    // 힌트:
    // const lines = batchData.split('\n').filter(line => line.trim());
    // const posts = [];
    // 
    // for (let i = 0; i < lines.length; i++) {
    //     const parts = lines[i].split('|');
    //     if (parts.length !== 3) {
    //         showStatus(statusEl, `${i + 1}번째 줄 형식이 올바르지 않습니다.`, 'error');
    //         return;
    //     }
    //     
    //     const [title, body, userId] = parts.map(part => part.trim());
    //     const errors = validateInput(title, body, userId);
    //     if (errors.length > 0) {
    //         showStatus(statusEl, `${i + 1}번째 줄 오류: ${errors.join(', ')}`, 'error');
    //         return;
    //     }
    //     
    //     posts.push({ title, body, userId: parseInt(userId) });
    // }
    
    showStatus(statusEl, `여러 게시글을 동시에 작성하는 중...`, 'loading');
    resultEl.innerHTML = '';
    
    try {
        const startTime = Date.now();
        
        // TODO: Promise.all로 병렬 처리
        // 힌트:
        // const createPost = (post) => fetch(API_BASE_URL + '/posts', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(post)
        // }).then(response => response.json());
        // 
        // const results = await Promise.all(posts.map(post => createPost(post)));
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // TODO: 결과 표시
        // 힌트: 작성된 게시글 개수, 처리 시간, 평균 처리 시간, 생성된 게시글 ID 목록 표시
        
        document.getElementById('batch-posts').value = '';
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Batch create failed:', error);
    }
}

// ============================================================================
// 실습 4: 기본 게시글 삭제 (DELETE)
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
    // 힌트: if (!confirm(`정말로 게시글 ${postId}번을 삭제하시겠습니까?`)) return;
    
    showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        // TODO: DELETE 요청을 구현해보세요!
        // 힌트:
        // const response = await fetch(API_BASE_URL + `/posts/${postId}`, {
        //     method: 'DELETE'
        // });
        // 
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        
        showStatus(statusEl, '게시글이 성공적으로 삭제되었습니다!', 'success');
        
        // TODO: 삭제 결과 표시
        // 힌트:
        // resultEl.innerHTML = `
        //     <div class="result-delete">
        //         <h4>🗑️ 삭제 완료</h4>
        //         <p>게시글 ID ${postId}번이 삭제되었습니다.</p>
        //         <p><small>삭제 시간: ${formatTime(new Date())}</small></p>
        //     </div>
        // `;
        
        // TODO: 입력 필드 초기화
        
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Delete post failed:', error);
    }
}

// ============================================================================
// 실습 5: 안전한 게시글 삭제 (존재 확인 후 삭제)
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
        // 힌트: 
        // if (response.status === 404) {
        //     showStatus(statusEl, `게시글 ID ${postId}번이 존재하지 않습니다.`, 'error');
        //     resultEl.innerHTML = `<div class="result-error">...</div>`;
        //     return;
        // }
        
        // TODO: 응답 데이터 파싱
        // 힌트: const post = await response.json();
        
        // TODO: 2단계 - 게시글 정보와 함께 삭제 확인
        // 힌트: 
        // const confirmMessage = `다음 게시글을 삭제하시겠습니까?\n\n제목: ${post.title}\n작성자 ID: ${post.userId}`;
        // if (!confirm(confirmMessage)) return;
        
        showStatus(statusEl, '게시글을 안전하게 삭제하는 중...', 'loading');
        
        // TODO: 3단계 - 실제 DELETE 요청
        
        showStatus(statusEl, '게시글이 안전하게 삭제되었습니다!', 'success');
        
        // TODO: 삭제된 게시글 정보와 함께 결과 표시
        
        document.getElementById('delete-post-id-2').value = '';
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Safe delete failed:', error);
    }
}

// ============================================================================
// 실습 6: 여러 게시글 한번에 삭제
// ============================================================================

async function loadPostsForDelete() {
    const statusEl = document.getElementById('delete-status-3');
    const listEl = document.getElementById('posts-list');
    const deleteBtn = document.getElementById('delete-selected-posts');
    
    showStatus(statusEl, '게시글 목록을 불러오는 중...', 'loading');
    
    try {
        // TODO: GET 요청으로 게시글 목록 조회 (최근 10개)
        // 힌트: const response = await fetch(API_BASE_URL + '/posts?_limit=10&_sort=id&_order=desc');
        //      const posts = await response.json();
        
        // TODO: 체크박스가 포함된 게시글 목록 HTML 생성
        // 힌트:
        // listEl.innerHTML = `
        //     <div class="posts-list-header">
        //         <label><input type="checkbox" id="select-all-posts"> 전체 선택</label>
        //     </div>
        //     <div class="posts-list-items">
        //         ${posts.map(post => `
        //             <label class="post-item">
        //                 <input type="checkbox" class="post-checkbox" data-id="${post.id}">
        //                 <div class="post-info">
        //                     <strong>ID ${post.id}:</strong> ${post.title}
        //                     <div class="post-meta">작성자 ID: ${post.userId}</div>
        //                 </div>
        //             </label>
        //         `).join('')}
        //     </div>
        // `;
        
        // TODO: 전체 선택 기능 이벤트 리스너 등록
        // TODO: 개별 체크박스 이벤트 리스너 등록
        // TODO: deleteBtn 활성화/비활성화 로직
        
        showStatus(statusEl, `게시글 목록을 불러왔습니다.`, 'success');
        deleteBtn.disabled = true;
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Load posts failed:', error);
    }
}

function updateDeleteButton() {
    // TODO: 선택된 체크박스 개수에 따라 버튼 상태 업데이트
    // 힌트:
    // const selectedPosts = document.querySelectorAll('.post-checkbox:checked');
    // const deleteBtn = document.getElementById('delete-selected-posts');
    // deleteBtn.disabled = selectedPosts.length === 0;
    // deleteBtn.textContent = selectedPosts.length > 0 
    //     ? `선택된 ${selectedPosts.length}개 게시글 삭제` 
    //     : '선택된 게시글 삭제';
}

async function deleteSelectedPosts() {
    const selectedPosts = document.querySelectorAll('.post-checkbox:checked');
    const statusEl = document.getElementById('delete-status-3');
    const resultEl = document.getElementById('delete-result-3');
    
    if (selectedPosts.length === 0) {
        showStatus(statusEl, '삭제할 게시글을 선택해주세요.', 'error');
        return;
    }
    
    const postIds = Array.from(selectedPosts).map(cb => cb.dataset.id);
    
    if (!confirm(`선택된 ${postIds.length}개의 게시글을 삭제하시겠습니까?`)) {
        return;
    }
    
    showStatus(statusEl, `${postIds.length}개의 게시글을 삭제하는 중...`, 'loading');
    
    try {
        const startTime = Date.now();
        
        // TODO: 병렬로 삭제 처리
        // 힌트:
        // const deletePost = (id) => fetch(API_BASE_URL + `/posts/${id}`, { method: 'DELETE' });
        // await Promise.all(postIds.map(id => deletePost(id)));
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        showStatus(statusEl, `${postIds.length}개의 게시글이 성공적으로 삭제되었습니다!`, 'success');
        
        // TODO: 삭제 결과 표시
        
        // 목록 새로고침
        setTimeout(() => loadPostsForDelete(), 1000);
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Batch delete failed:', error);
    }
}

// ============================================================================
// 실습 7: 사용자별 게시글 모두 삭제
// ============================================================================

async function deleteUserPosts() {
    const userId = document.getElementById('delete-user-id').value;
    const statusEl = document.getElementById('delete-user-status');
    const resultEl = document.getElementById('delete-user-result');
    
    if (!userId) {
        showStatus(statusEl, '사용자를 선택해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '해당 사용자의 게시글을 조회하는 중...', 'loading');
    
    try {
        // TODO: 사용자별 게시글 조회
        // 힌트: const postsResponse = await fetch(API_BASE_URL + `/posts?userId=${userId}`);
        //      const posts = await postsResponse.json();
        
        // TODO: 게시글이 없는 경우 처리
        // if (posts.length === 0) {
        //     showStatus(statusEl, '해당 사용자가 작성한 게시글이 없습니다.', 'info');
        //     return;
        // }
        
        // TODO: 사용자 정보 조회
        // 힌트: const userResponse = await fetch(API_BASE_URL + `/users/${userId}`);
        //      const user = await userResponse.json();
        
        // TODO: 삭제 확인
        // if (!confirm(`${user.name}님이 작성한 ${posts.length}개의 게시글을 모두 삭제하시겠습니까?`)) return;
        
        showStatus(statusEl, `게시글들을 삭제하는 중...`, 'loading');
        
        const startTime = Date.now();
        
        // TODO: 병렬 삭제 처리
        // 힌트: await Promise.all(posts.map(post => fetch(API_BASE_URL + `/posts/${post.id}`, { method: 'DELETE' })));
        
        const endTime = Date.now();
        
        showStatus(statusEl, `사용자의 모든 게시글이 삭제되었습니다!`, 'success');
        
        // TODO: 삭제 결과 표시 (사용자 정보, 삭제된 게시글 수, 처리 시간 등)
        
        document.getElementById('delete-user-id').value = '';
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `오류가 발생했습니다: ${error.message}`, 'error');
        console.error('Delete user posts failed:', error);
    }
}

// ============================================================================
// 실습 8: 다양한 에러 상황 처리
// ============================================================================

async function testNetworkError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '네트워크 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // TODO: 존재하지 않는 URL로 요청
        // 힌트: await fetch('http://localhost:9999/nonexistent');
        
    } catch (error) {
        showStatus(statusEl, '네트워크 에러가 발생했습니다.', 'error');
        
        // TODO: 에러 정보와 일반적인 원인 표시
        // 힌트:
        // resultEl.innerHTML = `
        //     <div class="result-error">
        //         <h4>🌐 네트워크 에러 시뮬레이션</h4>
        //         <p><strong>에러 타입:</strong> ${error.name}</p>
        //         <p><strong>에러 메시지:</strong> ${error.message}</p>
        //         <p><strong>일반적인 원인:</strong></p>
        //         <ul>
        //             <li>인터넷 연결 끊어짐</li>
        //             <li>서버가 실행되지 않음</li>
        //             <li>방화벽 차단</li>
        //             <li>잘못된 URL</li>
        //         </ul>
        //     </div>
        // `;
    }
}

async function testServerError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '서버 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // TODO: 잘못된 HTTP 메서드나 데이터로 요청하여 서버 에러 유발
        // 힌트: 잘못된 엔드포인트나 메서드 사용
        
    } catch (error) {
        showStatus(statusEl, '서버 에러가 발생했습니다.', 'error');
        
        // TODO: 서버 에러 정보 표시
        
    }
}

function testValidationError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    // TODO: 유효성 검증 에러 시뮬레이션
    // 힌트: const errors = validateInput('', 'test', '999');
    
    showStatus(statusEl, '유효성 검증 에러가 발생했습니다.', 'error');
    
    // TODO: 검증 실패 항목들 표시
}

async function testNotFoundError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '404 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // TODO: 존재하지 않는 게시글 조회
        // 힌트: const response = await fetch(API_BASE_URL + '/posts/99999');
        
    } catch (error) {
        showStatus(statusEl, '404 에러가 발생했습니다.', 'error');
        
        // TODO: 404 에러 처리 방법 표시
    }
}

// ============================================================================
// 실습 9: 실시간 상태 모니터링
// ============================================================================

async function updateStats() {
    try {
        // TODO: 게시글과 사용자 정보 조회
        // 힌트: const [postsResponse, usersResponse] = await Promise.all([
        //     fetch(API_BASE_URL + '/posts'),
        //     fetch(API_BASE_URL + '/users')
        // ]);
        // const posts = await postsResponse.json();
        // const users = await usersResponse.json();
        
        // TODO: 통계 정보 업데이트
        // 힌트:
        // document.getElementById('total-posts').textContent = posts.length;
        // if (posts.length > 0) {
        //     const latestPost = posts[posts.length - 1];
        //     document.getElementById('latest-post').textContent = `ID ${latestPost.id}: ${latestPost.title.substring(0, 20)}...`;
        // }
        // document.getElementById('last-activity').textContent = formatTime(new Date());
        
        const statusEl = document.getElementById('stats-status');
        showStatus(statusEl, '통계가 업데이트되었습니다.', 'success');
        setTimeout(() => hideStatus(statusEl), 2000);
        
    } catch (error) {
        console.error('Stats update failed:', error);
    }
}

function toggleAutoRefresh() {
    const btn = document.getElementById('toggle-auto-refresh');
    
    if (isAutoRefreshing) {
        // TODO: 자동 새로고침 끄기
        // 힌트:
        // clearInterval(autoRefreshInterval);
        // isAutoRefreshing = false;
        // btn.textContent = '🔄 자동 새로고침 켜기';
        // btn.className = 'btn btn--small';
        
    } else {
        // TODO: 자동 새로고침 켜기 (5초 간격)
        // 힌트:
        // autoRefreshInterval = setInterval(updateStats, 5000);
        // isAutoRefreshing = true;
        // btn.textContent = '🔄 자동 새로고침 끄기';
        // btn.className = 'btn btn--small btn--active';
        
    }
}

// ============================================================================
// 실습 10: 종합 실습 - 완전한 게시판 구현
// ============================================================================

async function loadChallengeList() {
    const listEl = document.getElementById('challenge-list');
    const statusEl = document.getElementById('challenge-status');
    
    try {
        showStatus(statusEl, '게시글 목록을 불러오는 중...', 'loading');
        
        // TODO: GET 요청으로 게시글 목록 조회 (최신 5개)
        // 힌트: const response = await fetch(API_BASE_URL + '/posts?_limit=5&_sort=id&_order=desc');
        //      const posts = await response.json();
        
        // TODO: 사용자 정보도 함께 조회
        // 힌트: const usersResponse = await fetch(API_BASE_URL + '/users');
        //      const users = await usersResponse.json();
        
        // TODO: 게시글 목록을 HTML로 렌더링
        // 힌트: 
        // listEl.innerHTML = posts.map(post => {
        //     const user = users.find(u => u.id == post.userId);
        //     return `
        //         <div class="challenge-item" data-id="${post.id}">
        //             <h6>${post.title}</h6>
        //             <p>${post.body}</p>
        //             <div class="item-actions">
        //                 <span class="post-author">작성자: ${user ? user.name : '알 수 없음'}</span>
        //                 <button onclick="deleteChallengePost(${post.id})">삭제</button>
        //             </div>
        //         </div>
        //     `;
        // }).join('');
        
        hideStatus(statusEl);
        
    } catch (error) {
        showStatus(statusEl, `목록 로드 실패: ${error.message}`, 'error');
        listEl.innerHTML = '<p>게시글을 불러올 수 없습니다.</p>';
    }
}

async function createChallengePost() {
    const title = document.getElementById('challenge-title').value.trim();
    const body = document.getElementById('challenge-body').value.trim();
    const userId = document.getElementById('challenge-author').value;
    const statusEl = document.getElementById('challenge-status');
    
    // TODO: 입력값 검증
    // 힌트: const errors = validateInput(title, body, userId);
    //      if (errors.length > 0) {
    //          showStatus(statusEl, `입력 오류: ${errors.join(', ')}`, 'error');
    //          return;
    //      }
    
    try {
        showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
        
        // TODO: POST 요청 구현
        // 힌트: const response = await fetch(API_BASE_URL + '/posts', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title, body, userId: parseInt(userId) })
        // });
        // const newPost = await response.json();
        
        showStatus(statusEl, '게시글이 작성되었습니다!', 'success');
        
        // TODO: 폼 초기화
        // 힌트: document.getElementById('challenge-title').value = '';
        //      document.getElementById('challenge-body').value = '';
        //      document.getElementById('challenge-author').value = '';
        
        // TODO: 목록 새로고침
        // 힌트: loadChallengeList();
        
        setTimeout(() => hideStatus(statusEl), 3000);
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `작성 실패: ${error.message}`, 'error');
    }
}

async function deleteChallengePost(postId) {
    const statusEl = document.getElementById('challenge-status');
    
    if (!confirm('이 게시글을 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
        
        // TODO: DELETE 요청 구현
        // 힌트: const response = await fetch(API_BASE_URL + `/posts/${postId}`, {
        //     method: 'DELETE'
        // });
        // if (!response.ok) throw new Error('삭제 실패');
        
        showStatus(statusEl, '게시글이 삭제되었습니다!', 'success');
        
        // TODO: 목록 새로고침
        // 힌트: loadChallengeList();
        
        setTimeout(() => hideStatus(statusEl), 3000);
        updateStats();
        
    } catch (error) {
        showStatus(statusEl, `삭제 실패: ${error.message}`, 'error');
    }
}

// ============================================================================
// 초기화 및 이벤트 리스너
// ============================================================================

async function initializeSelects() {
    try {
        // TODO: 사용자 목록 조회
        // 힌트: const response = await fetch(API_BASE_URL + '/users');
        //      const users = await response.json();
        
        // TODO: 사용자 선택 박스들 초기화
        // 힌트: 
        // const selects = ['post-user-id-2', 'delete-user-id', 'challenge-author'];
        // selects.forEach(selectId => {
        //     const select = document.getElementById(selectId);
        //     if (select) {
        //         select.innerHTML = '<option value="">선택하세요</option>' +
        //             users.map(user => 
        //                 `<option value="${user.id}">${user.name} (${user.email})</option>`
        //             ).join('');
        //     }
        // });
        
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 REST API POST & DELETE 실습 페이지가 로드되었습니다!');
    console.log('💡 할 일:');
    console.log('1. JSON Server 실행: json-server --watch data/db.json --port 3001');
    console.log('2. TODO 주석을 찾아서 코드를 완성해보세요!');
    console.log('3. 막히면 example.html을 참고하세요.');
    console.log('');
    console.log('📋 실습 과제 목록 (example.html과 1:1 매칭):');
    console.log('1. ✏️  기본 게시글 작성 (POST)');
    console.log('2. ✅ 유효성 검증 포함 게시글 작성');
    console.log('3. 🚀 여러 게시글 한번에 작성 (배치 처리)');
    console.log('4. 🗑️  기본 게시글 삭제 (DELETE)');
    console.log('5. 🛡️  안전한 게시글 삭제 (존재 확인 후 삭제)');
    console.log('6. 📋 여러 게시글 한번에 삭제');
    console.log('7. 👤 사용자별 게시글 모두 삭제');
    console.log('8. ⚠️  다양한 에러 상황 처리');
    console.log('9. 📊 실시간 상태 모니터링');
    console.log('10. 🎯 종합 실습 - 완전한 게시판 구현');
    
    // 이벤트 리스너 등록
    document.getElementById('check-server')?.addEventListener('click', checkServerStatus);
    
    document.getElementById('create-post-1')?.addEventListener('click', createPost1);
    document.getElementById('create-post-2')?.addEventListener('click', createPost2);
    document.getElementById('create-batch-posts')?.addEventListener('click', createBatchPosts);
    document.getElementById('delete-post-1')?.addEventListener('click', deletePost1);
    document.getElementById('delete-post-2')?.addEventListener('click', deletePost2);
    
    document.getElementById('load-posts-for-delete')?.addEventListener('click', loadPostsForDelete);
    document.getElementById('delete-selected-posts')?.addEventListener('click', deleteSelectedPosts);
    document.getElementById('delete-user-posts')?.addEventListener('click', deleteUserPosts);
    
    document.getElementById('test-network-error')?.addEventListener('click', testNetworkError);
    document.getElementById('test-server-error')?.addEventListener('click', testServerError);
    document.getElementById('test-validation-error')?.addEventListener('click', testValidationError);
    document.getElementById('test-not-found-error')?.addEventListener('click', testNotFoundError);
    
    document.getElementById('refresh-stats')?.addEventListener('click', updateStats);
    document.getElementById('toggle-auto-refresh')?.addEventListener('click', toggleAutoRefresh);
    
    document.getElementById('challenge-create')?.addEventListener('click', createChallengePost);
    document.getElementById('challenge-refresh')?.addEventListener('click', loadChallengeList);
    
    // 엔터 키 이벤트 처리
    const inputElements = [
        'post-user-id-1', 'post-user-id-2', 'delete-post-id-1', 'delete-post-id-2',
        'challenge-title', 'challenge-body'
    ];
    
    inputElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const button = element.closest('.test__area, .challenge-board').querySelector('.btn');
                    if (button && !button.disabled) button.click();
                }
            });
        }
    });
    
    // 초기 데이터 로드
    checkServerStatus();
    initializeSelects();
    updateStats();
    loadChallengeList();
});

// 전역 함수로 노출
window.deleteChallengePost = deleteChallengePost;

/*
🎯 학습 목표:
1. fetch API와 async/await 문법 익히기
2. HTTP 메서드 (POST, DELETE) 이해하기
3. JSON 데이터 형태 처리하기
4. 에러 처리 및 사용자 피드백 구현하기
5. 실무에서 사용하는 API 연동 패턴 익히기

📝 완성해야 할 TODO 목록 (총 50개 이상의 학습 과제)

🎉 완료 후 성취감:
모든 TODO를 완성하면 실무에서 바로 사용할 수 있는 
REST API 연동 실력을 갖게 됩니다!
*/