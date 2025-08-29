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
    // TODO: products를 반복문 돌리기
    // TODO: 각 product의 name과 stock 출력
    // TODO: stock이 0이면 "  ⚠️ 품절입니다!" 출력
    
    // 예제 3: 합격 여부 (60점 이상)
    console.log('\n점수별 합격 여부:');
    // TODO: scores 배열 반복문 작성
    // TODO: 각 점수 출력하고 60점 기준으로 합격/불합격 판정
}

// ==========================================
// 2️⃣ if-else문 - 양자택일
// ==========================================

function learn_if_else() {
    console.log('\n=== 2. if-else문 ===');
    console.log('둘 중 하나를 선택하는 조건문입니다.\n');
    
    // 예제 1: 짝수/홀수 판별
    console.log('숫자 판별:');
    // TODO: 1부터 5까지 반복문 작성
    // TODO: 각 숫자가 짝수인지 홀수인지 판별해서 출력
    
    // 예제 2: 할인 적용
    console.log('\n할인 적용 (10만원 이상 10% 할인):');
    // TODO: products 반복문으로 10만원 이상 상품에 10% 할인 적용
    
    // 예제 3: 로그인 가능 여부
    console.log('\n계정 상태:');
    // TODO: testUsers 반복문으로 각 유저의 isActive 상태 확인
}

// ==========================================
// 3️⃣ else if문 - 다중 조건
// ==========================================

function learn_else_if() {
    console.log('\n=== 3. else if문 ===');
    console.log('여러 조건을 순서대로 확인합니다.\n');
    
    // 예제 1: 성적 등급
    console.log('성적 등급 판정:');
    // TODO: scores 반복문으로 각 점수를 A-F 등급으로 변환
    // TODO: 등급 기준은 10점 단위
    
    // 예제 2: 재고 상태 메시지
    console.log('\n재고 상태:');
    // TODO: products 반복문으로 재고량에 따른 상태 메시지 출력
    // TODO: 0개, 3개 이하, 10개 이하, 그 이상으로 구분
    
    // 예제 3: 나이대별 분류
    console.log('\n나이대 분류:');
    // TODO: testUsers 반복문으로 각 유저를 나이대별로 분류
}

// ==========================================
// 4️⃣ 복합 조건 (AND, OR)
// ==========================================

function learn_complex_conditions() {
    console.log('\n=== 4. 복합 조건 (&&, ||) ===');
    console.log('여러 조건을 조합해서 사용합니다.\n');
    
    // 예제 1: AND 조건 (&&) - 둘 다 참이어야 함
    console.log('로그인 검증 (아이디와 비밀번호 모두 필요):');
    // TODO: testUsers 반복문으로 username과 password 둘 다 있는지 확인
    
    // 예제 2: OR 조건 (||) - 하나라도 참이면 됨
    console.log('\n특별 할인 대상 (고가상품 또는 재고부족):');
    // TODO: products 반복문 돌리기
    // TODO: price가 500000 이상이거나 stock이 3 이하면 "특별할인 대상!" 출력
    // TODO: 그렇지 않으면 "일반 상품" 출력
    
    // 예제 3: 복합 조건
    console.log('\n성인 활성 사용자 찾기:');
    // TODO: testUsers 반복문으로 세 가지 조건 모두 만족하는 유저 찾기
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
    // TODO: categories 반복문과 switch문으로 각 카테고리에 맞는 아이콘 할당
    
    // 예제 2: 요일별 할인
    console.log('\n요일별 할인율:');
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    // TODO: days 반복문과 switch문으로 요일별 할인율 설정
}

// ==========================================
// 6️⃣ 삼항 연산자 - 간단한 조건
// ==========================================

