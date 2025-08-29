// ==========================================
// 8️⃣ 실전 예제 2: 쇼핑몰 장바구니
// ==========================================

function practice_shopping_cart() {
    console.log('\n=== 실전: 쇼핑몰 장바구니 ===\n');
    
    // 장바구니
    const cart = [
        { product: '노트북', quantity: 1, price: 1500000 },
        { product: '마우스', quantity: 2, price: 30000 },
        { product: 'USB', quantity: 5, price: 15000 }
    ];
    
    // 사용자 정보
    const user = {
        name: '김철수',
        grade: 'GOLD',
        points: 50000,
        isMember: true
    };
    
    console.log('장바구니 내역:');
    console.log('================');
    
    let subtotal = 0;
    
    // TODO: cart 반복문으로 각 상품의 총 가격 계산하고 출력, subtotal에 누적
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
    });
    
    console.log('================');
    console.log(`소계: ${subtotal.toLocaleString()}원`);
    
    // 할인 계산
    let discountRate = 0;
    let discountAmount = 0;
    
    // TODO: 회원 여부와 등급에 따른 할인 적용
    if (user.isMember) {
        if (user.grade === 'VIP') {
            discountRate = 0.15;
        } else if (user.grade === 'GOLD') {
            discountRate = 0.10;
        } else if (user.grade === 'SLIVER') {
            discountRate = 0.05;
        } else {
            discountRate = 0.03;
        }

        discountAmount = subtotal * discountRate;
        console.log(`${discountAmount.toLocaleString()} 원 할인 (${discountRate * 100}%)`)
    }
    
    // TODO: 금액대별 추가 할인 적용
    if (subtotal >= 1000000) {
        const extraDiscount = subtotal * 0.05;
        discountAmount += extraDiscount;
        console.log(`100만원 이상일 때: ${extraDiscount.toLocaleString()}원 추가 할인`);
    } else if (subtotal >= 500000) {
        const extraDiscount = subtotal * 0.03;
        discountAmount += extraDiscount;
        console.log(`50만원 이상일 때: ${extraDiscount.toLocaleString()}원 추가 할인`);
    }
    
    // TODO: 할인 후 금액에 따른 배송비 결정
    let shippingFee = 0;
    if (subtotal - discountAmount < 50000) {
        shippingFee = 3000;
        console.log(`배송비: ${shippingFee.toLocaleString()}원 (5만원 미만)`);
    } else {
        shippingFee = 0;
        console.log(`배송비: ${shippingFee.toLocaleString()}원 (5만원 이상 배송비 무료)`);
    }
    
    // 최종 금액
    const total = subtotal - discountAmount + shippingFee;
    console.log('================');
    console.log(`최종 결제금액: ${total.toLocaleString()}원`);
    
    // TODO: 포인트 사용 안내
    if (user.points > 0) {
        const usablePoints = Math.min(user.points, total);
        if (usablePoints >= 10000) {
            console.log('포인트는 10,000원 이상 사용 가능합니다.');
        } else if (usablePoints >= 5000) {
            console.log('포인트는 5,000원 이상 사용 가능합니다.');
        } else {
            console.log('포인트는 5,000원 이상부터 사용 가능합니다.');
        }
    }
    
    // TODO: 결제 가능 여부 판단
    console.log('\n=== 결제 가능 여부 ===');
    if (total < 0) {
        console.log('결제 금액 오류!');
    } else if (cart.length === 0) {
        console.log('장바구니 비어있음');
    } else if (!user.isMember && total < 30000) {
        console.log('비회원의 경우에는 30000원 이상부터 구매 가능합니다.');
    } else {
        console.log('결제 가능!');
    }
}

// ==========================================
// 9️⃣ 실전 예제 3: 게임 캐릭터 상태
// ==========================================

