# 🛒 전자상거래 주문 시스템

## 📋 프로젝트 개요

**복잡한 비즈니스 로직**과 **다단계 상태 관리**를 마스터하는 고급 실습입니다.
장바구니-재고-쿠폰-배송의 4중 연동을 통해 **reduce, while문, 중첩 try-catch, 옵셔널 체이닝** 등을 실무 수준으로 학습합니다.

## 🎯 학습 목표

### 핵심 기술
- ✅ **reduce 고급 활용** - 복잡한 가격 계산 로직
- ✅ **while문 활용** - 재고 차감 및 대기열 처리
- ✅ **중첩 try-catch** - 결제 트랜잭션 시뮬레이션
- ✅ **옵셔널 체이닝** - 안전한 객체 접근
- ✅ **복합 상태 관리** - 여러 데이터 간 일관성 유지

### 실무 패턴
- 💰 **동적 가격 계산** - 할인, 쿠폰, 배송비, 세금
- 📦 **재고 관리** - 실시간 재고 확인 및 예약
- 🎟️ **쿠폰 시스템** - 중복 적용 방지 및 유효성 검증
- 🚚 **배송 최적화** - 지역별 배송비 계산
- ⚡ **성능 최적화** - 불필요한 계산 방지

## 📊 데이터 구조

### 상품 (Products)
```json
{
  "id": 1,
  "name": "MacBook Pro 16",
  "category": "노트북",
  "price": 3200000,
  "stock": 15,
  "reserved": 3,
  "images": ["macbook1.jpg", "macbook2.jpg"],
  "options": [
    {
      "id": 1,
      "name": "메모리",
      "values": [
        {"value": "16GB", "priceAdd": 0},
        {"value": "32GB", "priceAdd": 400000}
      ]
    }
  ],
  "shipping": {
    "weight": 2.1,
    "dimensions": "35.5 x 24.5 x 1.6",
    "freeShippingThreshold": 500000
  }
}
```

### 장바구니 (Cart)
```json
{
  "id": 1,
  "userId": 101,
  "items": [
    {
      "productId": 1,
      "quantity": 1,
      "selectedOptions": [
        {"optionId": 1, "value": "32GB"}
      ],
      "addedAt": "2024-03-01T10:00:00Z"
    }
  ],
  "createdAt": "2024-03-01T10:00:00Z",
  "updatedAt": "2024-03-01T10:15:00Z"
}
```

### 쿠폰 (Coupons)
```json
{
  "id": 1,
  "code": "WELCOME20",
  "type": "percentage",
  "value": 20,
  "minOrderAmount": 100000,
  "maxDiscount": 50000,
  "validFrom": "2024-01-01",
  "validTo": "2024-12-31",
  "usageLimit": 1000,
  "usedCount": 245,
  "categories": ["노트북", "태블릿"],
  "excludeProducts": []
}
```

## 🚀 핵심 비즈니스 로직 구현

### 1. 동적 가격 계산 (reduce 마스터리)
```javascript
class PriceCalculator {
    calculateCartTotal(cartItems, coupons = [], shippingAddress = null) {
        // reduce로 복합 가격 계산
        const calculation = cartItems.reduce((acc, item) => {
            try {
                // 1. 기본 상품 가격 계산
                const basePrice = this.calculateItemPrice(item);
                
                // 2. 옵션 가격 추가 (중첩 reduce)
                const optionPrice = item.selectedOptions?.reduce((optionAcc, option) => {
                    return optionAcc + (option.priceAdd || 0);
                }, 0) || 0;
                
                // 3. 수량 적용
                const itemTotal = (basePrice + optionPrice) * item.quantity;
                
                // 4. 카테고리별 집계 (쿠폰 적용을 위해)
                const product = this.getProduct(item.productId);
                if (!acc.categoryTotals[product.category]) {
                    acc.categoryTotals[product.category] = 0;
                }
                acc.categoryTotals[product.category] += itemTotal;
                
                // 5. 전체 합계 누적
                acc.subtotal += itemTotal;
                acc.items.push({
                    ...item,
                    unitPrice: basePrice,
                    optionPrice: optionPrice,
                    totalPrice: itemTotal
                });
                
                return acc;
                
            } catch (error) {
                // 개별 아이템 오류는 로그만 남기고 계속 진행
                console.warn(`아이템 ${item.productId} 가격 계산 오류:`, error);
                acc.errors.push({productId: item.productId, error: error.message});
                return acc;
            }
        }, {
            subtotal: 0,
            categoryTotals: {},
            items: [],
            errors: []
        });
        
        // 할인 적용
        const discounts = this.applyCoupons(calculation, coupons);
        
        // 배송비 계산
        const shipping = this.calculateShipping(calculation, shippingAddress);
        
        // 세금 계산
        const tax = this.calculateTax(calculation.subtotal - discounts.totalDiscount);
        
        return {
            ...calculation,
            discounts: discounts.appliedDiscounts,
            totalDiscount: discounts.totalDiscount,
            shipping: shipping,
            tax: tax,
            total: calculation.subtotal - discounts.totalDiscount + shipping + tax
        };
    }
}
```

