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
const testK = document.getElementById('testK');
const testL = document.getElementById('testL');
const testM = document.getElementById('testM');
const testN = document.getElementById('testN');
const testO = document.getElementById('testO');
const testP = document.getElementById('testP');




/* var, let, const에 문자열을 담아 HTML로 삽입해보기 시작 */

var variable = "variable"; // var 변수 (유연하지만 위험한 친구)
console.log("var variable = " + variable);
testA.innerHTML = variable;

let letVar = "let"; // let 변수 (현대적이고 안전한 친구)
console.log("let letVar = " + letVar);
testB.innerHTML = letVar;

const constant = "constant"; // const 변수 (변하지 않는 믿음직한 친구)
console.log("const constant = " + constant);
testC.innerHTML = constant;

/* var, let, const에 문자열을 담아 HTML로 삽입해보기 끝 */







/* var, let, const에 문자열의 값을 변환한 후 HTML로 삽입해보기 시작 */

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

/* var, let, const에 문자열의 값을 변환한 후 HTML로 삽입해보기 끝 */








/* 변수들에 담긴 값을 합친 후 HTML로 삽입해보기 시작 */

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

/* 변수들에 담긴 값을 합친 후 HTML로 삽입해보기 끝 */








/* var, let, const에 숫자열을 담아 HTML로 삽입해보기 시작 */

const ZERO = 0
const ONE = 1
const TWO = 2
const THREE = 3
const FOUR = 4
const FIVE = 5
const SIX = 6
const SEVEN = 7
const EIGHT = 8
const NINE = 9
// 변하지 않는 상수가 담긴 변수명은 대문자로 처리하는게 관습입니다.
console.log(ZERO + ONE);
testJ.innerHTML = ZERO + ONE;

/* var, let, const에 숫자열을 담아 HTML로 삽입해보기 끝 */







/* 문자열이 담긴 변수와 숫자열이 담긴 변수를 합쳐 HTML로 삽입해보기 시작 */

const str = "문자열";

console.log(`${str}${ZERO}${ONE}${TWO}${THREE} / 문자열과 숫자열을 합쳤을 땐 숫자열들이 문자열로 자동으로 치환됩니다.`);
testK.innerHTML = str + ZERO + ONE + TWO + THREE + " / 문자열과 숫자열을 합쳤을 땐 숫자열들이 문자열로 자동으로 치환됩니다.";

const strZero = ZERO.toString();
const strOne = ONE.toString();
const strTwo = TWO.toString();
const strThree = THREE.toString();
const strFour = FOUR.toString();
const strFive = FIVE.toString();
const strSix = SIX.toString();
const strSeven = SEVEN.toString();
const strEight = EIGHT.toString();
const strNine = NINE.toString();

console.log(`${str}${strZero}${strOne}${strTwo} 숫자열을 ${str}로 치환했습니다.`);
testL.innerHTML = str + strZero + strOne + strTwo + " / 숫자열을 "+ str + "로 치환했습니다.";

console.log(`${str}${ZERO + ONE + TWO} / ${str}과 숫자열 변수인 ZERO, ONE, TWO 값인 ${ZERO}, ${ONE}, ${TWO}를 더한 후 3으로 치환했습니다.`)
testM.innerHTML = str + "" + (ZERO + ONE + TWO) + " / " + str + "과 숫자열 변수인 ZERO, ONE, TWO의 값인 " + ZERO + ", " + ONE + ", " + TWO + "를 더한 후 3으로 치환했습니다";

/* 문자열이 담긴 변수와 숫자열이 담긴 변수를 합쳐 HTML로 삽입해보기 끝 */







/* 문자열을 숫자열로 치환해보기 시작 */

const strToNum = Number(str);

console.log(`${strToNum} / NaN으로 치환되어 나옵니다. 즉 텍스트는 숫자열로 변환할 수 없습니다.`)
testN.innerHTML = strToNum + " / NaN으로 치환되어 나옵니다. 즉 텍스트는 숫자열로 변환할 수 없습니다.";

const strZeroToNum = Number(strZero);
const strOneToNum = Number(strOne);

console.log(`${strZeroToNum + strOneToNum} / 변수값으로 문자열 0과 1을 가진 변수들을 숫자로 치환하여 합쳤습니다.`)
testO.innerHTML = strZeroToNum + strOneToNum + " / 변수값으로 문자열 0과 1을 가진 변수들을 숫자로 치환하여 합쳤습니다.";

/* 문자열을 숫자열로 치환해보기 끝 */





/* 문자열 소수를 숫자열로 치환해보기 시작 */

const strFloat = "123.45";
const strFloatToNum = Number(strFloat);

console.log(`${strFloatToNum} / 문자열이었던 ${strFloat}를 숫자열 ${strFloatToNum}로 치환했습니다.`);
testP.innerHTML = strFloatToNum + " / 문자열이었던 " + strFloat + "를 숫자열 " + strFloatToNum + "로 치환했습니다.";

/* 문자열 소수를 숫자열로 치환해보기 끝 */