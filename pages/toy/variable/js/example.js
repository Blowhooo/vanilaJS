const textBtn = document.getElementById('text-btn');
const numBtn = document.getElementById('num-btn');
const input = document.getElementById('input');
const numbers = document.getElementById('numbers');
const text = document.getElementById('text');

let numArr = [];
let sum = 0;
let ment = "텍스트를 변경할 수 있습니다.";
text.innerHTML = ment;

textBtn.addEventListener('click', function () {
    const value = input.value.trim();

    if (value === "") {
        text.innerHTML = "value값을 입력해주세요.";
    } else {
        text.innerHTML = value;
        input.value = "";
    }
});

numBtn.addEventListener('click', function () {
    const value = input.value.trim();
    const numValue = Number(value);

    if (value === "") {
        text.innerHTML = "value값을 입력해주세요.";
        return;
    }

    if (!isNaN(numValue)) {
        numArr.push(numValue);

        sum = 0;
        for (let i = 0; i < numArr.length; i++) {
            sum += numArr[i];
        }

        numbers.innerHTML = `${numArr.join(', ')}`;
        text.innerHTML = `${sum}`;
    } else {
        text.innerHTML = "이 기능은 value가 숫자열일 때만 작동합니다.";
    }

    input.value = "";
});