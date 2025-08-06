# 📝 협업 문서 편집기 (최종 보스)

## 📋 프로젝트 개요

**모든 고급 JavaScript 기법을 종합**한 최고 난이도의 최종 실습입니다.
contentEditable 기반 편집기에서 **복잡한 DOM 조작, 충돌 처리, 히스토리 관리, 커스텀 에러** 등 모든 것을 실무 수준으로 구현합니다.

## 🎯 학습 목표

### 🔥 **모든 기법의 총집합**
- ✅ **모든 반복문 타입** - 상황별 최적 선택
- ✅ **복잡한 조건 분기** - 중첩 if, switch, 삼항연산자
- ✅ **고급 예외 처리** - 커스텀 에러, 에러 복구, 중첩 try-catch
- ✅ **메모리 관리 마스터** - 누수 방지, 가비지 컬렉션 고려
- ✅ **성능 최적화** - 디바운싱, 배치 처리, 가상화
- ✅ **실시간 동기화** - 충돌 감지 및 해결

### 🚀 **실무 수준의 복잡성**
- 📄 **Rich Text Editor** - 포맷팅, 스타일링, 이미지
- 👥 **실시간 협업** - 다중 사용자 동시 편집
- 🔄 **Operation Transform** - 충돌 해결 알고리즘
- 📚 **버전 관리** - 되돌리기/다시하기, 히스토리
- 🔒 **권한 관리** - 편집/읽기/댓글 권한

## 📊 데이터 구조

### 문서 (Document)
```json
{
  "id": "doc_001",
  "title": "프로젝트 기획서 v2.1",
  "content": [
    {
      "type": "heading",
      "level": 1,
      "text": "2024년 신제품 개발 계획",
      "id": "block_001",
      "version": 15
    },
    {
      "type": "paragraph",
      "text": "이 문서는 2024년 하반기 출시 예정인...",
      "id": "block_002",
      "version": 8,
      "formatting": {
        "bold": [[0, 7]],
        "italic": [[15, 23]]
      }
    }
  ],
  "metadata": {
    "createdAt": "2024-01-15T09:00:00Z",
    "updatedAt": "2024-03-01T14:30:00Z",
    "version": 47,
    "collaborators": ["user_001", "user_002", "user_003"],
    "permissions": {
      "user_001": "owner",
      "user_002": "editor", 
      "user_003": "commenter"
    }
  }
}
```

### 편집 작업 (Operation)
```json
{
  "id": "op_12345",
  "type": "text_insert",
  "userId": "user_001",
  "timestamp": "2024-03-01T14:30:15.123Z",
  "blockId": "block_002",
  "position": 25,
  "content": "새로운 기능들이 ",
  "version": 48
}
```

## 🚀 협업 문서 엔진 (모든 기법 종합)

