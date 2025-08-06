# 📊 데이터 분석 대시보드

## 📋 프로젝트 개요

**대용량 데이터 처리**와 **성능 최적화**를 마스터하는 최고 난이도 실습입니다.
10,000개+ 데이터를 실시간으로 처리하면서 **filter, map, reduce 체이닝, 디바운싱, 가상 스크롤, Web Worker 시뮬레이션** 등 모든 고급 기법을 종합적으로 학습합니다.

## 🎯 학습 목표

### 핵심 기술
- ✅ **고성능 데이터 처리** - 10,000개+ 레코드 실시간 필터링
- ✅ **배열 메서드 체이닝** - filter → map → reduce 최적화
- ✅ **디바운싱/쓰로틀링** - 검색 성능 향상
- ✅ **가상 스크롤** - 메모리 사용량 최적화
- ✅ **Web Worker 시뮬레이션** - 메인 스레드 블로킹 방지
- ✅ **메모리 관리** - 대용량 데이터 효율적 처리

### 성능 최적화
- 🚀 **렌더링 최적화** - 필요한 DOM만 생성
- 💾 **메모리 효율성** - 가비지 컬렉션 고려
- ⚡ **반응성 유지** - 60fps 목표
- 🔄 **백그라운드 처리** - 무거운 연산 분리

## 📊 데이터 구조

### 매출 데이터 (Sales)
```json
{
  "id": 1,
  "date": "2024-01-15",
  "productId": 101,
  "productName": "iPhone 15 Pro",
  "category": "스마트폰",
  "brand": "Apple",
  "quantity": 2,
  "unitPrice": 1590000,
  "totalPrice": 3180000,
  "customerId": 1001,
  "customerName": "김고객",
  "customerTier": "VIP",
  "region": "서울",
  "channel": "온라인",
  "salesRep": "박영업",
  "commission": 159000,
  "discount": 100000,
  "paymentMethod": "카드"
}
```

### 제품 데이터 (Products)
```json
{
  "id": 101,
  "name": "iPhone 15 Pro",
  "category": "스마트폰",
  "brand": "Apple",
  "price": 1590000,
  "cost": 1200000,
  "margin": 390000,
  "marginRate": 24.5,
  "stock": 45,
  "minStock": 10,
  "supplier": "Apple Korea",
  "launchDate": "2023-09-22",
  "discontinued": false
}
```

### 고객 데이터 (Customers)
```json
{
  "id": 1001,
  "name": "김고객",
  "email": "customer@email.com",
  "phone": "010-1234-5678",
  "tier": "VIP",
  "totalPurchases": 5800000,
  "orderCount": 12,
  "averageOrderValue": 483333,
  "firstOrderDate": "2023-03-15",
  "lastOrderDate": "2024-02-28",
  "region": "서울",
  "birthYear": 1985,
  "gender": "M"
}
```

## 🚀 고성능 데이터 처리 시스템

