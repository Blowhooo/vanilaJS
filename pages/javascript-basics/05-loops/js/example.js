// JavaScript 반복문 예제

function runForLoopExamples() {
    const output = document.getElementById('forLoopOutput');
    let result = '';
    
    result += `🔄 for 문 예제:\n\n`;
    
    // 예제 1: 기본 for 문
    result += `1. 기본 for 문 (1부터 5까지):\n`;
    for (let i = 1; i <= 5; i++) {
        result += `${i} `;
    }
    result += `\n\n`;
    
    // 예제 2: 배열 순회
    let fruits = ['사과', '바나나', '오렌지', '포도', '딸기'];
    result += `2. 배열 순회:\n`;
    for (let i = 0; i < fruits.length; i++) {
        result += `${i}: ${fruits[i]}\n`;
    }
    result += `\n`;
    
    // 예제 3: 배열의 합계 구하기
    let numbers = [10, 20, 30, 40, 50];
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    result += `3. 배열 합계: [${numbers.join(', ')}] = ${sum}\n\n`;
    
    // 예제 4: 구구단
    result += `4. 3단 구구단:\n`;
    for (let i = 1; i <= 9; i++) {
        result += `3 × ${i} = ${3 * i}\n`;
    }
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runWhileLoopExamples() {
    const output = document.getElementById('whileLoopOutput');
    let result = '';
    
    result += `🔄 while 및 do-while 문 예제:\n\n`;
    
    // 예제 1: 기본 while 문
    result += `1. 기본 while 문 (1부터 5까지):\n`;
    let i = 1;
    while (i <= 5) {
        result += `${i} `;
        i++;
    }
    result += `\n\n`;
    
    // 예제 2: 조건이 만족될 때까지 반복
    result += `2. 2의 거듭제곱 (100 이하):\n`;
    let power = 1;
    let exponent = 0;
    while (power < 100) {
        result += `2^${exponent} = ${power}\n`;
        exponent++;
        power = 2 ** exponent;
    }
    result += `\n`;
    
    // 예제 3: do-while 문
    result += `3. do-while 문 (최소 한 번 실행):\n`;
    let j = 10;
    result += `조건이 거짓이어도 한 번은 실행됩니다:\n`;
    do {
        result += `j = ${j} (조건: j < 5는 ${j < 5})\n`;
        j++;
    } while (j < 5);
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runForInOfExamples() {
    const output = document.getElementById('forInOfOutput');
    let result = '';
    
    result += `🔄 for...in 및 for...of 문 예제:\n\n`;
    
    // 예제 1: for...in (객체 속성 순회)
    let person = {
        name: 'Alice',
        age: 30,
        city: 'Seoul'
    };
    
    result += `1. for...in (객체 속성 순회):\n`;
    for (let key in person) {
        result += `${key}: ${person[key]}\n`;
    }
    result += `\n`;
    
    // 예제 2: for...of (배열 값 순회)
    let colors = ['red', 'green', 'blue', 'yellow'];
    result += `2. for...of (배열 값 순회):\n`;
    for (let color of colors) {
        result += `색상: ${color}\n`;
    }
    result += `\n`;
    
    // 예제 3: for...of (문자열 순회)
    let word = 'Hello';
    result += `3. for...of (문자열 '${word}' 순회):\n`;
    for (let char of word) {
        result += `${char} `;
    }
    result += `\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runBreakContinueExamples() {
    const output = document.getElementById('breakContinueOutput');
    let result = '';
    
    result += `🔄 break 및 continue 예제:\n\n`;
    
    // 예제 1: break - 특정 조건에서 반복 중단
    result += `1. break 예제 - 5를 찾으면 중단:\n`;
    for (let i = 1; i <= 10; i++) {
        if (i === 5) {
            result += `${i}를 찾았습니다! 반복을 중단합니다.\n`;
            break;
        }
        result += `${i} `;
    }
    result += `\n\n`;
    
    // 예제 2: continue - 특정 조건을 건너뛰기
    result += `2. continue 예제 - 짝수만 출력:\n`;
    for (let i = 1; i <= 10; i++) {
        if (i % 2 !== 0) {
            continue; // 홀수는 건너뛰기
        }
        result += `${i} `;
    }
    result += `\n\n`;
    
    // 예제 3: 실용적인 예제
    result += `3. 양수만 더하기:\n`;
    let numbers = [5, -2, 8, -1, 3, 0, 7];
    let positiveSum = 0;
    
    for (let num of numbers) {
        if (num === 0) {
            result += `0을 만났으므로 중단\n`;
            break;
        }
        if (num < 0) {
            result += `음수 ${num} 건너뜀\n`;
            continue;
        }
        positiveSum += num;
        result += `양수 ${num} 추가, 현재 합: ${positiveSum}\n`;
    }
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runVisualDemo() {
    const output = document.getElementById('visualOutput');
    output.innerHTML = '';
    
    let counter = 0;
    const maxItems = 15;
    
    const interval = setInterval(() => {
        if (counter >= maxItems) {
            clearInterval(interval);
            return;
        }
        
        const item = document.createElement('div');
        item.className = 'loop-item';
        item.textContent = `Item ${counter + 1}`;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.5)';
        
        output.appendChild(item);
        
        // 애니메이션 효과
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 10);
        
        counter++;
    }, 200);
}

function generateMultiplicationTable() {
    const input = document.getElementById('multipleInput');
    const output = document.getElementById('multiplicationOutput');
    const num = parseInt(input.value);
    
    if (isNaN(num) || num < 2 || num > 9) {
        output.innerHTML = '<p style="color: red;">2-9 사이의 숫자를 입력해주세요.</p>';
        return;
    }
    
    let result = `<h4>${num}단 구구단:</h4>`;
    result += '<div style="font-family: monospace;">';
    
    for (let i = 1; i <= 9; i++) {
        const product = num * i;
        result += `${num} × ${i} = ${product.toString().padStart(2, ' ')}<br>`;
    }
    
    result += '</div>';
    output.innerHTML = result;
}

function generateStarPattern() {
    const input = document.getElementById('patternSize');
    const output = document.getElementById('patternOutput');
    const size = parseInt(input.value);
    
    if (isNaN(size) || size < 1 || size > 20) {
        output.innerHTML = '<p style="color: red;">1-20 사이의 숫자를 입력해주세요.</p>';
        return;
    }
    
    let result = '<h4>별 패턴:</h4>';
    result += '<div style="font-family: monospace; line-height: 1.2;">';
    
    // 상단 삼각형
    for (let i = 1; i <= size; i++) {
        let spaces = '';
        let stars = '';
        
        // 공백 추가 (중앙 정렬)
        for (let j = 1; j <= size - i; j++) {
            spaces += '&nbsp;';
        }
        
        // 별 추가
        for (let k = 1; k <= 2 * i - 1; k++) {
            stars += '★';
        }
        
        result += spaces + stars + '<br>';
    }
    
    result += '</div>';
    output.innerHTML = result;
}

function generateNumberPattern() {
    const input = document.getElementById('patternSize');
    const output = document.getElementById('patternOutput');
    const size = parseInt(input.value);
    
    if (isNaN(size) || size < 1 || size > 20) {
        output.innerHTML = '<p style="color: red;">1-20 사이의 숫자를 입력해주세요.</p>';
        return;
    }
    
    let result = '<h4>숫자 패턴:</h4>';
    result += '<div style="font-family: monospace; line-height: 1.5;">';
    
    for (let i = 1; i <= size; i++) {
        let line = '';
        
        // 각 행에 숫자 추가
        for (let j = 1; j <= i; j++) {
            line += j + ' ';
        }
        
        result += line + '<br>';
    }
    
    result += '</div>';
    output.innerHTML = result;
}