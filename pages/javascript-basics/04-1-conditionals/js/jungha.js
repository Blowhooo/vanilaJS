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
        if (!userData.name) {
            errors.push('이름을 입력해주세요.');
            isValid = false;
        } else if (userData.name.length < 2) {
            errors.push('이름은 두글자 이상 입력해주세요.');
            isValid = false;
        } else {
            console.log('이름: ' + userData.name);
        }

        // 2. 나이 검증 (숫자, 1~120)
        if (!userData.age) {
            errors.push('나이를 입력해주세요.');
            isValid = false; 
        } else if (isNaN(userData.age)) {
            errors.push('나이는 숫자로 입력해주세요.');
            isValid = false;
        } else if (userData.age < 1 || userData.age > 120) {
            errors.push('나이는 1~120 사이의 값으로 입력해주세요.');
            isValid = false;
        } else {
            console.log('나이: ' + userData.age);
        }

        // 3. 이메일 검증 (@ 포함 여부만 체크)
        if (!userData.email) {
            errors.push('이메일을 입력해주세요.');
            isValid = false;
        } else if (!userData.email.includes('@')) {
            errors.push('이메일을 올바른 형식으로 입력해주세요. (@ 필요)');
            isValid = false;
        } else {
            console.log('이메일: ' + userData.email);
        }

        // 4. 회원 타입 검증 (premium, regular, new 중 하나)
        const validTypes = ['premium', 'regular', 'new'];
        // TODO: userData.type이 validTypes에 포함되는지 체크
        if (!userData.type) {
            errors.push('회원 타입을 선택해주세요.');
            isValid = false;
        } else if (!validTypes.includes(userData.type)) {
            errors.push('올바른 회원 타입이 아닙니다.');
            isValid = false;
        } else {
            console.log('회원 타입: ' + userData.type);
        }
        
        // 5. 약관 동의 검증
        if (userData.agree !== true) {
            errors.push('약관에 동의해주세요.');
            isValid = false;
        } else {
            console.log('약관 동의 완료');
        }

        console.log('\n' + '='.repeat(40));
        // 결과 출력 및 회원 타입별 환영 메시지
        if (isValid) {
            console.log('검증 완료! 회원가입이 가능합니다.');

            if (userData.type === 'premium') {
                console.log('프리미엄 회원이 되신 것을 환영합니다~');
            } else if (userData.type === 'regular') {
                console.log('일반 회원이 되신 것을 환영합니다~');
            } else if (userData.type === 'new') {
                console.log('신규 회원 혜택을 확인해주세요!')
            }

        } else {
            console.log('검증 실패! 입력한 항목을 확인해주세요.')
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
        age: '150',
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

project_validation_engine()

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