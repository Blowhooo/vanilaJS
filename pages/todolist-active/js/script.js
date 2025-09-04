// DOM 요소 선택
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 입력 필드 이벤트 리스너 - 입력값에 따라 버튼 활성화/비활성화
todoInput.addEventListener('input', function() {
    // 입력값에서 앞뒤 공백 제거 후 확인
    const trimmedValue = this.value.trim();
    
    // trim된 값이 있으면 버튼 활성화, 없으면 비활성화
    if (trimmedValue.length > 0) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
});

// 할 일 추가 함수
function addTodo() {
    const selectAll = document.querySelector('#selectAllCheckbox');
    const todoText = todoInput.value.trim();

    if(selectAll) selectAll.checked = false;
    
    // 빈 값이면 추가하지 않음
    if (todoText === '') {
        return;
    }
    
    // 새로운 할 일 아이템 생성
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    
    // 선택용 체크박스 생성
    const selectCheckbox = document.createElement('input');
    selectCheckbox.type = 'checkbox';
    selectCheckbox.className = 'select-checkbox';
    selectCheckbox.title = '아이템 선택';
    
    // 할 일 텍스트 생성
    const todoTextSpan = document.createElement('span');
    todoTextSpan.className = 'todo-text';
    todoTextSpan.textContent = todoText;
    
    // 완료 버튼 생성 (체크박스를 버튼처럼 사용)
    const completeBtn = document.createElement('button');
    completeBtn.type = 'button';
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = '완료';
    
    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    
    // 완료 버튼 클릭 이벤트
    completeBtn.addEventListener('click', function() {
        if (todoItem.classList.contains('completed')) {
            todoItem.classList.remove('completed');
            completeBtn.textContent = '완료';
            completeBtn.classList.remove('active');
        } else {
            todoItem.classList.add('completed');
            completeBtn.textContent = '취소';
            completeBtn.classList.add('active');
        }
    });
    
    // 선택 체크박스 이벤트 (선택된 아이템 표시)
    selectCheckbox.addEventListener('change', function() {
        if (this.checked) {
            todoItem.classList.add('selected');
        } else {
            todoItem.classList.remove('selected');
        }
        updateSelectAllCheckbox();
    });
    
    // 삭제 버튼 이벤트
    deleteBtn.addEventListener('click', function() {
        todoItem.remove();
        updateBulkControls();
    });
    
    // 요소들을 할 일 아이템에 추가
    todoItem.appendChild(selectCheckbox);
    todoItem.appendChild(todoTextSpan);
    todoItem.appendChild(completeBtn);
    todoItem.appendChild(deleteBtn);
    
    // 할 일 목록에 추가
    todoList.appendChild(todoItem);
    
    // 입력 필드 초기화
    todoInput.value = '';
    addBtn.disabled = true;
    
    // 벌크 컨트롤 업데이트
    updateBulkControls();
}

// 벌크 컨트롤 업데이트 함수
function updateBulkControls() {
    const todoItems = document.querySelectorAll('.todo-item');
    const bulkControlsWrap = document.querySelector('.bulk-controls-wrap');
    
    if (todoItems.length >= 2) {
        // 벌크 컨트롤이 없으면 생성
        if (!bulkControlsWrap) {
            createBulkControls();
        }
    } else {
        // 아이템이 2개 미만이면 벌크 컨트롤 제거
        if (bulkControlsWrap) {
            bulkControlsWrap.remove();
        }
    }
}

// 벌크 컨트롤 생성 함수
function createBulkControls() {
    // 이미 있으면 생성하지 않음
    if (document.querySelector('.bulk-controls-wrap')) {
        return;
    }
    
    // 벌크 컨트롤 wrap 생성
    const bulkControlsWrap = document.createElement('div');
    bulkControlsWrap.className = 'bulk-controls-wrap';
    
    // 전체 선택 체크박스 생성
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'selectAllCheckbox';
    selectAllCheckbox.className = 'select-all-checkbox';
    
    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'selectAllCheckbox';
    selectAllLabel.textContent = '전체 선택';
    selectAllLabel.className = 'select-all-label';
    
    // 선택 삭제 버튼 생성
    const deleteSelectedBtn = document.createElement('button');
    deleteSelectedBtn.type = 'button';
    deleteSelectedBtn.className = 'delete-selected-btn';
    deleteSelectedBtn.textContent = '선택 삭제';
    
    // 전체 선택 체크박스 이벤트
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.select-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            const todoItem = checkbox.parentElement;
            if (this.checked) {
                todoItem.classList.add('selected');
            } else {
                todoItem.classList.remove('selected');
            }
        });
    });
    
    // 선택 삭제 버튼 이벤트
    deleteSelectedBtn.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.todo-item.selected');
        if (selectedItems.length > 0) {
            if (confirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`)) {
                selectedItems.forEach(item => item.remove());
                updateBulkControls();
            }
        } else {
            alert('선택된 항목이 없습니다.');
        }
    });
    
    // 요소들을 wrap에 추가
    bulkControlsWrap.appendChild(selectAllCheckbox);
    bulkControlsWrap.appendChild(selectAllLabel);
    bulkControlsWrap.appendChild(deleteSelectedBtn);
    
    // todoList 다음에 추가
    todoList.parentNode.insertBefore(bulkControlsWrap, todoList.nextSibling);
}

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