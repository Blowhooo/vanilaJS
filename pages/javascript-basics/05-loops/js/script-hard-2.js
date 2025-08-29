// 간단한 상품 검색 프로그램

// 상품 목록 (배열)
let products = [
    "Apple iPhone",
    "Samsung Galaxy",
    "Apple MacBook",
    "Dell Laptop",
    "Sony Headphones",
    "Apple AirPods",
    "Samsung TV",
    "iPad Pro",
    "Apple Watch",
    "Samsung Buds"
];

// 검색어 입력
// - searchWord 변수에 검색할 단어를 저장하세요 (예: "apple")




// 검색 시작 출력
// - console.log로 '🔍 상품 검색' 출력
// - 검색어 출력
// - 구분선 출력 ('---------------------------------')




// 검색어 소문자 변환
// - searchLower 변수를 만들어 searchWord.toLowerCase() 저장
// - 대소문자 구분 없이 검색하기 위함




// 검색 결과 카운트 변수
// - foundCount를 0으로 초기화




// 검색 결과 제목 출력
// - '📦 검색 결과:' 출력
// - 빈 줄 출력




// 메인 검색 로직
// - for문으로 products 배열의 각 상품 확인
// - 각 상품명도 소문자로 변환 (toLowerCase())
// - includes() 메서드로 검색어 포함 여부 확인
// - 포함되어 있으면:
//   * foundCount 1 증가
//   * 상품명 출력 (예: '  ✅ 1. Apple iPhone')




// 결과 요약 섹션
// - 빈 줄과 구분선 출력
// - '📊 결과 요약' 출력
// - 전체 상품 개수 출력 (products.length 사용)
// - 검색된 상품 개수 출력 (foundCount 사용)




// 성공률 계산
// - percent 변수 만들기
// - (foundCount * 100) / products.length 계산
// - Math.round()로 반올림
// - '적중률: XX%' 형식으로 출력




// 막대 그래프 그리기
// - barSize = 10 (막대 전체 길이)
// - filled = 성공률에 따른 채워질 칸 수 계산
// - for문으로 막대 그리기
//   * filled만큼 '■' 출력
//   * 나머지는 '□' 출력
// - '[■■■□□□□□□□]' 형식




// 최종 안내 메시지
// - 검색 결과가 0개면: '검색 결과가 없습니다' 출력
// - 1개면: '1개의 상품을 찾았습니다' 출력
// - 여러 개면: 'X개의 상품을 찾았습니다' 출력




// 도움말
// - 다른 검색어 테스트 방법 안내
// - 예시 검색어 제공 (samsung, phone, tv 등)
