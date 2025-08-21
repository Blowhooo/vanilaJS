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
// 실무 프로젝트 1: 권한 시스템
// ===========================

function project_permission_system() {
    console.log('\n🔐 권한 관리 시스템 프로젝트\n' + '='.repeat(40));
    
    class PermissionManager {
        constructor(permissions) {
            this.permissions = permissions;
        }
        
        checkPermission(role, action) {
            // TODO: role이 permissions에 존재하는지 확인
            if (/* TODO */) {
                return { allowed: false, reason: '알 수 없는 역할' };
            }
            
            // TODO: 해당 role이 action을 수행할 수 있는지 확인
            const allowed = /* TODO */;
            
            if (!allowed) {
                // admin이 할 수 있는 작업인지 체크
                if (role !== 'admin' && this.permissions.admin.includes(action)) {
                    return { allowed: false, reason: '권한 부족 (관리자 권한 필요)' };
                }
                return { allowed: false, reason: '해당 작업 권한 없음' };
            }
            
            return { allowed: true, reason: '권한 확인됨' };
        }
        
        canUserPerform(user, action, resource) {
            // TODO: 복합 조건 체크 구현
            
            // 1. user가 없거나 비활성이면 false
            if (/* TODO */) {
                return { allowed: false, reason: '활성 사용자 아님' };
            }
            
            // 2. getUserRole로 역할 가져오기
            const role = /* TODO */;
            
            // 3. checkPermission으로 권한 체크
            const permissionCheck = /* TODO */;
            
            if (!permissionCheck.allowed) {
                return permissionCheck;
            }
            
            // 추가 비즈니스 규칙
            // TODO: delete 액션이고 resource.protected가 true면 거부
            if (/* TODO */) {
                return { allowed: false, reason: '보호된 리소스' };
            }
            
            // TODO: write 액션이고 user.points가 100 미만이면 거부
            if (/* TODO */) {
                return { allowed: false, reason: '포인트 부족 (최소 100 필요)' };
            }
            
            return { allowed: true, reason: '모든 조건 충족' };
        }
        
        getUserRole(user) {
            // TODO: user.type을 role로 매핑
            const roleMapping = {
                premium: 'editor',
                regular: 'viewer',
                new: 'guest'
            };
            
            return /* TODO: roleMapping에서 가져오거나 기본값 'guest' */;
        }
    }
    
    const pm = new PermissionManager(advancedData.permissions);
    
    // 테스트 시나리오
    const scenarios = [
        { user: advancedData.users[0], action: 'write', resource: { protected: false } },
        { user: advancedData.users[1], action: 'delete', resource: { protected: false } },
        { user: advancedData.users[3], action: 'read', resource: { protected: false } },
        { user: advancedData.users[2], action: 'write', resource: { protected: true } }
    ];
    
    scenarios.forEach((scenario, i) => {
        const result = pm.canUserPerform(scenario.user, scenario.action, scenario.resource);
        console.log(`\n시나리오 ${i + 1}:`);
        console.log(`사용자: ${scenario.user ? scenario.user.name : 'null'}`);
        console.log(`작업: ${scenario.action}`);
        console.log(`결과: ${result.allowed ? '✅' : '❌'} ${result.reason}`);
    });
}

// ===========================
// 실무 프로젝트 2: 폼 검증 엔진
// ===========================

