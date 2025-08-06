const API_BASE_URL = 'http://localhost:3001';

const fetchUsersBtn = document.getElementById('fetch-users');
const usersStatus = document.getElementById('users-status');
const usersResult = document.getElementById('users-result');

const limitInput = document.getElementById('limit-input');
const fetchAllPostsBtn = document.getElementById('fetch-all-posts');
const allPostsStatus = document.getElementById('all-posts-status');
const allPostsResult = document.getElementById('all-posts-result');

function showStatus(elem, msg, type){
    elem.className = `status status--${type}`;
    elem.textContent = `${msg}`;
}

async function fetchUsers () {
    console.log('유저 조회 기능 실행!')

    showStatus(usersStatus, `유저 정보 불러오는 중...`, 'loading');
    usersResult.innerHTML = "";

    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        
        if(!response.ok){
            throw new Error(`HTTP ERROR : ${response.status}`);
        }        

        const users = await response.json();
        showStatus(usersStatus, `${users.length}명의 데이터를 조회했습니다.`, 'success');

        const usersHTML = users.map(item => 
            `
                <div class="result-card">
                    <h4>${item.name}</h4>
                    <p>${item.username}</p>
                </div>
            `
        ).join('');

        usersResult.innerHTML = usersHTML;

    } catch (err) {
        showStatus(usersStatus, `에러코드 : ${err.message}`, 'error');
        console.log('유저 조회 실패');
    }
}

async function fetchAllPosts () {
    console.log('게시글 전체 조회 기능 실행됌!')

    const limit = limitInput.value.trim();



    try {
        const url = limit 
            ? `${API_BASE_URL}/posts?_limit=${limit}`
            : `${API_BASE_URL}/posts`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTML ERROR : ${response.status}`);
        }

        const posts = await response.json();

        const statusMessage = limit 
            ? `${posts.length}개의 게시글을 불러왔습니다 (제한: ${limit}개)`
            : `${posts.length}개의 게시글을 모두 불러왔습니다.`;

        showStatus(allPostsStatus, statusMessage, "success");

        const postsHTML = posts.map(item => 
            `
                <div class="result-card">
                    <h4>${item.title}</h4>
                    <p>${item.body}</p>
                </div>
            `
        ).join('');

        allPostsResult.innerHTML = postsHTML;

    } catch(err) {
        showStatus(allPostsStatus, `에러메시지 : ${err.message}`, "error");
        console.log('전체 게시글 불러오기 실패');
    }
}

fetchUsersBtn.addEventListener('click', fetchUsers);
fetchAllPostsBtn.addEventListener('click', fetchAllPosts);


class GetFetcher {
    constructor(url, { btn, status, result, makeCard, getUrlParams = () => '' }) {
        this.url = url;
        this.btn = document.querySelector(btn);
        this.statusElem = document.querySelector(status);
        this.resultElem = document.querySelector(result);
        this.makeCard = makeCard;
        this.getUrlParams = getUrlParams;

        if (!this.btn || !this.statusElem || !this.resultElem) {
            throw new Error("필수 DOM 요소를 찾을 수 없습니다.");
        }

        this.btn.addEventListener('click', () => this.fetch());
    }

    showStatus(msg, type) {
        this.statusElem.className = `status status--${type}`;
        this.statusElem.textContent = msg;
    }

    async fetch() {
        const fullUrl = `${this.url}${this.getUrlParams()}`;
        this.showStatus("데이터 불러오는 중...", "loading");
        this.resultElem.innerHTML = "";

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status}`);
            }

            const data = await response.json();
            this.showStatus(`${data.length}개의 데이터를 불러왔습니다.`, "success");

            const cards = data.map(this.makeCard).join('');
            this.resultElem.innerHTML = cards;

        } catch (err) {
            this.showStatus(`에러: ${err.message}`, "error");
            console.error("데이터 불러오기 실패", err);
        }
    }
}


