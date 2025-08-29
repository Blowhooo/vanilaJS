// 간단한 상품 검색 프로그램

// 상품 목록 (10개로 줄임)
let products = [
    "Apple iPhone",
    "Samsung Galaxy",
    "Apple MacBook",
    "Dell Laptop",
    "Sony Headphones",
    "Apple AirPods",
    "Samsung TV",
    "iPad Pro",
    "Apple Watch",
    "Samsung Buds"
];

// 검색어 입력 (실제로는 input에서 받음)
let searchWord = "apple";

console.log('🔍 상품 검색');
console.log('검색어: ' + searchWord);
console.log('---------------------------------');

// 검색어를 소문자로 변환 (includes를 사용하지 않고 직접 구현)
let searchLower = searchWord.toLowerCase();

// 검색 결과 카운트
let foundCount = 0;

console.log('📦 검색 결과:');
console.log('');

// 모든 상품을 하나씩 확인
for (let i = 0; i < products.length; i++) {
    let product = products[i];
    
    // 상품명도 소문자로 변환
    let productLower = product.toLowerCase();
    
    // 검색어가 포함되어 있는지 확인
    // 입문자용: includes 메서드 사용 (가장 간단한 방법)
    let found = false;
    
    // 상품명 안에 검색어가 있으면 true
    if (productLower.includes(searchLower)) {
        found = true;
    }
    
    // 또는 더 간단하게: found = productLower.includes(searchLower);
    
    // 찾았으면 출력
    if (found) {
        foundCount = foundCount + 1;
        console.log('  ✅ ' + foundCount + '. ' + product);
    }
}

console.log('');
console.log('---------------------------------');

// 결과 요약
console.log('📊 결과 요약');
console.log('전체 상품: ' + products.length + '개');
console.log('검색 결과: ' + foundCount + '개');

// 성공률 계산
let percent = 0;
if (products.length > 0) {
    percent = Math.round((foundCount * 100) / products.length);
}
console.log('적중률: ' + percent + '%');

// 간단한 막대 그래프
console.log('');
console.log('진행도:');
let bar = '[';
let barSize = 10;
let filled = Math.round((percent * barSize) / 100);

for (let i = 0; i < barSize; i++) {
    if (i < filled) {
        bar = bar + '■';
    } else {
        bar = bar + '□';
    }
}
bar = bar + ']';
console.log(bar);

console.log('---------------------------------');

// 검색 안내
if (foundCount === 0) {
    console.log('❌ 검색 결과가 없습니다.');
    console.log('💡 다른 단어로 검색해보세요!');
} else if (foundCount === 1) {
    console.log('👍 1개의 상품을 찾았습니다!');
} else {
    console.log('👍 ' + foundCount + '개의 상품을 찾았습니다!');
}

console.log('');
console.log('💡 다른 검색어 테스트:');
console.log('   17번 줄의 searchWord를 변경하세요');
console.log('   예: "samsung", "phone", "tv"');
