# 🏢 조직도 관리 시스템

## 📋 프로젝트 개요

**복잡한 계층 구조**와 **다중 관계 처리**를 마스터하는 첫 번째 고급 실습입니다.
부서-직원-프로젝트의 3중 관계를 관리하면서 **재귀 함수, 다양한 반복문, 메모리 관리**를 종합적으로 학습합니다.

## 🎯 학습 목표

### 핵심 기술
- ✅ **재귀 함수** - 조직도 트리 구조 생성/순회
- ✅ **for...of, forEach, map** - 상황별 반복문 선택
- ✅ **깊은 복사 vs 얕은 복사** - 객체 참조 이슈 해결  
- ✅ **메모리 누수 방지** - 이벤트 리스너 정리
- ✅ **복잡한 CRUD** - 관계형 데이터 처리

### 실무 패턴
- 🔄 **데이터 정규화** - 중첩 구조를 평면으로 변환
- 🎛️ **상태 동기화** - 여러 컴포넌트 간 데이터 일관성
- 📊 **성능 최적화** - 불필요한 렌더링 방지
- 🚀 **에러 처리** - 데이터 무결성 검증

## 📊 데이터 구조

### 부서 (Departments)
```json
{
  "id": 1,
  "name": "개발팀",
  "parentId": null,
  "managerId": 101,
  "budget": 50000000,
  "location": "서울 강남구"
}
```

### 직원 (Employees)  
```json
{
  "id": 101,
  "name": "김개발",
  "departmentId": 1,
  "position": "팀장",
  "salary": 8000000,
  "hireDate": "2020-03-15",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

### 프로젝트 (Projects)
```json
{
  "id": 201,
  "name": "쇼핑몰 리뉴얼",
  "departmentId": 1,
  "managerId": 101,
  "memberIds": [101, 102, 103],
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "budget": 15000000,
  "status": "진행중"
}
```

## 🚀 주요 기능

### 1. 조직도 트리 뷰
```javascript
// 재귀 함수로 계층 구조 생성
function buildDepartmentTree(departments, parentId = null) {
    const tree = [];
    
    for (const dept of departments) {  // for...of 사용
        if (dept.parentId === parentId) {
            const children = buildDepartmentTree(departments, dept.id);
            tree.push({
                ...dept,
                children: children.length > 0 ? children : null
            });
        }
    }
    
    return tree;
}
```

### 2. 직원 검색 및 필터링  
```javascript
// 다양한 반복문 조합
function searchEmployees(criteria) {
    const results = [];
    
    // forEach로 기본 순회
    employees.forEach(employee => {
        let matches = true;
        
        // for...in으로 조건 검사
        for (const key in criteria) {
            if (criteria[key] && !employee[key]?.toString().toLowerCase()
                .includes(criteria[key].toLowerCase())) {
                matches = false;
                break;
            }
        }
        
        if (matches) results.push(employee);
    });
    
    // map으로 추가 정보 조합
    return results.map(employee => ({
        ...employee,
        department: departments.find(d => d.id === employee.departmentId),
        projects: projects.filter(p => p.memberIds.includes(employee.id))
    }));
}
```

### 3. 프로젝트 할당 최적화
```javascript
// reduce로 복잡한 집계 로직
function optimizeProjectAllocation(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    // 부서별 직원 현황 분석
    const departmentStats = employees.reduce((stats, employee) => {
        const deptId = employee.departmentId;
        
        if (!stats[deptId]) {
            stats[deptId] = {
                totalEmployees: 0,
                availableEmployees: 0,
                averageSalary: 0,
                skillsCoverage: new Set()
            };
        }
        
        stats[deptId].totalEmployees++;
        
        // 직원별 프로젝트 참여 현황 확인
        const activeProjects = projects.filter(p => 
            p.memberIds.includes(employee.id) && 
            p.status === '진행중' &&
            p.id !== projectId
        );
        
        if (activeProjects.length < 2) {  // 최대 2개 프로젝트까지 참여 가능
            stats[deptId].availableEmployees++;
        }
        
        stats[deptId].averageSalary += employee.salary;
        
        // 스킬 집합 구성
        employee.skills?.forEach(skill => 
            stats[deptId].skillsCoverage.add(skill)
        );
        
        return stats;
    }, {});
    
    // 평균 급여 계산
    Object.values(departmentStats).forEach(stat => {
        stat.averageSalary = Math.round(stat.averageSalary / stat.totalEmployees);
        stat.skillsCoverage = Array.from(stat.skillsCoverage);
    });
    
    return departmentStats;
}
```

### 4. 메모리 관리 및 이벤트 정리
```javascript
class OrganizationManager {
    constructor() {
        this.eventListeners = new Map();
        this.dataCache = new Map();
        this.updateQueue = [];
    }
    
    // 안전한 이벤트 리스너 등록
    addEventListener(element, event, handler, options = {}) {
        const key = `${element.id || element.tagName}-${event}`;
        
        // 기존 리스너 제거
        if (this.eventListeners.has(key)) {
            const oldHandler = this.eventListeners.get(key);
            element.removeEventListener(event, oldHandler);
        }
        
        element.addEventListener(event, handler, options);
        this.eventListeners.set(key, handler);
    }
    
    // 메모리 정리
    cleanup() {
        // 이벤트 리스너 정리
        this.eventListeners.forEach((handler, key) => {
            const [elementInfo, event] = key.split('-');
            const element = document.getElementById(elementInfo) || 
                           document.querySelector(elementInfo);
            if (element) {
                element.removeEventListener(event, handler);
            }
        });
        
        // 캐시 정리
        this.dataCache.clear();
        this.updateQueue = [];
        this.eventListeners.clear();
    }
    
