// ===========================
// 고급 조건문 학습 시스템 - 참조 구현
// ===========================

// 이 파일은 script.js와 동일한 내용의 완전한 참조 구현입니다.
// 학습자가 막힐 때 참고할 수 있는 정답 코드입니다.
 
console.log('🎓 고급 조건문 학습 시스템 - 참조 버전이 준비되었습니다!');
console.log('도움말을 보려면 showAdvancedHelp()를 입력하세요.');

// ===========================
// 학습 데이터
// ===========================

const advancedData = {
    users: [
        { id: 1, name: '김철수', age: 28, type: 'premium', points: 2500, isActive: true },
        { id: 2, name: '이영희', age: 17, type: 'regular', points: 800, isActive: true },
        { id: 3, name: '박민수', age: 35, type: 'premium', points: 5000, isActive: false },
        { id: 4, name: '정수진', age: 22, type: 'new', points: 100, isActive: true },
        { id: 5, name: '최동욱', age: 45, type: 'regular', points: 1500, isActive: true }
    ],
    products: [
        { id: 101, name: '노트북', price: 1500000, category: 'electronics', stock: 5 },
        { id: 102, name: '마우스', price: 50000, category: 'electronics', stock: 0 },
        { id: 103, name: '셔츠', price: 35000, category: 'clothing', stock: 20 },
        { id: 104, name: '책', price: 15000, category: 'books', stock: 100 }
    ],
    permissions: {
        admin: ['read', 'write', 'delete', 'modify'],
        editor: ['read', 'write', 'modify'],
        viewer: ['read'],
        guest: []
    }
};

const businessRules = {
    discountRules: {
        premium: 0.2,    // 20% 할인
        regular: 0.05,   // 5% 할인
        new: 0.1        // 10% 할인
    },
    freeShipping: 50000,  // 5만원 이상 무료배송
    minPoints: 1000,      // 포인트 사용 최소값
    adultAge: 19         // 성인 나이 기준
};

// ===========================
// 1. 중첩 조건문 학습
// ===========================

function learn_nested_conditions() {
    console.log('\n📚 중첩 조건문 패턴 학습\n' + '='.repeat(40));
    
    // 나쁜 예시 - 과도한 중첩
    console.log('❌ 나쁜 예시 - 과도한 중첩:');
    
    const user = advancedData.users[0];
    if (user.isActive) {
        if (user.type === 'premium') {
            if (user.points > 1000) {
                console.log('프리미엄 활성 사용자, 포인트 충분');
            } else {
                console.log('프리미엄 활성 사용자, 포인트 부족');
            }
        } else {
            if (user.points > 1000) {
                console.log('일반 활성 사용자, 포인트 충분');
            }
        }
    }
    
    console.log('\n✅ 좋은 예시 - 플랫한 구조:');
    
    // Early return 패턴
    function checkUserStatus(user) {
        if (!user.isActive) return '비활성 사용자';
        
        const isPremium = user.type === 'premium';
        const hasEnoughPoints = user.points > 1000;
        
        if (isPremium && hasEnoughPoints) return '프리미엄 VIP';
        if (isPremium) return '프리미엄 일반';
        if (hasEnoughPoints) return '일반 VIP';
        return '일반 사용자';
    }
    
    advancedData.users.forEach(u => {
        console.log(`${u.name}: ${checkUserStatus(u)}`);
    });
    
    console.log('\n💡 핵심: Early return으로 중첩을 줄이고 가독성을 높이세요!');
}

// ===========================
// 2. Guard Clause 패턴
// ===========================