### 1. 대용량 데이터 필터링 엔진
```javascript
class HighPerformanceDataFilter {
    constructor() {
        this.dataCache = new Map();
        this.filterCache = new Map();
        this.indexCache = new Map();
        this.workerPool = [];
        this.maxWorkers = navigator.hardwareConcurrency || 4;
    }
    
    // 메인 필터링 메서드 (모든 배열 메서드 체이닝)
    async filterData(dataset, filters, sortOptions, pagination) {
        const startTime = performance.now();
        
        try {
            // 1단계: 캐시 확인
            const cacheKey = this.generateCacheKey(filters, sortOptions, pagination);
            const cached = this.filterCache.get(cacheKey);
            
            if (cached && Date.now() - cached.timestamp < 30000) { // 30초 캐시
                return {
                    ...cached.result,
                    fromCache: true,
                    processingTime: performance.now() - startTime
                };
            }
            
            // 2단계: 인덱스 기반 사전 필터링
            let workingSet = await this.preFilterWithIndex(dataset, filters);
            
            // 3단계: 복합 필터 체이닝 (병렬 처리)
            const filteredData = await this.applyComplexFilters(workingSet, filters);
            
            // 4단계: 정렬 및 집계 (Web Worker 활용)
            const processedData = await this.processAndSort(filteredData, sortOptions);
            
            // 5단계: 페이지네이션 및 메타데이터
            const result = this.applyPagination(processedData, pagination);
            
            // 6단계: 결과 캐싱
            this.filterCache.set(cacheKey, {
                result,
                timestamp: Date.now()
            });
            
            return {
                ...result,
                fromCache: false,
                processingTime: performance.now() - startTime
            };
            
        } catch (error) {
            console.error('데이터 필터링 오류:', error);
            throw new DataProcessingError('필터링 처리 중 오류가 발생했습니다.', error);
        }
    }
    
    // 복합 필터 체이닝 (모든 배열 메서드 활용)
    async applyComplexFilters(dataset, filters) {
        return dataset
            // filter: 기본 조건 필터링
            .filter(item => {
                return Object.entries(filters.basic || {}).every(([key, value]) => {
                    if (!value) return true;
                    
                    const itemValue = this.getNestedValue(item, key);
                    
                    if (typeof value === 'string') {
                        return itemValue?.toString().toLowerCase()
                            .includes(value.toLowerCase());
                    }
                    
                    return itemValue === value;
                });
            })
            
            // filter: 범위 조건 필터링
            .filter(item => {
                return Object.entries(filters.range || {}).every(([key, range]) => {
                    if (!range.min && !range.max) return true;
                    
                    const itemValue = this.getNestedValue(item, key);
                    const numValue = parseFloat(itemValue);
                    
                    if (isNaN(numValue)) return true;
                    
                    const minCheck = !range.min || numValue >= parseFloat(range.min);
                    const maxCheck = !range.max || numValue <= parseFloat(range.max);
                    
                    return minCheck && maxCheck;
                });
            })
            
            // filter: 날짜 범위 필터링
            .filter(item => {
                const dateFilter = filters.dateRange;
                if (!dateFilter?.start && !dateFilter?.end) return true;
                
                const itemDate = new Date(item.date);
                const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
                const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
                
                const startCheck = !startDate || itemDate >= startDate;
                const endCheck = !endDate || itemDate <= endDate;
                
                return startCheck && endCheck;
            })
            
            // map: 계산된 필드 추가
            .map(item => {
                const enhanced = { ...item };
                
                // 수익률 계산
                if (item.totalPrice && item.cost) {
                    enhanced.profitMargin = ((item.totalPrice - item.cost) / item.totalPrice * 100).toFixed(2);
                }
                
                // 고객 세그먼트 계산
                if (item.customerTier && item.totalPurchases) {
                    enhanced.customerSegment = this.calculateCustomerSegment(item);
                }
                
                // 계절 정보 추가
                if (item.date) {
                    enhanced.season = this.getSeason(new Date(item.date));
                }
                
                return enhanced;
            })
            
            // filter: 고급 비즈니스 로직 필터링
            .filter(item => {
                // 활성 고객만 (최근 6개월 내 구매)
                if (filters.activeCustomersOnly) {
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    
                    return new Date(item.lastOrderDate || item.date) >= sixMonthsAgo;
                }
                
                // 수익성 기준 필터링
                if (filters.profitableOnly) {
                    return parseFloat(item.profitMargin || 0) > 0;
                }
                
                return true;
            });
    }
    
    // Web Worker 시뮬레이션 (대용량 집계 연산)
    async processAndSort(data, sortOptions) {
        return new Promise((resolve) => {
            // 실제 환경에서는 Web Worker 사용
            // 여기서는 setTimeout으로 시뮬레이션
            setTimeout(() => {
                try {
                    // 복합 정렬
                    const sorted = this.applySorting(data, sortOptions);
                    
                    // 집계 데이터 계산
                    const aggregations = this.calculateAggregations(sorted);
                    
                    resolve({
                        data: sorted,
                        aggregations: aggregations,
                        totalCount: sorted.length
                    });
                    
                } catch (error) {
                    console.error('데이터 처리 오류:', error);
                    resolve({ data: [], aggregations: {}, totalCount: 0 });
                }
            }, 0);
        });
    }
    
    // 복합 집계 계산 (reduce 고급 활용)
    calculateAggregations(data) {
        return data.reduce((agg, item) => {
            // 매출 집계
            agg.totalRevenue += parseFloat(item.totalPrice || 0);
            agg.totalQuantity += parseInt(item.quantity || 0);
            agg.totalProfit += parseFloat(item.profit || 0);
            
            // 카테고리별 집계
            const category = item.category;
            if (!agg.byCategory[category]) {
                agg.byCategory[category] = {
                    revenue: 0,
                    quantity: 0,
                    count: 0,
                    avgPrice: 0
                };
            }
            
            agg.byCategory[category].revenue += parseFloat(item.totalPrice || 0);
            agg.byCategory[category].quantity += parseInt(item.quantity || 0);
            agg.byCategory[category].count++;
            
            // 지역별 집계
            const region = item.region;
            if (!agg.byRegion[region]) {
                agg.byRegion[region] = { revenue: 0, count: 0 };
            }
            agg.byRegion[region].revenue += parseFloat(item.totalPrice || 0);
            agg.byRegion[region].count++;
            
            // 월별 집계
            const month = new Date(item.date).toISOString().substring(0, 7);
            if (!agg.byMonth[month]) {
                agg.byMonth[month] = { revenue: 0, count: 0 };
            }
            agg.byMonth[month].revenue += parseFloat(item.totalPrice || 0);
            agg.byMonth[month].count++;
            
            // 고객 티어별 집계
            const tier = item.customerTier;
            if (!agg.byTier[tier]) {
                agg.byTier[tier] = { revenue: 0, count: 0, customers: new Set() };
            }
            agg.byTier[tier].revenue += parseFloat(item.totalPrice || 0);
            agg.byTier[tier].count++;
            agg.byTier[tier].customers.add(item.customerId);
            
            return agg;
        }, {
            totalRevenue: 0,
            totalQuantity: 0,
            totalProfit: 0,
            byCategory: {},
            byRegion: {},
            byMonth: {},
            byTier: {}
        });
    }
}
```

