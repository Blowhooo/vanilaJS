/**
 * 🌟 초심자를 위한 배열 메서드 실습 - 연습 문제
 * 
 * 이 파일은 배열 메서드를 연습하기 위한 빈칸 채우기 문제입니다.
 * TODO 부분을 채워가며 연습해보세요!
 * 
 * 💡 팁: 
 * - 각 함수를 실행하면 결과를 바로 확인할 수 있습니다
 * - 막히면 reference-script.js를 참고하세요
 * - 콘솔에서 showAnswerHint()를 실행하면 힌트를 볼 수 있습니다
 */

// ==========================================
// 📚 간단한 데이터 준비
// ==========================================

// 과일 배열 (가장 기본적인 문자열 배열)
const fruits = ['사과', '바나나', '오렌지', '포도', '딸기'];

// 숫자 배열
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 간단한 학생 데이터 (5명만)
const simpleStudents = [
    { name: '김철수', score: 85 },
    { name: '이영희', score: 92 },
    { name: '박민수', score: 78 },
    { name: '최지영', score: 95 },
    { name: '정대한', score: 88 }
];

// 간단한 상품 데이터 (5개만)
const simpleProducts = [
    { name: '연필', price: 500 },
    { name: '지우개', price: 300 },
    { name: '공책', price: 1500 },
    { name: '필통', price: 5000 },
    { name: '가위', price: 2000 }
];

// ==========================================
// 1️⃣ forEach() - 가장 기본! 각 요소를 하나씩 처리
// ==========================================

function learn_forEach() {
    console.log('\n=== 1. forEach() 연습 ===');
    console.log('forEach는 배열의 각 요소를 하나씩 순회합니다.');
    
    // 📝 TODO 1: 과일 이름 출력하기
    // 힌트: forEach의 콜백 함수에서 console.log 사용
    console.log('\n과일 목록:');
    fruits.forEach(function(fruit) {
        // TODO: 여기에 과일 이름을 출력하는 코드 작성
        // 예: console.log('- ' + ___);        
    });
    
    // 📝 TODO 2: 숫자와 인덱스 함께 출력하기
    // 힌트: forEach의 두 번째 매개변수는 인덱스입니다
    console.log('\n숫자와 위치:');
    numbers.forEach(function(num, index) {
        // TODO: "0번째: 1" 형태로 출력
        // console.log(___ + '번째: ' + ___);
        
    });
    
    // 📝 TODO 3: 학생 이름과 점수 출력
    console.log('\n학생 성적:');
    simpleStudents.forEach(function(student) {
        // TODO: "김철수의 점수는 85점" 형태로 출력
        // console.log(student.___ + '의 점수는 ' + student.___ + '점');
        
    });
}

// ==========================================
// 2️⃣ map() - 배열을 변환하기
// ==========================================

function learn_map() {
    console.log('\n=== 2. map() 연습 ===');
    console.log('map은 각 요소를 변환해서 새 배열을 만듭니다.');
    
    // 📝 TODO 1: 모든 숫자에 2 곱하기
    console.log('\n원본 숫자:', numbers);
    const doubled = numbers.map(function(num) {
        // TODO: 각 숫자를 2배로 만들어 반환
        // return num ___ 2;
        
    });
    console.log('2배로 만든 결과:', doubled);
    
    // 📝 TODO 2: 과일 이름에 이모지 추가
    const fruitsWithEmoji = fruits.map(function(fruit) {
        // TODO: 각 과일 앞에 '🍎 ' 추가해서 반환
        // return '🍎 ' + ___;
        
    });
    console.log('\n이모지 추가:', fruitsWithEmoji);
    
    // 📝 TODO 3: 학생 이름만 뽑아내기
    const studentNames = simpleStudents.map(function(student) {
        // TODO: 학생 객체에서 name 속성만 반환
        // return student.____;
        
    });
    console.log('\n학생 이름만:', studentNames);
    
    // 📝 TODO 4: 상품 가격을 원화 표시로 변환
    const pricesInWon = simpleProducts.map(function(product) {
        // TODO: 가격 뒤에 '원' 붙여서 반환
        // return product.___ + '원';
        
    });
    console.log('\n가격 표시:', pricesInWon);
}

// ==========================================
// 3️⃣ filter() - 조건에 맞는 것만 골라내기
// ==========================================