### 1. 문서 편집 관리자 (모든 반복문 활용)
```javascript
class DocumentEditManager {
    constructor(documentId) {
        this.documentId = documentId;
        this.content = new Map();
        this.operations = [];
        this.collaborators = new Map();
        this.conflictResolver = new ConflictResolver();
        this.historyManager = new HistoryManager();
        
        this.setupRealtimeSync();
        this.initializeEditor();
    }
    
    // 복합 텍스트 처리 (모든 반복문 사용)
    processTextOperations(operations) {
        const startTime = Date.now();
        const results = {
            applied: [],
            conflicts: [],
            errors: [],
            stats: {
                insertions: 0,
                deletions: 0,
                formatting: 0
            }
        };
        
        // 1. for...of로 작업 순회
        for (const operation of operations) {
            try {
                // 2. switch문으로 작업 타입 분기
                switch (operation.type) {
                    case 'text_insert':
                        this.processTextInsertion(operation, results);
                        break;
                    case 'text_delete':
                        this.processTextDeletion(operation, results);
                        break;
                    case 'format_apply':
                        this.processFormatting(operation, results);
                        break;
                    case 'block_create':
                        this.processBlockCreation(operation, results);
                        break;
                    case 'block_delete':  
                        this.processBlockDeletion(operation, results);
                        break;
                    default:
                        throw new UnsupportedOperationError(`지원되지 않는 작업: ${operation.type}`);
                }
            } catch (error) {
                results.errors.push({
                    operation: operation.id,
                    error: error.message,
                    type: error.constructor.name
                });
            }
        }
        
        // 3. forEach로 충돌 해결
        results.conflicts.forEach(conflict => {
            try {
                const resolution = this.conflictResolver.resolve(conflict);
                this.applyConflictResolution(resolution);
            } catch (error) {
                console.error('충돌 해결 실패:', error);
                results.errors.push({
                    type: 'conflict_resolution_failed',
                    conflict: conflict.id,
                    error: error.message
                });
            }
        });
        
        // 4. for...in으로 통계 계산
        for (const userId in this.collaborators) {
            const user = this.collaborators.get(userId);
            if (user && user.lastActivity) {
                const timeSinceLastActivity = Date.now() - user.lastActivity;
                if (timeSinceLastActivity > 300000) { // 5분 이상 비활성
                    this.markUserAsInactive(userId);
                }
            }
        }
        
        // 5. while문으로 배치 처리
        let batchIndex = 0;
        const batchSize = 50;
        
        while (batchIndex < results.applied.length) {
            const batchOperations = results.applied.slice(batchIndex, batchIndex + batchSize);
            this.processBatchUpdate(batchOperations);
            batchIndex += batchSize;
            
            // 브라우저 블로킹 방지
            if (batchIndex < results.applied.length) {
                await this.delay(1); // 1ms 지연
            }
        }
        
        // 6. reduce로 최종 집계
        const finalStats = results.applied.reduce((acc, operation) => {
            acc.totalOperations++;
            acc.byType[operation.type] = (acc.byType[operation.type] || 0) + 1;
            acc.byUser[operation.userId] = (acc.byUser[operation.userId] || 0) + 1;
            
            if (operation.timestamp) {
                acc.timeRange.start = Math.min(acc.timeRange.start, operation.timestamp);
                acc.timeRange.end = Math.max(acc.timeRange.end, operation.timestamp);
            }
            
            return acc;
        }, {
            totalOperations: 0,
            byType: {},
            byUser: {},
            timeRange: { start: Infinity, end: -Infinity }
        });
        
        return {
            ...results,
            finalStats,
            processingTime: Date.now() - startTime
        };
    }
    
    // 복잡한 조건 분기 처리 (중첩 if + switch + 삼항연산자)
    validateOperation(operation) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: [],
            permission: null
        };
        
        try {
            // 1. 기본 필드 검증
            if (!operation || typeof operation !== 'object') {
                throw new ValidationError('작업 객체가 유효하지 않습니다.');
            }
            
            // 2. 필수 필드 검증 (복잡한 조건)
            const requiredFields = ['id', 'type', 'userId', 'timestamp'];
            const missingFields = requiredFields.filter(field => !operation[field]);
            
            if (missingFields.length > 0) {
                throw new ValidationError(`필수 필드 누락: ${missingFields.join(', ')}`);
            }
            
            // 3. 사용자 권한 검증 (중첩 조건)
            const userPermission = this.getUserPermission(operation.userId);
            validation.permission = userPermission;
            
            if (!userPermission) {
                throw new PermissionError('사용자를 찾을 수 없습니다.');
            }
            
            // 4. 작업 타입별 상세 검증 (switch + 중첩 if)
            switch (operation.type) {
                case 'text_insert':
                case 'text_delete':
                    // 텍스트 편집 권한 확인
                    if (userPermission !== 'owner' && userPermission !== 'editor') {
                        throw new PermissionError('텍스트 편집 권한이 없습니다.');
                    }
                    
                    // 블록 존재 확인
                    if (operation.blockId && !this.content.has(operation.blockId)) {
                        throw new ValidationError(`존재하지 않는 블록: ${operation.blockId}`);
                    }
                    
                    // 위치 검증
                    if (typeof operation.position !== 'number' || operation.position < 0) {
                        throw new ValidationError('유효하지 않은 위치입니다.');
                    }
                    
                    // 텍스트 삽입의 경우 내용 검증
                    if (operation.type === 'text_insert') {
                        if (!operation.content || typeof operation.content !== 'string') {
                            throw new ValidationError('삽입할 내용이 유효하지 않습니다.');
                        }
                        
                        // 내용 길이 제한
                        if (operation.content.length > 10000) {
                            validation.warnings.push('내용이 매우 깁니다. 성능에 영향을 줄 수 있습니다.');
                        }
                        
                        // 악성 내용 검사
                        if (this.containsMaliciousContent(operation.content)) {
                            throw new SecurityError('악성 내용이 감지되었습니다.');
                        }
                    }
                    break;
                    
                case 'format_apply':
                    // 포맷팅 권한 확인
                    if (userPermission === 'commenter') {
                        throw new PermissionError('포맷팅 권한이 없습니다.');
                    }
                    
                    // 포맷팅 범위 검증
                    if (!operation.range || !Array.isArray(operation.range) || operation.range.length !== 2) {
                        throw new ValidationError('포맷팅 범위가 유효하지 않습니다.');
                    }
                    
                    const [start, end] = operation.range;
                    if (start < 0 || end < start) {
                        throw new ValidationError('포맷팅 범위가 올바르지 않습니다.');
                    }
                    
                    // 지원되는 포맷 확인
                    const supportedFormats = ['bold', 'italic', 'underline', 'strikethrough', 'color', 'background'];
                    if (!supportedFormats.includes(operation.format?.type)) {
                        throw new ValidationError(`지원되지 않는 포맷: ${operation.format?.type}`);
                    }
                    break;
                    
                case 'block_create':
                case 'block_delete':
                    // 구조 편집 권한 확인 (소유자만 가능)
                    if (userPermission !== 'owner') {
                        throw new PermissionError('블록 구조 편집 권한이 없습니다.');
                    }
                    
                    if (operation.type === 'block_create') {
                        // 블록 타입 검증
                        const allowedBlockTypes = ['paragraph', 'heading', 'list', 'quote', 'code', 'image'];
                        if (!allowedBlockTypes.includes(operation.blockType)) {
                            throw new ValidationError(`지원되지 않는 블록 타입: ${operation.blockType}`);
                        }
                    } else {
                        // 삭제할 블록 존재 확인
                        if (!this.content.has(operation.blockId)) {
                            throw new ValidationError(`삭제할 블록이 존재하지 않습니다: ${operation.blockId}`);
                        }
                    }
                    break;
                    
                case 'comment_add':
                    // 댓글 권한 확인 (모든 권한에서 가능)
                    if (!['owner', 'editor', 'commenter'].includes(userPermission)) {
                        throw new PermissionError('댓글 작성 권한이 없습니다.');
                    }
                    
                    // 댓글 내용 검증
                    if (!operation.comment || !operation.comment.trim()) {
                        throw new ValidationError('댓글 내용이 비어있습니다.');
                    }
                    
                    if (operation.comment.length > 1000) {
                        throw new ValidationError('댓글이 너무 깁니다. (최대 1000자)');
                    }
                    break;
                    
                default:
                    throw new UnsupportedOperationError(`지원되지 않는 작업 타입: ${operation.type}`);
            }
            
            // 5. 타이밍 검증 (삼항연산자 활용)
            const now = Date.now();
            const operationTime = new Date(operation.timestamp).getTime();
            const timeDiff = Math.abs(now - operationTime);
            
            // 시간 차이가 5분 이상이면 경고
            const isTimeWarning = timeDiff > 300000;
            const isTimeCritical = timeDiff > 3600000; // 1시간
            
            if (isTimeCritical) {
                throw new ValidationError('작업 시간이 너무 오래되었습니다.');
            } else if (isTimeWarning) {
                validation.warnings.push('작업 시간이 현재 시간과 많이 다릅니다.');
            }
            
            // 6. 버전 충돌 검증
            if (operation.blockId) {
                const currentBlock = this.content.get(operation.blockId);
                const expectedVersion = operation.version || 0;
                const currentVersion = currentBlock?.version || 0;
                
                if (expectedVersion < currentVersion) {
                    throw new VersionConflictError(
                        `버전 충돌: 예상 버전 ${expectedVersion}, 현재 버전 ${currentVersion}`
                    );
                }
            }
            
            // 7. 동시 편집 검증
            const concurrentOperations = this.operations.filter(op => 
                op.blockId === operation.blockId && 
                Math.abs(new Date(op.timestamp).getTime() - operationTime) < 1000 && // 1초 이내
                op.userId !== operation.userId
            );
            
            if (concurrentOperations.length > 0) {
                validation.warnings.push('동시 편집이 감지되었습니다. 충돌이 발생할 수 있습니다.');
            }
            
        } catch (error) {
            validation.isValid = false;
            validation.errors.push({
                type: error.constructor.name,
                message: error.message,
                code: error.code || 'UNKNOWN'
            });
        }
        
        return validation;
    }
}

// 2. 충돌 해결 시스템 (고급 예외 처리)
class ConflictResolver {
    constructor() {
        this.resolutionStrategies = new Map();
        this.conflictHistory = [];
        this.maxHistorySize = 1000;
        
        this.initializeStrategies();
    }
    
    // 복잡한 충돌 해결 (중첩 try-catch)
    async resolveConflict(conflictData) {
        const resolutionId = this.generateResolutionId();
        const startTime = Date.now();
        let rollbackActions = [];
        
        try {
            // 1단계: 충돌 분석
            let analysisResult;
            try {
                analysisResult = await this.analyzeConflict(conflictData);
                rollbackActions.push(() => this.cleanupAnalysis(analysisResult.id));
                
                if (!analysisResult.resolvable) {
                    throw new UnresolvableConflictError(
                        '자동 해결이 불가능한 충돌입니다.',
                        { conflictType: analysisResult.type, operations: conflictData.operations }
                    );
                }
                
            } catch (analysisError) {
                if (analysisError instanceof UnresolvableConflictError) {
                    throw analysisError;
                } else {
                    throw new ConflictAnalysisError('충돌 분석 중 오류가 발생했습니다.', analysisError);
                }
            }
            
            // 2단계: 해결 전략 선택 및 적용
            let resolutionStrategy;
            let strategyResult;
            
            try {
                resolutionStrategy = this.selectResolutionStrategy(analysisResult);
                rollbackActions.push(() => this.cleanupStrategy(resolutionStrategy.id));
                
                strategyResult = await this.applyResolutionStrategy(
                    resolutionStrategy, 
                    conflictData,
                    analysisResult
                );
                
                if (!strategyResult.success) {
                    throw new StrategyApplicationError(
                        `해결 전략 적용 실패: ${strategyResult.error}`,
                        { strategy: resolutionStrategy.type, details: strategyResult.details }
                    );
                }
                
            } catch (strategyError) {
                // 전략 실패 시 대안 전략 시도
                try {
                    const fallbackStrategy = this.getFallbackStrategy(analysisResult);
                    
                    if (fallbackStrategy) {
                        console.warn('기본 전략 실패, 대안 전략 시도:', fallbackStrategy.type);
                        
                        strategyResult = await this.applyResolutionStrategy(
                            fallbackStrategy, 
                            conflictData,
                            analysisResult
                        );
                        
                        if (!strategyResult.success) {
                            throw strategyError; // 원래 오류 다시 발생
                        }
                        
                    } else {
                        throw strategyError;
                    }
                    
                } catch (fallbackError) {
                    // 대안 전략도 실패
                    await this.executeRollback(rollbackActions);
                    throw new ResolutionFailedError(
                        '모든 해결 전략이 실패했습니다.',
                        { 
                            originalError: strategyError,
                            fallbackError: fallbackError,
                            conflictId: conflictData.id
                        }
                    );
                }
            }
            
            // 3단계: 결과 검증 및 적용
            try {
                const validationResult = await this.validateResolution(
                    strategyResult, 
                    conflictData
                );
                
                if (!validationResult.isValid) {
                    throw new ResolutionValidationError(
                        '해결 결과가 유효하지 않습니다.',
                        { errors: validationResult.errors, resolution: strategyResult }
                    );
                }
                
                // 해결 결과 적용
                await this.applyResolution(strategyResult);
                
                // 성공 로그 기록
                this.logResolutionSuccess({
                    resolutionId,
                    conflictId: conflictData.id,
                    strategy: resolutionStrategy.type,
                    duration: Date.now() - startTime,
                    operationsCount: conflictData.operations.length
                });
                
                return {
                    success: true,
                    resolutionId: resolutionId,
                    strategy: resolutionStrategy.type,
                    result: strategyResult,
                    transformedOperations: strategyResult.transformedOperations
                };
                
            } catch (validationError) {
                // 검증 실패 시 롤백
                await this.executeRollback(rollbackActions);
                throw validationError;
            }
            
        } catch (error) {
            // 모든 단계 실패 시 최종 롤백
            await this.executeRollback(rollbackActions);
            
            // 에러 타입별 로깅
            this.logResolutionFailure({
                resolutionId,
                conflictId: conflictData.id,
                error: {
                    type: error.constructor.name,
                    message: error.message,
                    data: error.data || null
                },
                duration: Date.now() - startTime
            });
            
            // 사용자 친화적 에러 메시지로 변환
            if (error instanceof UnresolvableConflictError) {
                throw new UserFacingError(
                    '편집 충돌이 발생했습니다. 문서를 새로고침한 후 다시 시도해주세요.',
                    { originalError: error, conflictId: conflictData.id }
                );
            } else if (error instanceof NetworkError) {
                throw new UserFacingError(
                    '네트워크 오류로 인해 충돌을 해결할 수 없습니다. 연결을 확인해주세요.',
                    { originalError: error }
                );
            } else {
                throw new UserFacingError(
                    '예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                    { originalError: error, resolutionId }
                );
            }
        }
    }
    
    // 작업 변환 (Operational Transform)
    transformOperations(operations) {
        const transformed = [];
        
        // 작업들을 시간순으로 정렬
        const sortedOps = [...operations].sort((a, b) => 
            new Date(a.timestamp) - new Date(b.timestamp)
        );
        
        for (let i = 0; i < sortedOps.length; i++) {
            let currentOp = { ...sortedOps[i] };
            
            // 이전 작업들과의 상호작용 계산
            for (let j = 0; j < i; j++) {
                const prevOp = transformed[j];
                
                if (this.operationsConflict(currentOp, prevOp)) {
                    currentOp = this.transformAgainst(currentOp, prevOp);
                }
            }
            
            transformed.push(currentOp);
        }
        
        return transformed;
    }
    
    operationsConflict(op1, op2) {
        // 같은 블록에서 위치가 겹치는 경우
        return op1.blockId === op2.blockId &&
               Math.abs(op1.position - op2.position) < 10;
    }
    
    transformAgainst(currentOp, prevOp) {
        const transformed = { ...currentOp };
        
        // 위치 조정 로직
        if (prevOp.type === 'text_insert' && currentOp.position > prevOp.position) {
            // 삽입된 텍스트 길이만큼 위치 조정
            transformed.position += prevOp.content.length;
        } else if (prevOp.type === 'text_delete' && currentOp.position > prevOp.position) {
            // 삭제된 텍스트 길이만큼 위치 조정
            transformed.position -= (prevOp.length || 0);
        }
        
        return transformed;
    }
}

// 3. 히스토리 관리 시스템 (메모리 최적화)
class HistoryManager {
    constructor(maxHistorySize = 100) {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistorySize = maxHistorySize;
        this.snapshots = new Map(); // 주요 버전의 스냅샷
        this.compressionThreshold = 50; // 50개 작업마다 압축
        
        this.setupAutoCleanup();
    }
    
    // 메모리 효율적 히스토리 관리
    addToHistory(operation) {
        // 현재 위치 이후의 히스토리 제거 (새 분기 생성)
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        
        // 새 작업 추가
        this.history.push({
            ...operation,
            timestamp: Date.now(),
            id: this.generateHistoryId()
        });
        
        this.currentIndex = this.history.length - 1;
        
        // 크기 제한 적용
        if (this.history.length > this.maxHistorySize) {
            this.compressOldHistory();
        }
        
        // 주기적 스냅샷 생성
        if (this.history.length % this.compressionThreshold === 0) {
            this.createSnapshot();
        }
    }
    
    // 되돌리기 (복잡한 상태 복원)
    async undo() {
        if (this.currentIndex <= 0) {
            throw new HistoryError('더 이상 되돌릴 수 없습니다.');
        }
        
        try {
            const operationToUndo = this.history[this.currentIndex];
            
            // 작업 타입에 따른 역작업 생성
            const reverseOperation = this.createReverseOperation(operationToUndo);
            
            // 역작업 적용
            await this.applyOperation(reverseOperation);
            
            this.currentIndex--;
            
            return {
                success: true,
                undoneOperation: operationToUndo,
                reverseOperation: reverseOperation,
                canUndo: this.currentIndex > 0,
                canRedo: this.currentIndex < this.history.length - 1
            };
            
        } catch (error) {
            throw new HistoryError(`되돌리기 실패: ${error.message}`, error);
        }
    }
    
    // 다시하기 (상태 복원)
    async redo() {
        if (this.currentIndex >= this.history.length - 1) {
            throw new HistoryError('더 이상 다시 할 수 없습니다.');
        }
        
        try {
            this.currentIndex++;
            const operationToRedo = this.history[this.currentIndex];
            
            // 작업 재적용
            await this.applyOperation(operationToRedo);
            
            return {
                success: true,
                redoneOperation: operationToRedo,
                canUndo: this.currentIndex > 0,
                canRedo: this.currentIndex < this.history.length - 1
            };
            
        } catch (error) {
            this.currentIndex--; // 실패 시 인덱스 복원
            throw new HistoryError(`다시하기 실패: ${error.message}`, error);
        }
    }
    
    // 히스토리 압축 (메모리 절약)
    compressOldHistory() {
        const keepRecent = 20; // 최근 20개는 유지
        const toCompress = this.history.slice(0, -keepRecent);
        
        if (toCompress.length > 0) {
            // 압축된 스냅샷 생성
            const compressedSnapshot = this.createCompressedSnapshot(toCompress);
            
            // 스냅샷 저장
            this.snapshots.set(`compressed_${Date.now()}`, compressedSnapshot);
            
            // 오래된 히스토리 제거
            this.history = this.history.slice(-keepRecent);
            this.currentIndex = Math.max(0, this.currentIndex - toCompress.length);
        }
    }
    
    createReverseOperation(operation) {
        switch (operation.type) {
            case 'text_insert':
                return {
                    type: 'text_delete',
                    blockId: operation.blockId,
                    position: operation.position,
                    length: operation.content.length,
                    deletedContent: operation.content // 복원용
                };
                
            case 'text_delete':
                return {
                    type: 'text_insert',
                    blockId: operation.blockId,
                    position: operation.position,
                    content: operation.deletedContent || ''
                };
                
            case 'format_apply':
                return {
                    type: 'format_remove',
                    blockId: operation.blockId,
                    range: operation.range,
                    format: operation.format,
                    previousFormat: operation.previousFormat // 이전 포맷 정보
                };
                
            case 'format_remove':
                return {
                    type: 'format_apply',
                    blockId: operation.blockId,
                    range: operation.range,
                    format: operation.previousFormat
                };
                
            case 'block_create':
                return {
                    type: 'block_delete',
                    blockId: operation.blockId
                };
                
            case 'block_delete':
                return {
                    type: 'block_create',
                    blockId: operation.blockId,
                    blockType: operation.blockType,
                    content: operation.content,
                    position: operation.position
                };
                
            default:
                throw new HistoryError(`역작업을 생성할 수 없는 작업 타입: ${operation.type}`);
        }
    }
}
```

