console.log('1. 비밀번호 유효성 검사 프로그램');
let password = 'Test123!';
let passwordLength = 0;

for (let i = 0; password[i] !== undefined; i++) {
    passwordLength = passwordLength + 1;
}

if (passwordLength >= 8) {
    console.log('비밀번호 길이 충족');
} else {
    console.log('8자 이상 입력해주세요.');
}

let hasUpperCase = false;
let upperCount = 0;
for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    if (char >= 'A' && char <= 'Z') {
        hasUpperCase = true;
        upperCount = upperCount + 1;
    }
}
if (hasUpperCase) {
    console.log('대문자: ' + upperCount + '개 발견!');
} else {
    console.log('대문자를 포함시켜주세요!');
}

let hasLowerCase = false;
let lowerCount = 0;
for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    if (char >= 'a' && char <= 'z') {
        hasLowerCase = true;
        lowerCount = lowerCount + 1;
    }
}
if (hasLowerCase) {
    console.log('소문자: ' + lowerCount + '개 발견!');
} else {
    console.log('소문자를 포함시켜주세요!');
}

let hasNumber = false;
let numberCount = 0;
for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    if (char >= '0' && char <= '9') {
        hasNumber = true;
        numberCount = numberCount + 1;
    }
}
if (hasNumber) {
    console.log('숫자: ' + numberCount + '개 발견!');
} else {
    console.log('숫자를 포함시켜주세요!');
}

let hasSpecial = false;
let specialCount = 0;
let specialChars = '!@#$%^&*()_+'
for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    for (let j = 0; j < specialChars.length; j++) {
        if (char === specialChars[j]) {
            hasSpecial = true;
            specialCount = specialCount + 1;
        }
    }
}
if (hasSpecial) {
    console.log('특수문자: ' + specialCount + '개 발견!');
} else {
    console.log('특수문자를 포함시켜주세요!');
}

let isValid = true;
let passedConditions = 0;
let totalConditions = 5;

if (passwordLength >= 8) {
    passedConditions = passedConditions + 1;
} else {
    isValid = false;
}

if (hasUpperCase) {
    passedConditions = passedConditions + 1;
} else {
    isValid = false;
}

if (hasLowerCase) {
    passedConditions = passedConditions + 1;
} else {
    isValid = false;
}

if (hasNumber) {
    passedConditions = passedConditions + 1;
} else {
    isValid = false;
}

if (hasSpecial) {
    passedConditions = passedConditions + 1;
} else {
    isValid = false;
}

let progressbar = '[';
for (let i = 0; i < totalConditions; i++) {
    if (i < passedConditions) {
        progressbar = progressbar + '■';
    } else {
        progressbar = progressbar + '□';
    }
}
progressbar = progressbar + ']';
console.log(progressbar)

if(isValid) {
    console.log('강력한 비밀번호입니다!');
} else {
    console.log('※ 다음 항목을 보완해주세요.');
    if (passwordLength < 8) {
        console.log('8자 이상 입력해주세요.')
    }
    if (!hasUpperCase) {
        console.log('대문자를 포함시켜주세요. (A~Z)')
    }
    if (!hasLowerCase) {
        console.log('소문자를 포함시켜주세요. (a~z)')
    }
    if (!hasNumber) {
        console.log('숫자를 포함시켜주세요.')
    }
    if (!hasSpecial) {
        console.log('특수문자를 포함시켜주세요.')
    }
}
console.log(`\n-----------------------------------------------\n\n`)
// 간단한 상품 검색 프로그램
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
    console.log(foundCount + '. ' + product);
}
