// 조건문 실습 - 실무에서 자주 사용하는 패턴

// 1. 로그인 상태 체크
function practiceLoginCheck() {
    const resultDiv = document.getElementById('loginCheckResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🔐 로그인 상태 관리</h5>';
        
        // 다양한 사용자 상태
        const users = [
            { username: 'user1', password: '1234', isActive: true },
            { username: 'user2', password: 'pass', isActive: false },
            { username: '', password: '1234', isActive: true },
            { username: 'admin', password: '', isActive: true }
        ];
        
        result += '<h6>로그인 시도 결과:</h6>';
        
        users.forEach((user, index) => {
            result += `<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<p><strong>시도 ${index + 1}:</strong></p>`;
            
            // 로그인 검증 로직
            if (!user.username) {
                result += `<p class="error">❌ 아이디를 입력해주세요</p>`;
            } else if (!user.password) {
                result += `<p class="error">❌ 비밀번호를 입력해주세요</p>`;
            } else if (!user.isActive) {
                result += `<p class="warning">⚠️ 비활성화된 계정입니다</p>`;
            } else {
                result += `<p class="success">✅ ${user.username}님 로그인 성공!</p>`;
                
                // 권한 체크
                const userRole = user.username === 'admin' ? '관리자' : '일반 사용자';
                result += `<p>권한: ${userRole}</p>`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 if-else if-else로 순차적 검증, 에러 우선 처리</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 상품 재고 관리
function practiceInventoryCheck() {
    const resultDiv = document.getElementById('inventoryCheckResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📦 상품 재고 상태</h5>';
        
        // 상품 목록
        const products = [
            { name: '인기상품 A', stock: 0, reserved: 0 },
            { name: '일반상품 B', stock: 5, reserved: 2 },
            { name: '신상품 C', stock: 100, reserved: 10 },
            { name: '할인상품 D', stock: 3, reserved: 3 },
            { name: '프리미엄 E', stock: 1, reserved: 0 }
        ];
        
        result += '<h6>재고 현황:</h6>';
        
        products.forEach(product => {
            const available = product.stock - product.reserved;
            let status, statusClass, message;
            
            // 재고 상태 판단
            if (available <= 0) {
                status = '품절';
                statusClass = 'error';
                message = '재입고 알림 신청';
            } else if (available <= 3) {
                status = '품절임박';
                statusClass = 'warning';
                message = `${available}개 남음 - 서두르세요!`;
            } else if (available <= 10) {
                status = '소량재고';
                statusClass = 'info';
                message = `${available}개 구매 가능`;
            } else {
                status = '재고충분';
                statusClass = 'success';
                message = '즉시 구매 가능';
            }
            
            result += `<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<p><strong>${product.name}</strong></p>`;
            result += `<p>재고: ${product.stock}개 | 예약: ${product.reserved}개</p>`;
            result += `<p class="${statusClass}">상태: ${status} - ${message}</p>`;
            result += `</div>`;
        });
        
        result += '<p class="info">💡 재고 수량에 따른 다단계 조건 처리</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 회원 등급 판정
function practiceMemberGrade() {
    const resultDiv = document.getElementById('memberGradeResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>⭐ 회원 등급 시스템</h5>';
        
        // 회원 정보
        const members = [
            { name: '김철수', totalPurchase: 2500000, joinMonths: 36 },
            { name: '이영희', totalPurchase: 500000, joinMonths: 6 },
            { name: '박민수', totalPurchase: 100000, joinMonths: 1 },
            { name: '정수진', totalPurchase: 5000000, joinMonths: 12 },
            { name: '홍길동', totalPurchase: 800000, joinMonths: 24 }
        ];
        
        result += '<h6>등급 판정 기준:</h6>';
        result += '<p>VIP: 구매 200만원 이상 AND 가입 12개월 이상</p>';
        result += '<p>GOLD: 구매 100만원 이상 OR 가입 24개월 이상</p>';
        result += '<p>SILVER: 구매 50만원 이상</p>';
        result += '<p>BRONZE: 그 외</p>';
        
        result += '<h6>회원별 등급:</h6>';
        
        members.forEach(member => {
            let grade, benefits;
            
            // 등급 판정 (복합 조건)
            if (member.totalPurchase >= 2000000 && member.joinMonths >= 12) {
                grade = 'VIP';
                benefits = '5% 적립, 무료배송, 우선 고객지원';
            } else if (member.totalPurchase >= 1000000 || member.joinMonths >= 24) {
                grade = 'GOLD';
                benefits = '3% 적립, 무료배송';
            } else if (member.totalPurchase >= 500000) {
                grade = 'SILVER';
                benefits = '2% 적립';
            } else {
                grade = 'BRONZE';
                benefits = '1% 적립';
            }
            
            result += `<div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<p><strong>${member.name}</strong></p>`;
            result += `<p>총 구매: ${member.totalPurchase.toLocaleString()}원 | 가입기간: ${member.joinMonths}개월</p>`;
            result += `<p>등급: <strong>${grade}</strong></p>`;
            result += `<p>혜택: ${benefits}</p>`;
            result += `</div>`;
        });
        
        result += '<p class="info">💡 AND(&&), OR(||) 연산자로 복합 조건 처리</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}