function practice_game_character() {
    console.log('\n=== 실전: 게임 캐릭터 상태 시스템 ===\n');
    
    // 캐릭터 정보
    const character = {
        name: '용사',
        level: 15,
        hp: 75,
        maxHp: 100,
        mp: 30,
        maxMp: 50,
        status: 'normal',  // normal, poisoned, frozen, stunned
        inBattle: false
    };
    
    console.log(`캐릭터: ${character.name} (Lv.${character.level})`);
    console.log(`HP: ${character.hp}/${character.maxHp}`);
    console.log(`MP: ${character.mp}/${character.maxMp}`);
    console.log(`상태: ${character.status}`);
    console.log('-------------------\n');
    
    // TODO: HP 퍼센트 계산 후 상태별 메시지 출력\
    const hpPercent = (character.hp / character.maxHp) * 100;
    console.log(`${character.name}의 HP : ${hpPercent}%`);
    if (hpPercent <= 0) {
        console.log('사망 상태');
    } else if (hpPercent <= 20) {
        console.log('HP 매우 부족');
    } else if (hpPercent <= 50) {
        console.log('HP 절반 이하로 감소');
    } else if (hpPercent <= 80) {
        console.log('HP 조금 감소');
    } else {
        console.log('HP 충분');
    }
    
    // TODO: MP 퍼센트 계산 후 상태 출력
    const mpPercent = (character.mp / character.maxMp) * 100;
    console.log(`${character.name}의 MP : ${mpPercent}%`);
    if (mpPercent <= 0) {
        console.log('스킬 사용 불가');
    } else if (mpPercent <= 30) {
        console.log('MP 부족');
    } else {
        console.log('MP 충분');
    }
    
    // TODO: character.status를 switch문으로 확인
    console.log(`${character.name}의 상태 : ${character.status}`);
    switch(character.status) {
        case 'normal':
            console.log('정상 상태입니다.');
            break;
        case 'poisoned':
            console.log('독 중독! 매턴 HP 감소');
            break;
        case 'frozen':
            console.log('얼어버림! 행동 불가');
            break;
        case 'stunned':
            console.log('기절! 1턴 행동 불가');
            break;
        default: 
            console.log('알 수 없는 상태');
    }
    
    // TODO: 4. 행동 가능 여부 판단
    console.log('\n=== 가능한 행동 ===');
    
    // TODO: 공격 가능 조건 확인
    if (character.hp <= 0) {
        console.log('사망 : 공격 불가');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('상태이상 : 공격 불가');
    } else {
        console.log('공격 가능');
    }
    
    // TODO: 스킬 사용 가능 조건 확인
    if (character.hp <= 0) {
        console.log('사망 : 스킬 사용 불가');
    } else if (mpPercent < 10) {
        console.log('MP 부족 : 최소 10 이상 있어야 스킬 사용 가능');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('상태이상 : 스킬 사용 불가');
    } else {
        console.log('스킬 사용 가능');
    }
    
    // TODO: 아이템 사용 가능 여부
    if (character.hp <= 0) {
        console.log('사망 : 아이템 사용 불가');
    } else if (character.status === 'frozen') {
        console.log('상태이상(얼어버림) : 아이템 사용 불가');
    } else {
        console.log('아이템 사용 가능');
    }

    // TODO: 도망 가능 여부
    if (character.hp <= 0) {
        console.log('사망 : 도망 불가');
    } else if (!character.inBattle) {
        console.log('전투 중이 아님');
    } else if (character.status === 'frozen' || character.status === 'stunned') {
        console.log('상태이상 : 도망 불가');
    } else if (hpPercent <= 30) {
        console.log('HP 조금 있음, 도망 가능');
    } else {
        console.log('도망 가능');
    }

    // TODO: 추천 행동
    if (character.hp <= 0) {
        console.log('부활 아이템 사용 혹은 동료들의 도움 받기');
    } else if (hpPercent <= 30){
        console.log('회복 포션 사용');
    } else if (character.status !== 'normal') {
        console.log('상태이상 회복 아이템 사용하기');
    } else if (mpPercent <= 20) {
        console.log('MP 포션 사용 혹은 일반 스킬 사용하기');
    } else {
        console.log('자유롭게 행동 가능!');
    }
}

