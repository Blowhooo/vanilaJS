// API 기본 URL - json-server용
const API_BASE_URL = 'http://localhost:3001';

// 공통 상태 관리
let autoRefreshInterval = null;
let isAutoRefreshing = false;

// =============================================================================
// 유틸리티 함수들
// =============================================================================

// 상태 표시 함수들
function showStatus(element, message, type = 'loading') {
    if (!element) return;
    element.className = `status status--${type}`;
    element.textContent = message;
}

function hideStatus(element) {
    if (!element) return;
    element.className = 'status status--hidden';
}

// 시간 포맷팅
function formatTime(date) {
    return new Date(date).toLocaleString('ko-KR');
}

// 로딩 애니메이션
function showLoading(element) {
    if (!element) return;
    element.innerHTML = '<div class="loading">로딩 중...</div>';
}

// 에러 핸들링
function handleError(error, statusElement) {
    console.error('API Error:', error);
    let message = '알 수 없는 오류가 발생했습니다.';
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        message = '네트워크 연결을 확인해주세요. JSON Server가 실행 중인지 확인하세요.';
    } else if (error.message.includes('404')) {
        message = '요청한 리소스를 찾을 수 없습니다.';
    } else if (error.message.includes('500')) {
        message = '서버 내부 오류가 발생했습니다.';
    } else if (error.message) {
        message = error.message;
    }
    
    showStatus(statusElement, `오류: ${message}`, 'error');
}

// 유효성 검증
function validatePost(title, body, userId) {
    const errors = [];
    
    if (!title || title.trim().length < 5) {
        errors.push('제목은 5글자 이상이어야 합니다.');
    }
    
    if (!body || body.trim().length < 10) {
        errors.push('내용은 10글자 이상이어야 합니다.');
    }
    
    if (!userId || userId < 1 || userId > 10) {
        errors.push('유효한 작성자를 선택해주세요.');
    }
    
    return errors;
}

// =============================================================================
// API 호출 함수들
// =============================================================================

