/**
 * 🌟 초심자를 위한 배열 메서드 실습
 * 
 * 이 파일은 JavaScript 배열 메서드를 처음 배우는 분들을 위한 쉬운 예제입니다.
 * 각 메서드를 단계별로 학습할 수 있도록 구성했습니다.
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
    console.log('\n=== 1. forEach() 배우기 ===');
    console.log('forEach는 배열의 각 요소를 하나씩 순회합니다.');
    
    // 예제 1: 과일 이름 출력하기
    console.log('\n과일 목록:');
    fruits.forEach(function(fruit) {
        console.log('- ' + fruit);
    });
    
    // 예제 2: 숫자 배열 출력하기 (인덱스와 함께)
    console.log('\n숫자와 위치:');
    numbers.forEach(function(num, index) {
        console.log(index + '번째: ' + num);
    });
    
    // 예제 3: 학생 이름과 점수 출력
    console.log('\n학생 성적:');
    simpleStudents.forEach(function(student) {
        console.log(student.name + '의 점수는 ' + student.score + '점');
    });
}

// ==========================================
// 2️⃣ map() - 배열을 변환하기
// ==========================================

function learn_map() {
    console.log('\n=== 2. map() 배우기 ===');
    console.log('map은 각 요소를 변환해서 새 배열을 만듭니다.');
    
    // 예제 1: 모든 숫자에 2 곱하기
    console.log('\n원본 숫자:', numbers);
    const doubled = numbers.map(function(num) {
        return num * 2;
    });
    console.log('2배로 만든 결과:', doubled);
    
    // 예제 2: 과일 이름에 이모지 추가
    const fruitsWithEmoji = fruits.map(function(fruit) {
        return '🍎 ' + fruit;
    });
    console.log('\n이모지 추가:', fruitsWithEmoji);
    
    // 예제 3: 학생 이름만 뽑아내기
    const studentNames = simpleStudents.map(function(student) {
        return student.name;
    });
    console.log('\n학생 이름만:', studentNames);
    
    // 예제 4: 상품 가격을 원화 표시로 변환
    const pricesInWon = simpleProducts.map(function(product) {
        return product.price + '원';
    });
    console.log('\n가격 표시:', pricesInWon);
}

// ==========================================
// 3️⃣ filter() - 조건에 맞는 것만 골라내기
// ==========================================

function learn_filter() {
    console.log('\n=== 3. filter() 배우기 ===');
    console.log('filter는 조건에 맞는 요소만 골라서 새 배열을 만듭니다.');
    
    // 예제 1: 짝수만 골라내기
    const evenNumbers = numbers.filter(function(num) {
        return num % 2 === 0;  // 2로 나눈 나머지가 0이면 짝수
    });
    console.log('\n짝수만:', evenNumbers);
    
    // 예제 2: 5보다 큰 숫자만
    const bigNumbers = numbers.filter(function(num) {
        return num > 5;
    });
    console.log('5보다 큰 숫자:', bigNumbers);
    
    // 예제 3: 90점 이상인 학생만
    const excellentStudents = simpleStudents.filter(function(student) {
        return student.score >= 90;
    });
    console.log('\n90점 이상 학생:');
    excellentStudents.forEach(function(student) {
        console.log('- ' + student.name + ': ' + student.score + '점');
    });
    
    // 예제 4: 1000원 이상인 상품만
    const expensiveProducts = simpleProducts.filter(function(product) {
        return product.price >= 1000;
    });
    console.log('\n1000원 이상 상품:');
    expensiveProducts.forEach(function(product) {
        console.log('- ' + product.name + ': ' + product.price + '원');
    });
}

// ==========================================
// 4️⃣ find() - 조건에 맞는 첫 번째 찾기
// ==========================================

function learn_find() {
    console.log('\n=== 4. find() 배우기 ===');
    console.log('find는 조건에 맞는 첫 번째 요소를 찾습니다.');
    
    // 예제 1: 특정 과일 찾기
    const banana = fruits.find(function(fruit) {
        return fruit === '바나나';
    });
    console.log('\n바나나를 찾았나요?', banana);
    
    // 예제 2: 처음으로 나오는 5보다 큰 숫자
    const firstBigNumber = numbers.find(function(num) {
        return num > 5;
    });
    console.log('5보다 큰 첫 번째 숫자:', firstBigNumber);
    
    // 예제 3: 이영희 학생 찾기
    const youngHee = simpleStudents.find(function(student) {
        return student.name === '이영희';
    });
    console.log('\n이영희 학생 정보:', youngHee);
    
    // 예제 4: 2000원짜리 상품 찾기
    const product2000 = simpleProducts.find(function(product) {
        return product.price === 2000;
    });
    console.log('2000원 상품:', product2000);
}

// ==========================================
// 5️⃣ reduce() - 하나로 합치기 (조금 어려워요!)
// ==========================================

function learn_reduce() {
    console.log('\n=== 5. reduce() 배우기 ===');
    console.log('reduce는 모든 요소를 하나의 값으로 합칩니다.');
    
    // 예제 1: 숫자 합계 구하기 (가장 기본!)
    const sum = numbers.reduce(function(total, num) {
        console.log('  현재 합계:', total, '+ 현재 숫자:', num, '=', total + num);
        return total + num;
    }, 0);  // 0부터 시작
    console.log('최종 합계:', sum);
    
    // 예제 2: 숫자 배열에서 가장 큰 수 찾기
    const maxNumber = numbers.reduce(function(max, num) {
        if (num > max) {
            return num;
        } else {
            return max;
        }
    });
    console.log('\n가장 큰 숫자:', maxNumber);
    
    // 예제 3: 모든 학생의 점수 합계
    const totalScore = simpleStudents.reduce(function(sum, student) {
        return sum + student.score;
    }, 0);
    console.log('\n전체 점수 합계:', totalScore);
    console.log('평균 점수:', totalScore / simpleStudents.length);
    
    // 예제 4: 모든 상품 가격의 합
    const totalPrice = simpleProducts.reduce(function(sum, product) {
        return sum + product.price;
    }, 0);
    console.log('\n전체 상품 가격:', totalPrice + '원');
}

// ==========================================
// 6️⃣ some() & every() - 조건 확인하기
// ==========================================

function learn_some_every() {
    console.log('\n=== 6. some()과 every() 배우기 ===');
    
    // some() - 하나라도 조건을 만족하는지
    console.log('some()은 하나라도 조건을 만족하면 true');
    
    const hasEvenNumber = numbers.some(function(num) {
        return num % 2 === 0;
    });
    console.log('짝수가 하나라도 있나요?', hasEvenNumber);
    
    const hasHighScore = simpleStudents.some(function(student) {
        return student.score >= 95;
    });
    console.log('95점 이상인 학생이 있나요?', hasHighScore);
    
    // every() - 모두 조건을 만족하는지
    console.log('\nevery()는 모두 조건을 만족해야 true');
    
    const allPositive = numbers.every(function(num) {
        return num > 0;
    });
    console.log('모든 숫자가 양수인가요?', allPositive);
    
    const allPassed = simpleStudents.every(function(student) {
        return student.score >= 60;
    });
    console.log('모든 학생이 60점 이상(합격)인가요?', allPassed);
}

// ==========================================
// 7️⃣ 실습 예제 - 간단한 성적 처리
// ==========================================

function practice_grades() {
    console.log('\n=== 실습: 성적 처리 시스템 ===');
    
    // 1. 모든 학생 이름 출력
    console.log('\n1. 학생 명단:');
    simpleStudents.forEach(function(student) {
        console.log('  - ' + student.name);
    });
    
    // 2. 80점 이상인 학생 찾기
    console.log('\n2. 80점 이상 학생:');
    const goodStudents = simpleStudents.filter(function(student) {
        return student.score >= 80;
    });
    goodStudents.forEach(function(student) {
        console.log('  - ' + student.name + ': ' + student.score + '점');
    });
    
    // 3. 평균 점수 계산
    const total = simpleStudents.reduce(function(sum, student) {
        return sum + student.score;
    }, 0);
    const average = total / simpleStudents.length;
    console.log('\n3. 평균 점수:', average + '점');
    
    // 4. 최고 점수 학생 찾기
    const topStudent = simpleStudents.reduce(function(best, student) {
        if (student.score > best.score) {
            return student;
        } else {
            return best;
        }
    });
    console.log('\n4. 최고 점수 학생:', topStudent.name + ' (' + topStudent.score + '점)');
    
    // 5. 성적 등급 부여 (map 사용)
    const studentsWithGrade = simpleStudents.map(function(student) {
        let grade;
        if (student.score >= 90) {
            grade = 'A';
        } else if (student.score >= 80) {
            grade = 'B';
        } else if (student.score >= 70) {
            grade = 'C';
        } else {
            grade = 'D';
        }
        
        return {
            name: student.name,
            score: student.score,
            grade: grade
        };
    });
    
    console.log('\n5. 성적 등급:');
    studentsWithGrade.forEach(function(student) {
        console.log('  - ' + student.name + ': ' + student.score + '점 (' + student.grade + '등급)');
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
    
    // 각 상품의 총 가격 계산
    console.log('\n상품별 가격:');
    const cartWithPrices = cart.map(function(item) {
        // simpleProducts에서 해당 상품 찾기
        const product = simpleProducts.find(function(p) {
            return p.name === item.name;
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
        console.log('  - ' + item.name + ': ' + 
                   item.unitPrice + '원 × ' + item.quantity + '개 = ' + 
                   item.totalPrice + '원');
    });
    
    // 전체 금액 계산
    const totalAmount = cartWithPrices.reduce(function(sum, item) {
        return sum + item.totalPrice;
    }, 0);
    
    console.log('\n총 결제 금액: ' + totalAmount + '원');
    
    // 1000원 이상인 상품만 표시
    const expensiveItems = cartWithPrices.filter(function(item) {
        return item.totalPrice >= 1000;
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
    
    // 예제 1: 짝수만 골라서 2배로 만들기
    console.log('\n1. 짝수를 2배로:');
    const result1 = numbers
        .filter(function(num) {
            return num % 2 === 0;  // 짝수만
        })
        .map(function(num) {
            return num * 2;  // 2배로
        });
    console.log('  원본:', numbers);
    console.log('  결과:', result1);
    
    // 예제 2: 80점 이상 학생의 이름만 가져오기
    console.log('\n2. 80점 이상 학생 이름:');
    const result2 = simpleStudents
        .filter(function(student) {
            return student.score >= 80;  // 80점 이상
        })
        .map(function(student) {
            return student.name;  // 이름만
        });
    console.log('  결과:', result2);
    
    // 예제 3: 1000원 이상 상품의 가격 합계
    console.log('\n3. 1000원 이상 상품 합계:');
    const result3 = simpleProducts
        .filter(function(product) {
            return product.price >= 1000;  // 1000원 이상
        })
        .reduce(function(sum, product) {
            return sum + product.price;  // 합계
        }, 0);
    console.log('  결과:', result3 + '원');
}

// ==========================================
// 🎮 대화형 학습 도우미
// ==========================================

function showHelp() {
    console.log('\n📖 배열 메서드 학습 가이드');
    console.log('=====================================');
    console.log('각 함수를 실행해서 배워보세요!');
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
    console.log('도움말: showHelp()');
    console.log('=====================================');
}

// ==========================================
// 🚀 시작!
// ==========================================

// 페이지 로드시 자동 실행
console.clear();
console.log('%c🌟 초심자를 위한 배열 메서드 학습 시작!', 
            'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%c콘솔에서 함수를 직접 실행해보세요!', 
            'color: #2196F3; font-size: 14px;');
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

// 데이터도 확인할 수 있도록 노출
window.fruits = fruits;
window.numbers = numbers;
window.simpleStudents = simpleStudents;
window.simpleProducts = simpleProducts;