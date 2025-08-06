// 타입 실습 - 실무에서 자주 사용하는 패턴

// 1. 폼 입력값 검증 예제
function practiceFormValidation() {
    const resultDiv = document.getElementById('formValidationResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📝 회원가입 폼 검증</h5>';
        
        // 실제 폼 데이터 시뮬레이션
        const formData = {
            username: 'john123',
            email: 'john@example.com',
            age: '25',  // 문자열로 들어옴 (HTML input은 항상 문자열)
            agree: 'true'  // 체크박스 값도 문자열
        };
        
        result += '<h6>입력된 데이터:</h6>';
        result += `<pre>${JSON.stringify(formData, null, 2)}</pre>`;
        
        // 타입 변환 및 검증
        result += '<h6>변환 및 검증:</h6>';
        
        // 나이를 숫자로 변환
        const age = Number(formData.age);
        if (isNaN(age)) {
            result += `<p class="error">❌ 나이가 올바른 숫자가 아닙니다</p>`;
        } else {
            result += `<p class="success">✅ 나이: ${age}세 (숫자로 변환됨)</p>`;
        }
        
        // 동의 여부를 불린으로 변환
        const agreed = formData.agree === 'true';
        result += `<p>약관 동의: ${agreed ? '동의함 ✅' : '동의하지 않음 ❌'}</p>`;
        
        // 이메일 간단 검증
        const hasAtSign = formData.email.includes('@');
        result += `<p>이메일 유효성: ${hasAtSign ? '유효함 ✅' : '@ 없음 ❌'}</p>`;
        
        result += '<p class="info">💡 HTML 폼 데이터는 항상 문자열로 전달되므로 타입 변환 필요</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. API 응답 데이터 처리 예제
function practiceAPIResponse() {
    const resultDiv = document.getElementById('apiResponseResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🌐 API 응답 처리</h5>';
        
        // API에서 받은 데이터 (실제로는 JSON)
        const apiResponse = {
            success: true,
            data: {
                userId: 12345,
                name: '김철수',
                balance: '1500000',  // 서버에서 문자열로 올 수 있음
                lastLogin: '2024-01-15T10:30:00',
                isVip: 1,  // 0 또는 1로 옴
                tags: ['프리미엄', '단골고객']
            }
        };
        
        result += '<h6>원본 데이터:</h6>';
        result += `<pre>${JSON.stringify(apiResponse.data, null, 2)}</pre>`;
        
        // 데이터 변환
        result += '<h6>처리된 데이터:</h6>';
        
        // 잔액을 숫자로 변환하고 포맷팅
        const balance = parseInt(apiResponse.data.balance);
        result += `<p>💰 잔액: ${balance.toLocaleString()}원</p>`;
        
        // 날짜 처리
        const lastLogin = new Date(apiResponse.data.lastLogin);
        result += `<p>📅 마지막 로그인: ${lastLogin.toLocaleDateString()} ${lastLogin.toLocaleTimeString()}</p>`;
        
        // 불린 변환 (0/1 → true/false)
        const isVip = Boolean(apiResponse.data.isVip);
        result += `<p>⭐ VIP 여부: ${isVip ? 'VIP 회원' : '일반 회원'}</p>`;
        
        // 배열 체크
        if (Array.isArray(apiResponse.data.tags)) {
            result += `<p>🏷️ 태그: ${apiResponse.data.tags.join(', ')}</p>`;
        }
        
        result += '<p class="info">💡 API 데이터는 다양한 형태로 올 수 있어 타입 체크 필수</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 장바구니 계산 예제
function practiceCartCalculation() {
    const resultDiv = document.getElementById('cartCalculationResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🛒 장바구니 가격 계산</h5>';
        
        // 장바구니 아이템들
        const cartItems = [
            { name: '노트북', price: '1200000', quantity: '1' },
            { name: '마우스', price: '35000', quantity: '2' },
            { name: '키보드', price: '89000', quantity: '1' }
        ];
        
        result += '<h6>장바구니 목록:</h6>';
        let totalPrice = 0;
        
        cartItems.forEach(item => {
            // 문자열을 숫자로 변환
            const price = parseInt(item.price);
            const quantity = parseInt(item.quantity);
            const subtotal = price * quantity;
            
            totalPrice += subtotal;
            
            result += `<p>${item.name}: ${price.toLocaleString()}원 × ${quantity}개 = ${subtotal.toLocaleString()}원</p>`;
        });
        
        result += '<hr>';
        result += `<p><strong>총 금액: ${totalPrice.toLocaleString()}원</strong></p>`;
        
        // 할인 적용
        const discountRate = 0.1;  // 10% 할인
        const discountAmount = Math.floor(totalPrice * discountRate);
        const finalPrice = totalPrice - discountAmount;
        
        result += `<p>할인 (10%): -${discountAmount.toLocaleString()}원</p>`;
        result += `<p><strong>최종 금액: ${finalPrice.toLocaleString()}원</strong></p>`;
        
        result += '<p class="info">💡 가격 계산 시 parseInt()로 문자열→숫자 변환 후 계산</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}