function learn_filter() {
    console.log('\n=== 3. filter() 연습 ===');
    console.log('filter는 조건에 맞는 요소만 골라서 새 배열을 만듭니다.');
    
    // 📝 TODO 1: 짝수만 골라내기
    const evenNumbers = numbers.filter(function(num) {
        // TODO: 짝수인지 확인 (2로 나눈 나머지가 0)
        // return num % 2 ___ 0;
        
    });
    console.log('\n짝수만:', evenNumbers);
    
    // 📝 TODO 2: 5보다 큰 숫자만
    const bigNumbers = numbers.filter(function(num) {
        // TODO: 5보다 큰지 확인
        // return num ___ 5;
        
    });
    console.log('5보다 큰 숫자:', bigNumbers);
    
    // 📝 TODO 3: 90점 이상인 학생만
    const excellentStudents = simpleStudents.filter(function(student) {
        // TODO: 점수가 90 이상인지 확인
        // return student.score ___ 90;
        
    });
    console.log('\n90점 이상 학생:', excellentStudents);
    
    // 📝 TODO 4: 1000원 이상인 상품만
    const expensiveProducts = simpleProducts.filter(function(product) {
        // TODO: 가격이 1000 이상인지 확인
        // return product.___ >= ____;
        
    });
    console.log('\n1000원 이상 상품:', expensiveProducts);
}

// ==========================================
// 4️⃣ find() - 조건에 맞는 첫 번째 찾기
// ==========================================

function learn_find() {
    console.log('\n=== 4. find() 연습 ===');
    console.log('find는 조건에 맞는 첫 번째 요소를 찾습니다.');
    
    // 📝 TODO 1: '바나나' 찾기
    const banana = fruits.find(function(fruit) {
        // TODO: 과일이 '바나나'인지 확인
        // return fruit === '____';
        
    });
    console.log('\n바나나를 찾았나요?', banana);
    
    // 📝 TODO 2: 처음으로 나오는 5보다 큰 숫자
    const firstBigNumber = numbers.find(function(num) {
        // TODO: 5보다 큰지 확인
        // return num ___ ___;
        
    });
    console.log('5보다 큰 첫 번째 숫자:', firstBigNumber);
    
    // 📝 TODO 3: 이영희 학생 찾기
    const youngHee = simpleStudents.find(function(student) {
        // TODO: 이름이 '이영희'인지 확인
        // return student.___ === '____';
        
    });
    console.log('\n이영희 학생 정보:', youngHee);
    
    // 📝 TODO 4: 2000원짜리 상품 찾기
    const product2000 = simpleProducts.find(function(product) {
        // TODO: 가격이 2000인지 확인
        // return product.price === ____;
        
    });
    console.log('2000원 상품:', product2000);
}

// ==========================================
// 5️⃣ reduce() - 하나로 합치기 (조금 어려워요!)
// ==========================================

function learn_reduce() {
    console.log('\n=== 5. reduce() 연습 ===');
    console.log('reduce는 모든 요소를 하나의 값으로 합칩니다.');
    
    // 📝 TODO 1: 1부터 10까지 합계 구하기
    const sum = numbers.reduce(function(total, num) {
        console.log('  현재 합계:', total, '+ 현재 숫자:', num, '=', total + num);
        // TODO: 누적값과 현재값을 더해서 반환
        // return total ___ num;
        
    }, 0);  // 0부터 시작
    console.log('최종 합계:', sum);
    
    // 📝 TODO 2: 가장 큰 수 찾기
    const maxNumber = numbers.reduce(function(max, num) {
        // TODO: 현재 최대값과 현재 숫자를 비교해서 큰 것 반환
        // if (num ___ max) {
        //     return ___;
        // } else {
        //     return ___;
        // }
        
    });
    console.log('\n가장 큰 숫자:', maxNumber);
    
    // 📝 TODO 3: 모든 학생의 점수 합계
    const totalScore = simpleStudents.reduce(function(sum, student) {
        // TODO: 누적 점수와 현재 학생 점수를 더하기
        // return sum + student.____;
        
    }, 0);
    console.log('\n전체 점수 합계:', totalScore);
    console.log('평균 점수:', totalScore / simpleStudents.length);
    
    // 📝 TODO 4: 모든 상품 가격의 합
    const totalPrice = simpleProducts.reduce(function(sum, product) {
        // TODO: 누적 가격과 현재 상품 가격을 더하기
        // return ___ + product.____;
        
    }, 0);
    console.log('\n전체 상품 가격:', totalPrice + '원');
}

