/**
 * 🌟 초심자를 위한 조건문 실습 - 학습자용
 * 
 * TODO 주석이 있는 부분을 직접 코드로 작성해보세요!
 * reference-script.js 파일에 정답이 있습니다.
 */

// ==========================================
// 📚 기본 데이터 준비 (수정하지 마세요)
// ==========================================

// 사용자 정보 (로그인 테스트용)
const testUsers = [
    { username: 'user1', password: '1234', age: 25, isActive: true },
    { username: 'user2', password: 'pass', age: 17, isActive: false },
    { username: '', password: '1234', age: 30, isActive: true },
    { username: 'admin', password: '', age: 35, isActive: true },
    { username: 'guest', password: 'guest', age: 20, isActive: true }
];

// 상품 정보 (쇼핑몰 예제용)
const products = [
    { name: '노트북', price: 1500000, stock: 5, category: '전자제품' },
    { name: '마우스', price: 30000, stock: 0, category: '액세서리' },
    { name: '키보드', price: 80000, stock: 2, category: '액세서리' },
    { name: '모니터', price: 500000, stock: 10, category: '전자제품' },
    { name: 'USB', price: 15000, stock: 50, category: '액세서리' }
];

// 점수 데이터 (성적 처리용)
const scores = [95, 82, 78, 91, 65, 88, 73, 59, 100, 85];

// ==========================================
// 1️⃣ if문 기초 - 단순 조건
// ==========================================

function learn_basic_if() {
    console.log('\n=== 1. if문 기초 ===');
    console.log('가장 기본적인 조건문을 배워봅시다!\n');
    
    // 예제 1: 나이 확인
    const age = 20;
    console.log('나이:', age);
    
    // TODO: age가 19 이상이면 "✅ 성인입니다." 출력
    // TODO: age가 19 미만이면 "❌ 미성년자입니다." 출력
    
    
    // 예제 2: 재고 확인
    console.log('\n재고 확인:');
    products.forEach(product => {
        console.log(`${product.name}: ${product.stock}개`);
        // TODO: product.stock이 0이면 "  ⚠️ 품절입니다!" 출력
        
    });
    
    // 예제 3: 합격 여부 (60점 이상)
    console.log('\n점수별 합격 여부:');
    scores.forEach(score => {
        console.log(`점수: ${score}`);
        // TODO: score가 60 이상이면 "  ✅ 합격!" 출력
        // TODO: score가 60 미만이면 "  ❌ 불합격" 출력
        
    });
}

// ==========================================
// 2️⃣ if-else문 - 양자택일
// ==========================================

function learn_if_else() {
    console.log('\n=== 2. if-else문 ===');
    console.log('둘 중 하나를 선택하는 조건문입니다.\n');
    
    // 예제 1: 짝수/홀수 판별
    console.log('숫자 판별:');
    for (let i = 1; i <= 5; i++) {
        // TODO: i가 짝수면 "i는 짝수입니다." 출력
        // TODO: i가 홀수면 "i는 홀수입니다." 출력
        // 힌트: i % 2 === 0이면 짝수
        
    }
    
    // 예제 2: 할인 적용
    console.log('\n할인 적용 (10만원 이상 10% 할인):');
    products.forEach(product => {
        // TODO: product.price가 100000 이상이면
        //       할인가격(원가의 90%)을 계산하고 출력
        // TODO: 그렇지 않으면 "할인 없음" 출력
        
    });
    
    // 예제 3: 로그인 가능 여부
    console.log('\n계정 상태:');
    testUsers.forEach(user => {
        // TODO: user.isActive가 true면 "활성 계정 ✅" 출력
        // TODO: 그렇지 않으면 "비활성 계정 ❌" 출력
        
    });
}

// ==========================================
// 3️⃣ else if문 - 다중 조건
// ==========================================