function project_validation_engine() {
    console.log('\n📝 폼 검증 엔진 프로젝트\n' + '='.repeat(40));
    
    const validationRules = {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '올바른 이메일 형식이 아닙니다'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: '비밀번호는 대소문자와 숫자를 포함해야 합니다'
        },
        age: {
            required: true,
            min: 1,
            max: 150,
            type: 'number'
        },
        phone: {
            pattern: /^010-\d{4}-\d{4}$/,
            message: '010-XXXX-XXXX 형식으로 입력하세요'
        }
    };
    
    function validateForm(formData) {
        const errors = {};
        const results = {};
        
        for (const [field, value] of Object.entries(formData)) {
            const rules = validationRules[field];
            if (!rules) continue;
            
            const fieldErrors = [];
            
            // TODO: 각 규칙별 검증 구현
            
            // 1. Required 체크
            if (rules.required && !value) {
                fieldErrors.push(/* TODO: 필수 입력 메시지 */);
            }
            
            // 2. Type 체크 (숫자 타입)
            if (value && rules.type === 'number' && /* TODO: 숫자가 아닌지 체크 */) {
                fieldErrors.push(`${field}은(는) 숫자여야 합니다`);
            }
            
            // 3. Min 체크
            if (value && rules.min !== undefined && /* TODO: 최솟값 체크 */) {
                fieldErrors.push(/* TODO: 최솟값 에러 메시지 */);
            }
            
            // 4. Max 체크
            // TODO: 구현
            
            
            // 5. MinLength 체크
            // TODO: 구현
            
            
            // 6. Pattern 체크
            if (value && rules.pattern && /* TODO: 패턴 불일치 체크 */) {
                fieldErrors.push(rules.message || `${field} 형식이 올바르지 않습니다`);
            }
            
            // 에러 또는 성공 결과 저장
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            } else if (value) {
                results[field] = '✅ 유효';
            }
        }
        
        return {
            isValid: /* TODO: 에러가 없으면 true */,
            errors,
            results
        };
    }
    
    // 테스트 케이스
    const testForms = [
        {
            email: 'test@example.com',
            password: 'Test1234',
            age: 25,
            phone: '010-1234-5678'
        },
        {
            email: 'invalid-email',
            password: 'weak',
            age: 200,
            phone: '01012345678'
        },
        {
            email: '',
            password: '',
            age: '',
            phone: ''
        }
    ];
    
    testForms.forEach((form, i) => {
        console.log(`\n테스트 폼 ${i + 1}:`);
        const validation = validateForm(form);
        console.log('유효성:', validation.isValid ? '✅ 통과' : '❌ 실패');
        
        if (!validation.isValid) {
            console.log('에러:');
            for (const [field, errors] of Object.entries(validation.errors)) {
                errors.forEach(error => console.log(`  - ${error}`));
            }
        }
        
        if (Object.keys(validation.results).length > 0) {
            console.log('성공:');
            for (const [field, result] of Object.entries(validation.results)) {
                console.log(`  - ${field}: ${result}`);
            }
        }
    });
}

// ===========================
// 도전 과제: 상태 머신 구현
// ===========================

function challenge_state_machine() {
    console.log('\n🎮 상태 머신 구현 도전\n' + '='.repeat(40));
    console.log('주문 상태 머신을 구현해보세요!');
    console.log(`
구현해야 할 기능:
1. 상태 전이 검증
2. 액션 실행
3. 상태 이력 관리
4. 롤백 기능

힌트:
- orderStateMachine 객체를 참고하세요
- 현재 상태에서 가능한 다음 상태만 허용
- 상태 변경 시 이벤트 로깅
    `);
    
    // TODO: StateMachine 클래스 구현
    class StateMachine {
        constructor(config) {
            // TODO: 초기 설정
            this.states = /* TODO */;
            this.initialState = /* TODO */;
            this.currentState = /* TODO */;
            this.history = [];
        }
        
        transition(action) {
            // TODO: 현재 상태에서 action이 가능한지 확인
            // TODO: 가능하면 상태 전이 및 이력 저장
            // TODO: 불가능하면 에러 메시지 반환
            
        }
        
        rollback() {
            // TODO: 이전 상태로 롤백
            
        }
        
        reset() {
            // TODO: 초기 상태로 리셋
            
        }
    }
    
    // 테스트 코드 (이미 제공)
    console.log('\n💡 StateMachine 클래스를 구현하고 테스트해보세요!');
    console.log('참고: reference-script.js에 완전한 구현이 있습니다.');
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
║  • project_permission_system()           ║
║  • project_validation_engine()           ║
║                                          ║
║  🧩 도전 과제                            ║
║  • challenge_state_machine()             ║
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