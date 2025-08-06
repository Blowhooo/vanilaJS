// JavaScript 연산자 예제

function runArithmeticOperators() {
    const output = document.getElementById('arithmeticOutput');
    let result = '';
    
    let a = 10;
    let b = 3;
    
    result += `🔢 산술 연산자 (a = ${a}, b = ${b}):\n\n`;
    
    // 기본 산술 연산자
    result += `덧셈 (+): ${a} + ${b} = ${a + b}\n`;
    result += `뺄셈 (-): ${a} - ${b} = ${a - b}\n`;
    result += `곱셈 (*): ${a} * ${b} = ${a * b}\n`;
    result += `나눗셈 (/): ${a} / ${b} = ${a / b}\n`;
    result += `나머지 (%): ${a} % ${b} = ${a % b}\n`;
    result += `거듭제곱 (**): ${a} ** ${b} = ${a ** b}\n\n`;
    
    // 증감 연산자
    let x = 5;
    result += `증감 연산자 (x = ${x}):\n`;
    result += `전위 증가 (++x): ${++x} (x는 ${x})\n`;
    
    x = 5; // 재설정
    result += `후위 증가 (x++): ${x++} (x는 ${x})\n`;
    
    x = 5; // 재설정
    result += `전위 감소 (--x): ${--x} (x는 ${x})\n`;
    
    x = 5; // 재설정
    result += `후위 감소 (x--): ${x--} (x는 ${x})\n\n`;
    
    // 문자열과 숫자의 연산
    result += `📝 문자열과 숫자 연산:\n`;
    result += `'5' + 3 = ${('5' + 3)} (문자열 연결)\n`;
    result += `'5' - 3 = ${('5' - 3)} (숫자로 변환되어 계산)\n`;
    result += `'5' * 3 = ${('5' * 3)} (숫자로 변환되어 계산)\n`;
    result += `'hello' - 3 = ${('hello' - 3)} (NaN)\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runComparisonOperators() {
    const output = document.getElementById('comparisonOutput');
    let result = '';
    
    result += `⚖️ 비교 연산자:\n\n`;
    
    // 동등성 비교
    result += `동등성 비교:\n`;
    result += `5 == '5': ${5 == '5'} (타입 변환 후 비교)\n`;
    result += `5 === '5': ${5 === '5'} (타입까지 엄격 비교)\n`;
    result += `null == undefined: ${null == undefined}\n`;
    result += `null === undefined: ${null === undefined}\n\n`;
    
    // 부등성 비교
    result += `부등성 비교:\n`;
    result += `5 != '5': ${5 != '5'}\n`;
    result += `5 !== '5': ${5 !== '5'}\n\n`;
    
    // 크기 비교
    let a = 10, b = 5;
    result += `크기 비교 (a = ${a}, b = ${b}):\n`;
    result += `a > b: ${a > b}\n`;
    result += `a >= b: ${a >= b}\n`;
    result += `a < b: ${a < b}\n`;
    result += `a <= b: ${a <= b}\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runLogicalOperators() {
    const output = document.getElementById('logicalOutput');
    let result = '';
    
    result += `🧠 논리 연산자:\n\n`;
    
    // AND 연산자 (&&)
    result += `AND 연산자 (&&):\n`;
    result += `true && true: ${true && true}\n`;
    result += `true && false: ${true && false}\n`;
    result += `false && true: ${false && true}\n`;
    result += `false && false: ${false && false}\n\n`;
    
    // OR 연산자 (||)
    result += `OR 연산자 (||):\n`;
    result += `true || true: ${true || true}\n`;
    result += `true || false: ${true || false}\n`;
    result += `false || true: ${false || true}\n`;
    result += `false || false: ${false || false}\n\n`;
    
    // NOT 연산자 (!)
    result += `NOT 연산자 (!):\n`;
    result += `!true: ${!true}\n`;
    result += `!false: ${!false}\n`;
    result += `!!'hello': ${!!'hello'} (이중 부정으로 불린 변환)\n`;
    result += `!!0: ${!!0}\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runAssignmentOperators() {
    const output = document.getElementById('assignmentOutput');
    let result = '';
    
    result += `📝 할당 연산자:\n\n`;
    
    // 기본 할당
    let x = 10;
    result += `기본 할당: x = ${x}\n\n`;
    
    // 복합 할당 연산자
    result += `복합 할당 연산자:\n`;
    
    x = 10;
    x += 5; // x = x + 5
    result += `x += 5: ${x} (덧셈 할당)\n`;
    
    x = 10;
    x -= 3; // x = x - 3
    result += `x -= 3: ${x} (뺄셈 할당)\n`;
    
    x = 10;
    x *= 2; // x = x * 2
    result += `x *= 2: ${x} (곱셈 할당)\n`;
    
    x = 10;
    x /= 2; // x = x / 2
    result += `x /= 2: ${x} (나눗셈 할당)\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}