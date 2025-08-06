// JavaScript 변수 예제

function runVariableExample() {
    const output = document.getElementById('variableOutput');
    let result = '';
    
    // var - 함수 스코프, 재선언 가능, 호이스팅
    var name1 = 'Alice';
    var name1 = 'Bob'; // 재선언 가능
    result += `var name1 = '${name1}' (재선언됨)\n`;
    
    // let - 블록 스코프, 재선언 불가, 재할당 가능
    let age = 25;
    age = 26; // 재할당 가능
    result += `let age = ${age} (재할당됨)\n`;
    
    // const - 블록 스코프, 재선언 불가, 재할당 불가
    const city = 'Seoul';
    result += `const city = '${city}' (상수)\n`;
    
    // 배열과 객체는 const로 선언해도 내용 변경 가능
    const fruits = ['apple', 'banana'];
    console.log('초기 배열:', fruits);
    fruits.push('orange');
    result += `const fruits에 'orange' 추가: [${fruits.join(', ')}]\n`;
    console.log('변경 후 배열:', fruits);
    
    // const 객체 테스트 추가
    const person = { name: 'Kim' };
    person.age = 25; // 속성 추가 가능
    result += `const 객체 속성 추가 가능: ${JSON.stringify(person)}\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runNamingExample() {
    const output = document.getElementById('namingOutput');
    let result = '';
    
    // 올바른 변수 명명 (camelCase로 통일)
    let userName = 'John';           // camelCase (JavaScript 표준)
    let userAge = 30;                // camelCase (일관성 유지)
    let $element = 'DOM element';    // $로 시작 가능 (jQuery 관례)
    let _private = 'private var';    // _로 시작 가능 (private 관례)
    let MAX_SIZE = 100;              // 상수는 UPPER_SNAKE_CASE
    
    result += `✅ 올바른 변수명들:\n`;
    result += `userName: ${userName} (camelCase)\n`;
    result += `userAge: ${userAge} (camelCase)\n`;
    result += `$element: ${$element} (jQuery 스타일)\n`;
    result += `_private: ${_private} (private 변수)\n`;
    result += `MAX_SIZE: ${MAX_SIZE} (상수)\n\n`;
    
    // 잘못된 변수명 예시 (실제 에러 메시지 포함)
    result += `❌ 잘못된 변수명 예시:\n`;
    result += `// let 2name = 'John';     // SyntaxError: Invalid or unexpected token\n`;
    result += `// let class = 'A';       // SyntaxError: Unexpected token 'class'\n`;
    result += `// let my-name = 'John';  // SyntaxError: Unexpected token '-'\n`;
    result += `// let for = 'loop';      // 예약어 사용 불가\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runScopeExample() {
    const output = document.getElementById('scopeOutput');
    let result = '';
    
    // 함수 레벨 스코프
    var functionScopeVar = '함수 레벨 var';
    let functionScopeLet = '함수 레벨 let';
    
    result += `📍 함수 레벨 스코프:\n`;
    result += `functionScopeVar: ${functionScopeVar}\n`;
    result += `functionScopeLet: ${functionScopeLet}\n\n`;
    
    // 중첩 함수 스코프
    function testFunctionScope() {
        var innerVar = '내부 함수 var';
        let innerLet = '내부 함수 let';
        
        // 상위 스코프 접근 가능
        result += `📍 중첩 함수 스코프:\n`;
        result += `상위 스코프 접근: ${functionScopeVar}\n`;
        
        return `innerVar: ${innerVar}\ninnerLet: ${innerLet}\n\n`;
    }
    
    result += testFunctionScope();
    
    // 블록 스코프 테스트
    result += `📍 블록 스코프 테스트:\n`;
    
    // 블록 스코프 내부
    {
        let blockLet = '블록 내 let';
        const blockConst = '블록 내 const';
        var blockVar = '블록 내 var'; // var는 블록 스코프를 무시함
        
        result += `블록 내부에서 접근:\n`;
        result += `  blockLet: ${blockLet}\n`;
        result += `  blockConst: ${blockConst}\n`;
        result += `  blockVar: ${blockVar}\n\n`;
    }
    
    // 블록 밖에서 접근 시도
    result += `블록 외부에서 접근:\n`;
    
    // var는 블록 스코프를 무시하므로 접근 가능
    try {
        result += `  blockVar: ${blockVar} ✅ (var는 함수 스코프)\n`;
    } catch(e) {
        result += `  blockVar 접근 에러: ${e.message}\n`;
    }
    
    // let은 블록 스코프이므로 접근 불가
    try {
        // blockLet에 접근 시도 (ReferenceError 발생)
        if (typeof blockLet !== 'undefined') {
            result += `  blockLet: ${blockLet}\n`;
        }
    } catch(e) {
        result += `  blockLet: ❌ ReferenceError (블록 스코프)\n`;
    }
    
    // const도 블록 스코프이므로 접근 불가
    try {
        // blockConst에 접근 시도 (ReferenceError 발생)
        if (typeof blockConst !== 'undefined') {
            result += `  blockConst: ${blockConst}\n`;
        }
    } catch(e) {
        result += `  blockConst: ❌ ReferenceError (블록 스코프)\n`;
    }
    
    // 호이스팅 예제 추가
    result += `\n📍 호이스팅 (Hoisting) 예제:\n`;
    
    // var 호이스팅
    result += `hoistedVar (선언 전): ${typeof hoistedVar} (undefined)\n`;
    var hoistedVar = '호이스팅된 var';
    result += `hoistedVar (선언 후): ${hoistedVar}\n`;
    
    // let 호이스팅 (Temporal Dead Zone)
    try {
        // hoistedLet 접근 시도 (ReferenceError)
        if (false) {
            console.log(hoistedLet); // 실행되지 않지만 TDZ 설명용
        }
        let hoistedLet = '호이스팅된 let';
        result += `hoistedLet: Temporal Dead Zone으로 선언 전 접근 불가\n`;
    } catch(e) {
        result += `hoistedLet 에러: ${e.message}\n`;
    }
    
    output.innerHTML = `<pre>${result}</pre>`;
}

// 추가: 실제 에러 테스트 함수
function runErrorExample() {
    const output = document.getElementById('errorOutput');
    if (!output) {
        console.error('errorOutput 요소를 찾을 수 없습니다.');
        return;
    }
    
    let result = '';
    
    result += `🔍 실제 에러 예시 (교육 목적):\n\n`;
    result += `⚠️ 주의: 아래 코드들은 실제로 에러를 발생시킵니다.\n`;
    result += `실제 프로젝트에서는 이런 코드를 작성하지 마세요!\n\n`;
    
    // 1. let 재선언 에러
    result += `1. let 재선언 (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      let testLet = 'first';\n`;
    result += `      let testLet = 'second';  // ❌ SyntaxError\n`;
    result += `   💥 결과: Identifier 'testLet' has already been declared\n`;
    result += `   📚 설명: let은 같은 스코프에서 재선언 불가\n`;
    
    // 2. const 재할당 에러
    result += `\n2. const 재할당 (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      const testConst = 'initial';\n`;
    result += `      testConst = 'changed';  // ❌ TypeError\n`;
    result += `   💥 결과: Assignment to constant variable\n`;
    result += `   📚 설명: const로 선언한 변수는 재할당 불가\n`;
    
    // 3. 잘못된 변수명 에러 - 숫자로 시작
    result += `\n3. 숫자로 시작하는 변수명 (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      let 123abc = 'test';  // ❌ SyntaxError\n`;
    result += `   💥 결과: Invalid or unexpected token\n`;
    result += `   📚 설명: 변수명은 문자, _, $로만 시작 가능\n`;
    
    // 4. 예약어 사용 에러
    result += `\n4. 예약어 사용 (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      let class = 'test';  // ❌ SyntaxError\n`;
    result += `      let for = 'loop';    // ❌ SyntaxError\n`;
    result += `   💥 결과: Unexpected token 'class'\n`;
    result += `   📚 설명: class, for, if 등 예약어는 변수명으로 사용 불가\n`;
    
    // 5. 하이픈 사용 에러
    result += `\n5. 하이픈(-) 사용 (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      let my-name = 'test';  // ❌ SyntaxError\n`;
    result += `   💥 결과: Unexpected token '-'\n`;
    result += `   📚 설명: 하이픈은 빼기 연산자로 해석됨\n`;
    result += `   ✅ 올바른 방법: let myName = 'test'; (camelCase)\n`;
    
    // 6. var 재선언 (성공 케이스)
    result += `\n6. var 재선언 (성공 - 하지만 권장하지 않음):\n`;
    result += `   📝 코드:\n`;
    result += `      var testVar = 'first';\n`;
    result += `      var testVar = 'second';  // ✅ 에러 없음\n`;
    result += `   ✅ 결과: 재선언 가능 (두 번째 값으로 덮어씀)\n`;
    result += `   ⚠️ 주의: var의 재선언은 버그 원인이 될 수 있음\n`;
    result += `   📚 권장: let이나 const 사용\n`;
    
    // 7. TDZ (Temporal Dead Zone) 테스트
    result += `\n7. Temporal Dead Zone (에러 발생):\n`;
    result += `   📝 코드:\n`;
    result += `      console.log(tdz);  // ❌ ReferenceError\n`;
    result += `      let tdz = 'test';\n`;
    result += `   💥 결과: Cannot access 'tdz' before initialization\n`;
    result += `   📚 설명: let/const는 선언 전 접근 불가 (TDZ)\n`;
    result += `   \n`;
    result += `   📝 var의 경우 (호이스팅):\n`;
    result += `      console.log(varTest);  // undefined (에러 없음)\n`;
    result += `      var varTest = 'test';\n`;
    result += `   📚 설명: var는 undefined로 초기화되어 호이스팅\n`;
    
    // 실제 동작하는 예제 추가
    result += `\n8. 실제 테스트 가능한 예제:\n`;
    
    // var 호이스팅 실제 테스트
    result += `   📝 var 호이스팅 테스트:\n`;
    result += `      현재 hoistedVar 타입: ${typeof hoistedVar}\n`;
    var hoistedVar = 'Hello';
    result += `      선언 후 hoistedVar 값: ${hoistedVar}\n`;
    
    // const 배열 변경 테스트
    result += `\n   📝 const 배열/객체 변경 테스트:\n`;
    const testArray = [1, 2, 3];
    result += `      초기 배열: [${testArray}]\n`;
    testArray.push(4);
    result += `      push 후: [${testArray}]  ✅ 변경 가능\n`;
    
    const testObj = { name: 'Kim' };
    testObj.age = 25;
    result += `      객체 속성 추가: ${JSON.stringify(testObj)}  ✅ 변경 가능\n`;
    
    output.innerHTML = `<pre>${result}</pre>`;
}