// 연산자 실습 - 실무에서 자주 사용하는 패턴

// 1. 쇼핑몰 포인트 계산기
function practicePointCalculator() {
    const resultDiv = document.getElementById('pointCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>💳 포인트 적립 계산기</h5>';
        
        // 구매 정보
        const purchaseAmount = 85000;
        const memberGrade = 'VIP';  // 'NORMAL', 'SILVER', 'GOLD', 'VIP'
        const isFirstPurchase = false;
        
        result += `<p>구매 금액: ${purchaseAmount.toLocaleString()}원</p>`;
        result += `<p>회원 등급: ${memberGrade}</p>`;
        result += `<p>첫 구매: ${isFirstPurchase ? '예' : '아니오'}</p>`;
        
        // 등급별 적립률 (삼항 연산자 활용)
        const pointRate = memberGrade === 'VIP' ? 0.05 :
                         memberGrade === 'GOLD' ? 0.03 :
                         memberGrade === 'SILVER' ? 0.02 : 0.01;
        
        // 기본 포인트 계산
        let points = Math.floor(purchaseAmount * pointRate);
        
        // 첫 구매 보너스 (논리 연산자 활용)
        const bonusPoints = isFirstPurchase && purchaseAmount >= 50000 ? 5000 : 0;
        
        // 최종 포인트
        const totalPoints = points + bonusPoints;
        
        result += '<h6>계산 내역:</h6>';
        result += `<p>기본 적립 (${pointRate * 100}%): ${points.toLocaleString()}P</p>`;
        if (bonusPoints > 0) {
            result += `<p>첫 구매 보너스: +${bonusPoints.toLocaleString()}P</p>`;
        }
        result += `<p><strong>총 적립 포인트: ${totalPoints.toLocaleString()}P</strong></p>`;
        
        result += '<p class="info">💡 삼항 연산자로 등급별 조건 처리, && 연산자로 복합 조건 체크</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 배송비 계산기
function practiceShippingCalculator() {
    const resultDiv = document.getElementById('shippingCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📦 배송비 계산기</h5>';
        
        // 여러 주문 시나리오
        const orders = [
            { product: '책', price: 15000, weight: 0.5 },
            { product: '노트북', price: 890000, weight: 2.5 },
            { product: '의류', price: 45000, weight: 0.3 },
            { product: '가전제품', price: 35000, weight: 5.2 }
        ];
        
        result += '<h6>주문별 배송비 계산:</h6>';
        
        orders.forEach(order => {
            // 무료배송 조건: 50000원 이상 또는 1kg 미만
            const isFreeShipping = order.price >= 50000 || order.weight < 1;
            
            // 배송비 계산 (무게 기반)
            const baseShipping = 3000;
            const weightFee = order.weight > 3 ? (order.weight - 3) * 1000 : 0;
            const shippingFee = isFreeShipping ? 0 : baseShipping + weightFee;
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<p><strong>${order.product}</strong></p>`;
            result += `<p>가격: ${order.price.toLocaleString()}원 | 무게: ${order.weight}kg</p>`;
            
            // 조건 체크 표시
            result += `<p>무료배송 조건: `;
            result += order.price >= 50000 ? '✅ 5만원 이상 ' : '❌ 5만원 미만 ';
            result += order.weight < 1 ? '✅ 1kg 미만' : '❌ 1kg 이상';
            result += `</p>`;
            
            result += `<p>배송비: ${shippingFee === 0 ? '무료' : shippingFee.toLocaleString() + '원'}</p>`;
            result += `</div>`;
        });
        
        result += '<p class="info">💡 OR(||) 연산자로 무료배송 조건 체크, 삼항 연산자로 배송비 결정</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 할인 쿠폰 적용기
function practiceCouponCalculator() {
    const resultDiv = document.getElementById('couponCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🎟️ 할인 쿠폰 적용</h5>';
        
        // 장바구니 정보
        const cart = {
            items: [
                { name: '셔츠', price: 35000, quantity: 2 },
                { name: '바지', price: 58000, quantity: 1 },
                { name: '신발', price: 89000, quantity: 1 }
            ],
            coupons: [
                { code: 'WELCOME10', type: 'percent', value: 10, minAmount: 50000 },
                { code: 'SAVE5000', type: 'amount', value: 5000, minAmount: 30000 }
            ]
        };
        
        // 총액 계산
        let subtotal = 0;
        result += '<h6>주문 상품:</h6>';
        cart.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            result += `<p>${item.name}: ${item.price.toLocaleString()}원 × ${item.quantity} = ${itemTotal.toLocaleString()}원</p>`;
        });
        result += `<p><strong>소계: ${subtotal.toLocaleString()}원</strong></p>`;
        
        // 쿠폰 적용
        result += '<h6>적용 가능한 쿠폰:</h6>';
        let bestDiscount = 0;
        let bestCoupon = null;
        
        cart.coupons.forEach(coupon => {
            // 최소 금액 체크
            const isApplicable = subtotal >= coupon.minAmount;
            
            if (isApplicable) {
                // 할인 금액 계산
                const discount = coupon.type === 'percent' 
                    ? Math.floor(subtotal * (coupon.value / 100))
                    : coupon.value;
                
                result += `<p>✅ ${coupon.code}: `;
                result += coupon.type === 'percent' 
                    ? `${coupon.value}% 할인 = ${discount.toLocaleString()}원`
                    : `${discount.toLocaleString()}원 할인`;
                result += `</p>`;
                
                // 최고 할인 쿠폰 찾기
                if (discount > bestDiscount) {
                    bestDiscount = discount;
                    bestCoupon = coupon;
                }
            } else {
                result += `<p>❌ ${coupon.code}: 최소 ${coupon.minAmount.toLocaleString()}원 이상 구매 필요</p>`;
            }
        });
        
        // 최종 금액
        const finalAmount = subtotal - bestDiscount;
        result += '<h6>최종 결제:</h6>';
        if (bestCoupon) {
            result += `<p>적용 쿠폰: ${bestCoupon.code}</p>`;
            result += `<p>할인 금액: -${bestDiscount.toLocaleString()}원</p>`;
        }
        result += `<p><strong>최종 금액: ${finalAmount.toLocaleString()}원</strong></p>`;
        
        result += '<p class="info">💡 비교 연산자로 조건 체크, 삼항 연산자로 할인 계산</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}