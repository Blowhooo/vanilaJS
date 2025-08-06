// API 기본 URL - json-server용
const API_BASE_URL = 'http://localhost:3001';

// 공통 상태 관리
let originalData = {};
let unsavedChanges = false;
let autoSaveInterval = null;

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

// 변경사항 감지
function detectChanges(original, current) {
    const changes = [];
    
    if (original.title !== current.title) {
        changes.push({ field: 'title', from: original.title, to: current.title });
    }
    
    if (original.body !== current.body) {
        changes.push({ field: 'body', from: original.body, to: current.body });
    }
    
    return changes;
}

// 재시도 로직
async function retryRequest(requestFn, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            
            console.log(`재시도 ${attempt}/${maxRetries} 실패, ${delay * attempt}ms 후 재시도...`);
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
}

// =============================================================================
// API 호출 함수들
// =============================================================================

// 서버 상태 확인
async function checkServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?_limit=1`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

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
// 서버 상태 확인
// =============================================================================

async function checkServerStatus() {
    const statusEl = document.getElementById('server-status');
    
    showStatus(statusEl, '서버 상태를 확인하는 중...', 'loading');
    
    try {
        const isServerRunning = await checkServer();
        
        if (isServerRunning) {
            showStatus(statusEl, '✅ JSON Server가 정상적으로 실행 중입니다!', 'success');
        } else {
            showStatus(statusEl, '❌ JSON Server에 연결할 수 없습니다. 서버를 실행해주세요.', 'error');
        }
    } catch (error) {
        showStatus(statusEl, '❌ 서버 상태 확인에 실패했습니다.', 'error');
    }
}

// =============================================================================
// 실습 1: 기본 PUT 수정
// =============================================================================

// 여기에 실습 1 구현 코드를 작성하세요

// =============================================================================
// 실습 2: PATCH 부분 수정
// =============================================================================

// 여기에 실습 2 구현 코드를 작성하세요

// =============================================================================
// 실습 3: 기존 데이터 로드 후 수정
// =============================================================================

// 여기에 실습 3 구현 코드를 작성하세요

// =============================================================================
// 실습 4: 실시간 변경사항 감지
// =============================================================================

// 여기에 실습 4 구현 코드를 작성하세요

// =============================================================================
// 실습 5: 폼 검증과 미리보기
// =============================================================================

// 여기에 실습 5 구현 코드를 작성하세요

// =============================================================================
// 실습 6: 여러 게시글 일괄 수정
// =============================================================================

// 여기에 실습 6 구현 코드를 작성하세요

// =============================================================================
// 실습 7: 에러 처리 및 재시도
// =============================================================================

// 여기에 실습 7 구현 코드를 작성하세요

// =============================================================================
// 실습 8: 종합 실습 - 완전한 게시글 편집기
// =============================================================================

// 여기에 실습 8 구현 코드를 작성하세요

// =============================================================================
// 초기화 및 이벤트 리스너
// =============================================================================

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 서버 상태 확인 이벤트
    document.getElementById('check-server')?.addEventListener('click', checkServerStatus);
    
    // 실습 1: PUT 수정 이벤트
    // document.getElementById('update-put')?.addEventListener('click', updatePUT);
    
    // 실습 2: PATCH 수정 이벤트
    // document.getElementById('update-patch')?.addEventListener('click', updatePATCH);
    // document.getElementById('patch-title-check')?.addEventListener('change', togglePatchFields);
    // document.getElementById('patch-body-check')?.addEventListener('change', togglePatchFields);
    
    // 실습 3: 로드 후 편집 이벤트
    // document.getElementById('load-post')?.addEventListener('click', loadPost);
    // document.getElementById('save-changes')?.addEventListener('click', saveChanges);
    // document.getElementById('cancel-edit')?.addEventListener('click', cancelEdit);
    
    // 실습 4: 변경사항 감지 이벤트
    // document.getElementById('load-for-compare')?.addEventListener('click', loadForCompare);
    // document.getElementById('apply-changes')?.addEventListener('click', applyChanges);
    
    // 실습 5: 검증 및 미리보기 이벤트
    // document.getElementById('load-for-validate')?.addEventListener('click', loadForValidate);
    // document.getElementById('save-validated')?.addEventListener('click', saveValidated);
    
    // 실습 6: 일괄 수정 이벤트
    // document.getElementById('load-batch-posts')?.addEventListener('click', loadBatchPosts);
    // document.getElementById('apply-batch-update')?.addEventListener('click', applyBatchUpdate);
    
    // 실습 7: 에러 처리 이벤트
    // document.getElementById('test-404-error')?.addEventListener('click', test404Error);
    // document.getElementById('test-network-retry')?.addEventListener('click', testNetworkRetry);
    // document.getElementById('update-with-retry')?.addEventListener('click', updateWithRetry);
    
    // 실습 8: 고급 편집기 이벤트
    // document.getElementById('final-load')?.addEventListener('click', finalLoad);
    // document.getElementById('final-new')?.addEventListener('click', finalNew);
    // document.getElementById('final-save')?.addEventListener('click', finalSave);
    // document.getElementById('final-draft')?.addEventListener('click', finalDraft);
    
    // 페이지 이탈 시 경고 (저장되지 않은 변경사항이 있을 때)
    window.addEventListener('beforeunload', (e) => {
        if (unsavedChanges) {
            e.preventDefault();
            e.returnValue = '저장되지 않은 변경사항이 있습니다. 정말로 페이지를 떠나시겠습니까?';
        }
    });
    
    console.log('🚀 REST API UPDATE 실습 페이지가 로드되었습니다!');
    console.log('💡 각 실습 섹션의 함수를 구현해보세요:');
    console.log('1. PUT 수정');
    console.log('2. PATCH 부분 수정');
    console.log('3. 기존 데이터 로드 후 수정'); 
    console.log('4. 실시간 변경사항 감지');
    console.log('5. 폼 검증과 미리보기');
    console.log('6. 여러 게시글 일괄 수정');
    console.log('7. 에러 처리 및 재시도');
    console.log('8. 종합 실습 - 완전한 게시글 편집기');
    console.log('🔧 먼저 서버 상태를 확인해주세요!');
});

// 실습용 템플릿 함수들 (참고용)

/**
 * 실습 1: PUT 수정 템플릿
 */
/*
async function updatePUT() {
    const postId = document.getElementById('put-post-id').value.trim();
    const title = document.getElementById('put-title').value.trim();
    const body = document.getElementById('put-body').value.trim();
    const userId = document.getElementById('put-user-id').value.trim();
    const statusEl = document.getElementById('put-status');
    const resultEl = document.getElementById('put-result');
    
    // 1. 입력값 검증
    // 2. PUT 요청 전송
    // 3. 결과 표시
    // 4. 입력 필드 초기화
}
*/

/**
 * 실습 2: PATCH 수정 템플릿  
 */
/*
async function updatePATCH() {
    const postId = document.getElementById('patch-post-id').value.trim();
    const titleCheck = document.getElementById('patch-title-check').checked;
    const bodyCheck = document.getElementById('patch-body-check').checked;
    // ...
    
    // 1. 선택된 필드만 업데이트 데이터 구성
    // 2. PATCH 요청 전송
    // 3. 결과 표시
}

function togglePatchFields() {
    // 체크박스 상태에 따라 입력 필드 활성화/비활성화
}
*/

/**
 * 실습 3: 로드 후 편집 템플릿
 */
/*
async function loadPost() {
    // 1. GET 요청으로 게시글 데이터 조회
    // 2. 폼에 데이터 로드
    // 3. 편집 폼 표시
}

async function saveChanges() {
    // 1. 변경사항 감지
    // 2. PUT/PATCH 요청 전송
    // 3. 결과 표시
}

function cancelEdit() {
    // 편집 폼 숨기기 및 초기화
}
*/

/**
 * 실습 4: 변경사항 감지 템플릿
 */
/*
async function loadForCompare() {
    // 1. 게시글 데이터 로드
    // 2. 원본 데이터 표시
    // 3. 실시간 변경사항 감지 이벤트 설정
}

function setupChangeDetection() {
    // input/textarea 이벤트 리스너 등록
    // 실시간으로 원본과 현재 값 비교
}

async function applyChanges() {
    // 변경사항 적용
}
*/

/**
 * 실습 5: 검증 및 미리보기 템플릿
 */
/*
async function loadForValidate() {
    // 게시글 로드 후 검증 및 미리보기 설정
}

function setupValidation() {
    // 실시간 입력 검증
    // 글자 수 카운터
    // 미리보기 업데이트
}

async function saveValidated() {
    // 검증 통과 후 저장
}
*/

/**
 * 실습 6: 일괄 수정 템플릿
 */
/*
async function loadBatchPosts() {
    // 1. 게시글 목록 불러오기
    // 2. 체크박스 목록 생성
    // 3. 일괄 수정 옵션 설정
}

async function applyBatchUpdate() {
    // 1. 선택된 게시글들 확인
    // 2. Promise.all로 병렬 업데이트
    // 3. 진행 상황 및 결과 표시
}
*/

/**
 * 실습 7: 에러 처리 템플릿
 */
/*
async function test404Error() {
    // 404 에러 시뮬레이션
}

async function testNetworkRetry() {
    // 네트워크 재시도 시뮬레이션
}

async function updateWithRetry() {
    // 재시도 로직이 포함된 업데이트
    try {
        const result = await retryRequest(async () => {
            // 실제 업데이트 요청
        });
    } catch (error) {
        // 최종 실패 처리
    }
}
*/

/**
 * 실습 8: 고급 편집기 템플릿
 */
/*
async function finalLoad() {
    // 고급 편집기에 데이터 로드
}

function finalNew() {
    // 새 게시글 모드
}

async function finalSave() {
    // 저장 (새 게시글 또는 수정)
}

async function finalDraft() {
    // 임시저장 (localStorage 또는 서버)
}

function setupAutoSave() {
    // 자동 저장 설정
}

function setupAdvancedEditor() {
    // 글자 수 카운터, 변경사항 추적 등
}
*/
