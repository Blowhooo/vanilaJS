// API 기본 URL - json-server용
const API_BASE_URL = 'http://localhost:3001';

// 공통 상태 관리
let originalData = {};
let editHistory = new Map(); // 게시글별 히스토리 저장
let autoSaveInterval = null;
let unsavedChanges = false;

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

// 에러 핸들링
function handleError(error, statusElement) {
    console.error('API Error:', error);
    let message = '알 수 없는 오류가 발생했습니다.';
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        message = '네트워크 연결을 확인해주세요. JSON Server가 실행 중인지 확인하세요.';
    } else if (error.message.includes('404')) {
        message = '요청한 게시글을 찾을 수 없습니다.';
    } else if (error.message.includes('409')) {
        message = '다른 사용자가 동시에 수정했습니다. 페이지를 새로고침해주세요.';
    } else if (error.message.includes('403')) {
        message = '수정 권한이 없습니다.';
    } else if (error.message) {
        message = error.message;
    }
    
    showStatus(statusElement, `오류: ${message}`, 'error');
}

// 객체 깊은 복사
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 객체 비교
function objectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// 변경사항 감지
function detectChanges(original, current) {
    const changes = [];
    
    if (original.title !== current.title) {
        changes.push({ field: 'title', from: original.title, to: current.title });
    }
    
    if (original.body !== current.body) {
        changes.push({ field: 'body', from: original.body, to: current.body });
    }
    
    if (original.userId !== current.userId) {
        changes.push({ field: 'userId', from: original.userId, to: current.userId });
    }
    
    return changes;
}

// =============================================================================
// API 호출 함수들
// =============================================================================

// 게시글 조회
async function fetchPost(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 게시글 목록 조회
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

// 게시글 PUT 업데이트
async function updatePostPUT(id, postData) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
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

// 게시글 PATCH 업데이트
async function updatePostPATCH(id, partialData) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(partialData)
    });
    
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

// =============================================================================
// 1. 기본 게시글 수정 (PUT)
// =============================================================================

