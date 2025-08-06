// 변수 실습 - 실무에서 자주 사용하는 패턴

// 1. 쇼핑몰 장바구니 예제
function practiceShoppingCart() {
    const resultDiv = document.getElementById('shoppingCartResult');
    let result = '<div class="result-box">';
    
    try {
        // 상품 정보는 변경되지 않으므로 const 사용
        const productName = '노트북';
        const price = 1200000;
        
        // 수량은 변경 가능하므로 let 사용
        let quantity = 1;
        let totalPrice = price * quantity;
        
        result += '<h5>🛒 장바구니 예제</h5>';
        result += `<p>상품명: ${productName}</p>`;
        result += `<p>가격: ${price.toLocaleString()}원</p>`;
        result += `<p>수량: ${quantity}개</p>`;
        result += `<p>총액: ${totalPrice.toLocaleString()}원</p>`;
        
        // 수량 변경
        result += '<h6>수량 변경 후:</h6>';
        quantity = 3;  // let으로 선언했으므로 재할당 가능
        totalPrice = price * quantity;
        
        result += `<p>수량: ${quantity}개로 변경</p>`;
        result += `<p>새로운 총액: ${totalPrice.toLocaleString()}원</p>`;
        
        result += '<p class="info">💡 Tip: 변하지 않는 값은 const, 변하는 값은 let 사용</p>';
        
    } catch (error) {
        result += `<p class="error">에러 발생: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 사용자 정보 관리 예제
function practiceUserInfo() {
    const resultDiv = document.getElementById('userInfoResult');
    let result = '<div class="result-box">';
    
    try {
        // 사용자 정보 객체 (const로 선언하지만 속성은 변경 가능)
        const user = {
            name: '김철수',
            age: 25,
            email: 'kim@example.com'
        };
        
        result += '<h5>👤 사용자 정보 관리</h5>';
        result += '<h6>초기 정보:</h6>';
        result += `<pre>${JSON.stringify(user, null, 2)}</pre>`;
        
        // 정보 업데이트 (const 객체의 속성 변경)
        user.age = 26;
        user.phone = '010-1234-5678';  // 새 속성 추가
        
        result += '<h6>정보 업데이트 후:</h6>';
        result += `<pre>${JSON.stringify(user, null, 2)}</pre>`;
        
        result += '<p class="success">✅ const 객체의 속성은 변경 가능!</p>';
        result += '<p class="info">💡 실무에서는 객체/배열을 const로 선언하고 내용만 수정</p>';
        
    } catch (error) {
        result += `<p class="error">에러 발생: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 할인 계산기 예제
function practiceDiscount() {
    const resultDiv = document.getElementById('discountResult');
    let result = '<div class="result-box">';
    
    try {
        // 상수값 설정
        const ORIGINAL_PRICE = 50000;
        const DISCOUNT_RATE = 0.2;  // 20% 할인
        const TAX_RATE = 0.1;       // 10% 부가세
        
        // 계산
        let discountAmount = ORIGINAL_PRICE * DISCOUNT_RATE;
        let discountedPrice = ORIGINAL_PRICE - discountAmount;
        let tax = discountedPrice * TAX_RATE;
        let finalPrice = discountedPrice + tax;
        
        result += '<h5>💰 할인 계산기</h5>';
        result += `<p>원가: ${ORIGINAL_PRICE.toLocaleString()}원</p>`;
        result += `<p>할인율: ${(DISCOUNT_RATE * 100)}%</p>`;
        result += `<p>할인금액: -${discountAmount.toLocaleString()}원</p>`;
        result += `<p>할인가: ${discountedPrice.toLocaleString()}원</p>`;
        result += `<p>부가세(10%): +${tax.toLocaleString()}원</p>`;
        result += `<p><strong>최종가격: ${finalPrice.toLocaleString()}원</strong></p>`;
        
        result += '<p class="info">💡 상수는 대문자와 언더스코어로 표기 (DISCOUNT_RATE)</p>';
        
    } catch (error) {
        result += `<p class="error">에러 발생: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}