function learn_guard_clauses() {
    console.log('\n🛡️ Guard Clause 패턴\n' + '='.repeat(40));
    
    // Guard clause를 사용한 함수
    function processOrder(user, product, quantity) {
        // 유효성 검사 - Guard Clauses
        if (!user) {
            return { success: false, message: '사용자 정보가 없습니다' };
        }
        
        if (!user.isActive) {
            return { success: false, message: '비활성 계정입니다' };
        }
        
        if (!product) {
            return { success: false, message: '상품 정보가 없습니다' };
        }
        
        if (product.stock < quantity) {
            return { success: false, message: '재고가 부족합니다' };
        }
        
        if (user.age < businessRules.adultAge && product.category === 'adult') {
            return { success: false, message: '연령 제한 상품입니다' };
        }
        
        // 모든 검증 통과 - 핵심 로직
        const totalPrice = product.price * quantity;
        const discount = businessRules.discountRules[user.type] || 0;
        const finalPrice = totalPrice * (1 - discount);
        
        return {
            success: true,
            order: {
                user: user.name,
                product: product.name,
                quantity,
                totalPrice,
                discount: `${discount * 100}%`,
                finalPrice,
                freeShipping: finalPrice >= businessRules.freeShipping
            }
        };
    }
    
    // 테스트
    console.log('주문 처리 테스트:');
    const testCases = [
        { user: advancedData.users[0], product: advancedData.products[0], quantity: 1 },
        { user: advancedData.users[1], product: advancedData.products[0], quantity: 1 },
        { user: advancedData.users[2], product: advancedData.products[1], quantity: 1 },
        { user: null, product: advancedData.products[0], quantity: 1 }
    ];
    
    testCases.forEach((test, i) => {
        console.log(`\n테스트 ${i + 1}:`, processOrder(test.user, test.product, test.quantity));
    });
}

// ===========================
// 3. 단축 평가 활용
// ===========================

function learn_short_circuit() {
    console.log('\n⚡ 단축 평가 (Short Circuit) 활용\n' + '='.repeat(40));
    
    // AND (&&) 연산자 활용
    console.log('📌 AND (&&) 연산자:');
    
    const user = advancedData.users[0];
    
    // 속성 안전 접근
    const userName = user && user.name;
    console.log('user && user.name:', userName);
    
    // 조건부 실행
    user.isActive && console.log('활성 사용자입니다');
    
    // OR (||) 연산자 활용
    console.log('\n📌 OR (||) 연산자:');
    
    // 기본값 설정
    function greetUser(name) {
        const displayName = name || '게스트';
        return `안녕하세요, ${displayName}님!`;
    }
    
    console.log(greetUser('김철수'));
    console.log(greetUser(''));
    console.log(greetUser(null));
    
    // Nullish Coalescing (??) 연산자
    console.log('\n📌 Nullish Coalescing (??) 연산자:');
    
    const scores = [0, 5, null, undefined, 10];
    scores.forEach(score => {
        const withOr = score || '점수 없음';
        const withNullish = score ?? '점수 없음';
        console.log(`score: ${score}, ||: ${withOr}, ??: ${withNullish}`);
    });
    
    // 실전 예제: 복합 조건
    console.log('\n📌 실전 활용:');
    
    function getUserDiscount(user) {
        // 단축 평가를 활용한 복잡한 로직
        const discount = 
            (user.type === 'premium' && 0.2) ||
            (user.type === 'regular' && user.points > 1000 && 0.1) ||
            (user.type === 'new' && 0.05) ||
            0;
        
        return discount;
    }
    
    advancedData.users.forEach(u => {
        console.log(`${u.name} (${u.type}): ${getUserDiscount(u) * 100}% 할인`);
    });
}

// ===========================
// 4. 객체 기반 조건 처리
// ===========================

function learn_object_conditions() {
    console.log('\n🎯 객체 기반 조건 처리\n' + '='.repeat(40));
    
    // Strategy Pattern with Objects
    const priceStrategies = {
        premium: (price) => price * 0.8,
        regular: (price) => price * 0.95,
        new: (price) => price * 0.9,
        default: (price) => price
    };
    
    // Message handlers
    const messageHandlers = {
        success: (msg) => `✅ 성공: ${msg}`,
        error: (msg) => `❌ 에러: ${msg}`,
        warning: (msg) => `⚠️ 경고: ${msg}`,
        info: (msg) => `ℹ️ 정보: ${msg}`
    };
    
    // State machine
    const orderStateMachine = {
        pending: {
            nextStates: ['confirmed', 'cancelled'],
            actions: {
                confirm: () => 'confirmed',
                cancel: () => 'cancelled'
            }
        },
        confirmed: {
            nextStates: ['shipped', 'cancelled'],
            actions: {
                ship: () => 'shipped',
                cancel: () => 'cancelled'
            }
        },
        shipped: {
            nextStates: ['delivered'],
            actions: {
                deliver: () => 'delivered'
            }
        },
        delivered: {
            nextStates: [],
            actions: {}
        },
        cancelled: {
            nextStates: [],
            actions: {}
        }
    };
    
    // 테스트
    console.log('가격 전략 테스트:');
    const testPrice = 100000;
    Object.keys(priceStrategies).forEach(type => {
        if (type !== 'default') {
            const strategy = priceStrategies[type];
            console.log(`${type}: ${testPrice}원 → ${strategy(testPrice)}원`);
        }
    });
    
    console.log('\n메시지 처리 테스트:');
    Object.keys(messageHandlers).forEach(type => {
        console.log(messageHandlers[type]('테스트 메시지'));
    });
    
    console.log('\n상태 머신 테스트:');
    let currentState = 'pending';
    console.log(`초기 상태: ${currentState}`);
    console.log(`가능한 다음 상태: ${orderStateMachine[currentState].nextStates.join(', ')}`);
    
    // 상태 전이
    if (orderStateMachine[currentState].actions.confirm) {
        currentState = orderStateMachine[currentState].actions.confirm();
        console.log(`상태 변경: ${currentState}`);
    }
}

