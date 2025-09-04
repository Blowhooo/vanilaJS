// 간단한 상품 검색 프로그램

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

let searchWord = "apple";

console.log('상품 검색 프로그램')
console.log('검색한 상품 : ' + searchWord);
console.log('-------------------------------------');

let searchLower = searchWord.toLowerCase();
let foundCount = 0;

for(let i=0; i < products.length; i++){
    let product = products[i]
    let productLower = product.toLowerCase();
    let found = false;

    if (productLower.includes(searchLower)){
        found = true;
        foundCount = foundCount + 1;
    }

    if(found){
        console.log(foundCount + '. ' + product)
    }
}
console.log('-------------------------------------');
console.log('상품 요약')
console.log('전체 상품: ' + products.length + '개');
console.log('검색 결과: ' + foundCount + '개');
console.log('-------------------------------------');

let percent = 0;
if (products.length > 0){
    percent = Math.round((foundCount * 100) / products.length);
}
console.log('퍼센트 : ' + percent + '%')

console.log('진행도: ')
let bar = '[ ';
let barSize = 10;
let filled = Math.round((foundCount * barSize) / 10)
for (let i=0; i < barSize; i++){
    if (i < filled){
        bar = bar + '■ '
    } else {
        bar = bar + '□ '
    }
}

bar = bar + ']';
console.log(bar)

if (foundCount === 0){
    console.log('검색결과가 없습니다.')
    console.log('다른 검색어를 입력해주세요.')
} else if (foundCount === 1){
    console.log('1개의 검색결과가 있습니다.')
} else {
    console.log(foundCount + '개의 검색결과를 찾았습니다.')
}