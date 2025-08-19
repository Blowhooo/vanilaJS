/**
 * 배열 메서드 예제 함수들
 * example.html에서 호출되는 함수들
 */

console.log('🚀 example.js 파일이 로드되었습니다!');

// 샘플 데이터
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const products = [
    { id: 1, name: '노트북', price: 1500000, category: '전자기기' },
    { id: 2, name: '마우스', price: 50000, category: '전자기기' },
    { id: 3, name: '키보드', price: 150000, category: '전자기기' },
    { id: 4, name: '모니터', price: 450000, category: '전자기기' },
    { id: 5, name: '책상', price: 200000, category: '가구' },
    { id: 6, name: '의자', price: 150000, category: '가구' }
];

// 1. forEach 예제
function runForEachExample() {
    const output = document.getElementById('forEach-result');
    let result = '🔄 forEach() 메서드 예제:\n\n';
    
    result += '1. 기본 사용법 - 배열의 각 요소 출력:\n';
    result += 'numbers.forEach((num, index) => { ... })\n\n';
    
    let sum = 0;
    numbers.forEach((num, index) => {
        result += `인덱스 ${index}: ${num}\n`;
        sum += num;
    });
    
    result += `\n합계: ${sum}\n\n`;
    
    result += '2. 객체 배열 처리:\n';
    products.forEach((product, index) => {
        result += `${index + 1}. ${product.name} - ${product.price.toLocaleString()}원\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 2. map 예제
function runMapExample() {
    const output = document.getElementById('map-result');
    let result = '🔄 map() 메서드 예제:\n\n';
    
    result += '1. 숫자 배열 변환 (2배로):\n';
    const doubled = numbers.map(num => num * 2);
    result += `원본: [${numbers.join(', ')}]\n`;
    result += `결과: [${doubled.join(', ')}]\n\n`;
    
    result += '2. 객체 배열에서 특정 속성 추출:\n';
    const productNames = products.map(product => product.name);
    result += `상품명 목록: [${productNames.join(', ')}]\n\n`;
    
    result += '3. 객체 변환:\n';
    const priceInfo = products.map(product => ({
        name: product.name,
        priceKRW: product.price.toLocaleString() + '원',
        priceUSD: '$' + (product.price / 1300).toFixed(2)
    }));
    
    priceInfo.forEach(item => {
        result += `${item.name}: ${item.priceKRW} (${item.priceUSD})\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 3. filter 예제
function runFilterExample() {
    const output = document.getElementById('filter-result');
    let result = '🔄 filter() 메서드 예제:\n\n';
    
    result += '1. 짝수만 필터링:\n';
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    result += `짝수: [${evenNumbers.join(', ')}]\n\n`;
    
    result += '2. 5보다 큰 숫자:\n';
    const greaterThanFive = numbers.filter(num => num > 5);
    result += `5보다 큰 수: [${greaterThanFive.join(', ')}]\n\n`;
    
    result += '3. 20만원 이상인 상품:\n';
    const expensiveProducts = products.filter(product => product.price >= 200000);
    expensiveProducts.forEach(product => {
        result += `- ${product.name}: ${product.price.toLocaleString()}원\n`;
    });
    
    result += '\n4. 특정 카테고리 필터링:\n';
    const electronics = products.filter(product => product.category === '전자기기');
    result += `전자기기 카테고리: ${electronics.length}개\n`;
    electronics.forEach(product => {
        result += `- ${product.name}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 4. find 예제
function runFindExample() {
    const output = document.getElementById('find-result');
    let result = '🔄 find() 메서드 예제:\n\n';
    
    result += '1. 첫 번째 짝수 찾기:\n';
    const firstEven = numbers.find(num => num % 2 === 0);
    result += `첫 번째 짝수: ${firstEven}\n\n`;
    
    result += '2. 5보다 큰 첫 번째 숫자:\n';
    const firstGreaterThanFive = numbers.find(num => num > 5);
    result += `5보다 큰 첫 번째 숫자: ${firstGreaterThanFive}\n\n`;
    
    result += '3. ID로 상품 찾기:\n';
    const targetProduct = products.find(product => product.id === 3);
    if (targetProduct) {
        result += `ID가 3인 상품: ${targetProduct.name} - ${targetProduct.price.toLocaleString()}원\n\n`;
    }
    
    result += '4. 가격으로 상품 찾기:\n';
    const cheapProduct = products.find(product => product.price < 100000);
    if (cheapProduct) {
        result += `10만원 미만 첫 번째 상품: ${cheapProduct.name}\n`;
    }
    
    result += '\n5. findIndex() 예제:\n';
    const index = numbers.findIndex(num => num > 7);
    result += `7보다 큰 첫 번째 숫자의 인덱스: ${index} (값: ${numbers[index]})\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 5. reduce 예제
function runReduceExample() {
    const output = document.getElementById('reduce-result');
    let result = '🔄 reduce() 메서드 예제:\n\n';
    
    result += '1. 배열 합계 구하기:\n';
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    result += `[${numbers.join(', ')}]의 합계: ${sum}\n\n`;
    
    result += '2. 최댓값 구하기:\n';
    const max = numbers.reduce((acc, num) => num > acc ? num : acc);
    result += `최댓값: ${max}\n\n`;
    
    result += '3. 평균 구하기:\n';
    const avg = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    result += `평균: ${avg}\n\n`;
    
    result += '4. 카테고리별 상품 개수:\n';
    const categoryCount = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});
    
    for (let category in categoryCount) {
        result += `${category}: ${categoryCount[category]}개\n`;
    }
    
    result += '\n5. 전체 상품 총액:\n';
    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    result += `총액: ${totalPrice.toLocaleString()}원\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 6. some & every 예제
function runSomeEveryExample() {
    const output = document.getElementById('some-every-result');
    let result = '🔄 some() & every() 메서드 예제:\n\n';
    
    result += '=== some() - 하나라도 조건을 만족하는지 ===\n';
    
    const hasEven = numbers.some(num => num % 2 === 0);
    result += `짝수가 있는가? ${hasEven}\n`;
    
    const hasNegative = numbers.some(num => num < 0);
    result += `음수가 있는가? ${hasNegative}\n`;
    
    const hasExpensive = products.some(product => product.price > 1000000);
    result += `100만원 이상 상품이 있는가? ${hasExpensive}\n\n`;
    
    result += '=== every() - 모든 요소가 조건을 만족하는지 ===\n';
    
    const allPositive = numbers.every(num => num > 0);
    result += `모두 양수인가? ${allPositive}\n`;
    
    const allLessThan20 = numbers.every(num => num < 20);
    result += `모두 20 미만인가? ${allLessThan20}\n`;
    
    const allElectronics = products.every(product => product.category === '전자기기');
    result += `모두 전자기기인가? ${allElectronics}\n`;
    
    const allHavePrice = products.every(product => product.price > 0);
    result += `모든 상품에 가격이 있는가? ${allHavePrice}\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 7. 메서드 체이닝 예제
function runChainingExample() {
    const output = document.getElementById('chaining-result');
    let result = '🔄 메서드 체이닝 예제:\n\n';
    
    result += '1. filter → map → reduce 체이닝:\n';
    result += '짝수만 선택 → 2배로 만들기 → 합계 구하기\n\n';
    
    const chainResult = numbers
        .filter(num => num % 2 === 0)    // 짝수만
        .map(num => num * 2)              // 2배로
        .reduce((acc, num) => acc + num, 0); // 합계
    
    result += `원본: [${numbers.join(', ')}]\n`;
    result += `짝수: [${numbers.filter(num => num % 2 === 0).join(', ')}]\n`;
    result += `2배로: [${numbers.filter(num => num % 2 === 0).map(num => num * 2).join(', ')}]\n`;
    result += `최종 합계: ${chainResult}\n\n`;
    
    result += '2. 상품 데이터 체이닝:\n';
    result += '전자기기 → 20만원 이상 → 이름만 추출\n\n';
    
    const expensiveElectronicsNames = products
        .filter(product => product.category === '전자기기')
        .filter(product => product.price >= 200000)
        .map(product => product.name);
    
    result += `결과: [${expensiveElectronicsNames.join(', ')}]\n\n`;
    
    result += '3. 복잡한 체이닝:\n';
    result += '가구 카테고리 → 가격 10% 할인 → 할인가 표시\n\n';
    
    const discountedFurniture = products
        .filter(product => product.category === '가구')
        .map(product => ({
            name: product.name,
            originalPrice: product.price,
            discountedPrice: product.price * 0.9
        }))
        .map(product => 
            `${product.name}: ${product.originalPrice.toLocaleString()}원 → ${product.discountedPrice.toLocaleString()}원`
        );
    
    discountedFurniture.forEach(item => {
        result += `${item}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 8. 실전 예제 - 장바구니
function runPracticalExample() {
    const output = document.getElementById('practical-result');
    let result = '🛒 실전 예제: 장바구니 계산\n\n';
    
    // 장바구니 데이터
    const cart = [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
        { productId: 5, quantity: 3 }
    ];
    
    result += '장바구니 내용:\n';
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            result += `- ${product.name}: ${item.quantity}개\n`;
        }
    });
    
    result += '\n상세 내역:\n';
    
    // 장바구니 상세 계산
    const cartDetails = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            subtotal: product.price * item.quantity
        };
    });
    
    cartDetails.forEach(item => {
        result += `${item.name}: ${item.quantity}개 × ${item.price.toLocaleString()}원 = ${item.subtotal.toLocaleString()}원\n`;
    });
    
    // 총액 계산
    const total = cartDetails.reduce((sum, item) => sum + item.subtotal, 0);
    result += `\n─────────────────────\n`;
    result += `총액: ${total.toLocaleString()}원\n\n`;
    
    // 추가 통계
    result += '📊 장바구니 통계:\n';
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    result += `총 수량: ${totalQuantity}개\n`;
    
    const avgPrice = total / totalQuantity;
    result += `평균 단가: ${Math.round(avgPrice).toLocaleString()}원\n`;
    
    const mostExpensiveItem = cartDetails.reduce((max, item) => 
        item.subtotal > max.subtotal ? item : max
    );
    result += `가장 비싼 항목: ${mostExpensiveItem.name} (${mostExpensiveItem.subtotal.toLocaleString()}원)\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 콘솔에서 테스트용
console.log('💡 배열 메서드 예제 함수들이 로드되었습니다.');
console.log('사용 가능한 함수: runForEachExample(), runMapExample(), runFilterExample(), runFindExample(), runReduceExample(), runSomeEveryExample(), runChainingExample(), runPracticalExample()');

// DOMContentLoaded 이벤트로 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료 - 이벤트 리스너 등록');
    
    // 각 버튼에 이벤트 리스너 추가
    const forEachBtn = document.getElementById('forEach-btn');
    if (forEachBtn) forEachBtn.addEventListener('click', runForEachExample);
    
    const mapBtn = document.getElementById('map-btn');
    if (mapBtn) mapBtn.addEventListener('click', runMapExample);
    
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) filterBtn.addEventListener('click', runFilterExample);
    
    const findBtn = document.getElementById('find-btn');
    if (findBtn) findBtn.addEventListener('click', runFindExample);
    
    const reduceBtn = document.getElementById('reduce-btn');
    if (reduceBtn) reduceBtn.addEventListener('click', runReduceExample);
    
    const someEveryBtn = document.getElementById('some-every-btn');
    if (someEveryBtn) someEveryBtn.addEventListener('click', runSomeEveryExample);
    
    const chainingBtn = document.getElementById('chaining-btn');
    if (chainingBtn) chainingBtn.addEventListener('click', runChainingExample);
    
    const practicalBtn = document.getElementById('practical-btn');
    if (practicalBtn) practicalBtn.addEventListener('click', runPracticalExample);
});

// 전역으로도 내보내기 (콘솔에서 테스트용)
window.runForEachExample = runForEachExample;
window.runMapExample = runMapExample;
window.runFilterExample = runFilterExample;
window.runFindExample = runFindExample;
window.runReduceExample = runReduceExample;
window.runSomeEveryExample = runSomeEveryExample;
window.runChainingExample = runChainingExample;
window.runPracticalExample = runPracticalExample;