// ===========================
// 5. 조건 체이닝
// ===========================

function learn_chaining_conditions() {
    console.log('\n🔗 조건 체이닝 패턴\n' + '='.repeat(40));
    
    // 메서드 체이닝을 활용한 검증
    class Validator {
        constructor(value) {
            this.value = value;
            this.errors = [];
        }
        
        required(message = '필수 입력입니다') {
            if (!this.value) {
                this.errors.push(message);
            }
            return this;
        }
        
        minLength(length, message) {
            if (this.value && this.value.length < length) {
                this.errors.push(message || `최소 ${length}자 이상이어야 합니다`);
            }
            return this;
        }
        
        maxLength(length, message) {
            if (this.value && this.value.length > length) {
                this.errors.push(message || `최대 ${length}자까지 가능합니다`);
            }
            return this;
        }
        
        pattern(regex, message = '형식이 올바르지 않습니다') {
            if (this.value && !regex.test(this.value)) {
                this.errors.push(message);
            }
            return this;
        }
        
        isValid() {
            return this.errors.length === 0;
        }
        
        getErrors() {
            return this.errors;
        }
    }
    
    // 파이프라인 패턴
    const pipeline = (...fns) => (value) => 
        fns.reduce((result, fn) => {
            if (result.error) return result;
            return fn(result);
        }, { value, error: null });
    
    // 검증 파이프라인
    const checkAge = (data) => {
        if (data.value < 0) {
            return { ...data, error: '나이는 0 이상이어야 합니다' };
        }
        return data;
    };
    
    const checkMaxAge = (data) => {
        if (data.value > 150) {
            return { ...data, error: '올바른 나이를 입력하세요' };
        }
        return data;
    };
    
    const checkAdult = (data) => {
        if (data.value < businessRules.adultAge) {
            return { ...data, error: '성인만 가능합니다' };
        }
        return data;
    };
    
    // 테스트
    console.log('유효성 검증 체이닝:');
    const testInputs = ['', 'a', 'test', 'test@example.com'];
    
    testInputs.forEach(input => {
        const validator = new Validator(input)
            .required()
            .minLength(3)
            .maxLength(20)
            .pattern(/^[a-zA-Z0-9@.]+$/, '영문, 숫자, @, .만 사용 가능');
        
        console.log(`\n입력: "${input}"`);
        console.log(`유효: ${validator.isValid()}`);
        if (!validator.isValid()) {
            console.log(`에러: ${validator.getErrors().join(', ')}`);
        }
    });
    
    console.log('\n\n파이프라인 검증:');
    const ageValidator = pipeline(checkAge, checkMaxAge, checkAdult);
    
    [15, 25, -5, 200].forEach(age => {
        const result = ageValidator(age);
        console.log(`나이 ${age}: ${result.error || '✅ 유효'}`);
    });
}

// ===========================
// 실무 프로젝트
// ===========================