function learn_else_if() {
    console.log('\n=== 3. else if문 ===');
    console.log('여러 조건을 순서대로 확인합니다.\n');
    
    // 예제 1: 성적 등급
    console.log('성적 등급 판정:');
    scores.forEach(score => {
        let grade;
        // TODO: 90점 이상 A, 80점 이상 B, 70점 이상 C, 60점 이상 D, 그 외 F
        
        
        console.log(`${score}점: ${grade}등급`);
    });
    
    // 예제 2: 재고 상태 메시지
    console.log('\n재고 상태:');
    products.forEach(product => {
        let status;
        // TODO: stock이 0이면 "품절 😢"
        // TODO: stock이 3 이하면 "품절임박! 서두르세요! ⚠️"
        // TODO: stock이 10 이하면 "재고 소량 📦"
        // TODO: 그 외는 "재고 충분 ✅"
        
        
        console.log(`${product.name}: ${product.stock}개 - ${status}`);
    });
    
    // 예제 3: 나이대별 분류
    console.log('\n나이대 분류:');
    testUsers.forEach(user => {
        let ageGroup;
        // TODO: 20 미만 "10대", 30 미만 "20대", 40 미만 "30대", 그 외 "40대 이상"
        
        
        console.log(`${user.username || '게스트'} (${user.age}세): ${ageGroup}`);
    });
}

// ==========================================
// 4️⃣ 복합 조건 (AND, OR)
// ==========================================

function learn_complex_conditions() {
    console.log('\n=== 4. 복합 조건 (&&, ||) ===');
    console.log('여러 조건을 조합해서 사용합니다.\n');
    
    // 예제 1: AND 조건 (&&) - 둘 다 참이어야 함
    console.log('로그인 검증 (아이디와 비밀번호 모두 필요):');
    testUsers.forEach(user => {
        // TODO: username과 password가 모두 있으면 "로그인 가능" 출력
        // TODO: 하나라도 없으면 "로그인 정보 불완전" 출력
        
    });
    
    // 예제 2: OR 조건 (||) - 하나라도 참이면 됨
    console.log('\n특별 할인 대상 (고가상품 또는 재고부족):');
    products.forEach(product => {
        // TODO: price가 500000 이상이거나 stock이 3 이하면 "특별할인 대상!" 출력
        // TODO: 그렇지 않으면 "일반 상품" 출력
        
    });
    
    // 예제 3: 복합 조건
    console.log('\n성인 활성 사용자 찾기:');
    testUsers.forEach(user => {
        // TODO: age가 19 이상이고, isActive가 true이고, username이 있으면
        //       "성인 활성 사용자" 출력
        // TODO: 그렇지 않으면 조건에 맞지 않는 이유 출력
        
    });
}

// ==========================================
// 5️⃣ switch문 - 여러 경우의 수
// ==========================================

function learn_switch() {
    console.log('\n=== 5. switch문 ===');
    console.log('여러 값 중 하나를 선택할 때 사용합니다.\n');
    
    // 예제 1: 카테고리별 아이콘
    console.log('카테고리별 아이콘:');
    const categories = ['전자제품', '액세서리', '의류', '식품'];
    categories.forEach(category => {
        let icon;
        // TODO: switch문을 사용하여
        // '전자제품' → '💻', '액세서리' → '🎧', 
        // '의류' → '👕', '식품' → '🍔', 기본값 → '📦'
        
        
        console.log(`${category}: ${icon}`);
    });
    
    // 예제 2: 요일별 할인
    console.log('\n요일별 할인율:');
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    days.forEach(day => {
        let discount;
        // TODO: switch문을 사용하여
        // 월,화: 5%, 수: 10%, 목,금: 7%, 토,일: 15%, 기본값: 0%
        
        
        console.log(`${day}요일: ${discount} 할인`);
    });
}

// ==========================================
// 6️⃣ 삼항 연산자 - 간단한 조건
// ==========================================

function learn_ternary() {
    console.log('\n=== 6. 삼항 연산자 (?:) ===');
    console.log('간단한 조건을 한 줄로 표현합니다.\n');
    
    // 예제 1: 기본 사용법
    console.log('재고 상태 (삼항 연산자):');
    products.forEach(product => {
        // TODO: 삼항 연산자를 사용하여
        // stock이 0보다 크면 '구매가능', 아니면 '품절'
        const status = ''; // 수정하세요
        console.log(`${product.name}: ${status}`);
    });
    
    // 예제 2: 값 할당
    console.log('\n나이별 입장료:');
    testUsers.forEach(user => {
        // TODO: 삼항 연산자를 사용하여
        // age가 19 미만이면 5000, 아니면 10000
        const price = 0; // 수정하세요
        console.log(`${user.username || '게스트'} (${user.age}세): ${price}원`);
    });
}

// ==========================================
// 7️⃣ 실전 예제 1: 로그인 시스템
// ==========================================

