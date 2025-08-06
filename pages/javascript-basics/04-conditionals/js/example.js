// JavaScript 조건문 예제

function runIfElseExamples() {
    const output = document.getElementById('ifElseOutput');
    let result = '';
    
    result += `🔀 if, else if, else 문 예제:\n\n`;
    
    // 예제 1: 점수에 따른 등급 매기기
    function getGrade(score) {
        if (score >= 90) {
            return 'A';
        } else if (score >= 80) {
            return 'B';
        } else if (score >= 70) {
            return 'C';
        } else if (score >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }
    
    let scores = [95, 87, 76, 65, 45];
    result += `📊 점수별 등급:\n`;
    scores.forEach(score => {
        result += `${score}점 → ${getGrade(score)}등급\n`;
    });
    result += `\n`;
    
    // 예제 2: 숫자의 특성 확인
    function analyzeNumber(num) {
        let analysis = [];
        
        if (num > 0) {
            analysis.push('양수');
        } else if (num < 0) {
            analysis.push('음수');
        } else {
            analysis.push('영');
        }
        
        if (num % 2 === 0) {
            analysis.push('짝수');
        } else {
            analysis.push('홀수');
        }
        
        return analysis.join(', ');
    }
    
    let numbers = [15, -8, 0, 20];
    result += `🔢 숫자 분석:\n`;
    numbers.forEach(num => {
        result += `${num}: ${analyzeNumber(num)}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runSwitchExamples() {
    const output = document.getElementById('switchOutput');
    let result = '';
    
    result += `🔄 switch 문 예제:\n\n`;
    
    // 예제 1: 요일별 메시지
    function getDayMessage(day) {
        switch (day) {
            case 'Monday':
            case '월요일':
                return '새로운 한 주의 시작! 파이팅!';
            case 'Tuesday':
            case '화요일':
                return '화요일은 집중력이 좋은 날입니다.';
            case 'Friday':
            case '금요일':
                return '불금! 주말이 코앞이에요!';
            case 'Sunday':
            case '일요일':
                return '일요일, 내일을 준비하는 날.';
            default:
                return '올바른 요일을 입력해주세요.';
        }
    }
    
    let days = ['Monday', '화요일', 'Friday', '일요일'];
    result += `📅 요일별 메시지:\n`;
    days.forEach(day => {
        result += `${day}: ${getDayMessage(day)}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function runTernaryExamples() {
    const output = document.getElementById('ternaryOutput');
    let result = '';
    
    result += `❓ 삼항 연산자 예제:\n\n`;
    
    // 기본 삼항 연산자
    let age = 20;
    let status = age >= 18 ? '성인' : '미성년자';
    result += `나이 ${age}세: ${status}\n`;
    
    age = 15;
    status = age >= 18 ? '성인' : '미성년자';
    result += `나이 ${age}세: ${status}\n\n`;
    
    // 중첩된 삼항 연산자
    function getAgeGroup(age) {
        return age < 13 ? '어린이' : 
               age < 20 ? '청소년' : 
               age < 65 ? '성인' : '시니어';
    }
    
    result += `📊 연령대 분류:\n`;
    [8, 16, 35, 70].forEach(age => {
        result += `${age}세: ${getAgeGroup(age)}\n`;
    });
    
    output.innerHTML = `<pre>${result}</pre>`;
}

function checkAge() {
    const ageInput = document.getElementById('ageInput');
    const output = document.getElementById('interactiveOutput');
    const age = parseInt(ageInput.value);
    
    if (isNaN(age) || age < 0 || age > 150) {
        output.innerHTML = '<p style="color: red;">올바른 나이를 입력해주세요 (0-150).</p>';
        return;
    }
    
    let result = `<h4>나이 ${age}세 분석 결과:</h4>`;
    
    // 연령대 분류
    let ageGroup;
    if (age < 7) {
        ageGroup = '미취학 아동';
    } else if (age < 14) {
        ageGroup = '초등학생';
    } else if (age < 17) {
        ageGroup = '중학생';
    } else if (age < 20) {
        ageGroup = '고등학생';
    } else if (age < 30) {
        ageGroup = '청년';
    } else if (age < 50) {
        ageGroup = '중년';
    } else {
        ageGroup = '시니어';
    }
    
    result += `<p><strong>연령대:</strong> ${ageGroup}</p>`;
    
    // 권한 체크
    let permissions = [];
    if (age >= 18) permissions.push('투표권');
    if (age >= 19) permissions.push('음주/흡연');
    if (age >= 20) permissions.push('성인 인증');
    
    result += `<p><strong>가능한 권한:</strong> ${permissions.length > 0 ? permissions.join(', ') : '해당 없음'}</p>`;
    
    output.innerHTML = result;
}

function checkSeason() {
    const seasonSelect = document.getElementById('seasonSelect');
    const output = document.getElementById('interactiveOutput');
    const season = seasonSelect.value;
    
    if (!season) {
        output.innerHTML = '<p style="color: red;">계절을 선택해주세요.</p>';
        return;
    }
    
    let result = `<h4>${getSeasonName(season)} 정보:</h4>`;
    
    // switch문을 사용한 계절 정보
    switch (season) {
        case 'spring':
            result += `<p><strong>특징:</strong> 꽃이 피고 날씨가 따뜻해집니다</p>`;
            result += `<p><strong>월:</strong> 3월, 4월, 5월</p>`;
            result += `<p><strong>추천 활동:</strong> 꽃구경, 하이킹, 야외 활동</p>`;
            break;
        case 'summer':
            result += `<p><strong>특징:</strong> 덥고 습한 날씨</p>`;
            result += `<p><strong>월:</strong> 6월, 7월, 8월</p>`;
            result += `<p><strong>추천 활동:</strong> 수영, 해수욕, 아이스크림</p>`;
            break;
        case 'fall':
            result += `<p><strong>특징:</strong> 단풍이 아름답고 선선한 날씨</p>`;
            result += `<p><strong>월:</strong> 9월, 10월, 11월</p>`;
            result += `<p><strong>추천 활동:</strong> 단풍구경, 등산, 독서</p>`;
            break;
        case 'winter':
            result += `<p><strong>특징:</strong> 춥고 건조한 날씨</p>`;
            result += `<p><strong>월:</strong> 12월, 1월, 2월</p>`;
            result += `<p><strong>추천 활동:</strong> 스키, 온천, 실내 활동</p>`;
            break;
    }
    
    output.innerHTML = result;
}

function getSeasonName(season) {
    const seasonNames = {
        spring: '봄',
        summer: '여름',
        fall: '가을',
        winter: '겨울'
    };
    return seasonNames[season] || season;
}