// 사용자 목록 가져오기
async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 게시글 목록 가져오기
async function fetchPosts(limit = null) {
    let url = `${API_BASE_URL}/posts`;
    if (limit) {
        url += `?_limit=${limit}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 특정 게시글 가져오기
async function fetchPost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 게시글 생성
async function createPost(postData) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 게시글 삭제
async function deletePost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}

// 사용자별 게시글 가져오기
async function fetchPostsByUser(userId) {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// =============================================================================
// 1. 기본 게시글 작성 (POST)
// =============================================================================

async function createPost1() {
    const title = document.getElementById('post-title-1').value.trim();
    const body = document.getElementById('post-body-1').value.trim();
    const userId = document.getElementById('post-user-id-1').value.trim();
    const statusEl = document.getElementById('create-status-1');
    const resultEl = document.getElementById('create-result-1');
    
    if (!title || !body || !userId) {
        showStatus(statusEl, '모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        const newPost = await createPost({
            title: title,
            body: body,
            userId: parseInt(userId)
        });
        
        showStatus(statusEl, '게시글이 성공적으로 작성되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>✅ 작성된 게시글</h4>
                <p><strong>ID:</strong> ${newPost.id}</p>
                <p><strong>제목:</strong> ${newPost.title}</p>
                <p><strong>내용:</strong> ${newPost.body}</p>
                <p><strong>작성자 ID:</strong> ${newPost.userId}</p>
                <p><small>작성 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        // 입력 필드 초기화
        document.getElementById('post-title-1').value = '';
        document.getElementById('post-body-1').value = '';
        document.getElementById('post-user-id-1').value = '';
        
        // 통계 업데이트
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 2. 유효성 검증 포함 게시글 작성
// =============================================================================

async function createPost2() {
    const title = document.getElementById('post-title-2').value.trim();
    const body = document.getElementById('post-body-2').value.trim();
    const userId = document.getElementById('post-user-id-2').value;
    const statusEl = document.getElementById('create-status-2');
    const resultEl = document.getElementById('create-result-2');
    
    // 유효성 검증
    const errors = validatePost(title, body, userId);
    if (errors.length > 0) {
        showStatus(statusEl, `검증 실패: ${errors.join(', ')}`, 'error');
        return;
    }
    
    showStatus(statusEl, '사용자 존재 확인 중...', 'loading');
    
    try {
        // 먼저 사용자가 존재하는지 확인
        const user = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!user.ok) {
            throw new Error('존재하지 않는 사용자입니다.');
        }
        const userData = await user.json();
        
        showStatus(statusEl, '게시글을 작성하는 중...', 'loading');
        
        const newPost = await createPost({
            title: title,
            body: body,
            userId: parseInt(userId)
        });
        
        showStatus(statusEl, '유효성 검증 완료 후 게시글이 작성되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>✅ 검증된 게시글 작성 완료</h4>
                <p><strong>ID:</strong> ${newPost.id}</p>
                <p><strong>제목:</strong> ${newPost.title} (${title.length}글자)</p>
                <p><strong>내용:</strong> ${newPost.body} (${body.length}글자)</p>
                <p><strong>작성자:</strong> ${userData.name} (${userData.email})</p>
                <p><strong>회사:</strong> ${userData.company.name}</p>
            </div>
        `;
        
        // 필드 초기화
        document.getElementById('post-title-2').value = '';
        document.getElementById('post-body-2').value = '';
        document.getElementById('post-user-id-2').value = '';
        
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 3. 여러 게시글 한번에 작성 (배치 처리)
// =============================================================================

async function createBatchPosts() {
    const batchData = document.getElementById('batch-posts').value.trim();
    const statusEl = document.getElementById('batch-status');
    const resultEl = document.getElementById('batch-result');
    
    if (!batchData) {
        showStatus(statusEl, '게시글 데이터를 입력해주세요.', 'error');
        return;
    }
    
    const lines = batchData.split('\n').filter(line => line.trim());
    const posts = [];
    
    // 데이터 파싱
    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split('|');
        if (parts.length !== 3) {
            showStatus(statusEl, `${i + 1}번째 줄 형식이 올바르지 않습니다. (제목|내용|작성자ID)`, 'error');
            return;
        }
        
        const [title, body, userId] = parts.map(part => part.trim());
        const errors = validatePost(title, body, userId);
        if (errors.length > 0) {
            showStatus(statusEl, `${i + 1}번째 줄 오류: ${errors.join(', ')}`, 'error');
            return;
        }
        
        posts.push({
            title: title,
            body: body,
            userId: parseInt(userId)
        });
    }
    
    showStatus(statusEl, `${posts.length}개의 게시글을 동시에 작성하는 중...`, 'loading');
    resultEl.innerHTML = '';
    
    try {
        const startTime = Date.now();
        
        // Promise.all로 병렬 처리
        const results = await Promise.all(
            posts.map(post => createPost(post))
        );
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        showStatus(statusEl, `${results.length}개의 게시글이 성공적으로 작성되었습니다! (${duration}ms)`, 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>🚀 배치 작성 완료</h4>
                <p><strong>작성된 게시글 수:</strong> ${results.length}개</p>
                <p><strong>처리 시간:</strong> ${duration}ms</p>
                <p><strong>평균 처리 시간:</strong> ${Math.round(duration / results.length)}ms/개</p>
                <div class="batch-results">
                    ${results.map(post => `
                        <div class="batch-item">
                            <strong>ID ${post.id}:</strong> ${post.title}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('batch-posts').value = '';
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 4. 기본 게시글 삭제 (DELETE)
// =============================================================================

async function deletePost1() {
    const postId = document.getElementById('delete-post-id-1').value.trim();
    const statusEl = document.getElementById('delete-status-1');
    const resultEl = document.getElementById('delete-result-1');
    
    if (!postId) {
        showStatus(statusEl, '삭제할 게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    if (!confirm(`정말로 게시글 ${postId}번을 삭제하시겠습니까?`)) {
        return;
    }
    
    showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        await deletePost(postId);
        
        showStatus(statusEl, '게시글이 성공적으로 삭제되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-delete">
                <h4>🗑️ 삭제 완료</h4>
                <p>게시글 ID ${postId}번이 삭제되었습니다.</p>
                <p><small>* JSON Server에서 실제로 삭제됩니다.</small></p>
                <p><small>삭제 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        document.getElementById('delete-post-id-1').value = '';
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 5. 안전한 게시글 삭제 (존재 확인 후 삭제)
// =============================================================================

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
        // 1단계: 게시글 존재 확인
        const post = await fetchPost(postId);
        
        // 2단계: 사용자 확인 및 상세 정보 표시
        const confirmMessage = `다음 게시글을 삭제하시겠습니까?\n\n제목: ${post.title}\n작성자 ID: ${post.userId}\n내용: ${post.body.substring(0, 50)}...`;
        
        if (!confirm(confirmMessage)) {
            showStatus(statusEl, '삭제가 취소되었습니다.', 'info');
            return;
        }
        
        showStatus(statusEl, '게시글을 안전하게 삭제하는 중...', 'loading');
        
        // 3단계: 실제 삭제
        await deletePost(postId);
        
        showStatus(statusEl, '게시글이 안전하게 삭제되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-delete">
                <h4>🛡️ 안전한 삭제 완료</h4>
                <p><strong>삭제된 게시글:</strong> ${post.title}</p>
                <p><strong>작성자 ID:</strong> ${post.userId}</p>
                <p><strong>프로세스:</strong> 존재 확인 → 사용자 확인 → 삭제 실행</p>
                <p><small>삭제 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        document.getElementById('delete-post-id-2').value = '';
        updateStats();
        
    } catch (error) {
        if (error.message.includes('404')) {
            showStatus(statusEl, `게시글 ID ${postId}번이 존재하지 않습니다.`, 'error');
            resultEl.innerHTML = `
                <div class="result-error">
                    <h4>❌ 게시글을 찾을 수 없음</h4>
                    <p>ID ${postId}번 게시글이 존재하지 않습니다.</p>
                    <p>이미 삭제되었거나 잘못된 ID일 수 있습니다.</p>
                </div>
            `;
        } else {
            handleError(error, statusEl);
        }
    }
}

// =============================================================================
// 6. 여러 게시글 한번에 삭제
// =============================================================================

async function loadPostsForDelete() {
    const statusEl = document.getElementById('delete-status-3');
    const listEl = document.getElementById('posts-list');
    const deleteBtn = document.getElementById('delete-selected-posts');
    
    showStatus(statusEl, '게시글 목록을 불러오는 중...', 'loading');
    
    try {
        const posts = await fetchPosts(10); // 최근 10개만
        
        listEl.innerHTML = `
            <div class="posts-list-header">
                <label>
                    <input type="checkbox" id="select-all-posts"> 전체 선택
                </label>
            </div>
            <div class="posts-list-items">
                ${posts.map(post => `
                    <label class="post-item">
                        <input type="checkbox" class="post-checkbox" data-id="${post.id}">
                        <div class="post-info">
                            <strong>ID ${post.id}:</strong> ${post.title}
                            <div class="post-meta">작성자 ID: ${post.userId}</div>
                        </div>
                    </label>
                `).join('')}
            </div>
        `;
        
        // 전체 선택 기능
        document.getElementById('select-all-posts').addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.post-checkbox');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
            updateDeleteButton();
        });
        
        // 개별 체크박스 이벤트
        document.querySelectorAll('.post-checkbox').forEach(cb => {
            cb.addEventListener('change', updateDeleteButton);
        });
        
        showStatus(statusEl, `${posts.length}개의 게시글을 불러왔습니다.`, 'success');
        deleteBtn.disabled = true;
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

function updateDeleteButton() {
    const selectedPosts = document.querySelectorAll('.post-checkbox:checked');
    const deleteBtn = document.getElementById('delete-selected-posts');
    deleteBtn.disabled = selectedPosts.length === 0;
    deleteBtn.textContent = selectedPosts.length > 0 
        ? `선택된 ${selectedPosts.length}개 게시글 삭제` 
        : '선택된 게시글 삭제';
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
        
        // 병렬로 삭제 처리
        await Promise.all(postIds.map(id => deletePost(id)));
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        showStatus(statusEl, `${postIds.length}개의 게시글이 성공적으로 삭제되었습니다!`, 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>🗑️ 일괄 삭제 완료</h4>
                <p><strong>삭제된 게시글:</strong> ${postIds.join(', ')}번</p>
                <p><strong>삭제 개수:</strong> ${postIds.length}개</p>
                <p><strong>처리 시간:</strong> ${duration}ms</p>
                <p><small>삭제 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        // 목록 새로고침
        setTimeout(() => {
            loadPostsForDelete();
        }, 1000);
        
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 7. 사용자별 게시글 모두 삭제
// =============================================================================

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
        const posts = await fetchPostsByUser(userId);
        
        if (posts.length === 0) {
            showStatus(statusEl, '해당 사용자가 작성한 게시글이 없습니다.', 'info');
            return;
        }
        
        const user = await fetch(`${API_BASE_URL}/users/${userId}`).then(r => r.json());
        
        if (!confirm(`${user.name}님이 작성한 ${posts.length}개의 게시글을 모두 삭제하시겠습니까?`)) {
            return;
        }
        
        showStatus(statusEl, `${posts.length}개의 게시글을 삭제하는 중...`, 'loading');
        
        const startTime = Date.now();
        await Promise.all(posts.map(post => deletePost(post.id)));
        const endTime = Date.now();
        
        showStatus(statusEl, `${user.name}님의 모든 게시글이 삭제되었습니다!`, 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>👤 사용자별 삭제 완료</h4>
                <p><strong>사용자:</strong> ${user.name} (${user.email})</p>
                <p><strong>삭제된 게시글 수:</strong> ${posts.length}개</p>
                <p><strong>처리 시간:</strong> ${endTime - startTime}ms</p>
                <p><strong>삭제된 게시글 ID:</strong> ${posts.map(p => p.id).join(', ')}</p>
            </div>
        `;
        
        document.getElementById('delete-user-id').value = '';
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 8. 에러 처리 시연
// =============================================================================

async function testNetworkError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '네트워크 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // 존재하지 않는 URL로 요청
        await fetch('http://localhost:9999/nonexistent');
    } catch (error) {
        showStatus(statusEl, '네트워크 에러가 발생했습니다.', 'error');
        resultEl.innerHTML = `
            <div class="result-error">
                <h4>🌐 네트워크 에러 시뮬레이션</h4>
                <p><strong>에러 타입:</strong> ${error.name}</p>
                <p><strong>에러 메시지:</strong> ${error.message}</p>
                <p><strong>일반적인 원인:</strong></p>
                <ul>
                    <li>인터넷 연결 끊어짐</li>
                    <li>서버가 실행되지 않음</li>
                    <li>방화벽 차단</li>
                    <li>잘못된 URL</li>
                </ul>
            </div>
        `;
    }
}

async function testServerError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '서버 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // 잘못된 HTTP 메서드로 요청
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ invalidField: 'test' })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        handleError(error, statusEl);
        resultEl.innerHTML = `
            <div class="result-error">
                <h4>🔧 서버 에러 시뮬레이션</h4>
                <p><strong>응답 상태:</strong> ${error.message}</p>
                <p><strong>일반적인 서버 에러들:</strong></p>
                <ul>
                    <li>400 Bad Request - 잘못된 요청</li>
                    <li>401 Unauthorized - 인증 필요</li>
                    <li>404 Not Found - 리소스 없음</li>
                    <li>500 Internal Server Error - 서버 내부 오류</li>
                </ul>
            </div>
        `;
    }
}

