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

function project_permission_system() {
    console.log('\n🔐 권한 관리 시스템 프로젝트\n' + '='.repeat(40));
    
    class PermissionManager {
        constructor(permissions) {
            this.permissions = permissions;
        }
        
        checkPermission(role, action) {
            // role이 존재하는지 확인
            if (!this.permissions[role]) {
                return { allowed: false, reason: '알 수 없는 역할' };
            }
            
            // action이 허용되는지 확인
            const allowed = this.permissions[role].includes(action);
            
            if (!allowed) {
                // 상위 권한 체크 (admin은 모든 권한)
                if (role !== 'admin' && this.permissions.admin.includes(action)) {
                    return { allowed: false, reason: '권한 부족 (관리자 권한 필요)' };
                }
                return { allowed: false, reason: '해당 작업 권한 없음' };
            }
            
            return { allowed: true, reason: '권한 확인됨' };
        }
        
        canUserPerform(user, action, resource) {
            // 복합 조건 체크
            if (!user || !user.isActive) {
                return { allowed: false, reason: '활성 사용자 아님' };
            }
            
            const role = this.getUserRole(user);
            const permissionCheck = this.checkPermission(role, action);
            
            if (!permissionCheck.allowed) {
                return permissionCheck;
            }
            
            // 추가 비즈니스 규칙
            if (action === 'delete' && resource && resource.protected) {
                return { allowed: false, reason: '보호된 리소스' };
            }
            
            if (action === 'write' && user.points < 100) {
                return { allowed: false, reason: '포인트 부족 (최소 100 필요)' };
            }
            
            return { allowed: true, reason: '모든 조건 충족' };
        }
        
        getUserRole(user) {
            // 사용자 타입을 역할로 매핑
            const roleMapping = {
                premium: 'editor',
                regular: 'viewer',
                new: 'guest'
            };
            
            return roleMapping[user.type] || 'guest';
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
            
            // Required 체크
            if (rules.required && !value) {
                fieldErrors.push(`${field}은(는) 필수 입력입니다`);
            }
            
            // Type 체크
            if (value && rules.type === 'number' && isNaN(value)) {
                fieldErrors.push(`${field}은(는) 숫자여야 합니다`);
            }
            
            // Min/Max 체크
            if (value && rules.min !== undefined && value < rules.min) {
                fieldErrors.push(`${field}은(는) ${rules.min} 이상이어야 합니다`);
            }
            
            if (value && rules.max !== undefined && value > rules.max) {
                fieldErrors.push(`${field}은(는) ${rules.max} 이하여야 합니다`);
            }
            
            // Length 체크
            if (value && rules.minLength && value.length < rules.minLength) {
                fieldErrors.push(`${field}은(는) ${rules.minLength}자 이상이어야 합니다`);
            }
            
            // Pattern 체크
            if (value && rules.pattern && !rules.pattern.test(value)) {
                fieldErrors.push(rules.message || `${field} 형식이 올바르지 않습니다`);
            }
            
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            } else if (value) {
                results[field] = '✅ 유효';
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
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
// 추가 프로젝트 - 가격 계산기
// ===========================

function project_pricing_calculator() {
    console.log('\n💰 가격 계산기 프로젝트\n' + '='.repeat(40));
    
    function calculatePrice(user, products, coupon = null) {
        let subtotal = 0;
        let discountAmount = 0;
        const breakdown = [];
        
        // 상품별 가격 계산
        products.forEach(item => {
            const product = advancedData.products.find(p => p.id === item.productId);
            if (!product) return;
            
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            breakdown.push({
                name: product.name,
                unitPrice: product.price,
                quantity: item.quantity,
                total: itemTotal
            });
        });
        
        // 회원 등급 할인
        const userDiscount = businessRules.discountRules[user.type] || 0;
        const userDiscountAmount = subtotal * userDiscount;
        discountAmount += userDiscountAmount;
        
        // 쿠폰 할인
        let couponDiscountAmount = 0;
        if (coupon) {
            if (coupon.type === 'percentage') {
                couponDiscountAmount = subtotal * (coupon.value / 100);
            } else if (coupon.type === 'fixed') {
                couponDiscountAmount = Math.min(coupon.value, subtotal);
            }
            
            // 쿠폰 최대 할인 금액 제한
            if (coupon.maxDiscount) {
                couponDiscountAmount = Math.min(couponDiscountAmount, coupon.maxDiscount);
            }
            
            discountAmount += couponDiscountAmount;
        }
        
        // 포인트 사용
        let pointsUsed = 0;
        if (user.points >= businessRules.minPoints) {
            pointsUsed = Math.min(user.points, subtotal - discountAmount);
        }
        
        // 최종 가격
        const finalPrice = subtotal - discountAmount - pointsUsed;
        const shipping = finalPrice >= businessRules.freeShipping ? 0 : 3000;
        
        return {
            breakdown,
            subtotal,
            userDiscount: {
                rate: `${userDiscount * 100}%`,
                amount: userDiscountAmount
            },
            couponDiscount: couponDiscountAmount,
            pointsUsed,
            shipping,
            finalPrice: finalPrice + shipping,
            saved: discountAmount + pointsUsed
        };
    }
    
    // 테스트
    const testOrders = [
        {
            user: advancedData.users[0],
            products: [
                { productId: 101, quantity: 1 },
                { productId: 103, quantity: 2 }
            ],
            coupon: { type: 'percentage', value: 10, maxDiscount: 50000 }
        },
        {
            user: advancedData.users[1],
            products: [
                { productId: 104, quantity: 3 }
            ],
            coupon: null
        }
    ];
    
    testOrders.forEach((order, i) => {
        console.log(`\n주문 ${i + 1} - ${order.user.name}:`);
        const result = calculatePrice(order.user, order.products, order.coupon);
        console.log('상품 내역:', result.breakdown);
        console.log('소계:', result.subtotal.toLocaleString() + '원');
        console.log('회원 할인:', result.userDiscount.amount.toLocaleString() + '원');
        if (order.coupon) {
            console.log('쿠폰 할인:', result.couponDiscount.toLocaleString() + '원');
        }
        console.log('포인트 사용:', result.pointsUsed.toLocaleString() + '원');
        console.log('배송비:', result.shipping.toLocaleString() + '원');
        console.log('최종 가격:', result.finalPrice.toLocaleString() + '원');
        console.log('총 절약액:', result.saved.toLocaleString() + '원');
    });
}

// ===========================
// 추가 프로젝트 - 추천 시스템
// ===========================

function project_recommendation_system() {
    console.log('\n🎯 추천 시스템 프로젝트\n' + '='.repeat(40));
    
    function getRecommendations(user) {
        const recommendations = [];
        
        advancedData.products.forEach(product => {
            let score = 0;
            const reasons = [];
            
            // 1. 가격 적합성
            if (user.type === 'premium') {
                if (product.price > 100000) {
                    score += 30;
                    reasons.push('프리미엄 상품');
                }
            } else if (user.type === 'regular') {
                if (product.price >= 30000 && product.price <= 100000) {
                    score += 25;
                    reasons.push('적정 가격대');
                }
            } else {
                if (product.price < 50000) {
                    score += 20;
                    reasons.push('합리적 가격');
                }
            }
            
            // 2. 재고 상황
            if (product.stock > 0 && product.stock <= 5) {
                score += 15;
                reasons.push('곧 품절');
            } else if (product.stock === 0) {
                score = -100; // 재고 없음은 추천하지 않음
            }
            
            // 3. 나이별 선호도
            if (user.age < 30) {
                if (product.category === 'electronics') {
                    score += 20;
                    reasons.push('연령대 인기');
                }
            } else if (user.age >= 30 && user.age < 50) {
                if (product.category === 'clothing') {
                    score += 15;
                    reasons.push('선호 카테고리');
                }
            } else {
                if (product.category === 'books') {
                    score += 20;
                    reasons.push('추천 카테고리');
                }
            }
            
            // 4. 포인트 사용 가능
            if (user.points >= product.price * 0.3) {
                score += 10;
                reasons.push('포인트 사용 가능');
            }
            
            if (score > 0) {
                recommendations.push({
                    product: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    score,
                    reasons,
                    priority: score >= 50 ? '⭐ 강력 추천' : 
                             score >= 30 ? '👍 추천' : 
                             '💡 고려해보세요'
                });
            }
        });
        
        // 점수순 정렬
        recommendations.sort((a, b) => b.score - a.score);
        
        return recommendations;
    }
    
    // 모든 사용자에 대해 추천 생성
    advancedData.users.forEach(user => {
        console.log(`\n${user.name}님 (${user.age}세, ${user.type})을 위한 추천:`);
        const recommendations = getRecommendations(user);
        
        if (recommendations.length === 0) {
            console.log('추천할 상품이 없습니다.');
        } else {
            recommendations.forEach((rec, i) => {
                if (i < 3) { // 상위 3개만 표시
                    console.log(`${i + 1}. ${rec.priority} ${rec.product}`);
                    console.log(`   가격: ${rec.price.toLocaleString()}원`);
                    console.log(`   이유: ${rec.reasons.join(', ')}`);
                }
            });
        }
    });
}

// ===========================
// 도전 과제
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
    
    // 도전 과제 예시 구현
    class StateMachine {
        constructor(config) {
            this.states = config.states;
            this.initialState = config.initialState;
            this.currentState = this.initialState;
            this.history = [];
        }
        
        transition(action) {
            const state = this.states[this.currentState];
            if (!state) {
                return { success: false, error: '유효하지 않은 상태' };
            }
            
            const nextState = state.actions[action];
            if (!nextState) {
                return { 
                    success: false, 
                    error: `'${this.currentState}' 상태에서 '${action}' 액션 불가`,
                    availableActions: Object.keys(state.actions)
                };
            }
            
            // 상태 전이
            const previousState = this.currentState;
            this.currentState = nextState;
            
            // 이력 저장
            this.history.push({
                from: previousState,
                to: nextState,
                action,
                timestamp: new Date()
            });
            
            return {
                success: true,
                from: previousState,
                to: nextState,
                action
            };
        }
        
        rollback() {
            if (this.history.length === 0) {
                return { success: false, error: '롤백할 이력이 없습니다' };
            }
            
            const lastTransition = this.history.pop();
            this.currentState = lastTransition.from;
            
            return {
                success: true,
                rolled_back_to: lastTransition.from,
                from: lastTransition.to
            };
        }
        
        reset() {
            this.currentState = this.initialState;
            this.history = [];
        }
    }
    
    // 테스트
    const orderMachine = new StateMachine({
        initialState: 'pending',
        states: {
            pending: {
                actions: {
                    confirm: 'confirmed',
                    cancel: 'cancelled'
                }
            },
            confirmed: {
                actions: {
                    ship: 'shipped',
                    cancel: 'cancelled'
                }
            },
            shipped: {
                actions: {
                    deliver: 'delivered'
                }
            },
            delivered: {
                actions: {}
            },
            cancelled: {
                actions: {}
            }
        }
    });
    
    console.log('\n상태 머신 테스트:');
    console.log('초기 상태:', orderMachine.currentState);
    
    // 일련의 전이 테스트
    const actions = ['confirm', 'ship', 'deliver'];
    actions.forEach(action => {
        const result = orderMachine.transition(action);
        if (result.success) {
            console.log(`✅ ${result.from} → ${result.to} (${action})`);
        } else {
            console.log(`❌ ${result.error}`);
        }
    });
    
    console.log('\n최종 상태:', orderMachine.currentState);
    console.log('이력:', orderMachine.history);
}

function challenge_rule_engine() {
    console.log('\n⚙️ 비즈니스 룰 엔진 도전\n' + '='.repeat(40));
    
    // 룰 엔진 구현
    class RuleEngine {
        constructor() {
            this.rules = [];
        }
        
        addRule(name, condition, action) {
            this.rules.push({ name, condition, action });
        }
        
        evaluate(context) {
            const results = [];
            
            this.rules.forEach(rule => {
                if (rule.condition(context)) {
                    const actionResult = rule.action(context);
                    results.push({
                        rule: rule.name,
                        applied: true,
                        result: actionResult
                    });
                }
            });
            
            return results;
        }
    }
    
    // 룰 엔진 설정
    const engine = new RuleEngine();
    
    // 할인 규칙들
    engine.addRule(
        '프리미엄 회원 할인',
        (ctx) => ctx.user.type === 'premium',
        (ctx) => ({ discount: 0.2, message: '프리미엄 20% 할인 적용' })
    );
    
    engine.addRule(
        '대량 구매 할인',
        (ctx) => ctx.quantity >= 10,
        (ctx) => ({ discount: 0.1, message: '10개 이상 구매 10% 할인' })
    );
    
    engine.addRule(
        '첫 구매 할인',
        (ctx) => ctx.user.type === 'new',
        (ctx) => ({ discount: 0.15, message: '첫 구매 15% 할인' })
    );
    
    engine.addRule(
        '무료 배송',
        (ctx) => ctx.totalPrice >= 50000,
        (ctx) => ({ freeShipping: true, message: '5만원 이상 무료배송' })
    );
    
    // 테스트
    const testContexts = [
        {
            user: advancedData.users[0],
            quantity: 12,
            totalPrice: 60000
        },
        {
            user: advancedData.users[3],
            quantity: 2,
            totalPrice: 30000
        }
    ];
    
    testContexts.forEach((context, i) => {
        console.log(`\n테스트 ${i + 1} - ${context.user.name}:`);
        const results = engine.evaluate(context);
        results.forEach(result => {
            console.log(`✅ ${result.rule}: ${result.result.message}`);
        });
    });
}

function challenge_decision_tree() {
    console.log('\n🌳 결정 트리 알고리즘 도전\n' + '='.repeat(40));
    
    // 결정 트리 노드
    class DecisionNode {
        constructor(question, trueNode = null, falseNode = null, result = null) {
            this.question = question;
            this.trueNode = trueNode;
            this.falseNode = falseNode;
            this.result = result;
        }
        
        evaluate(context) {
            // 리프 노드인 경우
            if (this.result !== null) {
                return this.result;
            }
            
            // 질문 평가
            if (this.question(context)) {
                return this.trueNode.evaluate(context);
            } else {
                return this.falseNode.evaluate(context);
            }
        }
    }
    
    // 상품 추천 결정 트리 구축
    const tree = new DecisionNode(
        (ctx) => ctx.user.type === 'premium',
        // premium인 경우
        new DecisionNode(
            (ctx) => ctx.budget > 1000000,
            new DecisionNode(null, null, null, '노트북 추천'),
            new DecisionNode(null, null, null, '마우스 추천')
        ),
        // premium이 아닌 경우
        new DecisionNode(
            (ctx) => ctx.user.age < 30,
            new DecisionNode(null, null, null, '전자제품 추천'),
            new DecisionNode(null, null, null, '책 추천')
        )
    );
    
    // 테스트
    const testCases = [
        { user: advancedData.users[0], budget: 2000000 },
        { user: advancedData.users[1], budget: 50000 },
        { user: advancedData.users[4], budget: 100000 }
    ];
    
    testCases.forEach((testCase, i) => {
        const recommendation = tree.evaluate(testCase);
        console.log(`${testCase.user.name} (${testCase.user.type}, 예산: ${testCase.budget.toLocaleString()}원)`);
        console.log(`→ ${recommendation}\n`);
    });
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
║  • project_pricing_calculator()          ║
║  • project_recommendation_system()       ║
║                                          ║
║  🧩 도전 과제                            ║
║  • challenge_state_machine()             ║
║  • challenge_rule_engine()               ║
║  • challenge_decision_tree()             ║
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