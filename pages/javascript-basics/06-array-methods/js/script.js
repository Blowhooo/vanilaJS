/**
 * 배열 메서드 실습
 * page.html에서 사용되는 실습 코드
 */

// 학생 데이터
const students = [
    { id: 1, name: '김철수', age: 20, grade: 85, major: '컴퓨터공학' },
    { id: 2, name: '이영희', age: 22, grade: 92, major: '경영학' },
    { id: 3, name: '박민수', age: 21, grade: 78, major: '컴퓨터공학' },
    { id: 4, name: '최지영', age: 23, grade: 95, major: '디자인' },
    { id: 5, name: '정대한', age: 20, grade: 88, major: '경영학' },
    { id: 6, name: '김서연', age: 22, grade: 91, major: '컴퓨터공학' },
    { id: 7, name: '이준호', age: 24, grade: 82, major: '디자인' },
    { id: 8, name: '박하나', age: 21, grade: 76, major: '경영학' },
    { id: 9, name: '최민준', age: 23, grade: 89, major: '컴퓨터공학' },
    { id: 10, name: '정유진', age: 22, grade: 94, major: '디자인' }
];

// 상품 데이터
const products = [
    { id: 1, name: '노트북', price: 1500000, category: '전자기기', stock: 5 },
    { id: 2, name: '무선마우스', price: 35000, category: '전자기기', stock: 15 },
    { id: 3, name: '키보드', price: 120000, category: '전자기기', stock: 10 },
    { id: 4, name: '모니터', price: 450000, category: '전자기기', stock: 8 },
    { id: 5, name: '책상', price: 200000, category: '가구', stock: 3 },
    { id: 6, name: '의자', price: 150000, category: '가구', stock: 7 },
    { id: 7, name: '스탠드', price: 45000, category: '가구', stock: 12 },
    { id: 8, name: '마우스패드', price: 15000, category: '액세서리', stock: 20 },
    { id: 9, name: 'USB 허브', price: 25000, category: '액세서리', stock: 18 },
    { id: 10, name: '헤드폰', price: 85000, category: '전자기기', stock: 6 }
];

// 장바구니
let cart = [];

// 필터 상태
let currentFilter = {
    category: 'all',
    priceRange: 'all',
    searchTerm: ''
};

// DOMContentLoaded 이벤트
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료');
    
    // 초기화
    displayStudentStats();
    displayProducts();
    displayCart();
    setupEventListeners();
    
    // 체이닝 예제 버튼
    const chainBtn = document.getElementById('chain-example-btn');
    if (chainBtn) {
        chainBtn.addEventListener('click', runChainingExample);
    }
});

