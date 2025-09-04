// 비밀번호 유효성 검사 프로그램
// specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

let password = "Test123!";

console.log('비밀번호 유효성 검사')
console.log('입력된 비밀번호 : ' + password)
console.log('----------------------------')

let passwordLength = 0;

for (let i=0; password[i] !== undefined; i++){
    passwordLength = passwordLength + 1;
}

console.log('입력된 비밀번호 : ' + passwordLength + '자')

if (passwordLength >= 8){
    console.log('길이 조건 충족완료')
} else {
    console.log('8자 이상 입력 하세요.')
}

let hasUpperCase = false;
let upperCount = 0;

for (let i=0; i < passwordLength; i++){
    let char = password[i]

    if (char >= 'A' && char <= 'Z'){
        hasUpperCase = true;
        upperCount = upperCount + 1
    }
}

if(hasUpperCase){
    console.log('대문자 ' + upperCount + '개 발견')
} else {
    console.log('대문자를 포함시켜주세요.')
}

let hasLowerCase = false;
let lowerCount = 0;

for (let i=0; i < passwordLength; i++){
    let char = password[i]

    if (char >= 'a' && char <= 'z'){
        hasLowerCase = true;
        lowerCount = lowerCount + 1
    }
}

if(hasLowerCase){
    console.log('소문자 ' + lowerCount + '개 발견')
} else {
    console.log('소문자를 포함시켜주세요.')
}

let hasNumber = false;
let numberCount = 0;

for (let i=0; i < passwordLength; i++){
    let char = password[i]

    if (char >= '0' && char <= '9'){
        hasNumber = true;
        numberCount = numberCount + 1
    }
}

if(hasNumber){
    console.log('숫자 ' + numberCount + '개 발견')
} else {
    console.log('숫자를 포함시켜주세요.')
}

let hasSpecial = false;
let specialCount = 0;
let specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

for (let i=0; i < passwordLength; i++){
    let char = password[i]

    for (let j=0; j < specialChars.length; j++){
        if (char === specialChars[j]){
            hasSpecial = true;
            specialCount = specialCount + 1
            break;
        }
    }
}


if(hasSpecial){
    console.log('특수문자 ' + specialCount + '개 발견')
} else {
    console.log('특수문자를 포함시켜주세요.')
}

let isValid = true;
let passedConditions = 0;
let totalConditions = 5;

if (passwordLength >= 8){
    passedConditions = passedConditions + 1
} else {
    isValid = false;
}

if (hasUpperCase){
    passedConditions = passedConditions + 1
} else {
    isValid = false;
}

if (hasLowerCase){
    passedConditions = passedConditions + 1
} else {
    isValid = false;
}

if (hasNumber){
    passedConditions = passedConditions + 1
} else {
    isValid = false;
}

if (hasSpecial){
    passedConditions = passedConditions + 1
} else {
    isValid = false;
}

console.log('통과 조건: ' + passedConditions + '/' + totalConditions);

let progressBar = '[';
for (let i=0; i < totalConditions; i++) {
    if (i < passedConditions) {
        progressBar = progressBar + '■';
    } else {
        progressBar = progressBar + '□';
    }
}
progressBar = progressBar + ']';
console.log('진행도: ' + progressBar);