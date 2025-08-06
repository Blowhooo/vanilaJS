// JavaScript 기초 계산기 - 완성 예시 스크립트
// 모든 기능이 구현된 완전한 계산기

// 전역 변수
let currentInput = '';
let shouldResetDisplay = false;
let calculationHistory = [];
let memoryValue = 0;

// DOM 요소
const display = document.getElementById('display');

// 핵심 계산기 기능
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // 연속 연산자 방지
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1);
    }
    
    currentInput += value;
    display.value = currentInput;
    
    logEvent(`입력: ${value}`);
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
    shouldResetDisplay = false;
    
    console.log('🔄 계산기 초기화됨');
    logEvent('초기화');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    
    if (currentInput === '') {
        display.value = '';
    }
    
    logEvent('삭제');
}

function calculate() {
    try {
        if (currentInput === '') {
            showNotification('계산할 식을 입력해주세요!', 'warning');
            return;
        }
        
        // 마지막이 연산자인 경우 제거
        let expression = currentInput;
        if (isOperator(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }
        
        const result = evaluateExpression(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('잘못된 계산입니다.');
        }
        
        // 계산 히스토리에 추가
        calculationHistory.push({
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // 결과 표시
        const formattedResult = formatResult(result);
        currentInput = formattedResult.toString();
        display.value = currentInput;
        shouldResetDisplay = true;
        
        console.log(`✅ 계산 완료: ${expression} = ${formattedResult}`);
        logEvent(`계산: ${expression} = ${formattedResult}`);
        
        showNotification('계산 완료!', 'success');
        
    } catch (error) {
        console.error('❌ 계산 오류:', error);
        showNotification('계산 오류: ' + error.message, 'error');
        clearDisplay();
    }
}

function evaluateExpression(expression) {
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
    
    return Function('"use strict"; return (' + expression + ')')();
}

function isOperator(char) {
    return ['+', '-', '*', '×', '/', '÷'].includes(char);
}

function formatResult(result) {
    if (result % 1 !== 0) {
        return parseFloat(result.toFixed(10));
    }
    return result;
}

// 알림 시스템
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#000';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        default:
            notification.style.background = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 이벤트 로깅 시스템
let eventLog = [];

function logEvent(event) {
    eventLog.push({
        event: event,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    });
    
    // 최대 50개 이벤트만 보관
    if (eventLog.length > 50) {
        eventLog.shift();
    }
}

// 디버깅 기능들
function debugCurrentState() {
    const state = {
        currentInput: currentInput,
        displayValue: display.value,
        shouldReset: shouldResetDisplay,
        historyCount: calculationHistory.length,
        memoryValue: memoryValue
    };
    
    console.table(state);
    
    const debugResult = document.getElementById('debugResult');
    if (debugResult) {
        debugResult.textContent = JSON.stringify(state, null, 2);
    }
}

function testCalculation() {
    const testCases = [
        '2+2',
        '10*3',
        '15/3',
        '100-25'
    ];
    
    console.log('🧪 계산기 테스트 시작...');
    
    testCases.forEach(test => {
        try {
            const result = evaluateExpression(test);
            console.log(`✅ ${test} = ${result}`);
        } catch (error) {
            console.log(`❌ ${test} : ${error.message}`);
        }
    });
    
    const debugResult = document.getElementById('debugResult');
    if (debugResult) {
        debugResult.textContent = '테스트 완료! 콘솔을 확인하세요.';
    }
}

function showEventLog() {
    console.log('📋 이벤트 로그:');
    console.table(eventLog.slice(-10)); // 최근 10개 이벤트
    
    const debugResult = document.getElementById('debugResult');
    if (debugResult) {
        const recentEvents = eventLog.slice(-5).map(log => 
            `${log.time}: ${log.event}`
        ).join('\n');
        debugResult.textContent = `최근 이벤트:\n${recentEvents}`;
    }
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // 숫자와 소수점
    if ('0123456789.'.includes(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
    // 연산자
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
    // 특수 키
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
    
    logEvent(`키보드: ${key}`);
});

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 JavaScript 기초 계산기 - 완성 예시');
    console.log('✨ 모든 기능이 구현된 버전입니다');
    console.log('🎯 키보드 단축키를 사용해보세요!');
    
    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    display.focus();
    logEvent('계산기 시작');
});

// 전역 함수로 노출
window.debugCurrentState = debugCurrentState;
window.testCalculation = testCalculation;
window.showEventLog = showEventLog;