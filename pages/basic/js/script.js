// JavaScript 기초 계산기 - 실습용 스크립트
// 이 파일에서는 기본적인 계산기 기능을 단계별로 구현합니다.

// 1. 전역 변수 선언
let currentInput = '';
let shouldResetDisplay = false;
let lastOperationType = '';

// 2. DOM 요소 참조
const display = document.getElementById('display');

// 3. 기본 계산기 함수들

/**
 * 디스플레이에 값을 추가하는 함수
 * @param {string} value - 추가할 값 (숫자 또는 연산자)
 */
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // 연속된 연산자 입력 방지
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1);
    }
    
    currentInput += value;
    display.value = currentInput;
    
    // 입력 타입 기록
    lastOperationType = isOperator(value) ? 'operator' : 'number';
}

/**
 * 디스플레이를 완전히 지우는 함수
 */
function clearDisplay() {
    currentInput = '';
    display.value = '';
    shouldResetDisplay = false;
    lastOperationType = '';
    
    console.log('계산기가 초기화되었습니다.');
}

/**
 * 마지막 문자를 삭제하는 함수
 */
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    
    if (currentInput === '') {
        display.value = '';
        lastOperationType = '';
    }
}

/**
 * 계산을 실행하는 함수
 */
function calculate() {
    try {
        if (currentInput === '') {
            alert('계산할 식을 입력해주세요!');
            return;
        }
        
        // 마지막이 연산자인 경우 제거
        if (isOperator(currentInput.slice(-1))) {
            currentInput = currentInput.slice(0, -1);
        }
        
        let result = evaluateExpression(currentInput);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('잘못된 계산입니다.');
        }
        
        // 결과 포맷팅
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(10));
        }
        
        currentInput = result.toString();
        display.value = currentInput;
        shouldResetDisplay = true;
        
        console.log(`계산 완료: ${result}`);
        
    } catch (error) {
        console.error('계산 오류:', error);
        alert('계산 중 오류가 발생했습니다: ' + error.message);
        clearDisplay();
    }
}

/**
 * 안전한 수식 계산 함수
 * @param {string} expression - 계산할 수식
 * @returns {number} 계산 결과
 */
function evaluateExpression(expression) {
    // 허용된 문자만 포함하는지 검증
    const allowedChars = /^[0-9+\-*/.() ]+$/;
    
    if (!allowedChars.test(expression)) {
        throw new Error('허용되지 않은 문자가 포함되어 있습니다.');
    }
    
    // 연산자 변환
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    
    // 0으로 나누기 검사
    if (expression.includes('/0')) {
        throw new Error('0으로 나눌 수 없습니다.');
    }
    
    // Function 생성자를 사용한 계산
    return Function('"use strict"; return (' + expression + ')')();
}

/**
 * 문자가 연산자인지 확인하는 함수
 * @param {string} char - 확인할 문자
 * @returns {boolean} 연산자 여부
 */
function isOperator(char) {
    return ['+', '-', '*', '×', '/', '÷'].includes(char);
}

// 4. 고급 기능 함수

/**
 * 고급 기능을 보여주는 함수
 */
function showAdvancedFeatures() {
    const result = document.getElementById('advancedResult');
    result.innerHTML = `
        <h5>🎯 구현 가능한 고급 기능들:</h5>
        <ul>
            <li><strong>키보드 지원:</strong> 이미 구현됨 (아래 이벤트 리스너 참조)</li>
            <li><strong>메모리 기능:</strong> M+, M-, MC, MR 버튼 추가</li>
            <li><strong>히스토리:</strong> 계산 과정을 배열에 저장</li>
            <li><strong>과학 계산:</strong> Math.sqrt(), Math.pow() 등 활용</li>
        </ul>
        <p><em>이런 기능들을 직접 구현해보세요!</em></p>
    `;
}

// 5. 이벤트 리스너 등록

document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 JavaScript 기초 계산기 - 실습 모드');
    console.log('🎯 학습 목표: 기본 문법을 활용한 계산기 구현');
    
    // 키보드 이벤트 리스너
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if ('0123456789.'.includes(key)) {
            event.preventDefault();
            appendToDisplay(key);
        }
        else if (['+', '-'].includes(key)) {
            event.preventDefault();
            appendToDisplay(key);
        }
        else if (key === '*') {
            event.preventDefault();
            appendToDisplay('×');
        }
        else if (key === '/') {
            event.preventDefault();
            appendToDisplay('÷');
        }
        else if (key === 'Enter') {
            event.preventDefault();
            calculate();
        }
        else if (key === 'Escape') {
            event.preventDefault();
            clearDisplay();
        }
        else if (key === 'Backspace') {
            event.preventDefault();
            deleteLast();
        }
    });
    
    // 초기 포커스 설정
    display.focus();
});

// 6. 디버깅 및 학습 도구

/**
 * 현재 계산기 상태를 출력하는 함수
 */
function debugCurrentState() {
    console.log('=== 현재 계산기 상태 ===');
    console.log('현재 입력:', currentInput);
    console.log('디스플레이 값:', display.value);
    console.log('리셋 플래그:', shouldResetDisplay);
    console.log('마지막 연산 타입:', lastOperationType);
    console.log('======================');
}

// 전역에서 디버그 함수 사용 가능하도록 설정
window.debugCurrentState = debugCurrentState;

/* 
📚 학습 포인트:

1. 변수와 상수:
   - let: 재할당 가능한 변수 (currentInput, shouldResetDisplay)
   - const: 재할당 불가능한 상수 (display)

2. 함수:
   - 함수 선언: function 키워드 사용
   - 매개변수: 함수에 전달되는 값
   - 반환값: return 문으로 값 반환

3. DOM 조작:
   - document.getElementById(): HTML 요소 선택
   - element.value: input 요소의 값 설정/조회
   - addEventListener(): 이벤트 리스너 등록

4. 조건문:
   - if/else: 조건에 따른 분기 처리
   - 삼항 연산자: 간단한 조건 처리

5. 문자열 처리:
   - slice(): 문자열 일부 추출
   - replace(): 문자열 치환
   - includes(): 문자열 포함 여부 확인

6. 배열과 객체:
   - 배열: [1, 2, 3] 형태의 순서가 있는 데이터
   - 객체: {key: value} 형태의 키-값 쌍

7. 오류 처리:
   - try/catch: 예외 상황 처리
   - throw: 사용자 정의 오류 발생
*/