function learn_ternary() {
    console.log('\n=== 6. 삼항 연산자 (?:) ===');
    console.log('간단한 조건을 한 줄로 표현합니다.\n');
    
    // 예제 1: 기본 사용법
    console.log('재고 상태 (삼항 연산자):');
    // TODO: products 반복문과 삼항 연산자로 재고 상태 표시
    
    // 예제 2: 값 할당
    console.log('\n나이별 입장료:');
    // TODO: testUsers 반복문과 삼항 연산자로 나이별 입장료 계산
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
    
    // TODO: cart 반복문으로 각 상품의 총 가격 계산하고 출력, subtotal에 누적

    cart.forEach(item => {
        const totalAmount = item.price * item.quantity;
        subtotal += totalAmount
        console.log(`${item.product}: ${item.price}원 + ${item.quantity}개 = ${item.quantity}원`)
    })
    
    console.log('================');
    console.log(`소계: ${subtotal.toLocaleString()}원`);
    
    // 할인 계산
    let discountRate = 0;
    let discountAmount = 0;
    
    // TODO: 회원 여부와 등급에 따른 할인 적용
    if (user.grade === 'VIP'){
        discountRate = 0.15;
    } else if (user.grade === 'GOLD'){
        discountRate = 0.10;
    } else if (user.grade === 'SILVER'){
        discountRate = 0.05;
    } else {
        discountRate = 0.03;
    }
    
    discountAmount += subtotal * discountRate
    
    // TODO: 금액대별 추가 할인 적용

    if (subtotal >= 1000000) {
        const extraDiscount = 0.05;
        discountAmount += subtotal * extraDiscount
        console.log(`100만원 이상 구매시 ${extraDiscount} 추가 할인으로 총 ${discountAmount} 할인`)
    } else if (subtotal >= 500000){
        const extraDiscount = 0.03;
        discountAmount += subtotal * extraDiscount
        console.log(`50만원 이상 구매시 ${extraDiscount} 추가 할인으로 총 ${discountAmount} 할인`)
    }
    
    // TODO: 할인 후 금액에 따른 배송비 결정
    let shippingFee = 0;
    
    if (subtotal - discountAmount < 50000){
        shippingFee = 3000;
        console.log(`할인된 총 가격이 5만원 미만이면 배송비가 ${shippingFee}월 붙습니다.`)
    } else {
        shippingFee = 0;
        console.log('배송비 무료')
    }
    
    // 최종 금액
    const total = subtotal - discountAmount + shippingFee;
    console.log('================');
    console.log(`최종 결제금액: ${total.toLocaleString()}원`);
    
    // TODO: 포인트 사용 안내
    if (user.points >= 10000){
        console.log('포인트 10,000만이상 보유 및 사용가능')
    } else if (user.points >= 5000) {
        console.log('포인트 5,000만이상 보유 및 사용가능')
    } else {
        console.log('포인트 5,000만이상 부터 사용가능합니다.')
    }
    
    // TODO: 결제 가능 여부 판단
    console.log('\n=== 결제 가능 여부 ===');
    if (total <= 0){
        console.log('결재 금액 오류')
    } else if (cart.length > 0) {
        console.log('장바구니가 비어있습니다.')
    } else if (!user.isMember || total < 30000){
        console.log('비회원일 경우에 30000만원 이상부터 구매 가능')
    } else {
        console.log('구매가능')
    }
    
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
    
    // TODO: HP 퍼센트 계산 후 상태별 메시지 출력
    const hpPercent = (character.hp / character.maxHp) * 100
    
    if (hpPercent <= 0){
        console.log('사망하였습니다.')
    } else if (hpPercent <= 20){
        console.log('피가 20% 이하입니다. 위헙하오니 물약을 드시와요')
    } else if (hpPercent <= 50){
        console.log('피가 50% 이하입니다. 주의하세요.')
    } else if (hpPercent <= 80){
        console.log('피가 80% 이하입니다.')
    } else {
        console.log('피가 충분합니다.')
    }
    
    // TODO: MP 퍼센트 계산 후 상태 출력
    // 0%: 스킬 사용 불가, 30% 이하: MP 부족, 그 외: MP 충분
    const mpPercent = (character.mp / character.maxMp) * 100
    if (mpPercent <= 0){
        console.log('마나가 없습니다.')
    } else if (mpPercent <= 30){
        console.log('마나가 30% 이하입니다. 마나가 충분하지 않습니다.')
    } else {
        console.log('마나가 충분합니다.')
    }
    
    // TODO: character.status를 switch문으로 확인
    switch(character.status) {
        case 'normal':
            console.log('정상입니다.');
            break;
        case 'poisoned':
            console.log('독에 중독되었습니다.');
            break;
        case 'frozen':
            console.log('얼었습니다.');
            break;
        case 'stunned':
            console.log('기절했습니다.');
            break;
        default:
            console.log('알 수 없는 상태');
    }
    
    
    // TODO: 4. 행동 가능 여부 판단
    console.log('\n=== 가능한 행동 ===');
    
    // TODO: 공격 가능 조건 확인

    if (hpPercent >= 0) {
        console.log('캐릭터가 사망하였습니다.')
    } else if (character.status === 'frozen' && character.status === 'stunned'){
        console.log('빙결/스턴상태로 공격불가')
    } else {
        console.log('공격 가능')
    }
    
    // TODO: 스킬 사용 가능 조건 확인
     
    if (hpPercent >= 0){
        console.log('캐릭터가 사망하였습니다.')
    } else if (mpPercent >= 0) {
        console.log('마나가 부족하여 스킬을 사용할 수 없습니다.')
    } else if (character.status === 'frozen' && character.status === 'stunned') {
        console.log('빙결/스턴상태로 스킬 사용불가')
    } else {
        console.log('스킬 사용가능')
    }
    
    // TODO: 아이템 사용 가능 여부

    if (hpPercent >= 0){
        console.log('캐릭터가 사망하였습니다.')
    } else if (character.status === 'frozen') {
         console.log('빙결상태로 아이템 사용불가')
    } else {
        console.log('아이템 사용가능')
    }

    // TODO: 도망 가능 여부

    if (hpPercent >= 0){
        console.log('캐릭터가 사망하였습니다.')
    } else if (!character.inBattle) {
        console.log('캐릭터가 전투중이 아니어서 도망갈 수 없습니다.')
    } else if (character.status === 'frozen' && character.status === 'stunned') {
        console.log('빙결/스턴상태로 도망갈 수 없습니다.')
    } else if (hpPercent >= 30) {
        console.log('도망갈 수 있습니다. (HP가 30% 아래면 도망확률 UP)')
    } else {
        console.log('도망갈 수 있습니다.')
    }

    // TODO: 추천 행동

    if (hpPercent >= 0){
        console.log('캐릭터가 사망하였으니 팀원들을 기다리십시오')
    } else if (hpPercent >= 30){
        console.log('HP가 30% 아래입니다. 물약을 드십시오')
    } else if (!character.status === 'normal'){
        console.log('상태이상관련 물약을 드세요')
    } else if (mpPercent >= 30){
        console.log('마나가 없으니 일반공격을 하세요.')
    } else {
        console.log('자유롭게 행동하세요.')
    }
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