### 2. 가상 스크롤 구현 (메모리 최적화)
```javascript
class VirtualScrollManager {
    constructor(container, itemHeight = 50, bufferSize = 5) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.bufferSize = bufferSize;
        this.scrollTop = 0;
        this.containerHeight = container.clientHeight;
        this.data = [];
        this.renderedItems = new Map();
        
        this.setupScrollListener();
        this.setupResizeObserver();
    }
    
    setupScrollListener() {
        let ticking = false;
        
        this.container.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        this.scrollTop = this.container.scrollTop;
        
        // 현재 보이는 영역 계산
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(this.containerHeight / this.itemHeight) + this.bufferSize,
            this.data.length
        );
        
        // 실제 렌더링 범위 (버퍼 포함)
        const renderStart = Math.max(0, startIndex - this.bufferSize);
        const renderEnd = Math.min(this.data.length, endIndex + this.bufferSize);
        
        this.renderVisibleItems(renderStart, renderEnd);
    }
    
    renderVisibleItems(start, end) {
        // 기존 아이템 중 범위 밖 아이템 제거
        for (const [index, element] of this.renderedItems.entries()) {
            if (index < start || index >= end) {
                element.remove();
                this.renderedItems.delete(index);
            }
        }
        
        // 새로운 아이템 렌더링
        for (let i = start; i < end; i++) {
            if (!this.renderedItems.has(i)) {
                const element = this.createItemElement(this.data[i], i);
                element.style.position = 'absolute';
                element.style.top = `${i * this.itemHeight}px`;
                element.style.height = `${this.itemHeight}px`;
                element.style.width = '100%';
                
                this.container.appendChild(element);
                this.renderedItems.set(i, element);
            }
        }
        
        // 컨테이너 높이 조정
        this.container.style.height = `${this.data.length * this.itemHeight}px`;
    }
    
    createItemElement(item, index) {
        const element = document.createElement('div');
        element.className = 'data-row';
        element.innerHTML = `
            <div class="data-cell">${item.date}</div>
            <div class="data-cell">${item.productName}</div>
            <div class="data-cell">${item.category}</div>
            <div class="data-cell">${item.customerName}</div>
            <div class="data-cell">${this.formatCurrency(item.totalPrice)}</div>
            <div class="data-cell">${item.quantity}</div>
            <div class="data-cell">${item.region}</div>
        `;
        
        // 이벤트 위임을 위한 데이터 속성
        element.dataset.index = index;
        element.dataset.itemId = item.id;
        
        return element;
    }
    
    updateData(newData) {
        // 기존 렌더링된 아이템 모두 제거
        for (const element of this.renderedItems.values()) {
            element.remove();
        }
        this.renderedItems.clear();
        
        // 새 데이터 설정
        this.data = newData;
        
        // 스크롤 위치 초기화
        this.container.scrollTop = 0;
        this.scrollTop = 0;
        
        // 다시 렌더링
        this.handleScroll();
    }
}
```