function practice_login_system() {
    console.log('\n=== 실전: 로그인 시스템 ===\n');
    
    // 로그인 시도 함수
    function tryLogin(username, password) {
        console.log(`로그인 시도: ${username || '(비어있음)'}`);
        
        // TODO: 1. username이 없으면 "아이디를 입력해주세요." 출력하고 false 반환
        
        
        // TODO: 2. password가 없으면 "비밀번호를 입력해주세요." 출력하고 false 반환
        
        
        // TODO: 3. testUsers에서 username과 일치하는 사용자 찾기
        // 힌트: find 메서드 사용
        const user = null; // 수정하세요
        
        // TODO: 4. user가 없으면 "존재하지 않는 아이디입니다." 출력하고 false 반환
        
        
        // TODO: 5. 비밀번호가 일치하지 않으면 관련 메시지 출력하고 false 반환
        
        
        // TODO: 6. 계정이 비활성화되어 있으면 관련 메시지 출력하고 false 반환
        
        
        // TODO: 7. 미성년자면 "미성년자는 보호자 동의가 필요합니다." 출력
        
        
        // TODO: 8. 로그인 성공 메시지 출력
        
        
        // TODO: 9. admin이면 "관리자 권한" 메시지, 아니면 "일반 사용자" 메시지 출력
        
        
        return true;
    }
    
    // 테스트 케이스
    console.log('--- 테스트 1: 정상 로그인 ---');
    tryLogin('user1', '1234');
    
    console.log('\n--- 테스트 2: 아이디 없음 ---');
    tryLogin('', '1234');
    
    console.log('\n--- 테스트 3: 비밀번호 없음 ---');
    tryLogin('admin', '');
}

// ==========================================
// 8️⃣ 실전 예제 2: 쇼핑몰 장바구니
// ==========================================

function practice_shopping_cart() {
    console.log('\n=== 실전: 쇼핑몰 장바구니 ===\n');
    
    // 장바구니
    const cart = [
        { product: '노트북', quantity: 1, price: 1500000 },
        { product: '마우스', quantity: 2, price: 30000 },
        { product: 'USB', quantity: 5, price: 15000 }
    ];
    
    // 사용자 정보
    const user = {
        name: '김철수',
        grade: 'GOLD',
        points: 50000,
        isMember: true
    };
    
    console.log('장바구니 내역:');
    console.log('================');
    
    let subtotal = 0;
    
    // 각 상품 계산
    cart.forEach(item => {
        // TODO: item.price * item.quantity로 itemTotal 계산
        // TODO: itemTotal을 subtotal에 더하기
        // TODO: 각 상품 정보 출력 (toLocaleString() 사용)
        
    });
    
    console.log('================');
    console.log(`소계: ${subtotal.toLocaleString()}원`);
    
    // 할인 계산
    let discountRate = 0;
    let discountAmount = 0;
    
    // TODO: 1. 회원 등급별 할인율 설정 (user.isMember 확인)
    // TODO: user.grade가 'VIP'면 discountRate = 0.15
    // TODO: user.grade가 'GOLD'면 discountRate = 0.10
    // TODO: user.grade가 'SILVER'면 discountRate = 0.05
    // TODO: 그 외 discountRate = 0.03
    // TODO: discountAmount = subtotal * discountRate로 계산
    // TODO: 회원 할인 정보 출력
    
    
    // TODO: 2. 금액대별 추가 할인
    // TODO: subtotal이 1000000 이상이면 5% 추가 할인
    // TODO: subtotal이 500000 이상이면 3% 추가 할인
    // TODO: extraDiscount를 discountAmount에 더하고 정보 출력
    
    
    // TODO: 3. 배송비 계산
    // TODO: subtotal - discountAmount가 50000 미만이면 shippingFee = 3000
    // TODO: 그렇지 않으면 shippingFee = 0
    // TODO: 배송비 정보 출력
    let shippingFee = 0;
    
    
    // 최종 금액
    const total = subtotal - discountAmount + shippingFee;
    console.log('================');
    console.log(`최종 결제금액: ${total.toLocaleString()}원`);
    
    // TODO: 4. 포인트 사용 가능 여부
    // TODO: user.points가 0보다 크면 사용 가능 포인트 안내
    // TODO: usablePoints = Math.min(user.points, total)
    // TODO: usablePoints가 10000 이상, 5000 이상, 그 미만에 따라 메시지 출력
    
    
    // TODO: 5. 결제 가능 여부 최종 확인
    console.log('\n=== 결제 가능 여부 ===');
    // TODO: total이 0 이하면 "결제 금액 오류" 출력
    // TODO: cart.length가 0이면 "장바구니가 비어있습니다" 출력
    // TODO: !user.isMember이고 total < 30000이면 "비회원은 3만원 이상 구매 가능" 출력
    // TODO: 그 외 "결제 가능합니다!" 출력
    
}