// ==========================================
// 6️⃣ some() & every() - 조건 확인하기
// ==========================================

function learn_some_every() {
    console.log('\n=== 6. some()과 every() 연습 ===');
    
    // 📝 TODO 1: 짝수가 하나라도 있는지 확인 (some)
    console.log('some()은 하나라도 조건을 만족하면 true');
    const hasEvenNumber = numbers.some(function(num) {
        // TODO: 짝수인지 확인
        // return num % 2 ___ 0;
        
    });
    console.log('짝수가 하나라도 있나요?', hasEvenNumber);
    
    // 📝 TODO 2: 95점 이상인 학생이 있는지 확인 (some)
    const hasHighScore = simpleStudents.some(function(student) {
        // TODO: 95점 이상인지 확인
        // return student.___ >= ___;
        
    });
    console.log('95점 이상인 학생이 있나요?', hasHighScore);
    
    // 📝 TODO 3: 모든 숫자가 양수인지 확인 (every)
    console.log('\nevery()는 모두 조건을 만족해야 true');
    const allPositive = numbers.every(function(num) {
        // TODO: 0보다 큰지 확인
        // return num ___ 0;
        
    });
    console.log('모든 숫자가 양수인가요?', allPositive);
    
    // 📝 TODO 4: 모든 학생이 60점 이상인지 확인 (every)
    const allPassed = simpleStudents.every(function(student) {
        // TODO: 60점 이상인지 확인
        // return student.score ___ ___;
        
    });
    console.log('모든 학생이 60점 이상(합격)인가요?', allPassed);
}

// ==========================================
// 7️⃣ 실습 예제 - 간단한 성적 처리
// ==========================================

function practice_grades() {
    console.log('\n=== 실습: 성적 처리 시스템 ===');
    
    // 📝 TODO 1: forEach로 모든 학생 이름 출력
    console.log('\n1. 학생 명단:');
    simpleStudents.forEach(function(student) {
        // TODO: 학생 이름 출력
        // console.log('  - ' + student.___);
        
    });
    
    // 📝 TODO 2: filter로 80점 이상인 학생 찾기
    console.log('\n2. 80점 이상 학생:');
    const goodStudents = simpleStudents.filter(function(student) {
        // TODO: 80점 이상인지 확인
        // return student.score ___ ___;
        
    });
    
    goodStudents.forEach(function(student) {
        console.log('  - ' + student.name + ': ' + student.score + '점');
    });
    
    // 📝 TODO 3: reduce로 평균 점수 계산
    const total = simpleStudents.reduce(function(sum, student) {
        // TODO: 점수 합계 구하기
        // return ___ + student.____;
        
    }, 0);
    const average = total / simpleStudents.length;
    console.log('\n3. 평균 점수:', average + '점');
    
    // 📝 TODO 4: reduce로 최고 점수 학생 찾기
    const topStudent = simpleStudents.reduce(function(best, student) {
        // TODO: 점수 비교해서 높은 학생 반환
        // if (student.score ___ best.score) {
        //     return ____;
        // } else {
        //     return ____;
        // }
        
    });
    console.log('\n4. 최고 점수 학생:', topStudent?.name + ' (' + topStudent?.score + '점)');
    
    // 📝 TODO 5: map으로 성적 등급 부여
    const studentsWithGrade = simpleStudents.map(function(student) {
        let grade;
        // TODO: 점수에 따라 등급 부여
        // if (student.score >= 90) {
        //     grade = '___';
        // } else if (student.score >= 80) {
        //     grade = '___';
        // } else if (student.score >= 70) {
        //     grade = '___';
        // } else {
        //     grade = '___';
        // }
        
        return {
            name: student.name,
            score: student.score,
            grade: grade
        };
    });
    
    console.log('\n5. 성적 등급:');
    studentsWithGrade.forEach(function(student) {
        if (student.grade) {
            console.log('  - ' + student.name + ': ' + student.score + '점 (' + student.grade + '등급)');
        }
    });
}

// ==========================================
// 8️⃣ 실습 예제 - 간단한 쇼핑 카트
// ==========================================

