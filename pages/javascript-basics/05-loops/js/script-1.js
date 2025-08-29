// 비밀번호 유효성 검사 프로그램

// 검사할 비밀번호 (실제로는 input에서 받음)
let password = "Test123!";

console.log('🔐 비밀번호 유효성 검사');
console.log('입력된 비밀번호: ' + password);
console.log('---------------------------------');

// 1단계: 비밀번호 길이 확인
let passwordLength = 0;

// for문으로 문자열 길이 계산
for (let i = 0; password[i] !== undefined; i++) {
    passwordLength = passwordLength + 1;
}

console.log('길이: ' + passwordLength + '자');

if (passwordLength >= 8) {
    console.log('✅ 길이 조건 통과!');
} else {
    console.log('❌ 8자 이상 입력하세요');
}

// 2단계: 대문자 포함 여부 확인
let hasUpperCase = false;
let upperCount = 0;

for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    
    // 대문자인지 확인 (A-Z는 ASCII 65-90)
    if (char >= 'A' && char <= 'Z') {
        hasUpperCase = true;
        upperCount = upperCount + 1;
    }
}

if (hasUpperCase) {
    console.log('✅ 대문자 ' + upperCount + '개 발견!');
} else {
    console.log('❌ 대문자를 포함해주세요');
}

// 3단계: 소문자 포함 여부 확인
let hasLowerCase = false;
let lowerCount = 0;

for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    
    // 소문자인지 확인 (a-z는 ASCII 97-122)
    if (char >= 'a' && char <= 'z') {
        hasLowerCase = true;
        lowerCount = lowerCount + 1;
    }
}

if (hasLowerCase) {
    console.log('✅ 소문자 ' + lowerCount + '개 발견!');
} else {
    console.log('❌ 소문자를 포함해주세요');
}

// 4단계: 숫자 포함 여부 확인
let hasNumber = false;
let numberCount = 0;

for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    
    // 숫자인지 확인 (0-9)
    if (char >= '0' && char <= '9') {
        hasNumber = true;
        numberCount = numberCount + 1;
    }
}

if (hasNumber) {
    console.log('✅ 숫자 ' + numberCount + '개 발견!');
} else {
    console.log('❌ 숫자를 포함해주세요');
}

// 5단계: 특수문자 포함 여부 확인
let hasSpecial = false;
let specialCount = 0;
let specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

for (let i = 0; i < passwordLength; i++) {
    let char = password[i];
    
    // 특수문자 목록에서 하나씩 비교
    for (let j = 0; j < specialChars.length; j++) {
        if (char === specialChars[j]) {
            hasSpecial = true;
            specialCount = specialCount + 1;
            break;  // 찾았으면 더 이상 확인 불필요
        }
    }
}

if (hasSpecial) {
    console.log('✅ 특수문자 ' + specialCount + '개 발견!');
} else {
    console.log('❌ 특수문자를 포함해주세요');
}

// 최종 결과
console.log('---------------------------------');

// 모든 조건을 만족하는지 확인
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

// 통과한 조건 표시
console.log('통과 조건: ' + passedConditions + '/' + totalConditions);

// 진행도 바 그리기
let progressBar = '[';
for (let i = 0; i < totalConditions; i++) {
    if (i < passedConditions) {
        progressBar = progressBar + '■';
    } else {
        progressBar = progressBar + '□';
    }
}
progressBar = progressBar + ']';
console.log('진행도: ' + progressBar);

// 최종 메시지
if (isValid) {
    console.log('🎉 강력한 비밀번호입니다!');
} else {
    console.log('⚠️  비밀번호를 보완해주세요.');
    
    if (passwordLength < 8) {
        console.log('• ' + (8 - passwordLength) + '자를 더 입력하세요');
    }
    if (!hasUpperCase) {
        console.log('• 대문자를 추가하세요 (A-Z)');
    }
    if (!hasLowerCase) {
        console.log('• 소문자를 추가하세요 (a-z)');
    }
    if (!hasNumber) {
        console.log('• 숫자를 추가하세요 (0-9)');
    }
    if (!hasSpecial) {
        console.log('• 특수문자를 추가하세요 (!@#$...)');
    }
}

console.log('---------------------------------');

// 다른 비밀번호 테스트하기
console.log('💡 다른 비밀번호를 테스트하려면');
console.log('   3번째 줄의 password 값을 변경하세요!');