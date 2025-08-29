// ===========================
// 고급 조건문 학습 시스템
// ===========================

console.log('🎓 고급 조건문 학습 시스템이 준비되었습니다!');
console.log('도움말을 보려면 showAdvancedHelp()를 입력하세요.');
console.log('💡 TODO 부분을 직접 구현해보세요!');

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
    
    // TODO: Early return 패턴을 사용하여 중첩을 줄인 checkUserStatus 함수를 완성하세요
    // 힌트: 
    // 1. 비활성 사용자는 즉시 return
    // 2. isPremium과 hasEnoughPoints 변수를 만들어 조건 체크
    // 3. 조합에 따라 적절한 문자열 반환
    function checkUserStatus(user) {
        // TODO: 비활성 사용자 체크
        if (!user.isActive) {
            // TODO: '비활성 사용자' 반환
            
        }
        
        // TODO: premium 여부와 포인트 충분 여부를 변수로 저장
        const isPremium = /* TODO */;
        const hasEnoughPoints = /* TODO */;
        
        // TODO: 각 조건에 따라 적절한 문자열 반환
        // 프리미엄 + 포인트 충분 = '프리미엄 VIP'
        // 프리미엄 + 포인트 부족 = '프리미엄 일반'
        // 일반 + 포인트 충분 = '일반 VIP'
        // 그 외 = '일반 사용자'
        
        
    }
    
    // 테스트 실행
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
    
    // TODO: Guard clause를 사용한 주문 처리 함수를 완성하세요
    function processOrder(user, product, quantity) {
        // TODO: Guard Clauses - 각 조건을 체크하고 실패시 즉시 return
        
        // 1. user가 없으면
        if (!user) {
            // TODO: { success: false, message: '사용자 정보가 없습니다' } 반환
            
        }
        
        // 2. user.isActive가 false면
        // TODO: 구현
        
        
        // 3. product가 없으면
        // TODO: 구현
        
        
        // 4. product.stock이 quantity보다 작으면
        // TODO: { success: false, message: '재고가 부족합니다' } 반환
        
        
        // 5. 미성년자가 adult 카테고리 상품을 구매하려 하면
        // TODO: user.age < businessRules.adultAge && product.category === 'adult' 체크
        
        
        // 모든 검증 통과 - 핵심 로직
        const totalPrice = product.price * quantity;
        
        // TODO: businessRules.discountRules에서 user.type에 맞는 할인율 가져오기
        const discount = /* TODO */;
        
        // TODO: 할인 적용한 최종 가격 계산
        const finalPrice = /* TODO */;
        
        return {
            success: true,
            order: {
                user: user.name,
                product: product.name,
                quantity,
                totalPrice,
                discount: `${discount * 100}%`,
                finalPrice,
                // TODO: finalPrice가 businessRules.freeShipping 이상이면 true
                freeShipping: /* TODO */
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
    
    // TODO: user가 존재하면 user.name을, 아니면 undefined를 반환
    const userName = /* TODO */;
    console.log('user && user.name:', userName);
    
    // TODO: user.isActive가 true일 때만 console.log 실행
    // 힌트: condition && action 패턴
    /* TODO */ console.log('활성 사용자입니다');
    
    // OR (||) 연산자 활용
    console.log('\n📌 OR (||) 연산자:');
    
    // TODO: 기본값 설정 함수 완성
    function greetUser(name) {
        // TODO: name이 falsy면 '게스트'를 사용
        const displayName = /* TODO */;
        return `안녕하세요, ${displayName}님!`;
    }
    
    console.log(greetUser('김철수'));
    console.log(greetUser(''));
    console.log(greetUser(null));
    
    // Nullish Coalescing (??) 연산자
    console.log('\n📌 Nullish Coalescing (??) 연산자:');
    
    const scores = [0, 5, null, undefined, 10];
    scores.forEach(score => {
        // TODO: ||와 ?? 연산자의 차이를 이해하고 구현
        const withOr = /* TODO: score가 falsy면 '점수 없음' */;
        const withNullish = /* TODO: score가 null/undefined면 '점수 없음' */;
        console.log(`score: ${score}, ||: ${withOr}, ??: ${withNullish}`);
    });
    
    // 실전 예제: 복합 조건
    console.log('\n📌 실전 활용:');
    
    // TODO: 단축 평가를 활용한 할인율 계산 함수
    function getUserDiscount(user) {
        // TODO: 단축 평가를 활용하여 조건별 할인율 반환
        // premium = 0.2
        // regular이고 points > 1000 = 0.1  
        // new = 0.05
        // 그 외 = 0
        const discount = 
            /* TODO: premium 체크 */ ||
            /* TODO: regular + 포인트 체크 */ ||
            /* TODO: new 체크 */ ||
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
    
    // TODO: Strategy Pattern - 각 타입별 가격 계산 전략 구현
    const priceStrategies = {
        premium: (price) => /* TODO: 20% 할인 적용 */,
        regular: (price) => /* TODO: 5% 할인 적용 */,
        new: (price) => /* TODO: 10% 할인 적용 */,
        default: (price) => price
    };
    
    // TODO: 메시지 타입별 포맷터 구현
    const messageHandlers = {
        success: (msg) => /* TODO: '✅ 성공: ' + 메시지 */,
        error: (msg) => /* TODO: '❌ 에러: ' + 메시지 */,
        warning: (msg) => /* TODO: '⚠️ 경고: ' + 메시지 */,
        info: (msg) => /* TODO: 'ℹ️ 정보: ' + 메시지 */
    };
    
    // State machine 예시 (이미 구현됨 - 참고용)
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
    
    // TODO: priceStrategies 객체를 순회하며 각 전략 테스트
    Object.keys(priceStrategies).forEach(type => {
        if (type !== 'default') {
            const strategy = /* TODO: 해당 타입의 전략 함수 가져오기 */;
            console.log(`${type}: ${testPrice}원 → ${/* TODO: 전략 적용 */}원`);
        }
    });
    
    console.log('\n메시지 처리 테스트:');
    // TODO: messageHandlers를 사용하여 각 타입별 메시지 출력
    Object.keys(messageHandlers).forEach(type => {
        console.log(/* TODO: 핸들러 호출 */);
    });
    
    // 상태 머신 활용 예시
    console.log('\n상태 머신 테스트:');
    let currentState = 'pending';
    console.log(`초기 상태: ${currentState}`);
    console.log(`가능한 다음 상태: ${orderStateMachine[currentState].nextStates.join(', ')}`);
    
    // TODO: confirm 액션 실행하여 상태 변경
    if (orderStateMachine[currentState].actions.confirm) {
        currentState = /* TODO: confirm 액션 실행 */;
        console.log(`상태 변경: ${currentState}`);
    }
}

// ===========================
// 5. 조건 체이닝
// ===========================

function learn_chaining_conditions() {
    console.log('\n🔗 조건 체이닝 패턴\n' + '='.repeat(40));
    
    // TODO: 메서드 체이닝을 활용한 Validator 클래스 완성
    class Validator {
        constructor(value) {
            this.value = value;
            this.errors = [];
        }
        
        required(message = '필수 입력입니다') {
            // TODO: value가 없으면 에러 추가
            if (!this.value) {
                /* TODO */
            }
            return this; // 체이닝을 위해 this 반환
        }
        
        minLength(length, message) {
            // TODO: 길이가 length보다 작으면 에러 추가
            if (this.value && /* TODO: 길이 체크 */) {
                this.errors.push(message || `최소 ${length}자 이상이어야 합니다`);
            }
            return this;
        }
        
        maxLength(length, message) {
            // TODO: 길이가 length보다 크면 에러 추가
            
            return this;
        }
        
        pattern(regex, message = '형식이 올바르지 않습니다') {
            // TODO: 정규식 패턴과 일치하지 않으면 에러 추가
            if (this.value && /* TODO: regex 테스트 */) {
                /* TODO */
            }
            return this;
        }
        
        isValid() {
            // TODO: 에러가 없으면 true
            return /* TODO */;
        }
        
        getErrors() {
            return this.errors;
        }
    }
    
    // 파이프라인 패턴 예시
    const pipeline = (...fns) => (value) => 
        fns.reduce((result, fn) => {
            if (result.error) return result;
            return fn(result);
        }, { value, error: null });
    
    // TODO: 검증 파이프라인 함수들 구현
    const checkAge = (data) => {
        // TODO: 나이가 0 미만이면 에러
        if (data.value < 0) {
            return /* TODO: error 추가한 객체 반환 */;
        }
        return data;
    };
    
    const checkMaxAge = (data) => {
        // TODO: 나이가 150 초과면 에러
        
        return data;
    };
    
    const checkAdult = (data) => {
        // TODO: businessRules.adultAge 미만이면 에러
        
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
// 실무 프로젝트: 폼 검증 엔진
// ===========================

function project_validation_engine() {
    console.log('\n📝 간단한 폼 검증 프로젝트\n' + '='.repeat(40));
    console.log('💡 사용자 입력을 검증하는 간단한 시스템을 만들어봅시다!');
    console.log('📖 TODO 부분을 직접 구현해보세요!\n');
    
    // TODO: 간단한 유효성 검사 함수를 완성하세요
    function validateUserInput(userData) {
        console.log('\n입력 데이터:', userData);
        console.log('-'.repeat(40));
        
        let isValid = true;
        const errors = [];
        
        // 1. 이름 검증 (필수, 2글자 이상)
        // TODO: userData.name이 없으면 '❌ 이름을 입력해주세요' 에러 추가
        if (!userData.name) {
            // TODO: errors 배열에 에러 메시지 추가
            // TODO: isValid를 false로 설정
            
        } else if (userData.name.length < 2) {
            // TODO: 이름이 2글자 미만일 때 처리
            errors.push('❌ 이름은 2글자 이상이어야 합니다');
            isValid = false;
        } else {
            console.log('✅ 이름: ' + userData.name);
        }
        
        // 2. 나이 검증 (숫자, 1~120)
        // TODO: 나이 검증 로직 구현
        if (!userData.age) {
            // TODO: 나이가 없을 때 에러 처리
            
        } else if (/* TODO: 나이가 숫자가 아닌지 체크 */) {
            errors.push('❌ 나이는 숫자여야 합니다');
            isValid = false;
        } else if (/* TODO: 나이가 1~120 범위를 벗어나는지 체크 */) {
            // TODO: 범위 벗어남 에러 처리
            
        } else {
            console.log('✅ 나이: ' + userData.age + '세');
        }
        
        // 3. 이메일 검증 (@ 포함 여부만 체크)
        // TODO: 이메일 검증 구현
        // 힌트: includes('@')를 사용하여 @ 포함 여부 체크
        
        
        // 4. 회원 타입 검증 (premium, regular, new 중 하나)
        const validTypes = ['premium', 'regular', 'new'];
        // TODO: userData.type이 validTypes에 포함되는지 체크
        // 힌트: includes() 메서드 사용
        
        
        // 5. 약관 동의 검증
        // TODO: userData.agree가 true가 아니면 에러
        if (userData.agree !== true) {
            // TODO: 약관 동의 에러 처리
            
        } else {
            console.log('✅ 약관 동의: 완료');
        }
        
        // 결과 출력
        console.log('\n' + '='.repeat(40));
        if (isValid) {
            console.log('🎉 모든 검증 통과! 회원가입 가능합니다.');
            
            // TODO: 회원 타입별 환영 메시지 출력
            // premium: '⭐ 프리미엄 회원이 되신 것을 환영합니다!'
            // regular: '👍 일반 회원이 되신 것을 환영합니다!'
            // new: '🎁 신규 회원 혜택을 확인해보세요!'
            
        } else {
            console.log('⚠️ 검증 실패! 다음 항목을 확인해주세요:');
            errors.forEach(error => console.log('  ' + error));
        }
        
        return isValid;
    }
    
    // 테스트 케이스들 (수정 불필요)
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
    
    // 추가 도전 과제
    console.log('\n' + '='.repeat(40));
    console.log('🎯 도전 과제: 회원 등급별 혜택 계산');
    console.log('='.repeat(40));
    
    // TODO: processRegistration 함수 완성하기
    function processRegistration(userData) {
        // 먼저 유효성 검사
        const isValid = validateUserInput(userData);
        
        if (isValid) {
            console.log('\n📊 회원 등록 처리 중...');
            
            // TODO: 회원 타입별 혜택 계산
            let discount = 0;
            let welcomePoints = 0;
            
            // TODO: userData.type에 따라 할인율과 포인트 설정
            // premium: 할인 20%, 포인트 5000
            // regular: 할인 5%, 포인트 1000
            // new: 할인 10%, 포인트 3000
            
            
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
    
    // 테스트 실행 (수정 불필요)
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
║  🧩 도전 과제                            ║
║                                          ║
║  📊 데이터                               ║
║  • advancedData - 사용자/상품 데이터     ║
║  • businessRules - 비즈니스 규칙         ║
║                                          ║
║  💡 막히면 reference-script.js 참고!     ║
║                                          ║
╚══════════════════════════════════════════╝
    `);
}

// 초기 실행
showAdvancedHelp();