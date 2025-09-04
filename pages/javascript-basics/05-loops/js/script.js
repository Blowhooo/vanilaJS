console.log('2. 간단한 상품 검색 프로그램');
// 상품 목록 (배열)
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

let searchWord = 'apple';
let searchWordLower = searchWord.toLowerCase();
let foundCount = 0;

for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let productLower = product.toLowerCase();
    let found = false;

    if (productLower.includes(searchWordLower)) {
        found = true;
    }

    if (found) {
        foundCount = foundCount + 1;
    }

}
console.log( '일치하는 검색 결과 개수: ' + foundCount + '/' + products.length);
let percent = 0;
if (products.length > 0) {
    percent = Math.round((foundCount / products.length) * 100);
}
console.log('적중률: ' + percent + '%');

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

if (foundCount === 0) {
    console.log('검색 결과가 없습니다.');
} else if (foundCount === 1) {
    console.log('검색 결과가 1개 있습니다.');
} else {
    console.log(foundCount);
}