function project_validation_engine() {
    console.log('\n📝 간단한 폼 검증 프로젝트\n' + '='.repeat(40));
    console.log('💡 사용자 입력을 검증하는 간단한 시스템을 만들어봅시다!');
    
    // 간단한 유효성 검사 함수
    function validateUserInput(userData) {
        console.log('\n입력 데이터:', userData);
        console.log('-'.repeat(40));
        
        let isValid = true;
        const errors = [];
        
        // 1. 이름 검증 (필수, 2글자 이상)
        if (!userData.name) {
            errors.push('❌ 이름을 입력해주세요');
            isValid = false;
        } else if (userData.name.length < 2) {
            errors.push('❌ 이름은 2글자 이상이어야 합니다');
            isValid = false;
        } else {
            console.log('✅ 이름: ' + userData.name);
        }
        
        // 2. 나이 검증 (숫자, 1~120)
        if (!userData.age) {
            errors.push('❌ 나이를 입력해주세요');
            isValid = false;
        } else if (isNaN(userData.age)) {
            errors.push('❌ 나이는 숫자여야 합니다');
            isValid = false;
        } else if (userData.age < 1 || userData.age > 120) {
            errors.push('❌ 나이는 1~120 사이여야 합니다');
            isValid = false;
        } else {
            console.log('✅ 나이: ' + userData.age + '세');
        }
        
        // 3. 이메일 검증 (@ 포함 여부만 체크)
        if (!userData.email) {
            errors.push('❌ 이메일을 입력해주세요');
            isValid = false;
        } else if (!userData.email.includes('@')) {
            errors.push('❌ 올바른 이메일 형식이 아닙니다 (@가 필요합니다)');
            isValid = false;
        } else {
            console.log('✅ 이메일: ' + userData.email);
        }
        
        // 4. 회원 타입 검증 (premium, regular, new 중 하나)
        const validTypes = ['premium', 'regular', 'new'];
        if (!userData.type) {
            errors.push('❌ 회원 타입을 선택해주세요');
            isValid = false;
        } else if (!validTypes.includes(userData.type)) {
            errors.push('❌ 올바른 회원 타입이 아닙니다 (premium/regular/new)');
            isValid = false;
        } else {
            console.log('✅ 회원 타입: ' + userData.type);
        }
        
        // 5. 약관 동의 검증
        if (userData.agree !== true) {
            errors.push('❌ 약관에 동의해주세요');
            isValid = false;
        } else {
            console.log('✅ 약관 동의: 완료');
        }
        
        // 결과 출력
        console.log('\n' + '='.repeat(40));
        if (isValid) {
            console.log('🎉 모든 검증 통과! 회원가입 가능합니다.');
            
            // 회원 타입별 환영 메시지
            if (userData.type === 'premium') {
                console.log('⭐ 프리미엄 회원이 되신 것을 환영합니다!');
            } else if (userData.type === 'regular') {
                console.log('👍 일반 회원이 되신 것을 환영합니다!');
            } else if (userData.type === 'new') {
                console.log('🎁 신규 회원 혜택을 확인해보세요!');
            }
        } else {
            console.log('⚠️ 검증 실패! 다음 항목을 확인해주세요:');
            errors.forEach(error => console.log('  ' + error));
        }
        
        return isValid;
    }
    
    // 테스트 케이스들
    console.log('\n📌 테스트 1: 올바른 데이터');
    validateUserInput({
        name: '김철수',
        age: 25,
        email: 'test@example.com',
        type: 'premium',
        agree: true
    });
    
    console.log('\n📌 테스트 2: 잘못된 데이터');
    validateUserInput({
        name: '이',
        age: 150,
        email: 'bad-email',
        type: 'gold',
        agree: false
    });
    
    console.log('\n📌 테스트 3: 빈 데이터');
    validateUserInput({
        name: '',
        age: '',
        email: '',
        type: '',
        agree: false
    });
    
    // 실전 활용 예제
    console.log('\n' + '='.repeat(40));
    console.log('💡 실전 활용 예제: 회원 등급별 할인 적용');
    console.log('='.repeat(40));
    
    function processRegistration(userData) {
        // 먼저 유효성 검사
        const isValid = validateUserInput(userData);
        
        if (isValid) {
            console.log('\n📊 회원 등록 처리 중...');
            
            // 회원 타입별 혜택 계산
            let discount = 0;
            let welcomePoints = 0;
            
            if (userData.type === 'premium') {
                discount = 20;
                welcomePoints = 5000;
            } else if (userData.type === 'regular') {
                discount = 5;
                welcomePoints = 1000;
            } else if (userData.type === 'new') {
                discount = 10;
                welcomePoints = 3000;
            }
            
            console.log(`\n🎁 ${userData.name}님의 혜택:`);
            console.log(`  - 할인율: ${discount}%`);
            console.log(`  - 환영 포인트: ${welcomePoints}점`);
            console.log(`  - 회원 등급: ${userData.type}`);
            
            return {
                success: true,
                user: userData.name,
                benefits: {
                    discount,
                    points: welcomePoints
                }
            };
        } else {
            return {
                success: false,
                message: '회원가입 실패 - 입력 정보를 확인해주세요'
            };
        }
    }
    
    console.log('\n실제 회원가입 처리 예제:');
    const result = processRegistration({
        name: '박지민',
        age: 30,
        email: 'jimin@example.com',
        type: 'premium',
        agree: true
    });
    
    console.log('\n처리 결과:', result);
}