// ==========================================
// 9️⃣ 실전 예제 3: 게임 캐릭터 상태
// ==========================================

function practice_game_character() {
    console.log('\n=== 실전: 게임 캐릭터 상태 시스템 ===\n');
    
    // 캐릭터 정보
    const character = {
        name: '용사',
        level: 15,
        hp: 75,
        maxHp: 100,
        mp: 30,
        maxMp: 50,
        status: 'normal',  // normal, poisoned, frozen, stunned
        inBattle: false
    };
    
    console.log(`캐릭터: ${character.name} (Lv.${character.level})`);
    console.log(`HP: ${character.hp}/${character.maxHp}`);
    console.log(`MP: ${character.mp}/${character.maxMp}`);
    console.log(`상태: ${character.status}`);
    console.log('-------------------\n');
    
    // TODO: 1. HP 상태 확인
    // HP 퍼센트를 계산하고 상태 메시지 출력
    // 0% 이하: 사망, 20% 이하: 위험, 50% 이하: 주의, 80% 이하: 약간 감소, 그 외: 충분
    
    
    // TODO: 2. MP 상태 확인
    // 0%: 스킬 사용 불가, 30% 이하: MP 부족, 그 외: MP 충분
    
    
    // TODO: 3. 상태이상 확인 (switch문 사용)
    // normal: 정상, poisoned: 독, frozen: 얼음, stunned: 기절
    
    
    // TODO: 4. 행동 가능 여부 판단
    console.log('\n=== 가능한 행동 ===');
    
    // 공격 가능 여부
    // HP가 0 이하거나 frozen/stunned 상태면 불가
    
    
    // 스킬 사용 가능 여부
    // HP가 0 이하거나 MP가 10 미만이거나 frozen/stunned 상태면 불가
    
    
    // TODO: 5. 추천 행동 출력
    // HP 상태에 따라 적절한 행동 추천
    
}

// ==========================================
// 🎮 대화형 학습 도우미
// ==========================================

function showHelp() {
    console.log('\n📖 조건문 학습 가이드');
    console.log('=====================================');
    console.log('각 함수를 실행해서 배워보세요!');
    console.log('');
    console.log('🎯 기초 학습:');
    console.log('  learn_basic_if()         - if문 기초');
    console.log('  learn_if_else()          - if-else문');
    console.log('  learn_else_if()          - else if문');
    console.log('  learn_complex_conditions() - 복합 조건 (&&, ||)');
    console.log('  learn_switch()           - switch문');
    console.log('  learn_ternary()          - 삼항 연산자');
    console.log('');
    console.log('💡 실전 예제:');
    console.log('  practice_login_system()  - 로그인 시스템');
    console.log('  practice_shopping_cart() - 쇼핑몰 장바구니');
    console.log('  practice_game_character() - 게임 캐릭터 상태');
    console.log('');
    console.log('📊 데이터 확인:');
    console.log('  testUsers - 사용자 데이터');
    console.log('  products  - 상품 데이터');
    console.log('  scores    - 점수 데이터');
    console.log('');
    console.log('도움말: showHelp()');
    console.log('=====================================');
}

// ==========================================
// 🚀 시작!
// ==========================================

// 페이지 로드시 자동 실행
console.clear();
console.log('%c🌟 초심자를 위한 조건문 학습 시작!', 
            'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%c코드를 완성하고 함수를 실행해보세요!', 
            'color: #FF9800; font-size: 14px;');
console.log('%c정답은 reference-script.js에 있습니다.', 
            'color: #9C27B0; font-size: 12px;');
console.log('');
showHelp();

// 전역 변수로 노출 (콘솔에서 실행 가능)
window.learn_basic_if = learn_basic_if;
window.learn_if_else = learn_if_else;
window.learn_else_if = learn_else_if;
window.learn_complex_conditions = learn_complex_conditions;
window.learn_switch = learn_switch;
window.learn_ternary = learn_ternary;
window.practice_login_system = practice_login_system;
window.practice_shopping_cart = practice_shopping_cart;
window.practice_game_character = practice_game_character;
window.showHelp = showHelp;

// 데이터도 확인할 수 있도록 노출
window.testUsers = testUsers;
window.products = products;
window.scores = scores;