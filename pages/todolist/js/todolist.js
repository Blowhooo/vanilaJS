// 간단한 TodoList API 클라이언트
// JSON Server를 사용: http://localhost:3001

const API_URL = 'http://localhost:3001/todos';

// =============================================================================
// 유틸리티 함수들
// =============================================================================

// 상태 메시지 표시
function showStatus(element, message, type = 'loading') {
    if (!element) return;
    element.className = `status status--${type}`;
    element.textContent = message;
    element.style.display = 'block';
}

// 상태 메시지 숨기기
function hideStatus(element) {
    if (!element) return;
    element.style.display = 'none';
}

// 시간 포맷팅
function formatTime(date) {
    return new Date(date).toLocaleString('ko-KR');
}

// 에러 처리
function handleError(error, statusElement) {
    console.error('API Error:', error);
    let message = '알 수 없는 오류가 발생했습니다.';
    
    if (error.name === 'TypeError') {
        message = 'JSON Server가 실행중인지 확인해주세요. (localhost:3001)';
    } else if (error.message.includes('404')) {
        message = '할 일을 찾을 수 없습니다.';
    } else if (error.message) {
        message = error.message;
    }
    
    showStatus(statusElement, `오류: ${message}`, 'error');
}

// =============================================================================
// API 함수들 (GET, POST, PUT, DELETE)
// =============================================================================

