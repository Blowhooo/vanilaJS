// 반복문 실습 - 실무에서 자주 사용하는 패턴

// 1. 상품 목록 출력
function practiceProductList() {
    const resultDiv = document.getElementById('productListResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🛍️ 상품 목록 표시</h5>';
        
        // 상품 데이터
        const products = [
            { id: 1, name: '노트북', price: 1200000, discount: 10, stock: 5 },
            { id: 2, name: '마우스', price: 35000, discount: 0, stock: 15 },
            { id: 3, name: '키보드', price: 89000, discount: 20, stock: 0 },
            { id: 4, name: '모니터', price: 450000, discount: 15, stock: 3 },
            { id: 5, name: '스피커', price: 78000, discount: 0, stock: 8 }
        ];
        
        result += '<h6>for...of 반복문으로 상품 카드 생성:</h6>';
        
        // for...of로 상품 순회
        for (const product of products) {
            // 할인가 계산
            const discountPrice = product.discount > 0 
                ? product.price * (1 - product.discount / 100)
                : product.price;
            
            // 재고 상태
            const stockStatus = product.stock === 0 ? '품절' :
                              product.stock <= 3 ? `재고 ${product.stock}개` :
                              '재고 충분';
            
            result += `<div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 5px;">`;
            result += `<p><strong>${product.name}</strong></p>`;
            
            if (product.discount > 0) {
                result += `<p><del>${product.price.toLocaleString()}원</del> → `;
                result += `<span style="color: red;">${Math.floor(discountPrice).toLocaleString()}원</span>`;
                result += ` (${product.discount}% 할인)</p>`;
            } else {
                result += `<p>${product.price.toLocaleString()}원</p>`;
            }
            
            result += `<p class="${product.stock === 0 ? 'error' : 'info'}">${stockStatus}</p>`;
            result += `</div>`;
        }
        
        result += '<p class="info">💡 for...of는 배열 순회에 가장 깔끔한 방법</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 주문 내역 필터링
function practiceOrderFilter() {
    const resultDiv = document.getElementById('orderFilterResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📋 주문 내역 필터링</h5>';
        
        // 주문 데이터
        const orders = [
            { orderId: 'ORD001', amount: 45000, status: 'delivered', date: '2024-01-10' },
            { orderId: 'ORD002', amount: 120000, status: 'processing', date: '2024-01-15' },
            { orderId: 'ORD003', amount: 78000, status: 'cancelled', date: '2024-01-12' },
            { orderId: 'ORD004', amount: 230000, status: 'delivered', date: '2024-01-08' },
            { orderId: 'ORD005', amount: 56000, status: 'processing', date: '2024-01-16' }
        ];
        
        // forEach로 전체 주문 통계
        let totalAmount = 0;
        let deliveredCount = 0;
        let processingCount = 0;
        let cancelledCount = 0;
        
        result += '<h6>주문 상태별 분류:</h6>';
        
        orders.forEach(order => {
            totalAmount += order.amount;
            
            switch(order.status) {
                case 'delivered':
                    deliveredCount++;
                    break;
                case 'processing':
                    processingCount++;
                    break;
                case 'cancelled':
                    cancelledCount++;
                    break;
            }
        });
        
        result += `<p>✅ 배송완료: ${deliveredCount}건</p>`;
        result += `<p>⏳ 처리중: ${processingCount}건</p>`;
        result += `<p>❌ 취소됨: ${cancelledCount}건</p>`;
        result += `<p><strong>총 매출: ${totalAmount.toLocaleString()}원</strong></p>`;
        
        // filter와 reduce로 배송완료 주문만 계산
        result += '<h6>배송완료 주문 상세:</h6>';
        
        const deliveredOrders = orders.filter(order => order.status === 'delivered');
        const deliveredTotal = deliveredOrders.reduce((sum, order) => sum + order.amount, 0);
        
        deliveredOrders.forEach(order => {
            result += `<p>${order.orderId}: ${order.amount.toLocaleString()}원 (${order.date})</p>`;
        });
        
        result += `<p><strong>배송완료 총액: ${deliveredTotal.toLocaleString()}원</strong></p>`;
        
        result += '<p class="info">💡 forEach로 순회, filter로 필터링, reduce로 합계 계산</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 페이지네이션 구현
function practicePagination() {
    const resultDiv = document.getElementById('paginationResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📄 페이지네이션</h5>';
        
        // 전체 데이터 (실제로는 서버에서 받음)
        const allItems = [];
        for (let i = 1; i <= 23; i++) {
            allItems.push(`상품 ${i}`);
        }
        
        // 페이지 설정
        const itemsPerPage = 5;
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        const currentPage = 2; // 현재 2페이지
        
        result += `<p>전체 ${allItems.length}개 상품 | 페이지당 ${itemsPerPage}개 | 총 ${totalPages}페이지</p>`;
        
        // 현재 페이지 아이템 추출
        result += '<h6>현재 페이지 (2페이지) 상품:</h6>';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, allItems.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            result += `<p>${i + 1}. ${allItems[i]}</p>`;
        }
        
        // 페이지 번호 생성
        result += '<h6>페이지 네비게이션:</h6>';
        result += '<div style="display: flex; gap: 5px; margin: 10px 0;">';
        
        // 이전 버튼
        if (currentPage > 1) {
            result += `<span style="padding: 5px 10px; border: 1px solid #ddd; cursor: pointer;">◀</span>`;
        }
        
        // 페이지 번호들
        for (let page = 1; page <= totalPages; page++) {
            const isActive = page === currentPage;
            const style = isActive 
                ? 'padding: 5px 10px; background: #007bff; color: white;'
                : 'padding: 5px 10px; border: 1px solid #ddd; cursor: pointer;';
            
            result += `<span style="${style}">${page}</span>`;
        }
        
        // 다음 버튼
        if (currentPage < totalPages) {
            result += `<span style="padding: 5px 10px; border: 1px solid #ddd; cursor: pointer;">▶</span>`;
        }
        
        result += '</div>';
        
        result += '<p class="info">💡 for 루프로 페이지 번호 생성, 배열 슬라이싱으로 데이터 추출</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}