// 1. 학생 통계 표시
function displayStudentStats() {
    const container = document.getElementById('student-stats');
    if (!container) return;
    
    // reduce로 평균 성적 계산
    const avgGrade = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
    
    // filter로 우수 학생 찾기
    const excellentStudents = students.filter(s => s.grade >= 90);
    
    // reduce로 전공별 통계
    const majorStats = students.reduce((acc, s) => {
        if (!acc[s.major]) {
            acc[s.major] = { count: 0, totalGrade: 0 };
        }
        acc[s.major].count++;
        acc[s.major].totalGrade += s.grade;
        return acc;
    }, {});
    
    // find로 최고 성적 학생
    const topStudent = students.reduce((top, s) => 
        s.grade > top.grade ? s : top
    );
    
    let html = `
        <div class="stats-container">
            <div class="stat-card">
                <h4>전체 평균</h4>
                <div class="stat-value">${avgGrade.toFixed(1)}점</div>
            </div>
            <div class="stat-card">
                <h4>최고 성적</h4>
                <div class="stat-value">${topStudent.name}</div>
                <div class="stat-detail">${topStudent.grade}점</div>
            </div>
            <div class="stat-card">
                <h4>우수 학생</h4>
                <div class="stat-value">${excellentStudents.length}명</div>
                <div class="stat-detail">90점 이상</div>
            </div>
        </div>
        
        <h4 style="margin-top: 20px;">전공별 통계</h4>
        <table class="data-table">
            <thead>
                <tr>
                    <th>전공</th>
                    <th>학생 수</th>
                    <th>평균 성적</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let major in majorStats) {
        const stat = majorStats[major];
        const majorAvg = (stat.totalGrade / stat.count).toFixed(1);
        html += `
            <tr>
                <td>${major}</td>
                <td>${stat.count}명</td>
                <td>${majorAvg}점</td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// 2. 상품 표시
function displayProducts() {
    const container = document.getElementById('products-display');
    if (!container) return;
    
    // 필터링
    let filtered = [...products];
    
    // 카테고리 필터
    if (currentFilter.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter.category);
    }
    
    // 가격 필터
    if (currentFilter.priceRange !== 'all') {
        const [min, max] = currentFilter.priceRange.split('-').map(Number);
        filtered = filtered.filter(p => {
            if (max) {
                return p.price >= min && p.price <= max;
            } else {
                return p.price >= min;
            }
        });
    }
    
    // 검색어 필터
    if (currentFilter.searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentFilter.searchTerm.toLowerCase())
        );
    }
    
    // HTML 생성
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-message">검색 결과가 없습니다.</div>';
        return;
    }
    
    let html = '<div class="products-grid">';
    filtered.forEach(product => {
        html += `
            <div class="product-card">
                <h5>${product.name}</h5>
                <div class="product-category">${product.category}</div>
                <div class="product-price">${product.price.toLocaleString()}원</div>
                <div class="product-stock">재고: ${product.stock}개</div>
                <button class="btn btn--small add-to-cart-btn" data-id="${product.id}">
                    장바구니 담기
                </button>
            </div>
        `;
    });
    html += '</div>';
    
    // 통계
    const avgPrice = filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length;
    html += `
        <div style="margin-top: 20px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
            총 ${filtered.length}개 상품 | 평균 가격: ${avgPrice.toLocaleString()}원
        </div>
    `;
    
    container.innerHTML = html;
    
    // 장바구니 버튼 이벤트
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// 3. 장바구니 표시
function displayCart() {
    const container = document.getElementById('cart-display');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-message">장바구니가 비어있습니다.</div>';
        return;
    }
    
    let html = '<div class="cart-container">';
    
    // 장바구니 아이템 표시
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const subtotal = product.price * item.quantity;
        
        html += `
            <div class="cart-item">
                <div class="item-name">${product.name}</div>
                <div class="item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.productId}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.productId}, 1)">+</button>
                </div>
                <div class="item-price">${subtotal.toLocaleString()}원</div>
                <button class="remove-btn" onclick="removeFromCart(${item.productId})">삭제</button>
            </div>
        `;
    });
    
    // 총액 계산 (reduce)
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product.price * item.quantity);
    }, 0);
    
    html += `
        <div class="cart-total">
            <strong>총액:</strong>
            <span>${total.toLocaleString()}원</span>
        </div>
        <button class="btn" onclick="clearCart()">장바구니 비우기</button>
    `;
    
    html += '</div>';
    container.innerHTML = html;
}

// 장바구니 함수들
function addToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    
    displayCart();
    showMessage('장바구니에 추가되었습니다!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    displayCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            displayCart();
        }
    }
}

function clearCart() {
    cart = [];
    displayCart();
    showMessage('장바구니를 비웠습니다.');
}

// 4. 메서드 체이닝 예제
function runChainingExample() {
    const result = document.getElementById('chain-result');
    if (!result) return;
    
    // 예제 1: 숫자 배열 체이닝
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    const chainResult = numbers
        .filter(n => n % 2 === 0)      // 짝수만
        .map(n => n * 2)                // 2배로
        .reduce((sum, n) => sum + n, 0); // 합계
    
    // 예제 2: 상품 데이터 체이닝
    const expensiveElectronics = products
        .filter(p => p.category === '전자기기')
        .filter(p => p.price >= 100000)
        .map(p => p.name)
        .join(', ');
    
    let html = `
        <h4>메서드 체이닝 결과</h4>
        <p><strong>숫자 배열 체이닝:</strong></p>
        <p>원본: [${numbers.join(', ')}]</p>
        <p>짝수 → 2배 → 합계 = ${chainResult}</p>
        
        <p><strong>상품 데이터 체이닝:</strong></p>
        <p>10만원 이상 전자기기: ${expensiveElectronics}</p>
    `;
    
    result.innerHTML = html;
    result.className = 'status status--success';
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 카테고리 필터
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        // 카테고리 옵션 생성
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.addEventListener('change', (e) => {
            currentFilter.category = e.target.value;
            displayProducts();
        });
    }
    
    // 가격 필터
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            currentFilter.priceRange = e.target.value;
            displayProducts();
        });
    }
    
    // 검색
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilter.searchTerm = e.target.value;
            displayProducts();
        });
    }
}

// 메시지 표시
function showMessage(msg) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success-message';
    msgDiv.textContent = msg;
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.right = '20px';
    msgDiv.style.zIndex = '9999';
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.remove();
    }, 2000);
}

// 전역으로 내보내기 (onclick에서 사용)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.runChainingExample = runChainingExample;

console.log('📦 script.js 로드 완료');