function testValidationError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    // 유효성 검증 에러 시뮬레이션
    const errors = validatePost('', 'test', '999');
    
    showStatus(statusEl, '유효성 검증 에러가 발생했습니다.', 'error');
    resultEl.innerHTML = `
        <div class="result-error">
            <h4>📝 유효성 검증 에러 시뮬레이션</h4>
            <p><strong>검증 실패 항목들:</strong></p>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
            <p><strong>클라이언트 측 유효성 검증의 중요성:</strong></p>
            <ul>
                <li>서버 부하 감소</li>
                <li>즉시 피드백 제공</li>
                <li>사용자 경험 향상</li>
                <li>네트워크 트래픽 절약</li>
            </ul>
        </div>
    `;
}

async function testNotFoundError() {
    const statusEl = document.getElementById('error-status');
    const resultEl = document.getElementById('error-result');
    
    showStatus(statusEl, '404 에러를 시뮬레이션하는 중...', 'loading');
    
    try {
        // 존재하지 않는 게시글 조회
        const response = await fetch(`${API_BASE_URL}/posts/99999`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: 게시글을 찾을 수 없습니다.`);
        }
    } catch (error) {
        handleError(error, statusEl);
        resultEl.innerHTML = `
            <div class="result-error">
                <h4>🔍 404 에러 시뮬레이션</h4>
                <p><strong>에러 상황:</strong> 존재하지 않는 게시글 조회</p>
                <p><strong>올바른 404 처리 방법:</strong></p>
                <ul>
                    <li>사용자에게 명확한 메시지 제공</li>
                    <li>대안 액션 제안 (목록으로 돌아가기 등)</li>
                    <li>검색 기능 제공</li>
                    <li>관련 콘텐츠 추천</li>
                </ul>
            </div>
        `;
    }
}

// =============================================================================
// 9. 실시간 상태 모니터링
// =============================================================================

async function updateStats() {
    try {
        const posts = await fetchPosts();
        const users = await fetchUsers();
        
        document.getElementById('total-posts').textContent = posts.length;
        
        if (posts.length > 0) {
            const latestPost = posts[posts.length - 1];
            document.getElementById('latest-post').textContent = `ID ${latestPost.id}: ${latestPost.title.substring(0, 20)}...`;
        }
        
        document.getElementById('last-activity').textContent = formatTime(new Date());
        
        showStatus(document.getElementById('stats-status'), '통계가 업데이트되었습니다.', 'success');
        setTimeout(() => hideStatus(document.getElementById('stats-status')), 2000);
        
    } catch (error) {
        console.error('Stats update failed:', error);
    }
}

function toggleAutoRefresh() {
    const btn = document.getElementById('toggle-auto-refresh');
    
    if (isAutoRefreshing) {
        clearInterval(autoRefreshInterval);
        isAutoRefreshing = false;
        btn.textContent = '자동 새로고침 켜기';
        btn.className = 'btn btn--small';
    } else {
        autoRefreshInterval = setInterval(updateStats, 5000); // 5초마다
        isAutoRefreshing = true;
        btn.textContent = '자동 새로고침 끄기';
        btn.className = 'btn btn--small btn--active';
    }
}

// =============================================================================
// 10. 종합 실습 - 게시판 시뮬레이션
// =============================================================================

function showWriteForm() {
    const form = document.getElementById('write-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    
    if (form.style.display === 'block') {
        document.getElementById('board-title').focus();
    }
}

function cancelWrite() {
    document.getElementById('write-form').style.display = 'none';
    document.getElementById('board-title').value = '';
    document.getElementById('board-content').value = '';
    document.getElementById('board-author').value = '';
}

async function submitPost() {
    const title = document.getElementById('board-title').value.trim();
    const content = document.getElementById('board-content').value.trim();
    const author = document.getElementById('board-author').value;
    const statusEl = document.getElementById('board-status');
    
    const errors = validatePost(title, content, author);
    if (errors.length > 0) {
        showStatus(statusEl, `입력 오류: ${errors.join(', ')}`, 'error');
        return;
    }
    
    showStatus(statusEl, '게시글을 등록하는 중...', 'loading');
    
    try {
        const newPost = await createPost({
            title: title,
            body: content,
            userId: parseInt(author)
        });
        
        showStatus(statusEl, '게시글이 등록되었습니다!', 'success');
        cancelWrite();
        loadBoardPosts();
        updateStats();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

async function loadBoardPosts() {
    const listEl = document.getElementById('board-list');
    
    try {
        const posts = await fetchPosts(5); // 최근 5개
        const users = await fetchUsers();
        
        listEl.innerHTML = `
            <div class="board-posts">
                ${posts.map(post => {
                    const user = users.find(u => u.id == post.userId);
                    return `
                        <div class="board-post" data-id="${post.id}">
                            <div class="post-header">
                                <h5 class="post-title">${post.title}</h5>
                                <button class="delete-post-btn" onclick="deleteBoardPost(${post.id})">삭제</button>
                            </div>
                            <div class="post-content">${post.body}</div>
                            <div class="post-meta">
                                작성자: ${user ? user.name : '알 수 없음'} | ID: ${post.id}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
    } catch (error) {
        listEl.innerHTML = '<p class="error">게시글을 불러올 수 없습니다.</p>';
    }
}

async function deleteBoardPost(postId) {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
    
    const statusEl = document.getElementById('board-status');
    showStatus(statusEl, '게시글을 삭제하는 중...', 'loading');
    
    try {
        await deletePost(postId);
        showStatus(statusEl, '게시글이 삭제되었습니다.', 'success');
        loadBoardPosts();
        updateStats();
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 초기화 및 이벤트 리스너
// =============================================================================

async function initializeSelects() {
    try {
        const users = await fetchUsers();
        
        // 사용자 선택 박스들 초기화
        const selects = [
            'post-user-id-2',
            'delete-user-id',
            'board-author'
        ];
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">선택하세요</option>' +
                    users.map(user => 
                        `<option value="${user.id}">${user.name} (${user.email})</option>`
                    ).join('');
            }
        });
        
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 이벤트 리스너 등록
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
    
    document.getElementById('show-write-form')?.addEventListener('click', showWriteForm);
    document.getElementById('submit-post')?.addEventListener('click', submitPost);
    document.getElementById('cancel-write')?.addEventListener('click', cancelWrite);
    
    // 엔터 키 이벤트들
    const enterKeyElements = [
        'post-user-id-1',
        'post-user-id-2',
        'delete-post-id-1',
        'delete-post-id-2'
    ];
    
    enterKeyElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const button = element.closest('.test__sec').querySelector('.btn');
                    if (button) button.click();
                }
            });
        }
    });
    
    // 초기 데이터 로드
    initializeSelects();
    updateStats();
    loadBoardPosts();
    
    console.log('🚀 REST API POST & DELETE 예제가 로드되었습니다!');
    console.log('💡 사용 가능한 기능들:');
    console.log('- 기본/고급 게시글 작성');
    console.log('- 배치 처리로 여러 게시글 작성');
    console.log('- 안전한 게시글 삭제');
    console.log('- 일괄 삭제 및 사용자별 삭제');
    console.log('- 에러 처리 시연');
    console.log('- 실시간 통계');
    console.log('- 미니 게시판');
});

// 전역 함수로 노출 (HTML에서 호출용)
window.deleteBoardPost = deleteBoardPost;