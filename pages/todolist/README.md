# 📝 간단한 TodoList

정말 간단한 TodoList로 REST API의 기본 4가지 메서드를 학습합니다.

## ✨ 핵심 기능만

### HTTP 메서드 4가지
- **GET**: 할 일 목록 조회
- **POST**: 새 할 일 추가
- **PUT**: 할 일 완료/미완료 변경  
- **DELETE**: 할 일 삭제

### 페이지 구성
- **write.html**: 할 일 추가 페이지
- **list.html**: 할 일 목록 페이지

## 🚀 실행 방법

### 1. JSON Server 실행
```bash
cd C:\Users\ASURA-180721\Desktop\claude\practice\pages\toy\todolist
json-server --watch db.json --port 3001
```

### 2. 웹 페이지 열기
- `write.html` → 할 일 추가
- `list.html` → 할 일 보기/관리

## 📁 파일 구조
```
todolist/
├── write.html      # 할 일 추가
├── list.html       # 할 일 목록  
├── db.json         # 데이터
├── js/
│   └── todolist.js # JavaScript
└── styles/
    └── style.css   # 스타일
```

## 🎯 학습 포인트

```javascript
// GET - 조회
await fetch('http://localhost:3001/todos')

// POST - 추가
await fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '할 일' })
})

// PUT - 수정
await fetch('http://localhost:3001/todos/1', {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
})

// DELETE - 삭제  
await fetch('http://localhost:3001/todos/1', {
    method: 'DELETE'
})
```

## 💡 이전 버전과 차이

### 제거한 것들:
- ❌ 우선순위, 설명, 카테고리
- ❌ 필터링, 검색, 정렬
- ❌ 일괄 작업, 통계
- ❌ 복잡한 유효성 검사
- ❌ 모달, 애니메이션

### 남긴 것들:
- ✅ 핵심 4가지 HTTP 메서드
- ✅ 간단한 UI
- ✅ 기본 에러 처리
- ✅ 필수 기능만

**결과**: 학습에 집중할 수 있는 최소한의 TodoList! 🎯