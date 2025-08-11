// JavaScript 연산자 추가 실습

// 1. 학생 성적 계산기 (삼항 연산자 활용)
function practiceGradeCalculator() {
    const resultDiv = document.getElementById('gradeCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📚 학생 성적 계산</h5>';
        
        // 학생 정보
        const students = [
            { name: '김철수', korean: 85, math: 92, english: 78 },
            { name: '이영희', korean: 92, math: 88, english: 95 },
            { name: '박민수', korean: 78, math: 85, english: 82 },
            { name: '최지영', korean: 95, math: 76, english: 88 }
        ];
        
        result += '<h6>학생별 성적 처리:</h6>';
        
        students.forEach(student => {
            // 평균 계산
            const average = Math.round((student.korean + student.math + student.english) / 3);
            
            // 등급 판정 (삼항 연산자)
            const grade = average >= 90 ? 'A' :
                         average >= 80 ? 'B' :
                         average >= 70 ? 'C' :
                         average >= 60 ? 'D' : 'F';
            
            // 합격 여부
            const passed = average >= 70;
            const passText = passed ? '✅ 합격' : '❌ 재시험';
            
            // 장학금 대상 (평균 90점 이상 그리고 모든 과목 80점 이상)
            const scholarship = average >= 90 && 
                              student.korean >= 80 && 
                              student.math >= 80 && 
                              student.english >= 80;
            
            result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${student.name}</strong><br>`;
            result += `국어: ${student.korean} | 수학: ${student.math} | 영어: ${student.english}<br>`;
            result += `평균: ${average}점 | 등급: ${grade} | ${passText}`;
            if (scholarship) {
                result += ` | 🏆 장학금 대상`;
            }
            result += `</div>`;
        });
        
        result += '<p class="info">💡 삼항 연산자로 등급 판정, && 연산자로 복합 조건 체크</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 나이 계산기 (연산자 응용)
function practiceAgeCalculator() {
    const resultDiv = document.getElementById('ageCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🎂 나이별 혜택 계산기</h5>';
        
        // 다양한 나이 케이스
        const people = [
            { name: '김아기', birthYear: 2022 },
            { name: '이학생', birthYear: 2010 },
            { name: '박청년', birthYear: 1995 },
            { name: '최어른', birthYear: 1960 },
            { name: '정시니어', birthYear: 1955 }
        ];
        
        const currentYear = 2025;
        result += `<p>기준년도: ${currentYear}년</p>`;
        result += '<h6>나이별 혜택 안내:</h6>';
        
        people.forEach(person => {
            // 나이 계산
            const age = currentYear - person.birthYear;
            
            // 연령대 구분 (중첩 삼항 연산자)
            const ageGroup = age < 8 ? '영유아' :
                           age < 14 ? '어린이' :
                           age < 20 ? '청소년' :
                           age < 65 ? '성인' : '시니어';
            
            // 할인율 계산
            let discount = 0;
            if (age < 8 || age >= 65) {
                discount = 50;  // 영유아와 시니어 50% 할인
            } else if (age < 20) {
                discount = 30;  // 청소년 30% 할인
            }
            
            // 무료 혜택
            const freePass = age < 5 || age >= 70;
            
            result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${person.name}</strong> (${person.birthYear}년생)<br>`;
            result += `나이: ${age}세 | 연령대: ${ageGroup}<br>`;
            
            if (freePass) {
                result += `🎁 무료 입장<br>`;
            } else if (discount > 0) {
                result += `💰 ${discount}% 할인<br>`;
            } else {
                result += `정상 요금<br>`;
            }
            
            // 특별 혜택
            if (age === 1) {
                result += `🍼 기저귀 쿠폰 제공<br>`;
            } else if (age >= 7 && age <= 13) {
                result += `📚 어린이 도서 쿠폰<br>`;
            } else if (age >= 65) {
                result += `🏥 건강검진 할인권<br>`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 나이를 계산하고 조건에 따라 다양한 혜택 적용</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 운동 칼로리 계산기
function practiceCalorieCalculator() {
    const resultDiv = document.getElementById('calorieCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🏃 운동 칼로리 소모 계산</h5>';
        
        // 운동 정보 (칼로리/분)
        const exercises = [
            { name: '걷기', caloriesPerMin: 4, intensity: '저강도' },
            { name: '조깅', caloriesPerMin: 8, intensity: '중강도' },
            { name: '달리기', caloriesPerMin: 12, intensity: '고강도' },
            { name: '자전거', caloriesPerMin: 7, intensity: '중강도' },
            { name: '수영', caloriesPerMin: 10, intensity: '고강도' }
        ];
        
        // 사용자 운동 기록
        const userExercises = [
            { exercise: '걷기', minutes: 30 },
            { exercise: '조깅', minutes: 20 },
            { exercise: '자전거', minutes: 45 }
        ];
        
        result += '<h6>오늘의 운동 기록:</h6>';
        
        let totalCalories = 0;
        let totalMinutes = 0;
        
        userExercises.forEach(record => {
            // 운동 정보 찾기
            const exerciseInfo = exercises.find(e => e.name === record.exercise);
            
            if (exerciseInfo) {
                const calories = exerciseInfo.caloriesPerMin * record.minutes;
                totalCalories += calories;
                totalMinutes += record.minutes;
                
                // 강도별 이모지
                const intensityEmoji = exerciseInfo.intensity === '고강도' ? '🔥' :
                                      exerciseInfo.intensity === '중강도' ? '💪' : '🚶';
                
                result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
                result += `${intensityEmoji} <strong>${record.exercise}</strong><br>`;
                result += `시간: ${record.minutes}분 | 강도: ${exerciseInfo.intensity}<br>`;
                result += `소모 칼로리: ${calories}kcal<br>`;
                result += `</div>`;
            }
        });
        
        // 총 결과
        result += '<h6>운동 요약:</h6>';
        result += `<p>총 운동 시간: ${totalMinutes}분</p>`;
        result += `<p>총 소모 칼로리: ${totalCalories}kcal</p>`;
        
        // 목표 달성 체크
        const dailyGoal = 300;  // 일일 목표 칼로리
        const achieved = totalCalories >= dailyGoal;
        const achievement = Math.round((totalCalories / dailyGoal) * 100);
        
        result += `<p>일일 목표 (${dailyGoal}kcal): `;
        result += achieved ? `✅ 달성! (${achievement}%)` : `${achievement}% 달성`;
        result += `</p>`;
        
        // 추가 필요 운동
        if (!achieved) {
            const remaining = dailyGoal - totalCalories;
            const walkMinutes = Math.ceil(remaining / 4);  // 걷기 기준
            result += `<p>💡 목표 달성을 위해 ${walkMinutes}분 더 걸으세요!</p>`;
        }
        
        result += '<p class="info">💡 운동별 칼로리를 계산하고 목표 달성 여부 체크</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 4. 주차 요금 계산기
function practiceParkingCalculator() {
    const resultDiv = document.getElementById('parkingCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🅿️ 주차 요금 계산</h5>';
        
        // 다양한 주차 상황
        const parkingCases = [
            { vehicle: '소형차', hours: 2.5, isWeekend: false, isMember: false },
            { vehicle: '소형차', hours: 5, isWeekend: true, isMember: true },
            { vehicle: '대형차', hours: 3, isWeekend: false, isMember: false },
            { vehicle: '장애인 차량', hours: 4, isWeekend: true, isMember: false }
        ];
        
        // 기본 요금 (시간당)
        const rates = {
            '소형차': 2000,
            '대형차': 3000,
            '장애인 차량': 0  // 무료
        };
        
        result += '<h6>주차 요금 계산 결과:</h6>';
        
        parkingCases.forEach((parking, index) => {
            const baseRate = rates[parking.vehicle];
            let totalFee = Math.ceil(parking.hours) * baseRate;
            
            // 할인 적용
            let discounts = [];
            
            // 주말 할인 (20%)
            if (parking.isWeekend && baseRate > 0) {
                totalFee *= 0.8;
                discounts.push('주말 20%');
            }
            
            // 회원 할인 (10%)
            if (parking.isMember && baseRate > 0) {
                totalFee *= 0.9;
                discounts.push('회원 10%');
            }
            
            // 최대 요금 제한 (15000원)
            const maxFee = 15000;
            const finalFee = Math.min(Math.round(totalFee), maxFee);
            
            result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>사례 ${index + 1}: ${parking.vehicle}</strong><br>`;
            result += `주차 시간: ${parking.hours}시간 (올림: ${Math.ceil(parking.hours)}시간)<br>`;
            
            if (baseRate === 0) {
                result += `요금: 🆓 무료 (장애인 차량)<br>`;
            } else {
                result += `기본 요금: ${baseRate.toLocaleString()}원/시간<br>`;
                if (discounts.length > 0) {
                    result += `할인: ${discounts.join(', ')}<br>`;
                }
                result += `최종 요금: ${finalFee.toLocaleString()}원`;
                if (totalFee > maxFee) {
                    result += ` (최대 요금 적용)`;
                }
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 조건에 따른 할인과 최대 요금 제한 적용</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 5. 온도 변환기 (다양한 연산자 활용)
function practiceTemperatureConverter() {
    const resultDiv = document.getElementById('temperatureConverterResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🌡️ 온도 변환 및 상태 표시</h5>';
        
        // 다양한 온도 예시
        const temperatures = [
            { name: '물의 어는점', celsius: 0 },
            { name: '실내 적정 온도', celsius: 22 },
            { name: '체온', celsius: 36.5 },
            { name: '여름 날씨', celsius: 32 },
            { name: '공기 비등점', celsius: 100 },
            { name: '겨울 날씨', celsius: -5 }
        ];
        
        result += '<h6>온도 변환 및 상태:</h6>';
        
        temperatures.forEach(temp => {
            // 화씨 변환
            const fahrenheit = (temp.celsius * 9/5) + 32;
            
            // 켈빈 변환  
            const kelvin = temp.celsius + 273.15;
            
            // 온도 상태 판단
            const status = temp.celsius <= 0 ? '❄️ 얼음' :
                          temp.celsius <= 10 ? '🧊 추움' :
                          temp.celsius <= 20 ? '🍂 선선함' :
                          temp.celsius <= 30 ? '☀️ 따뜻함' :
                          temp.celsius <= 40 ? '🌴 더움' : '🔥 매우 뜨거움';
            
            // 기상 경보
            let warning = '';
            if (temp.celsius <= -10) {
                warning = '한파 경보';
            } else if (temp.celsius >= 35) {
                warning = '폭염 경보';
            }
            
            result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${temp.name}</strong><br>`;
            result += `섭씨: ${temp.celsius}°C | 화씨: ${fahrenheit.toFixed(1)}°F | 켈빈: ${kelvin.toFixed(1)}K<br>`;
            result += `상태: ${status}`;
            if (warning) {
                result += ` | ⚠️ ${warning}`;
            }
            result += `</div>`;
        });
        
        // 온도 팁
        result += '<h6>💡 온도 팁:</h6>';
        result += '<p>• 섭씨 → 화씨: (°C × 9/5) + 32</p>';
        result += '<p>• 화씨 → 섭씨: (°F - 32) × 5/9</p>';
        result += '<p>• 섭씨 → 켈빈: °C + 273.15</p>';
        
        result += '<p class="info">💡 삼항 연산자로 온도 상태 판단, 산술 연산자로 변환</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 6. BMI 계산기 (건강 지수)
function practiceBMICalculator() {
    const resultDiv = document.getElementById('bmiCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🏃 BMI 및 건강 상태 체크</h5>';
        
        // 다양한 사람들의 체질량 지수
        const people = [
            { name: '김학생', height: 165, weight: 48 },
            { name: '이직장인', height: 175, weight: 68 },
            { name: '박운동선수', height: 180, weight: 85 },
            { name: '최어른', height: 170, weight: 92 }
        ];
        
        result += '<h6>BMI 계산 결과:</h6>';
        
        people.forEach(person => {
            // BMI 계산 (kg/m²)
            const heightInMeter = person.height / 100;
            const bmi = person.weight / (heightInMeter * heightInMeter);
            
            // BMI 상태 판정
            const status = bmi < 18.5 ? '저체중' :
                          bmi < 23 ? '정상' :
                          bmi < 25 ? '과체중' :
                          bmi < 30 ? '비만' : '고도비만';
            
            // 상태별 이모지와 색상
            const statusEmoji = bmi < 18.5 ? '🌾' :
                               bmi < 23 ? '✅' :
                               bmi < 25 ? '⚠️' :
                               bmi < 30 ? '🟠' : '🔴';
            
            // 권장 체중 범위 계산
            const minWeight = Math.round(18.5 * heightInMeter * heightInMeter);
            const maxWeight = Math.round(23 * heightInMeter * heightInMeter);
            
            // 체중 조절 필요량
            let weightAdvice = '';
            if (bmi < 18.5) {
                const gainWeight = minWeight - person.weight;
                weightAdvice = `${gainWeight}kg 증량 권장`;
            } else if (bmi > 23) {
                const loseWeight = person.weight - maxWeight;
                weightAdvice = `${loseWeight}kg 감량 권장`;
            } else {
                weightAdvice = '적정 체중 유지';
            }
            
            result += `<div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${person.name}</strong><br>`;
            result += `키: ${person.height}cm | 체중: ${person.weight}kg<br>`;
            result += `BMI: ${bmi.toFixed(1)} | 상태: ${statusEmoji} ${status}<br>`;
            result += `권장 체중: ${minWeight}~${maxWeight}kg<br>`;
            result += `조언: ${weightAdvice}<br>`;
            result += `</div>`;
        });
        
        // BMI 기준 안내
        result += '<h6>📐 BMI 기준 (아시아 기준):</h6>';
        result += '<p>• 저체중: 18.5 미만</p>';
        result += '<p>• 정상: 18.5 ~ 22.9</p>';
        result += '<p>• 과체중: 23 ~ 24.9</p>';
        result += '<p>• 비만: 25 ~ 29.9</p>';
        result += '<p>• 고도비만: 30 이상</p>';
        
        result += '<p class="info">💡 BMI = 체중(kg) ÷ 키(m)² 공식으로 계산</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}