function practice_shopping() {
    console.log('\n=== 실습: 간단한 쇼핑 카트 ===');
    
    // 장바구니 (상품명과 수량)
    const cart = [
        { name: '연필', quantity: 3 },
        { name: '공책', quantity: 2 },
        { name: '지우개', quantity: 5 }
    ];
    
    console.log('\n장바구니 내용:');
    cart.forEach(function(item) {
        console.log('  - ' + item.name + ': ' + item.quantity + '개');
    });
    
    // 📝 TODO 1: map과 find를 조합해서 각 상품의 총 가격 계산
    console.log('\n상품별 가격:');
    const cartWithPrices = cart.map(function(item) {
        // TODO: simpleProducts에서 해당 상품 찾기
        const product = simpleProducts.find(function(p) {
            // return p.___ === item.___;
            
        });
        
        const totalPrice = product ? product.price * item.quantity : 0;
        
        return {
            name: item.name,
            quantity: item.quantity,
            unitPrice: product ? product.price : 0,
            totalPrice: totalPrice
        };
    });
    
    cartWithPrices.forEach(function(item) {
        if (item.unitPrice > 0) {
            console.log('  - ' + item.name + ': ' + 
                       item.unitPrice + '원 × ' + item.quantity + '개 = ' + 
                       item.totalPrice + '원');
        }
    });
    
    // 📝 TODO 2: reduce로 전체 금액 계산
    const totalAmount = cartWithPrices.reduce(function(sum, item) {
        // TODO: 각 상품의 총 가격을 합산
        // return sum + item._____;
        
    }, 0);
    
    console.log('\n총 결제 금액:', totalAmount + '원');
    
    // 📝 TODO 3: filter로 1000원 이상인 상품만 표시
    const expensiveItems = cartWithPrices.filter(function(item) {
        // TODO: 총 가격이 1000원 이상인지 확인
        // return item.totalPrice ___ ____;
        
    });
    
    console.log('\n1000원 이상 상품:');
    expensiveItems.forEach(function(item) {
        console.log('  - ' + item.name + ': ' + item.totalPrice + '원');
    });
}

// ==========================================
// 9️⃣ 체이닝 연습 (여러 메서드 연결하기)
// ==========================================

function practice_chaining() {
    console.log('\n=== 체이닝 연습 ===');
    console.log('여러 메서드를 연결해서 사용할 수 있어요!');
    
    // 📝 TODO 1: 짝수만 골라서 2배로 만들기
    console.log('\n1. 짝수를 2배로:');
    const result1 = numbers
        .filter(function(num) {
            // TODO: 짝수인지 확인
            // return num % 2 ___ 0;
            
        })
        .map(function(num) {
            // TODO: 2배로 만들기
            // return num ___ 2;
            
        });
    console.log('  원본:', numbers);
    console.log('  결과:', result1);
    
    // 📝 TODO 2: 80점 이상 학생의 이름만 가져오기
    console.log('\n2. 80점 이상 학생 이름:');
    const result2 = simpleStudents
        .filter(function(student) {
            // TODO: 80점 이상인지 확인
            // return student.___ >= ___;
            
        })
        .map(function(student) {
            // TODO: 이름만 반환
            // return student.____;
            
        });
    console.log('  결과:', result2);
    
    // 📝 TODO 3: 1000원 이상 상품의 가격 합계
    console.log('\n3. 1000원 이상 상품 합계:');
    const result3 = simpleProducts
        .filter(function(product) {
            // TODO: 1000원 이상인지 확인
            // return product.___ >= ____;
            
        })
        .reduce(function(sum, product) {
            // TODO: 가격 합산
            // return ___ + product.____;
            
        }, 0);
    console.log('  결과:', result3 + '원');
}

// ==========================================
// 💡 힌트 시스템
// ==========================================

function showAnswerHint() {
    console.log('\n💡 힌트가 필요하신가요?');
    console.log('=====================================');
    console.log('🔑 주요 개념:');
    console.log('');
    console.log('1. forEach: 반환값 없음, 단순 반복');
    console.log('   fruits.forEach(function(fruit) { console.log(fruit) })');
    console.log('');
    console.log('2. map: 새 배열 반환, 변환용');
    console.log('   numbers.map(function(n) { return n * 2 })');
    console.log('');
    console.log('3. filter: 조건 만족하는 요소만 반환');
    console.log('   numbers.filter(function(n) { return n > 5 })');
    console.log('');
    console.log('4. find: 조건 만족하는 첫 번째 요소 반환');
    console.log('   fruits.find(function(f) { return f === "바나나" })');
    console.log('');
    console.log('5. reduce: 누적 계산');
    console.log('   numbers.reduce(function(sum, n) { return sum + n }, 0)');
    console.log('');
    console.log('6. some/every: true/false 반환');
    console.log('   numbers.some(function(n) { return n > 5 })');
    console.log('');
    console.log('🎯 자주 사용하는 연산자:');
    console.log('  ===  같은지 비교');
    console.log('  >    크다');
    console.log('  >=   크거나 같다');
    console.log('  %    나머지 (짝수: n % 2 === 0)');
    console.log('  +    더하기');
    console.log('  *    곱하기');
    console.log('');
    console.log('📖 더 자세한 답안은 reference-script.js 참고!');
    console.log('=====================================');
}