### 2. 재고 관리 시스템 (while문 + 옵셔널 체이닝)
```javascript
class InventoryManager {
    async reserveItems(cartItems) {
        const reservationResults = [];
        let currentIndex = 0;
        
        // while문으로 재고 처리 (비동기 순차 처리)
        while (currentIndex < cartItems.length) {
            const item = cartItems[currentIndex];
            let reservationComplete = false;
            let retryCount = 0;
            const maxRetries = 3;
            
            // 재고 확보 재시도 로직
            while (!reservationComplete && retryCount < maxRetries) {
                try {
                    const product = await this.getProduct(item.productId);
                    
                    // 옵셔널 체이닝으로 안전한 접근
                    const availableStock = (product?.stock ?? 0) - (product?.reserved ?? 0);
                    
                    if (availableStock >= item.quantity) {
                        // 재고 예약 성공
                        await this.updateProductReservation(
                            item.productId, 
                            (product?.reserved ?? 0) + item.quantity
                        );
                        
                        reservationResults.push({
                            productId: item.productId,
                            requestedQuantity: item.quantity,
                            reservedQuantity: item.quantity,
                            status: 'success'
                        });
                        
                        reservationComplete = true;
                        
                    } else if (availableStock > 0) {
                        // 부분 재고만 예약 가능
                        const partialReservation = await this.handlePartialReservation(
                            item, availableStock
                        );
                        
                        reservationResults.push(partialReservation);
                        reservationComplete = true;
                        
                    } else {
                        // 재고 부족 - 대기열 처리
                        await this.addToWaitingList(item);
                        
                        reservationResults.push({
                            productId: item.productId,
                            requestedQuantity: item.quantity,
                            reservedQuantity: 0,
                            status: 'waiting',
                            estimatedWaitTime: this.calculateWaitTime(item.productId)
                        });
                        
                        reservationComplete = true;
                    }
                    
                } catch (error) {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        // 지수 백오프로 재시도
                        await this.delay(Math.pow(2, retryCount) * 100);
                    } else {
                        reservationResults.push({
                            productId: item.productId,
                            status: 'error',
                            error: error.message
                        });
                        reservationComplete = true;
                    }
                }
            }
            
            currentIndex++;
        }
        
        return reservationResults;
    }
}
```