// GET: 모든 할 일 가져오기
async function getTodos() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// GET: 특정 할 일 가져오기
async function getTodo(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// POST: 새 할 일 생성
async function createTodo(todoData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...todoData,
            completed: false,
            createdAt: new Date().toISOString()
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// PUT: 할 일 수정
async function updateTodo(id, todoData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...todoData,
            updatedAt: new Date().toISOString()
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// DELETE: 할 일 삭제
async function deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}

// =============================================================================
// 할 일 작성 페이지 함수들 (write.html)
// =============================================================================

// 새 할 일 추가
async function addTodo() {
    const title = document.getElementById('todo-title').value.trim();
    const description = document.getElementById('todo-description').value.trim();
    const priority = document.getElementById('todo-priority').value;
    const statusEl = document.getElementById('write-status');
    const resultEl = document.getElementById('write-result');
    
    // 간단한 유효성 검사
    if (!title) {
        showStatus(statusEl, '할 일 제목을 입력해주세요.', 'error');
        return;
    }
    
    if (title.length < 2) {
        showStatus(statusEl, '제목은 2글자 이상이어야 합니다.', 'error');
        return;
    }
    
    showStatus(statusEl, '할 일을 추가하는 중...', 'loading');
    resultEl.innerHTML = '';
    
    try {
        const newTodo = await createTodo({
            title: title,
            description: description,
            priority: priority
        });
        
        showStatus(statusEl, '할 일이 성공적으로 추가되었습니다!', 'success');
        
        // 결과 표시
        resultEl.innerHTML = `
            <div class="result-success">
                <h4>✅ 할 일이 추가되었습니다</h4>
                <p><strong>제목:</strong> ${newTodo.title}</p>
                <p><strong>설명:</strong> ${newTodo.description || '없음'}</p>
                <p><strong>우선순위:</strong> ${getPriorityText(newTodo.priority)}</p>
                <p><small>생성 시간: ${formatTime(newTodo.createdAt)}</small></p>
            </div>
        `;
        
        // 폼 초기화
        clearForm();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 폼 초기화
function clearForm() {
    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';
    document.getElementById('todo-priority').value = 'medium';
}

// 빠른 추가
function quickAdd(title, priority) {
    document.getElementById('todo-title').value = title;
    document.getElementById('todo-priority').value = priority;
    document.getElementById('todo-title').focus();
}

// 우선순위 텍스트 변환
function getPriorityText(priority) {
    const priorityMap = {
        'high': '높음 🔴',
        'medium': '보통 🟡',
        'low': '낮음 🟢'
    };
    return priorityMap[priority] || priority;
}

// =============================================================================
// 할 일 목록 페이지 함수들 (list.html)
// =============================================================================

let currentFilter = 'all';
let currentEditingId = null;

// 할 일 목록 로드
async function loadTodos() {
    const statusEl = document.getElementById('todos-status');
    const listEl = document.getElementById('todos-list');
    
    showStatus(statusEl, '할 일 목록을 불러오는 중...', 'loading');
    
    try {
        const todos = await getTodos();
        
        hideStatus(statusEl);
        displayTodos(todos);
        updateStats(todos);
        
    } catch (error) {
        handleError(error, statusEl);
        listEl.innerHTML = '<div class="empty-state"><h3>할 일을 불러올 수 없습니다</h3><p>JSON Server가 실행중인지 확인해주세요.</p></div>';
    }
}

// 할 일 목록 표시
function displayTodos(todos) {
    const listEl = document.getElementById('todos-list');
    
    // 필터 적용
    const filteredTodos = filterTodos(todos, currentFilter);
    
    if (filteredTodos.length === 0) {
        listEl.innerHTML = `
            <div class="empty-state">
                <h3>😴 할 일이 없습니다</h3>
                <p>새로운 할 일을 추가해보세요!</p>
                <a href="write.html" class="btn btn-primary">📝 할 일 추가하기</a>
            </div>
        `;
        return;
    }
    
    listEl.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}" data-id="${todo.id}">
            <div class="todo-header">
                <div class="todo-title">${todo.title}</div>
                <div class="todo-actions">
                    <button class="todo-btn btn-success" onclick="toggleComplete(${todo.id}, ${!todo.completed})">
                        ${todo.completed ? '↩️' : '✅'}
                    </button>
                    <button class="todo-btn btn-primary" onclick="editTodo(${todo.id})">✏️</button>
                    <button class="todo-btn btn-danger" onclick="removeTodo(${todo.id})">🗑️</button>
                </div>
            </div>
            ${todo.description ? `<div class="todo-description">${todo.description}</div>` : ''}
            <div class="todo-meta">
                <span class="priority-badge priority-${todo.priority}">${getPriorityText(todo.priority)}</span>
                <span>생성: ${formatTime(todo.createdAt)}</span>
            </div>
        </div>
    `).join('');
}

// 할 일 필터링
function filterTodos(todos, filter) {
    switch (filter) {
        case 'completed':
            return todos.filter(todo => todo.completed);
        case 'pending':
            return todos.filter(todo => !todo.completed);
        case 'high':
            return todos.filter(todo => todo.priority === 'high');
        default:
            return todos;
    }
}

// 통계 업데이트
function updateStats(todos) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    document.getElementById('total-todos').textContent = total;
    document.getElementById('completed-todos').textContent = completed;
    document.getElementById('pending-todos').textContent = pending;
}

// 완료 상태 토글
async function toggleComplete(id, completed) {
    const statusEl = document.getElementById('todos-status');
    
    try {
        const todo = await getTodo(id);
        await updateTodo(id, { ...todo, completed: completed });
        
        showStatus(statusEl, completed ? '할 일을 완료했습니다!' : '할 일을 미완료로 변경했습니다.', 'success');
        setTimeout(() => hideStatus(statusEl), 2000);
        
        loadTodos(); // 목록 새로고침
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 할 일 삭제
async function removeTodo(id) {
    if (!confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
        return;
    }
    
    const statusEl = document.getElementById('todos-status');
    
    try {
        await deleteTodo(id);
        
        showStatus(statusEl, '할 일이 삭제되었습니다.', 'success');
        setTimeout(() => hideStatus(statusEl), 2000);
        
        loadTodos(); // 목록 새로고침
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 할 일 수정 모달 열기
async function editTodo(id) {
    const modal = document.getElementById('edit-modal');
    const statusEl = document.getElementById('todos-status');
    
    try {
        const todo = await getTodo(id);
        
        // 폼에 데이터 채우기
        document.getElementById('edit-title').value = todo.title;
        document.getElementById('edit-description').value = todo.description || '';
        document.getElementById('edit-priority').value = todo.priority;
        
        currentEditingId = id;
        modal.style.display = 'block';
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 할 일 수정 저장
async function saveEdit() {
    if (!currentEditingId) return;
    
    const title = document.getElementById('edit-title').value.trim();
    const description = document.getElementById('edit-description').value.trim();
    const priority = document.getElementById('edit-priority').value;
    const statusEl = document.getElementById('todos-status');
    
    if (!title) {
        alert('제목을 입력해주세요.');
        return;
    }
    
    try {
        const todo = await getTodo(currentEditingId);
        await updateTodo(currentEditingId, {
            ...todo,
            title: title,
            description: description,
            priority: priority
        });
        
        showStatus(statusEl, '할 일이 수정되었습니다.', 'success');
        setTimeout(() => hideStatus(statusEl), 2000);
        
        closeModal();
        loadTodos(); // 목록 새로고침
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    currentEditingId = null;
}

// 필터 설정
function setFilter(filter) {
    currentFilter = filter;
    
    // 버튼 활성화 상태 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    loadTodos(); // 필터 적용된 목록 로드
}

// =============================================================================
// 일괄 작업 함수들
// =============================================================================

// 모든 할 일 완료
async function completeAll() {
    if (!confirm('모든 할 일을 완료로 표시하시겠습니까?')) {
        return;
    }
    
    const statusEl = document.getElementById('todos-status');
    showStatus(statusEl, '모든 할 일을 완료 처리하는 중...', 'loading');
    
    try {
        const todos = await getTodos();
        const pendingTodos = todos.filter(todo => !todo.completed);
        
        // 모든 미완료 할 일을 완료로 변경
        await Promise.all(
            pendingTodos.map(todo => 
                updateTodo(todo.id, { ...todo, completed: true })
            )
        );
        
        showStatus(statusEl, `${pendingTodos.length}개의 할 일을 완료했습니다!`, 'success');
        setTimeout(() => hideStatus(statusEl), 3000);
        
        loadTodos();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 완료된 할 일 모두 삭제
async function deleteCompleted() {
    if (!confirm('완료된 모든 할 일을 삭제하시겠습니까?')) {
        return;
    }
    
    const statusEl = document.getElementById('todos-status');
    showStatus(statusEl, '완료된 할 일을 삭제하는 중...', 'loading');
    
    try {
        const todos = await getTodos();
        const completedTodos = todos.filter(todo => todo.completed);
        
        if (completedTodos.length === 0) {
            showStatus(statusEl, '삭제할 완료된 할 일이 없습니다.', 'info');
            setTimeout(() => hideStatus(statusEl), 2000);
            return;
        }
        
        // 모든 완료된 할 일 삭제
        await Promise.all(
            completedTodos.map(todo => deleteTodo(todo.id))
        );
        
        showStatus(statusEl, `${completedTodos.length}개의 완료된 할 일을 삭제했습니다!`, 'success');
        setTimeout(() => hideStatus(statusEl), 3000);
        
        loadTodos();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// 모든 할 일 삭제
async function deleteAll() {
    if (!confirm('정말로 모든 할 일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        return;
    }
    
    const statusEl = document.getElementById('todos-status');
    showStatus(statusEl, '모든 할 일을 삭제하는 중...', 'loading');
    
    try {
        const todos = await getTodos();
        
        // 모든 할 일 삭제
        await Promise.all(
            todos.map(todo => deleteTodo(todo.id))
        );
        
        showStatus(statusEl, `${todos.length}개의 할 일을 모두 삭제했습니다!`, 'success');
        setTimeout(() => hideStatus(statusEl), 3000);
        
        loadTodos();
        
    } catch (error) {
        handleError(error, statusEl);
    }
}

// =============================================================================
// 이벤트 리스너 및 초기화
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // write.html 페이지의 이벤트들
    if (document.getElementById('todo-form')) {
        // 할 일 추가 폼
        document.getElementById('todo-form').addEventListener('submit', function(e) {
            e.preventDefault();
            addTodo();
        });
        
        // 폼 초기화 버튼
        document.getElementById('clear-form').addEventListener('click', clearForm);
        
        // 빠른 추가 버튼들
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const title = this.dataset.title;
                const priority = this.dataset.priority;
                quickAdd(title, priority);
            });
        });
    }
    
    // list.html 페이지의 이벤트들
    if (document.getElementById('todos-list')) {
        // 필터 버튼들
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                setFilter(filter);
            });
        });
        
        // 새로고침 버튼
        document.getElementById('refresh-todos').addEventListener('click', loadTodos);
        
        // 일괄 작업 버튼들
        document.getElementById('complete-all').addEventListener('click', completeAll);
        document.getElementById('delete-completed').addEventListener('click', deleteCompleted);
        document.getElementById('delete-all').addEventListener('click', deleteAll);
        
        // 모달 관련 이벤트들
        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById('cancel-edit').addEventListener('click', closeModal);
        document.getElementById('save-edit').addEventListener('click', saveEdit);
        
        // 모달 외부 클릭시 닫기
        document.getElementById('edit-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // 초기 데이터 로드
        loadTodos();
    }
    
    console.log('🚀 간단한 TodoList가 로드되었습니다!');
    console.log('💡 기능: GET(조회), POST(생성), PUT(수정), DELETE(삭제)');
    console.log('📋 JSON Server 실행 명령: json-server --watch db.json --port 3001');
});

// 전역 함수로 노출 (HTML에서 onclick으로 호출하기 위해)
window.toggleComplete = toggleComplete;
window.removeTodo = removeTodo;
window.editTodo = editTodo;
window.saveEdit = saveEdit;
window.closeModal = closeModal;