// DOM 요소 선택

// 입력 필드 이벤트 리스너 - 입력값에 따라 버튼 활성화/비활성화

// 할 일 추가 함수
// - 빈 값이면 추가하지 않음
// - 새로운 할 일 아이템 생성
// - 선택용 체크박스 생성
// - 할 일 텍스트 생성
// - 완료 버튼 생성 (체크박스를 버튼처럼 사용)
// - 삭제 버튼 생성
// - 완료 버튼 클릭 이벤트

// 벌크 컨트롤 업데이트 함수
// - 목록 선택자 선택자 세팅 (.todo-item)
// - 벌크 컨트롤 선택자 세팅 (.bulk-controls-wrap)
// - 벌크 컨트롤이 없으면 생성
// - 아이템이 2개 미만이면 벌크 컨트롤 제거


// 벌크 컨트롤 생성 함수
// - 이미 있으면 생성하지 않음
// - 벌크 컨트롤 wrap 생성
// - 전체 선택 체크박스 생성
// - 선택 삭제 버튼 생성
// - 전체 선택 체크박스 이벤트
// - 선택 삭제 버튼 이벤트
// - 요소들을 wrap에 추가
// - todoList 다음에 추가


// 전체 선택 체크박스 상태 업데이트
function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (!selectAllCheckbox) return;
    
    const checkboxes = document.querySelectorAll('.select-checkbox');
    const checkedBoxes = document.querySelectorAll('.select-checkbox:checked');
    
    if (checkboxes.length === 0) {
        selectAllCheckbox.checked = false;
    } else if (checkboxes.length === checkedBoxes.length) {
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.checked = false;
    }
}

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', addTodo);

// Enter 키로도 추가 가능하도록
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !addBtn.disabled) {
        addTodo();
    }
});

// 페이지 로드 시 초기 상태 설정 (안전장치)
document.addEventListener('DOMContentLoaded', function() {
    // 초기 상태에서 입력 필드가 비어있으면 버튼 비활성화
    if (todoInput.value.trim().length === 0) {
        addBtn.disabled = true;
    }
});
