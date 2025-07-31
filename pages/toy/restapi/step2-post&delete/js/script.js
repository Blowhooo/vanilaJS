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

// 새 게시글 작성
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
        
        // 성공 메시지 자동 숨김
        setTimeout(() => hideStatus(statusEl), 3000);
        updateStats();
        
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
        // 힌트: const response = await fetch(API_BASE_URL + `/posts/${postId}`, {
        //     method: 'DELETE'
        // });
        // if (!response.ok) throw new Error('삭제 실패');
        
        showStatus(statusEl, '게시글이 삭제되었습니다!', 'success');
        
        // TODO: 목록 새로고침
        // 힌트: loadChallengeList();
        
        // 성공 메시지 자동 숨김
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

// 페이지 로드 시 초기화
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
    
    // 서버 상태 확인
    document.getElementById('check-server')?.addEventListener('click', checkServerStatus);
    
    // 실습 1-10 이벤트 리스너들
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
        'post-user-id-1',
        'post-user-id-2', 
        'delete-post-id-1',
        'delete-post-id-2',
        'challenge-title',
        'challenge-body'
    ];
    
    inputElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    // 해당 섹션의 버튼 찾아서 클릭
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

📝 완성해야 할 TODO 목록 (총 50개 이상):

✅ 유틸리티 함수들:
□ showStatus() 함수 구현
□ hideStatus() 함수 구현  
□ validateInput() 함수 구현
□ formatTime() 함수 구현

✅ 실습 1: 기본 게시글 작성
□ POST 요청 구현
□ 응답 상태 확인
□ 결과 화면 표시
□ 입력 필드 초기화

✅ 실습 2: 유효성 검증 포함
□ 입력값 검증 로직
□ 사용자 존재 확인 GET 요청
□ 검증된 데이터 결과 표시

✅ 실습 3: 배치 처리
□ 텍스트 데이터 파싱
□ Promise.all 병렬 처리
□ 처리 시간 측정
□ 배치 결과 표시

✅ 실습 4: 기본 삭제
□ DELETE 요청 구현
□ 삭제 확인 대화상자
□ 삭제 결과 표시

✅ 실습 5: 안전한 삭제
□ GET으로 존재 확인
□ 404 에러 처리
□ 게시글 정보 확인 후 삭제

✅ 실습 6: 일괄 삭제
□ 게시글 목록 조회
□ 체크박스 UI 생성
□ 전체 선택/해제 기능
□ 선택된 게시글 병렬 삭제

✅ 실습 7: 사용자별 삭제
□ 사용자별 게시글 조회
□ 사용자 정보 확인
□ 모든 게시글 병렬 삭제

✅ 실습 8: 에러 처리
□ 네트워크 에러 시뮬레이션
□ 서버 에러 시뮬레이션
□ 유효성 검증 에러
□ 404 에러 처리

✅ 실습 9: 실시간 모니터링
□ 통계 정보 조회 및 표시
□ 자동 새로고침 토글

✅ 실습 10: 종합 실습
□ 게시글 목록 조회
□ 새 게시글 작성
□ 게시글 삭제
□ 전체 연동

🔧 디버깅 체크리스트:
□ JSON Server가 포트 3001에서 실행 중인가?
□ fetch 요청의 URL이 정확한가?
□ Content-Type 헤더가 있는가?
□ JSON.stringify()를 사용했는가?
□ async/await 문법이 올바른가?
□ 에러를 try-catch로 잡고 있는가?
□ DOM 요소가 제대로 선택되었는가?

🚀 추가 도전 과제:
□ 로딩 스피너 애니메이션 추가
□ 토스트 메시지 구현
□ 페이지네이션 구현
□ 검색 기능 추가
□ 정렬 기능 추가
□ localStorage에 임시 저장
□ 실시간 업데이트 (WebSocket)
□ 이미지 업로드 기능
□ 댓글 시스템 구현
□ 사용자 인증 시스템

📚 참고 자료:
- MDN fetch API: https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
- JSON Server: https://github.com/typicode/json-server
- async/await: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
- Promise.all: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

💡 성공 팁:
1. 한 번에 모든 TODO를 구현하려 하지 말고, 하나씩 차근차근!
2. 막히면 example.html의 완성된 코드를 참고하세요
3. 브라우저 개발자 도구를 적극 활용하세요
4. 에러 메시지를 잘 읽어보세요
5. console.log()로 중간 결과를 확인하세요

🎉 완료 후 성취감:
모든 TODO를 완성하면 실무에서 바로 사용할 수 있는 
REST API 연동 실력을 갖게 됩니다!
*/