// ===========================
// 유틸리티 함수
// ===========================

function showAdvancedHelp() {
    console.log(`
╔══════════════════════════════════════════╗
║     고급 조건문 학습 시스템 도움말         ║
╠══════════════════════════════════════════╣
║                                          ║
║  📚 학습 함수                            ║
║  • learn_nested_conditions()             ║
║  • learn_guard_clauses()                 ║
║  • learn_short_circuit()                 ║
║  • learn_object_conditions()             ║
║  • learn_chaining_conditions()           ║
║                                          ║
║  💼 프로젝트                             ║
║  • project_validation_engine()           ║
║                                          ║
║  📊 데이터                               ║
║  • advancedData - 사용자/상품 데이터     ║
║  • businessRules - 비즈니스 규칙         ║
║                                          ║
╚══════════════════════════════════════════╝
    `);
}

function runPerformanceTest() {
    console.log('\n⚡ 성능 테스트\n' + '='.repeat(40));
    
    // if-else vs switch vs object 성능 비교
    const iterations = 100000;
    const testValues = ['premium', 'regular', 'new', 'guest'];
    
    // if-else 테스트
    console.time('if-else');
    for (let i = 0; i < iterations; i++) {
        const type = testValues[i % 4];
        let discount;
        if (type === 'premium') discount = 0.2;
        else if (type === 'regular') discount = 0.05;
        else if (type === 'new') discount = 0.1;
        else discount = 0;
    }
    console.timeEnd('if-else');
    
    // switch 테스트
    console.time('switch');
    for (let i = 0; i < iterations; i++) {
        const type = testValues[i % 4];
        let discount;
        switch(type) {
            case 'premium': discount = 0.2; break;
            case 'regular': discount = 0.05; break;
            case 'new': discount = 0.1; break;
            default: discount = 0;
        }
    }
    console.timeEnd('switch');
    
    // object lookup 테스트
    const discountMap = {
        premium: 0.2,
        regular: 0.05,
        new: 0.1,
        guest: 0
    };
    
    console.time('object');
    for (let i = 0; i < iterations; i++) {
        const type = testValues[i % 4];
        const discount = discountMap[type] || 0;
    }
    console.timeEnd('object');
    
    console.log('\n💡 Object lookup이 많은 조건에서는 가장 빠릅니다!');
}

function analyzeConditions() {
    console.log('\n🔍 조건문 분석 도구\n' + '='.repeat(40));
    
    // 복잡도 분석기
    function analyzeComplexity(fn) {
        const fnString = fn.toString();
        const ifCount = (fnString.match(/if\s*\(/g) || []).length;
        const elseCount = (fnString.match(/else/g) || []).length;
        const ternaryCount = (fnString.match(/\?/g) || []).length;
        const andCount = (fnString.match(/&&/g) || []).length;
        const orCount = (fnString.match(/\|\|/g) || []).length;
        
        const complexity = ifCount + elseCount + ternaryCount + andCount + orCount;
        
        return {
            ifStatements: ifCount,
            elseStatements: elseCount,
            ternaryOperators: ternaryCount,
            andOperators: andCount,
            orOperators: orCount,
            totalComplexity: complexity,
            rating: complexity < 5 ? '간단' :
                   complexity < 10 ? '보통' :
                   complexity < 15 ? '복잡' : '매우 복잡'
        };
    }
    
    // 테스트 함수들 분석
    const functionsToAnalyze = [
        { name: 'learn_nested_conditions', fn: learn_nested_conditions },
        { name: 'learn_guard_clauses', fn: learn_guard_clauses },
        { name: 'project_permission_system', fn: project_permission_system }
    ];
    
    functionsToAnalyze.forEach(item => {
        console.log(`\n${item.name} 분석:`);
        const analysis = analyzeComplexity(item.fn);
        console.log(`  복잡도: ${analysis.rating} (점수: ${analysis.totalComplexity})`);
        console.log(`  - if문: ${analysis.ifStatements}개`);
        console.log(`  - else문: ${analysis.elseStatements}개`);
        console.log(`  - 삼항 연산자: ${analysis.ternaryOperators}개`);
        console.log(`  - AND(&&): ${analysis.andOperators}개`);
        console.log(`  - OR(||): ${analysis.orOperators}개`);
    });
}

// 초기 실행
showAdvancedHelp();