function checkProgress() {
    console.log('\n📊 진행도 체크');
    console.log('=====================================');
    let completed = 0;
    let total = 9;
    
    try {
        // 각 함수 실행해보고 에러 없으면 완료로 간주
        const funcs = [
            learn_forEach, learn_map, learn_filter, 
            learn_find, learn_reduce, learn_some_every,
            practice_grades, practice_shopping, practice_chaining
        ];
        
        funcs.forEach(func => {
            try {
                // 콘솔 출력 임시 차단
                const originalLog = console.log;
                console.log = () => {};
                func();
                console.log = originalLog;
                completed++;
            } catch(e) {
                // 에러 발생하면 미완료
            }
        });
    } catch(e) {}
    
    const percent = Math.round((completed / total) * 100);
    console.log(`완료: ${completed}/${total} (${percent}%)`);
    
    if (percent === 100) {
        console.log('🎉 축하합니다! 모든 문제를 완료했습니다!');
    } else if (percent >= 70) {
        console.log('👍 잘하고 있어요! 조금만 더 하면 완료!');
    } else if (percent >= 30) {
        console.log('💪 계속 해보세요! 할 수 있어요!');
    } else {
        console.log('🚀 시작이 반입니다! 하나씩 차근차근 해보세요!');
    }
    console.log('=====================================');
}

// ==========================================
// 🎮 대화형 학습 도우미
// ==========================================

function showHelp() {
    console.log('\n📖 배열 메서드 학습 가이드');
    console.log('=====================================');
    console.log('각 함수를 실행해서 연습해보세요!');
    console.log('');
    console.log('🎯 기초 메서드:');
    console.log('  learn_forEach()    - 배열 순회하기');
    console.log('  learn_map()        - 배열 변환하기');
    console.log('  learn_filter()     - 조건으로 필터링');
    console.log('  learn_find()       - 요소 찾기');
    console.log('');
    console.log('📚 심화 메서드:');
    console.log('  learn_reduce()     - 값 누적하기');
    console.log('  learn_some_every() - 조건 확인하기');
    console.log('');
    console.log('💡 실습 예제:');
    console.log('  practice_grades()   - 성적 처리');
    console.log('  practice_shopping() - 쇼핑 카트');
    console.log('  practice_chaining() - 메서드 체이닝');
    console.log('');
    console.log('🔧 도움 기능:');
    console.log('  showHelp()         - 이 도움말 보기');
    console.log('  showAnswerHint()   - 힌트 보기');
    console.log('  checkProgress()    - 진행도 확인');
    console.log('=====================================');
}

// ==========================================
// 🚀 시작!
// ==========================================

// 페이지 로드시 자동 실행
console.clear();
console.log('%c🌟 초심자를 위한 배열 메서드 연습 문제!', 
            'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cTODO 부분을 채워가며 연습해보세요!', 
            'color: #FF9800; font-size: 14px;');
console.log('');
showHelp();

// 전역 변수로 노출 (콘솔에서 실행 가능)
window.learn_forEach = learn_forEach;
window.learn_map = learn_map;
window.learn_filter = learn_filter;
window.learn_find = learn_find;
window.learn_reduce = learn_reduce;
window.learn_some_every = learn_some_every;
window.practice_grades = practice_grades;
window.practice_shopping = practice_shopping;
window.practice_chaining = practice_chaining;
window.showHelp = showHelp;
window.showAnswerHint = showAnswerHint;
window.checkProgress = checkProgress;

// 데이터도 확인할 수 있도록 노출
window.fruits = fruits;
window.numbers = numbers;
window.simpleStudents = simpleStudents;
window.simpleProducts = simpleProducts;

console.log('✅ script.js 로드 완료');