# JavaScript 기초 토이프로젝트 - 간단한 계산기

## 프로젝트 개요
JavaScript의 기본 개념들을 학습하기 위한 간단한 계산기 프로젝트입니다.

## 학습 목표
이 프로젝트를 통해 다음과 같은 JavaScript 기초 개념들을 배울 수 있습니다:

### 1. 변수 (Variables)
- `let`: 블록 스코프 변수 선언
- `const`: 상수 선언
- `var`: 함수 스코프 변수 (레거시)

### 2. 함수 (Functions)
- 함수 선언과 호출
- 매개변수와 반환값
- 함수 스코프와 클로저

### 3. DOM 조작 (DOM Manipulation)
- `document.getElementById()`: 요소 선택
- 요소의 속성과 값 변경
- 이벤트 리스너 등록

### 4. 이벤트 처리 (Event Handling)
- 클릭 이벤트
- 키보드 이벤트
- 이벤트 객체 활용

### 5. 조건문 (Conditional Statements)
- `if/else` 문
- 비교 연산자 활용
- 논리 연산자

### 6. 문자열 조작 (String Manipulation)
- 문자열 연결
- 문자열 메서드 활용
- 정규표현식 기초

### 7. 오류 처리 (Error Handling)
- `try/catch` 문
- 사용자 정의 오류
- 입력 검증

## 파일 구조
```
basic/
├── index.html      # HTML 구조
├── style.css       # CSS 스타일링
├── script.js       # JavaScript 로직
└── README.md       # 프로젝트 설명서
```

## 기능 소개

### 기본 계산 기능
- 사칙연산 (덧셈, 뺄셈, 곱셈, 나눗셈)
- 소수점 계산 지원
- 연속 계산 가능

### 사용자 인터페이스
- 직관적인 버튼 레이아웃
- 시각적 피드백 (hover 효과)
- 반응형 디자인

### 키보드 단축키
- **숫자 키 (0-9)**: 숫자 입력
- **연산자 키 (+, -, *, /)**: 연산자 입력
- **Enter**: 계산 실행
- **Escape**: 초기화
- **Backspace**: 마지막 문자 삭제

### 오류 처리
- 잘못된 입력 방지
- 0으로 나누기 오류 처리
- 사용자 친화적 오류 메시지

## 코드 하이라이트

### 안전한 수식 계산
```javascript
function evaluateExpression(expression) {
    const allowedChars = /^[0-9+\-*/.() ]+$/;
    if (!allowedChars.test(expression)) {
        throw new Error('허용되지 않은 문자가 포함되어 있습니다.');
    }
    return Function('"use strict"; return (' + expression + ')')();
}
```

### 키보드 이벤트 처리
```javascript
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ('0123456789+-*/'.includes(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
});
```

### DOM 조작과 상태 관리
```javascript
let currentInput = '';
const display = document.getElementById('display');

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}
```

## 실행 방법
1. `index.html` 파일을 웹 브라우저에서 열기
2. 마우스 클릭 또는 키보드로 계산식 입력
3. `=` 버튼 또는 Enter 키로 계산 실행

## 확장 아이디어
프로젝트를 더 발전시키고 싶다면:

1. **과학 계산기 기능 추가**
   - 삼각함수, 로그, 제곱근 등
   - 메모리 기능

2. **계산 히스토리**
   - 이전 계산 결과 저장
   - 히스토리 목록 표시

3. **테마 변경 기능**
   - 다크 모드/라이트 모드
   - 색상 테마 선택

4. **단위 변환기**
   - 길이, 무게, 온도 변환
   - 통화 변환 (API 연동)

## 학습 팁
1. **개발자 도구 활용**: 브라우저의 콘솔에서 디버깅
2. **코드 주석 읽기**: 각 함수와 로직의 설명 확인
3. **실습과 수정**: 코드를 직접 수정해보며 동작 확인
4. **오류 상황 테스트**: 의도적으로 잘못된 입력을 시도해보기

## 참고 자료
- [MDN JavaScript 가이드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://ko.javascript.info/)
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)

---
**제작일**: 2025년 8월
**난이도**: 초급
**예상 학습 시간**: 2-3시간