### 3. 결제 트랜잭션 시뮬레이션 (중첩 try-catch)
```javascript
class PaymentProcessor {
    async processOrder(orderData) {
        const transactionId = this.generateTransactionId();
        let rollbackActions = [];
        
        try {
            // 1단계: 재고 확정
            try {
                const inventoryResult = await this.finalizeInventory(orderData.items);
                rollbackActions.push(() => this.rollbackInventory(inventoryResult));
                
                if (!inventoryResult.success) {
                    throw new InventoryError('재고 확정 실패', inventoryResult.errors);
                }
                
            } catch (inventoryError) {
                if (inventoryError instanceof InventoryError) {
                    throw inventoryError;
                } else {
                    throw new SystemError('재고 시스템 오류', inventoryError);
                }
            }
            
            // 2단계: 결제 처리
            try {
                const paymentResult = await this.processPayment(
                    orderData.payment,
                    orderData.total,
                    transactionId
                );
                rollbackActions.push(() => this.refundPayment(paymentResult.paymentId));
                
                if (!paymentResult.success) {
                    throw new PaymentError('결제 처리 실패', paymentResult.error);
                }
                
            } catch (paymentError) {
                // 결제 실패 시 재고 롤백
                await this.executeRollback(rollbackActions);
                
                if (paymentError instanceof PaymentError) {
                    throw paymentError;
                } else {
                    throw new SystemError('결제 시스템 오류', paymentError);
                }
            }
            
            // 3단계: 주문 생성
            try {
                const order = await this.createOrder({
                    ...orderData,
                    transactionId,
                    status: 'confirmed'
                });
                rollbackActions.push(() => this.cancelOrder(order.id));
                
            } catch (orderError) {
                // 주문 생성 실패 시 결제 및 재고 롤백
                await this.executeRollback(rollbackActions);
                throw new SystemError('주문 생성 실패', orderError);
            }
            
            // 4단계: 배송 처리 시작
            try {
                await this.initiateShipping(order);
                
                // 성공 시 알림 발송
                await this.sendOrderConfirmation(order);
                
                return {
                    success: true,
                    orderId: order.id,
                    transactionId: transactionId,
                    message: '주문이 성공적으로 처리되었습니다.'
                };
                
            } catch (shippingError) {
                // 배송 처리 실패는 로그만 남기고 주문은 유지
                console.error('배송 처리 실패:', shippingError);
                
                return {
                    success: true,
                    orderId: order.id,
                    transactionId: transactionId,
                    warning: '주문은 완료되었으나 배송 처리에 지연이 있을 수 있습니다.'
                };
            }
            
        } catch (error) {
            // 모든 롤백 실행
            await this.executeRollback(rollbackActions);
            
            // 에러 타입별 처리
            if (error instanceof InventoryError) {
                return {
                    success: false,
                    error: 'INVENTORY_ERROR',
                    message: '일부 상품의 재고가 부족합니다.',
                    details: error.data
                };
            } else if (error instanceof PaymentError) {
                return {
                    success: false,
                    error: 'PAYMENT_ERROR',
                    message: '결제 처리 중 오류가 발생했습니다.',
                    details: error.data
                };
            } else {
                return {
                    success: false,
                    error: 'SYSTEM_ERROR',
                    message: '시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                    transactionId: transactionId
                };
            }
        }
    }
    
    async executeRollback(rollbackActions) {
        // 역순으로 롤백 실행
        for (let i = rollbackActions.length - 1; i >= 0; i--) {
            try {
                await rollbackActions[i]();
            } catch (rollbackError) {
                console.error(`롤백 실행 오류 (${i}):`, rollbackError);
                // 롤백 실패는 로그만 남기고 계속 진행
            }
        }
    }
}
```

### 4. 고급 조건 분기 (switch + 옵셔널 체이닝)
```javascript
class OrderStatusManager {
    updateOrderStatus(order, newStatus, context = {}) {
        const currentStatus = order?.status;
        const userId = context?.user?.id;
        const isAdmin = context?.user?.roles?.includes('admin') ?? false;
        
        // 상태 전이 검증
        const canTransition = this.validateStatusTransition(currentStatus, newStatus, {
            isAdmin,
            userId,
            order
        });
        
        if (!canTransition.allowed) {
            throw new StatusTransitionError(canTransition.reason);
        }
        
        // 상태별 처리 로직
        switch (newStatus) {
            case 'confirmed':
                return this.handleConfirmation(order, context);
                
            case 'preparing':
                return this.handlePreparation(order, context);
                
            case 'shipped':
                return this.handleShipping(order, context);
                
            case 'delivered':
                return this.handleDelivery(order, context);
                
            case 'cancelled':
                return this.handleCancellation(order, context);
                
            case 'refunded':
                return this.handleRefund(order, context);
                
            default:
                throw new InvalidStatusError(`알 수 없는 상태: ${newStatus}`);
        }
    }
    
    validateStatusTransition(currentStatus, newStatus, context) {
        const { isAdmin, userId, order } = context;
        const orderUserId = order?.userId;
        
        // 권한 검증
        const hasPermission = isAdmin || userId === orderUserId;
        
        if (!hasPermission) {
            return { allowed: false, reason: '권한이 없습니다.' };
        }
        
        // 상태 전이 매트릭스
        const transitions = {
            'pending': ['confirmed', 'cancelled'],
            'confirmed': ['preparing', 'cancelled'],
            'preparing': ['shipped', 'cancelled'],
            'shipped': ['delivered', 'cancelled'],
            'delivered': isAdmin ? ['refunded'] : [],
            'cancelled': isAdmin ? ['confirmed'] : [],
            'refunded': []
        };
        
        const allowedTransitions = transitions[currentStatus] ?? [];
        
        if (!allowedTransitions.includes(newStatus)) {
            return { 
                allowed: false, 
                reason: `${currentStatus}에서 ${newStatus}로 변경할 수 없습니다.` 
            };
        }
        
        // 시간 제약 검증
        const timeConstraints = this.checkTimeConstraints(order, newStatus);
        if (!timeConstraints.valid) {
            return { allowed: false, reason: timeConstraints.reason };
        }
        
        return { allowed: true };
    }
}
```