    // 깊은 복사 유틸리티
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = this.deepClone(obj[key]);
            }
        }
        return cloned;
    }
}
```

## 🔧 고급 예외 처리

### 데이터 무결성 검증
```javascript
class DataIntegrityError extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = 'DataIntegrityError';
        this.data = data;
    }
}

async function validateOrganizationData() {
    const errors = [];
    
    try {
        // 1. 부서 계층 구조 검증
        const departmentIds = new Set(departments.map(d => d.id));
        departments.forEach(dept => {
            if (dept.parentId && !departmentIds.has(dept.parentId)) {
                errors.push(`부서 ${dept.name}의 상위 부서(ID: ${dept.parentId})가 존재하지 않습니다.`);
            }
        });
        
        // 2. 직원-부서 관계 검증
        employees.forEach(emp => {
            if (!departmentIds.has(emp.departmentId)) {
                errors.push(`직원 ${emp.name}의 부서(ID: ${emp.departmentId})가 존재하지 않습니다.`);
            }
        });
        
        // 3. 프로젝트 멤버 검증
        const employeeIds = new Set(employees.map(e => e.id));
        projects.forEach(project => {
            project.memberIds?.forEach(memberId => {
                if (!employeeIds.has(memberId)) {
                    errors.push(`프로젝트 ${project.name}의 멤버(ID: ${memberId})가 존재하지 않습니다.`);
                }
            });
        });
        
        // 4. 순환 참조 검증
        const visited = new Set();
        const recursionStack = new Set();
        
        function hasCycle(deptId) {
            if (recursionStack.has(deptId)) return true;
            if (visited.has(deptId)) return false;
            
            visited.add(deptId);
            recursionStack.add(deptId);
            
            const children = departments.filter(d => d.parentId === deptId);
            for (const child of children) {
                if (hasCycle(child.id)) return true;
            }
            
            recursionStack.delete(deptId);
            return false;
        }
        
        departments.forEach(dept => {
            if (!visited.has(dept.id) && hasCycle(dept.id)) {
                errors.push(`부서 계층 구조에 순환 참조가 발견되었습니다: ${dept.name}`);
            }
        });
        
    } catch (error) {
        throw new DataIntegrityError('데이터 검증 중 오류가 발생했습니다.', { 
            originalError: error,
            validationErrors: errors 
        });
    }
    
    if (errors.length > 0) {
        throw new DataIntegrityError('데이터 무결성 검증 실패', { errors });
    }
    
    return true;
}
```

## 📈 성능 최적화

### 가상화된 트리 렌더링
```javascript
class VirtualizedTreeRenderer {
    constructor(container, itemHeight = 40) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.visibleItems = [];
        this.scrollTop = 0;
        this.containerHeight = container.clientHeight;
        
        this.setupScrollListener();
    }
    
    setupScrollListener() {
        // 디바운싱된 스크롤 핸들러
        let scrollTimeout;
        this.container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // 60fps
        });
    }
    
    handleScroll() {
        this.scrollTop = this.container.scrollTop;
        this.updateVisibleItems();
    }
    
    updateVisibleItems() {
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(this.containerHeight / this.itemHeight) + 1,
            this.flatData.length
        );
        
        this.renderItems(startIndex, endIndex);
    }
    
    renderItems(start, end) {
        // 필요한 DOM 요소만 렌더링
        const fragment = document.createDocumentFragment();
        
        for (let i = start; i < end; i++) {
            const item = this.flatData[i];
            const element = this.createTreeItemElement(item, i);
            fragment.appendChild(element);
        }
        
        // 기존 요소 제거 후 새 요소 추가
        this.container.innerHTML = '';
        this.container.appendChild(fragment);
        
        // 스크롤 위치 보정
        this.container.style.paddingTop = `${start * this.itemHeight}px`;
        this.container.style.paddingBottom = 
            `${(this.flatData.length - end) * this.itemHeight}px`;
    }
}
```

## 🎮 실습 과제

### 난이도별 구현 과제

#### 🟢 **기본 (Basic)**
1. 부서 트리 구조 생성 및 렌더링
2. 직원 목록 CRUD 기본 기능
3. 단순 검색 및 필터링

#### 🟡 **중급 (Intermediate)**  
4. 프로젝트 할당 및 관리
5. 복잡한 조건 검색 (다중 필터)
6. 데이터 무결성 검증

#### 🔴 **고급 (Advanced)**
7. 가상화된 트리 렌더링 (1000+ 노드)
8. 실시간 조직도 업데이트 (WebSocket 시뮬레이션)
9. 성능 모니터링 및 최적화

#### 🟣 **전문가 (Expert)**
10. 메모리 누수 방지 및 정리
11. 커스텀 에러 처리 시스템  
12. 완전한 상태 관리 패턴

## 🚀 시작하기

1. **데이터 준비**: `data/organization.json` 확인
2. **서버 실행**: `json-server --watch data/organization.json --port 3001`
3. **페이지 열기**: `demo/index.html` (완성 예제) 또는 `practice/index.html` (실습용)
4. **콘솔 확인**: 개발자 도구에서 상세 로그 모니터링

---

**💡 팁**: 이 프로젝트는 **메모리 관리**와 **성능 최적화**가 핵심입니다.
큰 데이터셋에서도 부드럽게 동작하도록 최적화에 집중해보세요!