## 🎮 실습 과제 (마스터 레벨)

### 🟢 **기본 (Basic)**
1. contentEditable 기본 편집기 구현
2. 단순 텍스트 삽입/삭제
3. 기본 포맷팅 (볼드, 이탤릭)

### 🟡 **중급 (Intermediate)**
4. 블록 기반 편집 시스템
5. 되돌리기/다시하기 구현
6. 실시간 자동 저장

### 🔴 **고급 (Advanced)**
7. 다중 사용자 동시 편집
8. 기본 충돌 감지 및 해결
9. 권한 기반 편집 제어

### 🟣 **전문가 (Expert)**
10. Operational Transform 완전 구현
11. 복잡한 에러 처리 및 복구
12. 메모리 최적화된 히스토리 관리

### 🔥 **마스터 (Master)**
13. 완전한 구글 독스 수준 편집기
14. 실시간 100명 동시 편집 지원
15. 모든 엣지 케이스 처리

### 🌟 **레전드 (Legend)**
16. 플러그인 시스템 구현
17. 커스텀 블록 타입 지원
18. 완벽한 접근성 (a11y) 구현

## 📈 최종 목표

이 프로젝트를 완료하면:

- ✅ **JavaScript 마스터** - 모든 고급 기법 완전 숙달
- ✅ **실무 전문가** - 복잡한 실시간 시스템 구현 능력
- ✅ **시니어 개발자** - 아키텍처 설계 및 성능 최적화
- ✅ **기술 리더** - 복잡한 문제 해결 및 팀 리드 가능

## 🚀 시작하기

1. **프로젝트 초기화**: `npm install` 실행
2. **서버 실행**: `json-server --watch data/documents.json --port 3001`
3. **개발 환경**: VS Code + Live Server
4. **디버깅 도구**: Chrome DevTools 완전 활용
5. **성능 측정**: Lighthouse, Performance Monitor

---

**⚡ 최종 도전**: 이것은 **진짜 Google Docs**를 만드는 것과 같은 복잡도입니다!
모든 JavaScript 실력을 총동원해서 도전해보세요.

**🏆 완주하면 당신은 진정한 JavaScript 마스터입니다!**