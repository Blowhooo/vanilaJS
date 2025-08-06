
const API_URL = "http://localhost:3001";
const fetchUsersBtn = document.getElementById('fetch-users');
const usersStatus = document.getElementById('users-status');
const usersResult = document.getElementById('users-result');

function showStatus(element, msg, type){
    element.className = `status status--${type}`
    element.innerText = msg;
}

async function fetchUser(){
    console.log('모든 사용자의 데이터를 조회하겠습니다.');

    showStatus(usersStatus, "데이터를 불러오는 중입니다..", "loading");
    usersResult.innerHTML = "";

    try{
        const response = await fetch(`${API_URL}/users`);
        
        if(!response.ok){
            throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const users = await response.json();

        if(!users) {
            showStatus(usersStatus, "파싱 실패했습니다", "error");
            return;
        }

        showStatus(usersStatus, `${users.length}명의 데이터를 조회했습니다`, 'success');
        
        const usersHTML = users.map(item => `
            <div class="result-card">
                <h4>${item.name}</h4>
                <p>${item.username}</p>
            </div>
        `).join('');
        
        usersResult.innerHTML = usersHTML;

    } catch(error) {
        showStatus(usersStatus, `에러 코드 : ${error.message}`, 'error');
    }
}

fetchUsersBtn.addEventListener('click', fetchUser);