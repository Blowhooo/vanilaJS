// JavaScript 연산자 심화 실습

// 1. 영화관 좌석 예약 시스템
function practiceMovieReservation() {
    const resultDiv = document.getElementById('movieReservationResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🎬 영화관 좌석 예약 시스템</h5>';
        
        // 예약 정보
        const reservations = [
            { name: '김철수', movie: '스파이더맨', time: '14:00', seats: 2, isWeekend: false, is3D: false },
            { name: '이영희', movie: '아바타', time: '19:00', seats: 4, isWeekend: true, is3D: true },
            { name: '박민수', movie: '탑건', time: '21:00', seats: 3, isWeekend: true, is3D: false },
            { name: '최지영', movie: '엘리멘탈', time: '10:00', seats: 2, isWeekend: false, is3D: true }
        ];
        
        // 기본 가격
        const basePrice = 12000;
        
        result += '<h6>예약별 가격 계산:</h6>';
        
        reservations.forEach(reservation => {
            let price = basePrice;
            let priceDetails = [];
            
            // 시간대별 할인/할증
            const hour = parseInt(reservation.time.split(':')[0]);
            if (hour < 12) {
                price *= 0.7;  // 조조 30% 할인
                priceDetails.push('조조 30% 할인');
            } else if (hour >= 21) {
                price *= 0.9;  // 심야 10% 할인
                priceDetails.push('심야 10% 할인');
            }
            
            // 주말 할증
            if (reservation.isWeekend) {
                price *= 1.2;
                priceDetails.push('주말 20% 할증');
            }
            
            // 3D 영화 할증
            if (reservation.is3D) {
                price += 3000;
                priceDetails.push('3D +3000원');
            }
            
            // 총 가격 계산
            const totalPrice = Math.round(price) * reservation.seats;
            
            // 할인 쿠폰 적용 (4명 이상)
            let finalPrice = totalPrice;
            if (reservation.seats >= 4) {
                finalPrice *= 0.9;  // 10% 추가 할인
                priceDetails.push('단체 10% 할인');
            }
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${reservation.name}</strong> - ${reservation.movie}<br>`;
            result += `상영시간: ${reservation.time} | 인원: ${reservation.seats}명<br>`;
            result += `${reservation.is3D ? '🎥 3D 상영' : '📽️ 일반 상영'} | `;
            result += `${reservation.isWeekend ? '주말' : '평일'}<br>`;
            
            if (priceDetails.length > 0) {
                result += `적용 사항: ${priceDetails.join(', ')}<br>`;
            }
            
            result += `1인 가격: ${Math.round(price).toLocaleString()}원<br>`;
            result += `<strong>총 금액: ${Math.round(finalPrice).toLocaleString()}원</strong>`;
            result += `</div>`;
        });
        
        result += '<p class="info">💡 시간대, 요일, 상영 타입에 따라 가격이 달라집니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 2. 택시 요금 계산기
function practiceTaxiFareCalculator() {
    const resultDiv = document.getElementById('taxiFareResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🚕 택시 요금 계산기</h5>';
        
        // 다양한 택시 이용 케이스
        const rides = [
            { passenger: '김직장인', distance: 5.5, time: 15, isNight: false, isOutCity: false },
            { passenger: '이학생', distance: 3.2, time: 10, isNight: true, isOutCity: false },
            { passenger: '박출장', distance: 25, time: 40, isNight: false, isOutCity: true },
            { passenger: '최심야', distance: 8.7, time: 20, isNight: true, isOutCity: false }
        ];
        
        result += '<h6>승차별 요금 계산:</h6>';
        
        rides.forEach(ride => {
            // 기본 요금
            let fare = 3800;  // 기본 요금 (2km까지)
            
            // 거리 요금 (2km 초과분)
            if (ride.distance > 2) {
                const extraDistance = ride.distance - 2;
                fare += Math.ceil(extraDistance / 0.132) * 100;  // 132m당 100원
            }
            
            // 시간 요금 (시속 15km 이하일 때)
            const averageSpeed = (ride.distance / ride.time) * 60;
            if (averageSpeed <= 15) {
                fare += Math.floor(ride.time / 0.5) * 100;  // 30초당 100원
            }
            
            // 심야 할증 (20%)
            if (ride.isNight) {
                fare *= 1.2;
            }
            
            // 시외 할증 (30%)
            if (ride.isOutCity) {
                fare *= 1.3;
            }
            
            // 100원 단위 반올림
            fare = Math.round(fare / 100) * 100;
            
            // 상태 이모지
            const timeEmoji = ride.isNight ? '🌙' : '☀️';
            const locationEmoji = ride.isOutCity ? '🏞️' : '🏙️';
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${ride.passenger}</strong><br>`;
            result += `${timeEmoji} ${ride.isNight ? '심야' : '주간'} | `;
            result += `${locationEmoji} ${ride.isOutCity ? '시외' : '시내'}<br>`;
            result += `거리: ${ride.distance}km | 시간: ${ride.time}분<br>`;
            result += `평균 속도: ${averageSpeed.toFixed(1)}km/h<br>`;
            
            const charges = [];
            if (ride.isNight) charges.push('심야 할증 20%');
            if (ride.isOutCity) charges.push('시외 할증 30%');
            if (averageSpeed <= 15) charges.push('저속 운행 추가');
            
            if (charges.length > 0) {
                result += `추가 요금: ${charges.join(', ')}<br>`;
            }
            
            result += `<strong>요금: ${fare.toLocaleString()}원</strong>`;
            result += `</div>`;
        });
        
        result += '<p class="info">💡 거리, 시간, 심야/시외 여부에 따라 요금이 계산됩니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 3. 전기 요금 계산기
function practiceElectricityBillCalculator() {
    const resultDiv = document.getElementById('electricityBillResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>⚡ 전기 요금 계산기</h5>';
        
        // 다양한 가구의 전기 사용량
        const households = [
            { name: '1인 가구', usage: 180, season: 'summer' },
            { name: '신혼부부', usage: 280, season: 'winter' },
            { name: '4인 가족', usage: 450, season: 'summer' },
            { name: '노부부', usage: 150, season: 'winter' }
        ];
        
        // 누진 구간별 요금 (원/kWh)
        const rates = {
            summer: [  // 여름 (7-8월)
                { limit: 300, price: 93.3 },
                { limit: 450, price: 187.9 },
                { limit: Infinity, price: 280.6 }
            ],
            winter: [  // 기타 계절
                { limit: 200, price: 93.3 },
                { limit: 400, price: 187.9 },
                { limit: Infinity, price: 280.6 }
            ]
        };
        
        result += '<h6>가구별 전기 요금:</h6>';
        
        households.forEach(household => {
            const seasonRates = rates[household.season];
            let bill = 0;
            let remaining = household.usage;
            let breakdown = [];
            
            // 누진 요금 계산
            for (let i = 0; i < seasonRates.length; i++) {
                const rate = seasonRates[i];
                const prevLimit = i > 0 ? seasonRates[i - 1].limit : 0;
                const currentLimit = rate.limit - prevLimit;
                
                if (remaining > 0) {
                    const usageInRange = Math.min(remaining, currentLimit);
                    const cost = usageInRange * rate.price;
                    bill += cost;
                    
                    if (usageInRange > 0) {
                        breakdown.push(`${i + 1}구간: ${usageInRange}kWh × ${rate.price}원`);
                    }
                    
                    remaining -= usageInRange;
                }
            }
            
            // 기본료
            const basicCharge = 910;
            bill += basicCharge;
            
            // 부가세 (10%)
            const vat = bill * 0.1;
            
            // 전력기반기금 (3.7%)
            const fund = bill * 0.037;
            
            // 최종 요금 (10원 미만 절사)
            const totalBill = Math.floor((bill + vat + fund) / 10) * 10;
            
            // 계절 이모지
            const seasonEmoji = household.season === 'summer' ? '☀️' : '❄️';
            const seasonName = household.season === 'summer' ? '여름' : '겨울';
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${household.name}</strong> ${seasonEmoji} ${seasonName}<br>`;
            result += `사용량: ${household.usage}kWh<br>`;
            result += `<small>${breakdown.join('<br>')}</small><br>`;
            result += `전기요금: ${Math.round(bill - basicCharge).toLocaleString()}원<br>`;
            result += `기본료: ${basicCharge.toLocaleString()}원<br>`;
            result += `부가세: ${Math.round(vat).toLocaleString()}원<br>`;
            result += `전력기금: ${Math.round(fund).toLocaleString()}원<br>`;
            result += `<strong>청구금액: ${totalBill.toLocaleString()}원</strong>`;
            
            // 절약 팁
            if (household.usage > 300) {
                result += `<br><span style="color: red;">⚠️ 고사용 구간! 절약이 필요합니다.</span>`;
            } else if (household.usage < 200) {
                result += `<br><span style="color: green;">✅ 효율적인 사용! 잘하고 있어요.</span>`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 누진제가 적용되어 사용량이 많을수록 단가가 높아집니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 4. 데이터 요금제 계산기
function practiceDataPlanCalculator() {
    const resultDiv = document.getElementById('dataPlanResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>📱 데이터 요금제 추천 시스템</h5>';
        
        // 사용자별 데이터 사용 패턴
        const users = [
            { name: '김학생', dataUsage: 3.5, callMinutes: 50, textMessages: 100 },
            { name: '이직장인', dataUsage: 15, callMinutes: 200, textMessages: 50 },
            { name: '박유튜버', dataUsage: 50, callMinutes: 100, textMessages: 30 },
            { name: '최어르신', dataUsage: 1, callMinutes: 300, textMessages: 200 }
        ];
        
        // 요금제 옵션
        const plans = [
            { name: '라이트', data: 5, call: 100, text: 100, price: 35000 },
            { name: '스탠다드', data: 10, call: 200, text: 200, price: 50000 },
            { name: '프리미엄', data: 30, call: 300, text: 300, price: 70000 },
            { name: '무제한', data: 999, call: 999, text: 999, price: 90000 }
        ];
        
        result += '<h6>사용자별 최적 요금제:</h6>';
        
        users.forEach(user => {
            // 각 요금제별 초과 요금 계산
            let recommendations = [];
            
            plans.forEach(plan => {
                let extraCost = 0;
                
                // 데이터 초과 (GB당 20,000원)
                if (user.dataUsage > plan.data && plan.data !== 999) {
                    extraCost += Math.ceil(user.dataUsage - plan.data) * 20000;
                }
                
                // 통화 초과 (분당 50원)
                if (user.callMinutes > plan.call && plan.call !== 999) {
                    extraCost += (user.callMinutes - plan.call) * 50;
                }
                
                // 문자 초과 (건당 20원)
                if (user.textMessages > plan.text && plan.text !== 999) {
                    extraCost += (user.textMessages - plan.text) * 20;
                }
                
                const totalCost = plan.price + extraCost;
                
                recommendations.push({
                    plan: plan.name,
                    baseCost: plan.price,
                    extraCost: extraCost,
                    totalCost: totalCost
                });
            });
            
            // 최적 요금제 찾기
            recommendations.sort((a, b) => a.totalCost - b.totalCost);
            const best = recommendations[0];
            const second = recommendations[1];
            
            // 사용 패턴 분석
            const usagePattern = user.dataUsage > 20 ? '📊 데이터 헤비유저' :
                                user.callMinutes > 200 ? '📞 통화 위주' :
                                user.textMessages > 150 ? '💬 문자 위주' : '🌱 라이트유저';
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${user.name}</strong> ${usagePattern}<br>`;
            result += `월 사용량: 데이터 ${user.dataUsage}GB | 통화 ${user.callMinutes}분 | 문자 ${user.textMessages}건<br>`;
            result += `<br>🏆 추천 요금제: <strong>${best.plan}</strong><br>`;
            result += `기본료: ${best.baseCost.toLocaleString()}원`;
            
            if (best.extraCost > 0) {
                result += ` + 초과요금: ${best.extraCost.toLocaleString()}원`;
            }
            
            result += `<br><strong>예상 요금: ${best.totalCost.toLocaleString()}원</strong><br>`;
            
            // 차선책 제시
            if (second.totalCost - best.totalCost < 10000) {
                result += `<br>💡 대안: ${second.plan} (${second.totalCost.toLocaleString()}원)`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 사용 패턴을 분석하여 최적의 요금제를 추천합니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 5. 학점 계산기 (GPA)
function practiceGPACalculator() {
    const resultDiv = document.getElementById('gpaCalculatorResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>🎓 학점 계산기 (GPA)</h5>';
        
        // 학생들의 수강 과목과 성적
        const students = [
            {
                name: '김우수',
                courses: [
                    { subject: '데이터구조', credit: 3, grade: 'A+' },
                    { subject: '알고리즘', credit: 3, grade: 'A0' },
                    { subject: '운영체제', credit: 3, grade: 'B+' },
                    { subject: '데이터베이스', credit: 3, grade: 'A+' },
                    { subject: '영어회화', credit: 2, grade: 'B0' }
                ]
            },
            {
                name: '이보통',
                courses: [
                    { subject: '프로그래밍', credit: 3, grade: 'B0' },
                    { subject: '이산수학', credit: 3, grade: 'C+' },
                    { subject: '컴퓨터구조', credit: 3, grade: 'B+' },
                    { subject: '웹프로그래밍', credit: 3, grade: 'B0' },
                    { subject: '교양철학', credit: 2, grade: 'A0' }
                ]
            }
        ];
        
        // 학점 변환표
        const gradePoints = {
            'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0': 3.0,
            'C+': 2.5, 'C0': 2.0, 'D+': 1.5, 'D0': 1.0, 'F': 0
        };
        
        result += '<h6>학생별 성적 분석:</h6>';
        
        students.forEach(student => {
            let totalPoints = 0;
            let totalCredits = 0;
            let majorPoints = 0;
            let majorCredits = 0;
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `<strong>${student.name}</strong><br><br>`;
            result += `<table style="width: 100%; font-size: 14px;">`;
            result += `<tr><th>과목</th><th>학점</th><th>성적</th><th>평점</th></tr>`;
            
            student.courses.forEach(course => {
                const points = gradePoints[course.grade];
                const weightedPoints = points * course.credit;
                
                totalPoints += weightedPoints;
                totalCredits += course.credit;
                
                // 전공 과목 구분 (교양이 아닌 경우)
                if (!course.subject.includes('교양') && !course.subject.includes('영어')) {
                    majorPoints += weightedPoints;
                    majorCredits += course.credit;
                }
                
                result += `<tr>`;
                result += `<td>${course.subject}</td>`;
                result += `<td>${course.credit}</td>`;
                result += `<td>${course.grade}</td>`;
                result += `<td>${points.toFixed(1)}</td>`;
                result += `</tr>`;
            });
            
            result += `</table><br>`;
            
            // 평균 학점 계산
            const gpa = totalPoints / totalCredits;
            const majorGpa = majorCredits > 0 ? majorPoints / majorCredits : 0;
            
            // 등급 판정
            const rank = gpa >= 4.3 ? '최우수 🏆' :
                        gpa >= 4.0 ? '우수 🥇' :
                        gpa >= 3.5 ? '우량 🥈' :
                        gpa >= 3.0 ? '양호 🥉' :
                        gpa >= 2.5 ? '보통 📚' : '노력필요 💪';
            
            result += `총 이수학점: ${totalCredits}학점<br>`;
            result += `전체 평점: <strong>${gpa.toFixed(2)}</strong> / 4.5<br>`;
            result += `전공 평점: <strong>${majorGpa.toFixed(2)}</strong> / 4.5<br>`;
            result += `등급: ${rank}<br>`;
            
            // 장학금 자격
            if (gpa >= 4.0) {
                result += `<span style="color: green;">✨ 성적우수 장학금 대상</span><br>`;
            } else if (gpa >= 3.5) {
                result += `<span style="color: blue;">📖 성적향상 장학금 대상</span><br>`;
            }
            
            // 학사경고
            if (gpa < 2.0) {
                result += `<span style="color: red;">⚠️ 학사경고 주의</span><br>`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 GPA = Σ(학점 × 평점) ÷ Σ학점으로 계산됩니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}

// 6. 복리 계산기
function practiceCompoundInterestCalculator() {
    const resultDiv = document.getElementById('compoundInterestResult');
    let result = '<div class="result-box">';
    
    try {
        result += '<h5>💰 복리 투자 계산기</h5>';
        
        // 다양한 투자 시나리오
        const investments = [
            { name: '적금 코스', principal: 1000000, rate: 3.5, years: 3, monthly: 100000, type: 'savings' },
            { name: '펀드 투자', principal: 5000000, rate: 7, years: 5, monthly: 0, type: 'fund' },
            { name: '연금 저축', principal: 0, rate: 5, years: 20, monthly: 300000, type: 'pension' },
            { name: '주택 청약', principal: 0, rate: 2.5, years: 10, monthly: 200000, type: 'housing' }
        ];
        
        result += '<h6>투자 시나리오별 수익 계산:</h6>';
        
        investments.forEach(investment => {
            let balance = investment.principal;
            const monthlyRate = investment.rate / 12 / 100;
            const totalMonths = investment.years * 12;
            
            // 복리 계산
            if (investment.monthly > 0) {
                // 적립식 복리
                for (let month = 1; month <= totalMonths; month++) {
                    balance = balance * (1 + monthlyRate) + investment.monthly;
                }
            } else {
                // 거치식 복리
                balance = investment.principal * Math.pow(1 + investment.rate / 100, investment.years);
            }
            
            // 총 투자금액
            const totalInvested = investment.principal + (investment.monthly * totalMonths);
            
            // 수익금
            const profit = balance - totalInvested;
            
            // 수익률
            const returnRate = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
            
            // 투자 타입별 이모지
            const typeEmoji = {
                'savings': '🏦',
                'fund': '📈',
                'pension': '👴',
                'housing': '🏠'
            };
            
            result += `<div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">`;
            result += `${typeEmoji[investment.type]} <strong>${investment.name}</strong><br>`;
            result += `초기 자금: ${investment.principal.toLocaleString()}원<br>`;
            
            if (investment.monthly > 0) {
                result += `월 적립금: ${investment.monthly.toLocaleString()}원<br>`;
            }
            
            result += `연 이율: ${investment.rate}% | 기간: ${investment.years}년<br>`;
            result += `<hr style="margin: 5px 0; border: none; border-top: 1px solid #ddd;">`;
            result += `총 투자금: ${totalInvested.toLocaleString()}원<br>`;
            result += `최종 금액: <strong>${Math.round(balance).toLocaleString()}원</strong><br>`;
            result += `수익금: <span style="color: ${profit > 0 ? 'green' : 'red'}">`;
            result += `${profit > 0 ? '+' : ''}${Math.round(profit).toLocaleString()}원</span><br>`;
            result += `수익률: <strong>${returnRate.toFixed(1)}%</strong><br>`;
            
            // 투자 조언
            if (returnRate > 50) {
                result += `<span style="color: green;">🎯 훌륭한 투자 성과!</span>`;
            } else if (returnRate > 20) {
                result += `<span style="color: blue;">👍 안정적인 수익</span>`;
            } else if (returnRate > 10) {
                result += `<span style="color: orange;">📊 물가상승률 고려 필요</span>`;
            }
            
            result += `</div>`;
        });
        
        result += '<p class="info">💡 복리는 시간이 지날수록 효과가 커집니다</p>';
        
    } catch (error) {
        result += `<p class="error">에러: ${error.message}</p>`;
    }
    
    result += '</div>';
    resultDiv.innerHTML = result;
}