### 3. 실시간 검색 (디바운싱/쓰로틀링)
```javascript
class SearchManager {
    constructor(dataFilter, onResults) {
        this.dataFilter = dataFilter;
        this.onResults = onResults;
        this.searchCache = new Map();
        this.pendingSearch = null;
        this.searchHistory = [];
        this.maxHistorySize = 100;
        
        this.setupSearchOptimization();
    }
    
    setupSearchOptimization() {
        // 디바운싱된 검색 함수
        this.debouncedSearch = this.debounce((query, filters) => {
            this.performSearch(query, filters);
        }, 300);
        
        // 쓰로틀링된 실시간 미리보기
        this.throttledPreview = this.throttle((query) => {
            this.showSearchPreview(query);
        }, 100);
    }
    
    // 메인 검색 인터페이스
    search(query, filters = {}) {
        // 검색 히스토리 업데이트
        this.updateSearchHistory(query, filters);
        
        // 빈 검색어 처리
        if (!query.trim() && Object.keys(filters).length === 0) {
            this.onResults({ data: [], total: 0, query: '' });
            return;
        }
        
        // 실시간 미리보기 (쓰로틀링)
        if (query.length > 0 && query.length < 3) {
            this.throttledPreview(query);
            return;
        }
        
        // 메인 검색 (디바운싱)
        this.debouncedSearch(query, filters);
    }
    
    async performSearch(query, filters) {
        const searchKey = this.generateSearchKey(query, filters);
        
        try {
            // 캐시 확인
            const cached = this.searchCache.get(searchKey);
            if (cached && Date.now() - cached.timestamp < 60000) { // 1분 캐시
                this.onResults({
                    ...cached.results,
                    fromCache: true
                });
                return;
            }
            
            // 이전 검색 취소
            if (this.pendingSearch) {
                this.pendingSearch.cancelled = true;
            }
            
            // 새 검색 시작
            const searchOperation = { cancelled: false };
            this.pendingSearch = searchOperation;
            
            // 로딩 상태 표시
            this.onResults({ loading: true, query });
            
            // 검색 실행
            const startTime = performance.now();
            
            // 복합 필터 구성
            const searchFilters = {
                basic: {
                    productName: query,
                    customerName: query,
                    category: query
                },
                ...filters
            };
            
            const results = await this.dataFilter.filterData(
                this.getAllData(),
                searchFilters,
                { field: 'date', direction: 'desc' },
                { page: 1, limit: 1000 }
            );
            
            // 검색이 취소되었는지 확인
            if (searchOperation.cancelled) {
                return;
            }
            
            const processingTime = performance.now() - startTime;
            
            // 결과 캐싱
            this.searchCache.set(searchKey, {
                results: results,
                timestamp: Date.now()
            });
            
            // 결과 반환
            this.onResults({
                ...results,
                query: query,
                processingTime: processingTime,
                fromCache: false
            });
            
            // 검색 완료
            this.pendingSearch = null;
            
        } catch (error) {
            console.error('검색 오류:', error);
            this.onResults({
                error: '검색 중 오류가 발생했습니다.',
                query: query
            });
        }
    }
    
    // 스마트 자동완성
    showSearchPreview(query) {
        const suggestions = this.generateSuggestions(query);
        
        // 미리보기 결과 표시
        this.onResults({
            preview: true,
            suggestions: suggestions,
            query: query
        });
    }
    
    generateSuggestions(query) {
        const allData = this.getAllData();
        const suggestions = new Set();
        
        // 제품명에서 추출
        allData.forEach(item => {
            if (item.productName?.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(item.productName);
            }
            
            if (item.category?.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(item.category);
            }
            
            if (item.brand?.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(item.brand);
            }
        });
        
        // 검색 히스토리에서 추출
        this.searchHistory.forEach(historyItem => {
            if (historyItem.query.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(historyItem.query);
            }
        });
        
        return Array.from(suggestions).slice(0, 10);
    }
    
    // 유틸리티 함수들
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}
```

