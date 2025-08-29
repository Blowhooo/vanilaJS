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
        if (!userData.name){
            errors.push('이름을 입력해주시기 바랍니다.')
            isValid = false;
        } else if (!userData.name.length > 2){
            errors.push('이름은 2글자 이상으로 적어주세요.')
            isValid = false;
        } else {
            console.log('이름 : ' + userData.name)
        }
        
        // 2. 나이 검증 (숫자, 1~120)
        if (!userData.age){
            errors.push('나이를 입력해주시기 바랍니다.')
            isValid = false;
        } else if (isNaN(userData.age)){
            errors.push('나이는 숫자만 입력 가능합니다.')
            isValid = false;
        } else if (userData.age < 1 || userData.age > 120){
            errors.push('나이는 1살 이상부터 120이하까지 입력 가능합니다.')
            isValid = false;            
        } else {
            console.log('나이 : ' + userData.age)
        }
        
        
        // 3. 이메일 검증 (@ 포함 여부만 체크)
        if (!userData.email){
            errors.push('이메일을 입력해주시기 바랍니다.')
            isValid = false;
        } else if (!userData.email.includes('@')){
            errors.push('유효한 이메일을 작성해주세요.')
            isValid = false;
        } else {
            console.log('이메일 : ' + userData.email)
        }

        // 4. 회원 타입 검증 (premium, regular, new 중 하나)
        const validTypes = ['premium', 'regular', 'new'];
        // TODO: userData.type이 validTypes에 포함되는지 체크
        if (!userData.type){
            errors.push('회원 타입을 선택해주세요.')
            isValid = false;
        } else if (!validTypes.includes(userData.type)){
            errors.push('유효한 회원 타입을 선택해주세요.')
            isValid = false;
        } else {
            console.log('회원타입 : ' + userData.type)
        }
        
        // 5. 약관 동의 검증
        if (!userData.agree){
            errors.push('약관에 동의해주세요.')
            isValid = false;
        } else {
            console.log('약관 동의완료')
        }

        console.log('\n' + '='.repeat(40));
        // 결과 출력 및 회원 타입별 환영 메시지
        if (isValid){
            if (userData.type === 'premium'){
                console.log('프리미엄 회원이 되신것을 환영합니다!')
            } else if (userData.type === 'regular'){
                console.log('일반 회원이 되신것을 환영합니다!')
            } else if (userData.type === 'new'){
                console.log('신규회원이 되신것을 환영합니다!')
            }
        } else {
            console.log('회원가입 실패, 하단에 있는 오류를 확인해주세요.')
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
            if (userData.type === 'premium'){
                discount = 20;
                welcomePoints = 5000;
            } else if (userData.type === 'regular'){
                discount = 5;
                welcomePoints = 1000;
            } else if (userData.type === 'new'){
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