## 🔧 성능 최적화 및 메모리 관리

### 메모이제이션을 통한 계산 최적화
```javascript
class OptimizedPriceCalculator {
    constructor() {
        this.priceCache = new Map();
        this.shippingCache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5분
    }
    
    calculateWithCache(cartItems, coupons, shippingAddress) {
        // 캐시 키 생성
        const cacheKey = this.generateCacheKey(cartItems, coupons, shippingAddress);
        
        // 캐시된 결과 확인
        const cached = this.priceCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return { ...cached.result, fromCache: true };
        }
        
        // 새로 계산
        const result = this.calculateCartTotal(cartItems, coupons, shippingAddress);
        
        // 캐시에 저장
        this.priceCache.set(cacheKey, {
            result: { ...result },
            timestamp: Date.now()
        });
        
        // 메모리 관리: 오래된 캐시 정리
        this.cleanupCache();
        
        return { ...result, fromCache: false };
    }
    
    cleanupCache() {
        const now = Date.now();
        
        for (const [key, value] of this.priceCache.entries()) {
            if (now - value.timestamp > this.cacheTimeout) {
                this.priceCache.delete(key);
            }
        }
        
        // 캐시 크기 제한 (최대 100개)
        if (this.priceCache.size > 100) {
            const entries = Array.from(this.priceCache.entries());
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            // 오래된 항목부터 삭제
            const toDelete = entries.slice(0, 20);
            toDelete.forEach(([key]) => this.priceCache.delete(key));
        }
    }
}
```

## 🎮 실습 과제

### 🟢 **기본 (Basic)**
1. 장바구니 기본 CRUD 구현
2. 단순 가격 계산 (reduce 사용)
3. 기본 재고 확인

### 🟡 **중급 (Intermediate)**
4. 쿠폰 시스템 구현 (중첩 reduce)
5. 재고 예약 시스템 (while문 활용)
6. 배송비 계산 로직

### 🔴 **고급 (Advanced)**
7. 복합 할인 계산 (여러 쿠폰 조합)
8. 트랜잭션 시뮬레이션 (중첩 try-catch)
9. 상태 관리 시스템 (switch + 옵셔널 체이닝)

### 🟣 **전문가 (Expert)**
10. 성능 최적화 (메모이제이션, 캐싱)
11. 대용량 주문 처리 (큐 시스템)
12. 실시간 재고 동기화

## 📈 학습 성과

이 프로젝트를 완료하면:

- ✅ **reduce의 고급 활용법**을 완전히 마스터합니다
- ✅ **while문을 이용한 복잡한 로직** 처리가 가능합니다
- ✅ **중첩된 에러 처리**로 안정적인 시스템을 구축할 수 있습니다
- ✅ **옵셔널 체이닝**으로 안전한 코드를 작성할 수 있습니다
- ✅ **실무 수준의 전자상거래 로직**을 이해하게 됩니다

## 🚀 시작하기

1. **데이터 준비**: `data/ecommerce.json` 확인
2. **서버 실행**: `json-server --watch data/ecommerce.json --port 3001`
3. **페이지 열기**: `demo/index.html` (완성 예제) 또는 `practice/index.html` (실습용)
4. **성능 모니터링**: 개발자 도구에서 계산 시간 측정

---

**💡 팁**: 이 프로젝트는 **비즈니스 로직의 복잡성**이 핵심입니다.
실제 쇼핑몰 수준의 요구사항을 구현하면서 고급 JavaScript 패턴을 익혀보세요!