### 4. 성능 모니터링 시스템
```javascript
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            renderTime: [],
            filterTime: [],
            searchTime: [],
            memoryUsage: [],
            fps: []
        };
        
        this.isMonitoring = false;
        this.monitoringInterval = null;
        
        this.setupFPSMonitoring();
        this.setupMemoryMonitoring();
    }
    
    startMonitoring() {
        this.isMonitoring = true;
        
        // 1초마다 성능 메트릭 수집
        this.monitoringInterval = setInterval(() => {
            this.collectMetrics();
        }, 1000);
        
        console.log('🔍 성능 모니터링 시작');
    }
    
    collectMetrics() {
        // 메모리 사용량
        if (performance.memory) {
            this.metrics.memoryUsage.push({
                timestamp: Date.now(),
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            });
        }
        
        // 메트릭 크기 제한 (최근 100개만 유지)
        Object.keys(this.metrics).forEach(key => {
            if (this.metrics[key].length > 100) {
                this.metrics[key] = this.metrics[key].slice(-100);
            }
        });
    }
    
    measureOperation(operationName, operation) {
        return new Promise(async (resolve, reject) => {
            const startTime = performance.now();
            const startMemory = performance.memory?.usedJSHeapSize || 0;
            
            try {
                const result = await operation();
                
                const endTime = performance.now();
                const endMemory = performance.memory?.usedJSHeapSize || 0;
                const duration = endTime - startTime;
                const memoryDelta = endMemory - startMemory;
                
                // 메트릭 기록
                if (this.metrics[operationName]) {
                    this.metrics[operationName].push({
                        timestamp: Date.now(),
                        duration: duration,
                        memoryDelta: memoryDelta
                    });
                }
                
                // 성능 경고
                if (duration > 1000) { // 1초 이상
                    console.warn(`⚠️ 느린 작업 감지: ${operationName} (${duration.toFixed(2)}ms)`);
                }
                
                if (memoryDelta > 50 * 1024 * 1024) { // 50MB 이상
                    console.warn(`⚠️ 메모리 사용량 증가: ${operationName} (+${(memoryDelta / 1024 / 1024).toFixed(2)}MB)`);
                }
                
                resolve({
                    result,
                    performance: {
                        duration,
                        memoryDelta,
                        operationName
                    }
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    generatePerformanceReport() {
        return {
            summary: this.calculateSummaryStats(),
            recommendations: this.generateRecommendations(),
            charts: this.prepareChartData(),
            timestamp: new Date().toISOString()
        };
    }
    
    calculateSummaryStats() {
        const stats = {};
        
        Object.entries(this.metrics).forEach(([key, values]) => {
            if (values.length === 0) return;
            
            const durations = values.map(v => v.duration).filter(d => d !== undefined);
            
            if (durations.length > 0) {
                stats[key] = {
                    avg: durations.reduce((a, b) => a + b, 0) / durations.length,
                    min: Math.min(...durations),
                    max: Math.max(...durations),
                    count: durations.length
                };
            }
        });
        
        return stats;
    }
}
```

## 🎮 실습 과제 (극한 난이도)

### 🟢 **기본 (Basic)**
1. 1,000개 데이터 필터링 구현
2. 단순 배열 메서드 체이닝 (filter → map)
3. 기본 검색 기능

### 🟡 **중급 (Intermediate)**
4. 5,000개 데이터 실시간 처리
5. 디바운싱된 검색 구현
6. 기본 가상 스크롤

### 🔴 **고급 (Advanced)**
7. 10,000개+ 데이터 처리 (체이닝 최적화)
8. 복합 필터 시스템 (범위, 날짜, 카테고리)
9. 메모리 효율적 가상 스크롤

### 🟣 **전문가 (Expert)**
10. Web Worker 시뮬레이션
11. 성능 모니터링 및 최적화
12. 실시간 대시보드 (50,000개+ 데이터)

### 🔥 **마스터 (Master)**
13. 백만 개 데이터 스트리밍 처리
14. 메모리 누수 제로 구현
15. 60fps 보장하는 실시간 차트

## 📈 성능 목표

- ✅ **1만개 데이터 필터링**: 100ms 이내
- ✅ **검색 응답성**: 300ms 이내
- ✅ **스크롤 부드러움**: 60fps 유지  
- ✅ **메모리 사용량**: 200MB 이하
- ✅ **CPU 점유율**: 70% 이하

## 🚀 시작하기

1. **대용량 데이터 생성**: `data/generate-big-data.js` 실행
2. **서버 실행**: `json-server --watch data/analytics.json --port 3001`
3. **성능 도구 열기**: Chrome DevTools → Performance 탭
4. **메모리 모니터링**: Memory 탭에서 실시간 확인

---

**⚠️ 경고**: 이 프로젝트는 **컴퓨터 성능**을 한계까지 테스트합니다!
메모리 부족이나 브라우저 크래시에 주의하세요.