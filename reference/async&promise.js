// 🔥 같은 기능을 하는 두 가지 방법 비교

// ========================================
// 1️⃣ Promise.then 방식 (구식)
// ========================================
function getUsersWithPromise() {
    console.log('🔵 Promise 방식 시작');
    
    fetch('http://localhost:3001/users')           // 1. 서버에 요청
        .then(response => {                         // 2. 응답이 오면 실행
            console.log('📡 응답 받음:', response);
            return response.json();                 // 3. JSON으로 변환 (또 비동기!)
        })
        .then(users => {                           // 4. JSON 변환이 끝나면 실행
            console.log('📋 사용자 데이터:', users);
            
            const html = users.map(user => {       // 5. HTML 생성
                return `<p>${user.name}</p>`;
            }).join('');
            
            console.log('🎨 HTML 완성:', html);
            document.body.innerHTML = html;        // 6. 화면에 표시
        })
        .catch(error => {                          // 7. 에러 처리
            console.error('❌ 에러:', error);
        });
    
    console.log('🔵 Promise 함수 끝 (하지만 데이터는 아직 안 옴!)');
}

// ========================================
// 2️⃣ async/await 방식 (신식)
// ========================================
async function getUsersWithAsync() {
    console.log('🟢 async/await 방식 시작');
    
    try {
        const response = await fetch('http://localhost:3001/users');  // 1. 서버에 요청하고 기다림
        console.log('📡 응답 받음:', response);
        
        const users = await response.json();                          // 2. JSON 변환하고 기다림
        console.log('📋 사용자 데이터:', users);
        
        const html = users.map(user => {                              // 3. HTML 생성
            return `<p>${user.name}</p>`;
        }).join('');
        
        console.log('🎨 HTML 완성:', html);
        document.body.innerHTML = html;                               // 4. 화면에 표시
        
    } catch (error) {                                                 // 5. 에러 처리
        console.error('❌ 에러:', error);
    }
    
    console.log('🟢 async/await 함수 끝 (모든 작업 완료!)');
}

// ========================================
// 🎯 핵심 차이점
// ========================================

/*
📝 Promise.then 방식:
- 📚 책 읽기처럼 "다음 페이지, 다음 페이지..." 연결
- 🔗 .then().then().then() 체인 형태
- 😵 복잡해지면 "콜백 지옥" 발생
- 🏃‍♂️ 함수가 끝나도 비동기 작업은 계속 진행

📝 async/await 방식:
- 📖 일반 책 읽기처럼 위에서 아래로 순서대로
- ⏸️ await에서 멈춰서 기다림
- 😎 코드가 깔끔하고 이해하기 쉬움
- ✅ 함수가 끝나면 모든 작업 완료
*/

// ========================================
// 🚀 실행해보기
// ========================================

// Promise 방식 실행
// getUsersWithPromise();

// async/await 방식 실행  
// getUsersWithAsync();

// 💡 개발자 도구에서 위 함수들을 실행해보고 
//    console.log 순서의 차이를 확인해보세요!