async function updatePUT1() {
    const postId = document.getElementById('put-post-id-1').value.trim();
    const title = document.getElementById('put-title-1').value.trim();
    const body = document.getElementById('put-body-1').value.trim();
    const userId = document.getElementById('put-user-id-1').value.trim();
    const statusEl = document.getElementById('put-status-1');
    const resultEl = document.getElementById('put-result-1');
    
    if (!postId || !title || !body || !userId) {
        showStatus(statusEl, '모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, 'PUT 방식으로 게시글을 수정하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        const updatedPost = await updatePostPUT(postId, {
            id: parseInt(postId),
            title: title,
            body: body,
            userId: parseInt(userId)
        });
        
        showStatus(statusEl, 'PUT 방식으로 게시글이 성공적으로 수정되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>✅ PUT 업데이트 완료</h4>
                <p><strong>방식:</strong> PUT (전체 리소스 교체)</p>
                <p><strong>ID:</strong> ${updatedPost.id}</p>
                <p><strong>제목:</strong> ${updatedPost.title}</p>
                <p><strong>내용:</strong> ${updatedPost.body}</p>
                <p><strong>작성자 ID:</strong> ${updatedPost.userId}</p>
                <p><small>수정 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        // 입력 필드 초기화
        document.getElementById('put-post-id-1').value = '';
        document.getElementById('put-title-1').value = '';
        document.getElementById('put-body-1').value = '';
        document.getElementById('put-user-id-1').value = '';
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 2. 부분 수정 (PATCH)
// =============================================================================

async function updatePATCH1() {
    const postId = document.getElementById('patch-post-id-1').value.trim();
    const titleCheck = document.getElementById('patch-title-check').checked;
    const bodyCheck = document.getElementById('patch-body-check').checked;
    const title = document.getElementById('patch-title-1').value.trim();
    const body = document.getElementById('patch-body-1').value.trim();
    const statusEl = document.getElementById('patch-status-1');
    const resultEl = document.getElementById('patch-result-1');
    
    if (!postId) {
        showStatus(statusEl, '게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    if (!titleCheck && !bodyCheck) {
        showStatus(statusEl, '수정할 필드를 선택해주세요.', 'error');
        return;
    }
    
    // 부분 업데이트 데이터 구성
    const partialData = {};
    if (titleCheck && title) partialData.title = title;
    if (bodyCheck && body) partialData.body = body;
    
    if (Object.keys(partialData).length === 0) {
        showStatus(statusEl, '수정할 내용을 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, 'PATCH 방식으로 부분 수정하는 중...', 'loading');
    resultEl.innerHTML = '';

    try {
        const updatedPost = await updatePostPATCH(postId, partialData);
        
        showStatus(statusEl, 'PATCH 방식으로 게시글이 성공적으로 수정되었습니다!', 'success');
        
        const updatedFields = Object.keys(partialData).join(', ');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>🔧 PATCH 업데이트 완료</h4>
                <p><strong>방식:</strong> PATCH (부분 리소스 수정)</p>
                <p><strong>수정된 필드:</strong> ${updatedFields}</p>
                <p><strong>ID:</strong> ${updatedPost.id}</p>
                <p><strong>제목:</strong> ${updatedPost.title}</p>
                <p><strong>내용:</strong> ${updatedPost.body}</p>
                <p><strong>작성자 ID:</strong> ${updatedPost.userId}</p>
                <p><small>수정 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        // 입력 필드 초기화
        document.getElementById('patch-post-id-1').value = '';
        document.getElementById('patch-title-1').value = '';
        document.getElementById('patch-body-1').value = '';
        document.getElementById('patch-title-check').checked = false;
        document.getElementById('patch-body-check').checked = false;
        togglePatchFields();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// PATCH 필드 토글
function togglePatchFields() {
    const titleCheck = document.getElementById('patch-title-check').checked;
    const bodyCheck = document.getElementById('patch-body-check').checked;
    
    document.getElementById('patch-title-1').disabled = !titleCheck;
    document.getElementById('patch-body-1').disabled = !bodyCheck;
}

// =============================================================================
// 3. 기존 데이터 로드 후 수정
// =============================================================================

async function loadPostData() {
    const postId = document.getElementById('load-post-id').value.trim();
    const statusEl = document.getElementById('load-edit-status');
    const resultEl = document.getElementById('load-edit-result');
    
    if (!postId) {
        showStatus(statusEl, '게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '게시글 데이터를 불러오는 중...', 'loading');
    
    try {
        const post = await fetchPost(postId);
        
        // 원본 데이터 저장
        originalData.loadEdit = deepClone(post);
        
        // 폼에 데이터 로드
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-body').value = post.body;
        
        // 편집 폼 표시
        document.getElementById('edit-form').style.display = 'block';
        
        showStatus(statusEl, '게시글 데이터를 불러왔습니다. 수정 후 저장해주세요.', 'success');
        
        resultEl.innerHTML = `
            <div class="result-info">
                <h4>📄 불러온 게시글 정보</h4>
                <p><strong>ID:</strong> ${post.id}</p>
                <p><strong>원본 제목:</strong> ${post.title}</p>
                <p><strong>원본 내용:</strong> ${post.body.substring(0, 100)}...</p>
                <p><strong>작성자 ID:</strong> ${post.userId}</p>
            </div>
        `;
        
    } catch (error) {
        handleError(error, statusEl);
        document.getElementById('edit-form').style.display = 'none';
    }
}

async function saveChanges() {
    if (!originalData.loadEdit) {
        showStatus(document.getElementById('load-edit-status'), '먼저 게시글을 불러와주세요.', 'error');
        return;
    }
    
    const title = document.getElementById('edit-title').value.trim();
    const body = document.getElementById('edit-body').value.trim();
    const statusEl = document.getElementById('load-edit-status');
    const resultEl = document.getElementById('load-edit-result');
    
    if (!title || !body) {
        showStatus(statusEl, '제목과 내용을 입력해주세요.', 'error');
        return;
    }
    
    // 변경사항 감지
    const currentData = {
        id: originalData.loadEdit.id,
        title: title,
        body: body,
        userId: originalData.loadEdit.userId
    };
    
    const changes = detectChanges(originalData.loadEdit, currentData);
    
    if (changes.length === 0) {
        showStatus(statusEl, '변경사항이 없습니다.', 'info');
        return;
    }
    
    showStatus(statusEl, '변경사항을 저장하는 중...', 'loading');
    
    try {
        const updatedPost = await updatePostPUT(originalData.loadEdit.id, currentData);
        
        showStatus(statusEl, '변경사항이 성공적으로 저장되었습니다!', 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>💾 변경사항 저장 완료</h4>
                <div class="changes-list">
                    <h5>변경된 내용:</h5>
                    ${changes.map(change => `
                        <div class="change-item">
                            <strong>${change.field}:</strong><br>
                            <span class="old-value">이전: ${change.from}</span><br>
                            <span class="new-value">변경: ${change.to}</span>
                        </div>
                    `).join('')}
                </div>
                <p><small>저장 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        // 편집 폼 숨기기
        cancelEdit();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

function cancelEdit() {
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('edit-title').value = '';
    document.getElementById('edit-body').value = '';
    originalData.loadEdit = null;
}

// =============================================================================
// 10. 종합 실습 - 고급 게시글 편집기
// =============================================================================

async function editorLoad() {
    const postId = document.getElementById('editor-post-id').value.trim();
    const statusEl = document.getElementById('advanced-editor-status');
    
    if (!postId) {
        showStatus(statusEl, '게시글 ID를 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '고급 편집기에 데이터를 불러오는 중...', 'loading');
    
    try {
        const post = await fetchPost(postId);
        
        // 원본 데이터 저장
        originalData.editor = deepClone(post);
        unsavedChanges = false;
        
        // 편집기에 데이터 로드
        document.getElementById('editor-title').value = post.title;
        document.getElementById('editor-body').value = post.body;
        
        // 편집기 폼 표시
        document.getElementById('advanced-editor-form').style.display = 'block';
        
        showStatus(statusEl, '고급 편집기에 데이터를 불러왔습니다.', 'success');
        
        // 편집기 기능 초기화
        initializeAdvancedEditor();
        
    } catch (error) {
        handleError(error, statusEl);
        document.getElementById('advanced-editor-form').style.display = 'none';
    }
}

function editorNew() {
    // 새 게시글 모드
    originalData.editor = null;
    unsavedChanges = false;
    
    document.getElementById('editor-title').value = '';
    document.getElementById('editor-body').value = '';
    document.getElementById('advanced-editor-form').style.display = 'block';
    
    showStatus(document.getElementById('advanced-editor-status'), '새 게시글 작성 모드입니다.', 'info');
    
    initializeAdvancedEditor();
}

function initializeAdvancedEditor() {
    const titleInput = document.getElementById('editor-title');
    const bodyInput = document.getElementById('editor-body');
    const charCount = document.getElementById('editor-char-count');
    const saveStatus = document.getElementById('editor-save-status');
    
    // 글자 수 카운터 업데이트
    function updateCharCount() {
        const totalChars = titleInput.value.length + bodyInput.value.length;
        charCount.textContent = totalChars;
        
        // 변경사항 감지
        if (originalData.editor) {
            const hasChanges = titleInput.value !== originalData.editor.title || 
                              bodyInput.value !== originalData.editor.body;
            
            if (hasChanges && !unsavedChanges) {
                unsavedChanges = true;
                saveStatus.textContent = '변경사항 있음';
                saveStatus.className = 'save-status unsaved';
            } else if (!hasChanges && unsavedChanges) {
                unsavedChanges = false;
                saveStatus.textContent = '저장됨';
                saveStatus.className = 'save-status saved';
            }
        }
    }
    
    titleInput.addEventListener('input', updateCharCount);
    bodyInput.addEventListener('input', updateCharCount);
    
    // 초기 글자 수 업데이트
    updateCharCount();
    
    // 자동 저장 설정
    setupAutoSave();
}

function setupAutoSave() {
    const autoSaveCheckbox = document.getElementById('editor-auto-save');
    
    autoSaveCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            // 30초마다 자동 저장
            autoSaveInterval = setInterval(() => {
                if (unsavedChanges) {
                    editorSaveDraft();
                }
            }, 30000);
        } else {
            if (autoSaveInterval) {
                clearInterval(autoSaveInterval);
                autoSaveInterval = null;
            }
        }
    });
}

async function editorSave() {
    const title = document.getElementById('editor-title').value.trim();
    const body = document.getElementById('editor-body').value.trim();
    const statusEl = document.getElementById('advanced-editor-status');
    const saveStatus = document.getElementById('editor-save-status');
    const lastSaved = document.getElementById('editor-last-saved');
    
    if (!title || !body) {
        showStatus(statusEl, '제목과 내용을 입력해주세요.', 'error');
        return;
    }
    
    showStatus(statusEl, '저장하는 중...', 'loading');
    
    try {
        let result;
        
        if (originalData.editor) {
            // 기존 게시글 수정
            const updateData = {
                id: originalData.editor.id,
                title: title,
                body: body,
                userId: originalData.editor.userId
            };
            
            result = await updatePostPUT(originalData.editor.id, updateData);
        } else {
            // 새 게시글 생성
            const newPostData = {
                title: title,
                body: body,
                userId: 1 // 기본값
            };
            
            result = await createPost(newPostData);
            originalData.editor = result;
        }
        
        unsavedChanges = false;
        saveStatus.textContent = '저장됨';
        saveStatus.className = 'save-status saved';
        lastSaved.textContent = formatTime(new Date());
        
        showStatus(statusEl, '성공적으로 저장되었습니다!', 'success');
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

async function editorSaveDraft() {
    // 임시저장 기능 (실제로는 localStorage나 서버의 임시저장 API 사용)
    const title = document.getElementById('editor-title').value.trim();
    const body = document.getElementById('editor-body').value.trim();
    const lastSaved = document.getElementById('editor-last-saved');
    
    const draftData = {
        title: title,
        body: body,
        timestamp: new Date().toISOString()
    };
    
    // localStorage에 임시저장 (실제로는 서버 API 사용 권장)
    const draftKey = originalData.editor ? `draft_${originalData.editor.id}` : 'draft_new';
    localStorage.setItem(draftKey, JSON.stringify(draftData));
    
    lastSaved.textContent = `${formatTime(new Date())} (임시저장)`;
    
    showStatus(document.getElementById('advanced-editor-status'), '임시저장되었습니다.', 'info');
    setTimeout(() => {
        hideStatus(document.getElementById('advanced-editor-status'));
    }, 2000);
}

function editorPreview() {
    const title = document.getElementById('editor-title').value.trim();
    const body = document.getElementById('editor-body').value.trim();
    const previewContent = document.getElementById('editor-preview-content');
    const previewModal = document.getElementById('editor-preview-modal');
    
    previewContent.innerHTML = `
        <div class="preview-post">
            <h2>${title || '제목을 입력하세요'}</h2>
            <div class="preview-body">
                ${body.replace(/\n/g, '<br>') || '내용을 입력하세요'}
            </div>
            <div class="preview-meta">
                <small>글자 수: ${(title + body).length}자</small>
            </div>
        </div>
    `;
    
    previewModal.style.display = 'block';
}

function closePreview() {
    document.getElementById('editor-preview-modal').style.display = 'none';
}

function editorHistory() {
    // 히스토리 기능 (간단한 구현)
    alert('히스토리 기능은 실제 구현에서는 서버의 버전 관리 시스템과 연동됩니다.');
}

// =============================================================================
// 초기화 및 이벤트 리스너
// =============================================================================

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 1. PUT 관련 이벤트
    document.getElementById('update-put-1')?.addEventListener('click', updatePUT1);
    
    // 2. PATCH 관련 이벤트
    document.getElementById('update-patch-1')?.addEventListener('click', updatePATCH1);
    document.getElementById('patch-title-check')?.addEventListener('change', togglePatchFields);
    document.getElementById('patch-body-check')?.addEventListener('change', togglePatchFields);
    
    // 3. 로드 후 편집 관련 이벤트
    document.getElementById('load-post-data')?.addEventListener('click', loadPostData);
    document.getElementById('save-changes')?.addEventListener('click', saveChanges);
    document.getElementById('cancel-edit')?.addEventListener('click', cancelEdit);
    
    // 10. 고급 편집기 관련 이벤트
    document.getElementById('editor-load')?.addEventListener('click', editorLoad);
    document.getElementById('editor-new')?.addEventListener('click', editorNew);
    document.getElementById('editor-save')?.addEventListener('click', editorSave);
    document.getElementById('editor-save-draft')?.addEventListener('click', editorSaveDraft);
    document.getElementById('editor-preview')?.addEventListener('click', editorPreview);
    document.getElementById('close-preview')?.addEventListener('click', closePreview);
    document.getElementById('editor-history')?.addEventListener('click', editorHistory);
    
    // 엔터 키 이벤트들
    const enterKeyElements = [
        'put-post-id-1',
        'patch-post-id-1', 
        'load-post-id',
        'editor-post-id'
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
    
    // 페이지 이탈 시 경고 (저장되지 않은 변경사항이 있을 때)
    window.addEventListener('beforeunload', (e) => {
        if (unsavedChanges) {
            e.preventDefault();
            e.returnValue = '저장되지 않은 변경사항이 있습니다. 정말로 페이지를 떠나시겠습니까?';
        }
    });
    
    console.log('🚀 REST API UPDATE 예제가 로드되었습니다!');
    console.log('💡 사용 가능한 기능들:');
    console.log('- PUT vs PATCH 메서드 비교');
    console.log('- 데이터 로드 후 수정');
    console.log('- 변경사항 실시간 감지');
    console.log('- 낙관적 업데이트');
    console.log('- 일괄 수정');
    console.log('- 실시간 검증 및 미리보기');
    console.log('- 버전 관리 및 히스토리');
    console.log('- 다양한 에러 처리');
    console.log('- 고급 게시글 편집기');
});

// 전역 함수로 노출 (HTML에서 호출용)
window.revertToVersion = async function(postId, version) {
    const history = editHistory.get(postId);
    if (!history) return;
    
    const targetVersion = history.find(v => v.version === version);
    if (!targetVersion) return;
    
    if (!confirm(`버전 ${version}으로 되돌리시겠습니까?\n현재 변경사항은 저장되지 않습니다.`)) {
        return;
    }
    
    const statusEl = document.getElementById('history-status');
    const resultEl = document.getElementById('history-result');
    
    showStatus(statusEl, `버전 ${version}으로 되돌리는 중...`, 'loading');
    
    try {
        const revertData = {
            id: targetVersion.data.id,
            title: targetVersion.data.title,
            body: targetVersion.data.body,
            userId: targetVersion.data.userId
        };
        
        const updatedPost = await updatePostPUT(postId, revertData);
        
        // 새 히스토리 항목 추가
        const newVersion = {
            version: history.length + 1,
            data: deepClone(updatedPost),
            timestamp: new Date().toISOString(),
            description: `버전 ${version}으로 되돌림`
        };
        
        history.push(newVersion);
        editHistory.set(postId, history);
        
        // 폼 업데이트
        document.getElementById('history-title').value = updatedPost.title;
        document.getElementById('history-body').value = updatedPost.body;
        
        showStatus(statusEl, `버전 ${version}으로 성공적으로 되돌려졌습니다!`, 'success');
        
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>⏪ 버전 되돌리기 완료</h4>
                <p><strong>되돌린 버전:</strong> 버전 ${version}</p>
                <p><strong>새 버전:</strong> 버전 ${newVersion.version}</p>
                <p><strong>제목:</strong> ${updatedPost.title}</p>
                <p><strong>내용:</strong> ${updatedPost.body.substring(0, 100)}...</p>
                <p><small>되돌리기 시간: ${formatTime(new Date())}</small></p>
            </div>
        `;
        
        originalData.history = updatedPost;
        
    } catch (error) {
        handleError(error, statusEl);
    }
};
