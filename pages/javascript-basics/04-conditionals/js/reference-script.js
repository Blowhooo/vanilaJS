/**
 * 🌟 초심자를 위한 조건문 실습
 * 
 * 이 파일은 JavaScript 조건문을 처음 배우는 분들을 위한 쉬운 예제입니다.
 * 실제 웹사이트에서 자주 사용되는 패턴을 단계별로 학습할 수 있습니다.
 */

// ==========================================
// 📚 기본 데이터 준비
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
    
    if (age >= 19) {
        console.log('✅ 성인입니다.');
    }
    
    if (age < 19) {
        console.log('❌ 미성년자입니다.');
    }
    
    // 예제 2: 재고 확인
    console.log('\n재고 확인:');
    products.forEach(product => {
        console.log(`${product.name}: ${product.stock}개`);
        if (product.stock === 0) {
            console.log('  ⚠️ 품절입니다!');
        }
    });
    
    // 예제 3: 합격 여부 (60점 이상)
    console.log('\n점수별 합격 여부:');
    scores.forEach(score => {
        console.log(`점수: ${score}`);
        if (score >= 60) {
            console.log('  ✅ 합격!');
        }
        if (score < 60) {
            console.log('  ❌ 불합격');
        }
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
        if (i % 2 === 0) {
            console.log(`${i}는 짝수입니다.`);
        } else {
            console.log(`${i}는 홀수입니다.`);
        }
    }
    
    // 예제 2: 할인 적용
    console.log('\n할인 적용 (10만원 이상 10% 할인):');
    products.forEach(product => {
        if (product.price >= 100000) {
            const discountPrice = product.price * 0.9;
            console.log(`${product.name}: ${product.price}원 → ${discountPrice}원 (10% 할인)`);
        } else {
            console.log(`${product.name}: ${product.price}원 (할인 없음)`);
        }
    });
    
    // 예제 3: 로그인 가능 여부
    console.log('\n계정 상태:');
    testUsers.forEach(user => {
        if (user.isActive) {
            console.log(`${user.username || '(이름없음)'}: 활성 계정 ✅`);
        } else {
            console.log(`${user.username || '(이름없음)'}: 비활성 계정 ❌`);
        }
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
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else if (score >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        console.log(`${score}점: ${grade}등급`);
    });
    
    // 예제 2: 재고 상태 메시지
    console.log('\n재고 상태:');
    products.forEach(product => {
        let status;
        if (product.stock === 0) {
            status = '품절 😢';
        } else if (product.stock <= 3) {
            status = '품절임박! 서두르세요! ⚠️';
        } else if (product.stock <= 10) {
            status = '재고 소량 📦';
        } else {
            status = '재고 충분 ✅';
        }
        console.log(`${product.name}: ${product.stock}개 - ${status}`);
    });
    
    // 예제 3: 나이대별 분류
    console.log('\n나이대 분류:');
    testUsers.forEach(user => {
        let ageGroup;
        if (user.age < 20) {
            ageGroup = '10대';
        } else if (user.age < 30) {
            ageGroup = '20대';
        } else if (user.age < 40) {
            ageGroup = '30대';
        } else {
            ageGroup = '40대 이상';
        }
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
        if (user.username && user.password) {
            console.log(`✅ ${user.username}: 로그인 가능`);
        } else {
            console.log(`❌ 로그인 정보 불완전: ID(${user.username || '없음'}), PW(${user.password ? '있음' : '없음'})`);
        }
    });
    
    // 예제 2: OR 조건 (||) - 하나라도 참이면 됨
    console.log('\n특별 할인 대상 (고가상품 또는 재고부족):');
    products.forEach(product => {
        if (product.price >= 500000 || product.stock <= 3) {
            console.log(`🎁 ${product.name}: 특별할인 대상!`);
            if (product.price >= 500000) {
                console.log('   이유: 고가 상품');
            }
            if (product.stock <= 3) {
                console.log('   이유: 재고 부족');
            }
        } else {
            console.log(`${product.name}: 일반 상품`);
        }
    });
    
    // 예제 3: 복합 조건
    console.log('\n성인 활성 사용자 찾기:');
    testUsers.forEach(user => {
        if (user.age >= 19 && user.isActive && user.username) {
            console.log(`✅ ${user.username}: 성인 활성 사용자`);
        } else {
            let reasons = [];
            if (user.age < 19) reasons.push('미성년자');
            if (!user.isActive) reasons.push('비활성 계정');
            if (!user.username) reasons.push('아이디 없음');
            console.log(`❌ ${user.username || '익명'}: ${reasons.join(', ')}`);
        }
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
        switch(category) {
            case '전자제품':
                icon = '💻';
                break;
            case '액세서리':
                icon = '🎧';
                break;
            case '의류':
                icon = '👕';
                break;
            case '식품':
                icon = '🍔';
                break;
            default:
                icon = '📦';
        }
        console.log(`${category}: ${icon}`);
    });
    
    // 예제 2: 요일별 할인
    console.log('\n요일별 할인율:');
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    days.forEach(day => {
        let discount;
        switch(day) {
            case '월':
            case '화':
                discount = '5%';
                break;
            case '수':
                discount = '10%';
                break;
            case '목':
            case '금':
                discount = '7%';
                break;
            case '토':
            case '일':
                discount = '15%';
                break;
            default:
                discount = '0%';
        }
        console.log(`${day}요일: ${discount} 할인`);
    });
    
    // 예제 3: 등급별 혜택
    console.log('\n회원 등급별 혜택:');
    const grades = ['VIP', 'GOLD', 'SILVER', 'BRONZE'];
    grades.forEach(grade => {
        let benefits;
        switch(grade) {
            case 'VIP':
                benefits = '20% 할인, 무료배송, 우선고객지원';
                break;
            case 'GOLD':
                benefits = '15% 할인, 무료배송';
                break;
            case 'SILVER':
                benefits = '10% 할인';
                break;
            case 'BRONZE':
                benefits = '5% 할인';
                break;
            default:
                benefits = '혜택 없음';
        }
        console.log(`${grade}: ${benefits}`);
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
        const status = product.stock > 0 ? '구매가능' : '품절';
        console.log(`${product.name}: ${status}`);
    });
    
    // 예제 2: 값 할당
    console.log('\n나이별 입장료:');
    testUsers.forEach(user => {
        const price = user.age < 19 ? 5000 : 10000;
        console.log(`${user.username || '게스트'} (${user.age}세): ${price}원`);
    });
    
    // 예제 3: 중첩 삼항 연산자 (간단한 경우만!)
    console.log('\n점수별 결과:');
    scores.forEach(score => {
        const result = score >= 90 ? '최우수' : 
                      score >= 80 ? '우수' : 
                      score >= 60 ? '통과' : '재시험';
        console.log(`${score}점: ${result}`);
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
        
        // 1. 입력값 검증
        if (!username) {
            console.log('❌ 아이디를 입력해주세요.');
            return false;
        }
        
        if (!password) {
            console.log('❌ 비밀번호를 입력해주세요.');
            return false;
        }
        
        // 2. 사용자 찾기
        const user = testUsers.find(u => u.username === username);
        
        if (!user) {
            console.log('❌ 존재하지 않는 아이디입니다.');
            return false;
        }
        
        // 3. 비밀번호 확인
        if (user.password !== password) {
            console.log('❌ 비밀번호가 일치하지 않습니다.');
            return false;
        }
        
        // 4. 계정 상태 확인
        if (!user.isActive) {
            console.log('⚠️ 비활성화된 계정입니다. 관리자에게 문의하세요.');
            return false;
        }
        
        // 5. 나이 확인 (성인 인증)
        if (user.age < 19) {
            console.log('⚠️ 미성년자는 보호자 동의가 필요합니다.');
        }
        
        // 6. 로그인 성공
        console.log(`✅ ${username}님 환영합니다!`);
        
        // 7. 권한 부여
        if (username === 'admin') {
            console.log('👑 관리자 권한이 부여되었습니다.');
        } else {
            console.log('👤 일반 사용자로 로그인했습니다.');
        }
        
        return true;
    }
    
    // 테스트 케이스
    console.log('--- 테스트 1: 정상 로그인 ---');
    tryLogin('user1', '1234');
    
    console.log('\n--- 테스트 2: 아이디 없음 ---');
    tryLogin('', '1234');
    
    console.log('\n--- 테스트 3: 비밀번호 없음 ---');
    tryLogin('admin', '');
    
    console.log('\n--- 테스트 4: 비활성 계정 ---');
    tryLogin('user2', 'pass');
    
    console.log('\n--- 테스트 5: 관리자 로그인 ---');
    tryLogin('admin', 'admin');  // 비밀번호 틀림
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
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        console.log(`${item.product}: ${item.price.toLocaleString()}원 × ${item.quantity}개 = ${itemTotal.toLocaleString()}원`);
    });
    
    console.log('================');
    console.log(`소계: ${subtotal.toLocaleString()}원`);
    
    // 할인 계산
    let discountRate = 0;
    let discountAmount = 0;
    
    // 1. 회원 등급 할인
    if (user.isMember) {
        if (user.grade === 'VIP') {
            discountRate = 0.15;
        } else if (user.grade === 'GOLD') {
            discountRate = 0.10;
        } else if (user.grade === 'SILVER') {
            discountRate = 0.05;
        } else {
            discountRate = 0.03;
        }
        
        discountAmount = subtotal * discountRate;
        console.log(`회원 할인 (${user.grade}): -${discountAmount.toLocaleString()}원 (${discountRate * 100}%)`);
    }
    
    // 2. 금액대별 추가 할인
    if (subtotal >= 1000000) {
        const extraDiscount = subtotal * 0.05;
        discountAmount += extraDiscount;
        console.log(`100만원 이상 추가할인: -${extraDiscount.toLocaleString()}원 (5%)`);
    } else if (subtotal >= 500000) {
        const extraDiscount = subtotal * 0.03;
        discountAmount += extraDiscount;
        console.log(`50만원 이상 추가할인: -${extraDiscount.toLocaleString()}원 (3%)`);
    }
    
    // 3. 배송비 계산
    let shippingFee = 0;
    if (subtotal - discountAmount < 50000) {
        shippingFee = 3000;
        console.log(`배송비: +${shippingFee.toLocaleString()}원 (5만원 미만)`);
    } else {
        console.log('배송비: 무료 (5만원 이상)');
    }
    
    // 최종 금액
    const total = subtotal - discountAmount + shippingFee;
    console.log('================');
    console.log(`최종 결제금액: ${total.toLocaleString()}원`);
    
    // 4. 포인트 사용 가능 여부
    if (user.points > 0) {
        const usablePoints = Math.min(user.points, total);
        console.log(`\n사용 가능 포인트: ${usablePoints.toLocaleString()}P`);
        
        if (usablePoints >= 10000) {
            console.log('💡 10,000P 이상 사용 가능합니다!');
        } else if (usablePoints >= 5000) {
            console.log('💡 5,000P 이상 사용 가능합니다.');
        } else {
            console.log('💡 포인트는 5,000P부터 사용 가능합니다.');
        }
    }
    
    // 5. 결제 가능 여부 최종 확인
    console.log('\n=== 결제 가능 여부 ===');
    if (total <= 0) {
        console.log('❌ 결제 금액 오류');
    } else if (cart.length === 0) {
        console.log('❌ 장바구니가 비어있습니다');
    } else if (!user.isMember && total < 30000) {
        console.log('⚠️ 비회원은 3만원 이상 구매 가능합니다');
    } else {
        console.log('✅ 결제 가능합니다!');
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
    
    // 1. HP 상태 확인
    const hpPercent = (character.hp / character.maxHp) * 100;
    
    if (hpPercent <= 0) {
        console.log('💀 캐릭터가 사망했습니다!');
    } else if (hpPercent <= 20) {
        console.log('🆘 위험! HP가 매우 낮습니다!');
    } else if (hpPercent <= 50) {
        console.log('⚠️ 주의! HP가 절반 이하입니다.');
    } else if (hpPercent <= 80) {
        console.log('💊 HP가 조금 감소했습니다.');
    } else {
        console.log('💚 HP가 충분합니다.');
    }
    
    // 2. MP 상태 확인
    const mpPercent = (character.mp / character.maxMp) * 100;
    
    if (mpPercent <= 0) {
        console.log('🔋 MP가 없어 스킬을 사용할 수 없습니다!');
    } else if (mpPercent <= 30) {
        console.log('⚡ MP가 부족합니다.');
    } else {
        console.log('💙 MP가 충분합니다.');
    }
    
    // 3. 상태이상 확인
    switch(character.status) {
        case 'normal':
            console.log('✅ 정상 상태입니다.');
            break;
        case 'poisoned':
            console.log('🤢 독에 중독되었습니다! 매 턴 HP 감소');
            break;
        case 'frozen':
            console.log('🧊 얼어붙었습니다! 행동 불가');
            break;
        case 'stunned':
            console.log('💫 기절했습니다! 1턴 행동 불가');
            break;
        default:
            console.log('❓ 알 수 없는 상태');
    }
    
    // 4. 행동 가능 여부 판단
    console.log('\n=== 가능한 행동 ===');
    
    // 공격 가능 여부
    if (character.hp <= 0) {
        console.log('❌ 공격: 사망 상태');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('❌ 공격: 상태이상으로 불가');
    } else {
        console.log('⚔️ 공격: 가능');
    }
    
    // 스킬 사용 가능 여부
    if (character.hp <= 0) {
        console.log('❌ 스킬: 사망 상태');
    } else if (character.mp < 10) {
        console.log('❌ 스킬: MP 부족 (최소 10 필요)');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('❌ 스킬: 상태이상으로 불가');
    } else {
        console.log('✨ 스킬: 사용 가능');
    }
    
    // 아이템 사용 가능 여부
    if (character.hp <= 0) {
        console.log('❌ 아이템: 사망 상태');
    } else if (character.status === 'frozen') {
        console.log('❌ 아이템: 얼어붙어서 불가');
    } else {
        console.log('🧪 아이템: 사용 가능');
    }
    
    // 도망 가능 여부
    if (character.hp <= 0) {
        console.log('❌ 도망: 사망 상태');
    } else if (!character.inBattle) {
        console.log('❌ 도망: 전투 중이 아님');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('❌ 도망: 상태이상으로 불가');
    } else if (hpPercent < 30) {
        console.log('🏃 도망: 가능 (HP 낮음으로 성공률 증가!)');
    } else {
        console.log('🏃 도망: 가능');
    }
    
    // 5. 추천 행동
    console.log('\n=== 추천 행동 ===');
    if (character.hp <= 0) {
        console.log('💀 부활 아이템을 사용하거나 동료의 도움이 필요합니다.');
    } else if (hpPercent <= 30) {
        console.log('💊 회복 포션을 사용하세요!');
    } else if (character.status !== 'normal') {
        console.log('🧪 상태이상 치료 아이템을 사용하세요.');
    } else if (mpPercent <= 30) {
        console.log('🧙 MP 포션을 사용하거나 일반 공격을 하세요.');
    } else {
        console.log('⚔️ 자유롭게 행동하세요!');
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
console.log('%c콘솔에서 함수를 직접 실행해보세요!', 
            'color: #2196F3; font-size: 14px;');
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