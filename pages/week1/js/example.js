const testA = document.getElementById('testA');
const testB = document.getElementById('testB');
const testC = document.getElementById('testC');
const testD = document.getElementById('testD');
const testE = document.getElementById('testE');
const testF = document.getElementById('testF');
const testG = document.getElementById('testG');
const testH = document.getElementById('testH');
const testI = document.getElementById('testI');
const testJ = document.getElementById('testJ');

var variable = "variable";
console.log("var variable = " + variable);
testA.innerHTML = variable;

let letVar = "let";
console.log("let letVar = " + letVar);
testB.innerHTML = letVar;

const constant = "constant";
console.log("const constant = " + constant);
testC.innerHTML = constant;

var variable = "var은 var로 변수 재선언이 가능하고 동시에 값을 재할당할 수도 있습니다.";
// variable = "변수 재선언 없이 값만 재할당할 수도 있습니다.";
// let variable = "var variable을 let variable로 변수를 재선언할 수는 없습니다. / Uncaught SyntaxError: Identifier 'variable' has already been declared";
// const variable = "var variable을 const variable로 변수를 재선언할 수는 없습니다. / Uncaught SyntaxError: Identifier 'variable' has already been declared";
testD.innerHTML = variable;

// var letVar = "let은 변수 재선언이 불가능합니다. / Uncaught SyntaxError: Identifier 'letVar' has already been declared"
// let letVar = "let은 변수 재선언이 불가능합니다. / Uncaught SyntaxError: Identifier 'letVar' has already been declared"
// const letVar = "let은 변수 재선언이 불가능합니다. / Uncaught SyntaxError: Identifier 'letVar' has already been declared"
letVar = "let 변수는 var, let, const로  변수를 재선언할 수 없지만 값은 재할당 할 수 있습니다."
testE.innerHTML = letVar;

// const constant = "const는 변수 재선언이 불가능합니다. / Uncaught SyntaxError: Identifier 'letVar' has already been declared"
// constant = "const 변수는 값을 재할당 할 수 없습니다. / Uncaught TypeError: Assignment to constant variable."


var variable = "var은 var로 재선언하고 값을 재할당한 후에 문자열을 합쳐 값을 담아보기"
letVar = " 성공 !"

let letText = variable + letVar;
testG.innerHTML = letText;

variable = "var을 재선언하지 않고 값만 재할당한 후에 문자열을 합쳐 값을 담아보기"
letText = variable + letVar;

testH.innerHTML = letText;

variable = "const 변수에 담아서 합친 문자열을 데이터 담아보기"

const constText = variable + letVar;
testI.innerHTML = constText;

variable = "const의 문장을 바꾸기 위해 텍스트를 변경했지만 const는 값을 변환할 수 없기 때문에";
letVar = " 실패";

// constText = variable + letVar; / Uncaught TypeError: Assignment to constant variable.
// console.log(variable + letVar); const의 문장을 바꾸기 위해 텍스트를 변경했지만 const는 값을 변환할 수 없기 때문에 실패

const numString = "문자열"
const number = 0