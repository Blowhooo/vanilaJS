// JavaScript 타입 예제

function runPrimitiveTypes() {
    const output = document.getElementById('primitiveOutput');
    let result = '';
    
    // 1. Number (숫자)
    let integer = 42;
    let float = 3.14;
    let negative = -10;
    let infinity = Infinity;
    let notANumber = NaN;
    
    result += `📊 Number 타입:\n`;
    result += `정수: ${integer} (typeof: ${typeof integer})\n`;
    result += `실수: ${float} (typeof: ${typeof float})\n`;
    result += `음수: ${negative} (typeof: ${typeof negative})\n`;
    result += `무한대: ${infinity} (typeof: ${typeof infinity})\n`;
    result += `NaN: ${notANumber} (typeof: ${typeof notANumber})\n\n`;
    
    // 2. String (문자열)
    let singleQuote = '안녕하세요';
    let doubleQuote = "Hello World";
    let templateLiteral = `현재 시간: ${new Date().toLocaleTimeString()}`;
    
    result += `📝 String 타입:\n`;
    result += `작은따옴표: ${singleQuote} (length: ${singleQuote.length})\n`;
    result += `큰따옴표: ${doubleQuote} (length: ${doubleQuote.length})\n`;
    result += `템플릿 리터럴: ${templateLiteral}\n\n`;
    
    // 3. Boolean (불린)
    let isTrue = true;
    let isFalse = false;
    
    result += `✅ Boolean 타입:\n`;
    result += `참: ${isTrue} (typeof: ${typeof isTrue})\n`;
    result += `거짓: ${isFalse} (typeof: ${typeof isFalse})\n\n`;
    
    // 4. Undefined
    let undefinedVar;
    
    result += `❓ Undefined 타입:\n`;
    result += `값: ${undefinedVar} (typeof: ${typeof undefinedVar})\n\n`;
    
    // 5. Null
    let nullVar = null;
    
    result += `⭕ Null 타입:\n`;
    result += `값: ${nullVar} (typeof: ${typeof nullVar}) ⚠️ 버그: object로 표시됨\n\n`;
    
    // 6. Symbol (ES6+)
    let symbol1 = Symbol('id');
    let symbol2 = Symbol('id');
    
    result += `🔣 Symbol 타입:\n`;
    result += `symbol1: ${symbol1.toString()}\n`;
    result += `symbol2: ${symbol2.toString()}\n`;
    result += `같은가? ${symbol1 === symbol2} (각 Symbol은 유일함)\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runReferenceTypes() {
    const output = document.getElementById('referenceOutput');
    let result = '';
    
    // 1. Object (객체)
    let person = {
        name: '김철수',
        age: 30,
        city: '서울',
        greet: function() {
            return `안녕하세요, 저는 ${this.name}입니다.`;
        }
    };
    
    result += `👤 Object 타입:\n`;
    result += `person: ${JSON.stringify(person, null, 2)}\n`;
    result += `typeof person: ${typeof person}\n`;
    result += `person.greet(): ${person.greet()}\n\n`;
    
    // 2. Array (배열)
    let numbers = [1, 2, 3, 4, 5];
    let mixed = [1, '문자열', true, null, {name: '객체'}];
    
    result += `📋 Array 타입:\n`;
    result += `numbers: [${numbers.join(', ')}] (length: ${numbers.length})\n`;
    result += `typeof numbers: ${typeof numbers} (실제로는 object)\n`;
    result += `Array.isArray(numbers): ${Array.isArray(numbers)}\n`;
    result += `mixed: [${mixed.map(item => typeof item === 'object' && item !== null ? JSON.stringify(item) : item).join(', ')}]\n\n`;
    
    // 3. Function (함수)
    function add(a, b) {
        return a + b;
    }
    
    let multiply = function(a, b) {
        return a * b;
    };
    
    let divide = (a, b) => a / b; // 화살표 함수
    
    result += `⚙️ Function 타입:\n`;
    result += `add(5, 3): ${add(5, 3)} (typeof: ${typeof add})\n`;
    result += `multiply(4, 6): ${multiply(4, 6)} (typeof: ${typeof multiply})\n`;
    result += `divide(10, 2): ${divide(10, 2)} (typeof: ${typeof divide})\n\n`;
    
    // 4. Date (날짜)
    let now = new Date();
    let specificDate = new Date('2024-01-01');
    
    result += `📅 Date 타입:\n`;
    result += `현재 시간: ${now.toLocaleString()}\n`;
    result += `특정 날짜: ${specificDate.toLocaleDateString()}\n`;
    result += `typeof now: ${typeof now}\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runTypeChecking() {
    const output = document.getElementById('typeOutput');
    let result = '';
    
    // 타입 확인 방법들
    let testValues = [
        42,
        '문자열',
        true,
        null,
        undefined,
        [],
        {},
        function() {},
        new Date(),
        Symbol('test')
    ];
    
    result += `🔍 타입 확인 방법들:\n\n`;
    
    testValues.forEach((value, index) => {
        result += `값 ${index + 1}: ${value}\n`;
        result += `  typeof: ${typeof value}\n`;
        result += `  Object.prototype.toString.call(): ${Object.prototype.toString.call(value)}\n`;
        if (Array.isArray !== undefined) {
            result += `  Array.isArray(): ${Array.isArray(value)}\n`;
        }
        result += `\n`;
    });
    
    // 타입 변환 예제
    result += `🔄 타입 변환 (Type Conversion):\n\n`;
    
    // 문자열 → 숫자
    let str = '123';
    result += `문자열 '${str}' → 숫자:\n`;
    result += `  Number('${str}'): ${Number(str)}\n`;
    result += `  parseInt('${str}'): ${parseInt(str)}\n`;
    result += `  parseFloat('${str}'): ${parseFloat(str)}\n`;
    result += `  +'${str}': ${+str}\n\n`;
    
    // 숫자 → 문자열
    let num = 456;
    result += `숫자 ${num} → 문자열:\n`;
    result += `  String(${num}): '${String(num)}'\n`;
    result += `  ${num}.toString(): '${num.toString()}'\n`;
    result += `  ${num} + '': '${num + ''}'\n\n`;
    
    // 불린 변환
    let truthyValues = [1, 'hello', [], {}, function() {}];
    let falsyValues = [0, '', null, undefined, NaN, false];
    
    result += `✅ Truthy 값들:\n`;
    truthyValues.forEach(value => {
        result += `  Boolean(${typeof value === 'string' ? `'${value}'` : value}): ${Boolean(value)}\n`;
    });
    
    result += `\n❌ Falsy 값들:\n`;
    falsyValues.forEach(value => {
        result += `  Boolean(${value}): ${Boolean(value)}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}