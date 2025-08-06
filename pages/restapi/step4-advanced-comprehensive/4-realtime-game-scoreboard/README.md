# 🎮 실시간 게임 스코어보드

## 📋 프로젝트 개요

**실시간 처리**와 **복잡한 상태 동기화**를 마스터하는 최고난이도 실습입니다.
WebSocket 시뮬레이션을 통해 **switch문, for...in, 클로저, 이벤트 위임, 상태 머신** 등을 실전 수준으로 학습합니다.

## 🎯 학습 목표

### 핵심 기술
- ✅ **실시간 데이터 처리** - WebSocket 시뮬레이션 (setInterval 활용)
- ✅ **switch문 마스터** - 복잡한 게임 상태 관리
- ✅ **for...in 고급 활용** - 객체 순회 및 플레이어 데이터 처리
- ✅ **클로저 패턴** - 점수 계산 및 상태 보존
- ✅ **이벤트 위임** - 대량 DOM 이벤트 효율적 처리
- ✅ **상태 머신** - 게임 플로우 제어

### 실시간 시스템
- 🔄 **동시성 처리** - 여러 게임 세션 관리
- ⚡ **실시간 업데이트** - 지연 시간 최소화
- 🎯 **정확성 보장** - 점수 계산 무결성
- 🚀 **확장성** - 수백 명 플레이어 지원

## 📊 데이터 구조

### 게임 세션 (GameSession)
```json
{
  "id": "game_001",
  "name": "Spring Championship 2024",
  "type": "tournament",
  "status": "active",
  "gameMode": "battle_royale",
  "maxPlayers": 100,
  "currentPlayers": 85,
  "startTime": "2024-03-01T19:00:00Z",
  "endTime": null,
  "settings": {
    "matchDuration": 1800,
    "respawnEnabled": false,
    "teamMode": false,
    "pointsPerKill": 10,
    "pointsPerSurvival": 5,
    "bonusMultiplier": 1.5
  },
  "map": "desert_storm",
  "weather": "clear"
}
```

### 플레이어 (Player)
```json
{
  "id": "player_001",
  "username": "ProGamer2024",
  "displayName": "프로게이머",
  "avatar": "avatar_01.png",
  "level": 45,
  "rank": "Diamond",
  "country": "KR",
  "team": null,
  "stats": {
    "totalKills": 1250,
    "totalDeaths": 890,
    "winRate": 0.68,
    "averageScore": 1450,
    "playTime": 125000
  },
  "currentGame": {
    "sessionId": "game_001",
    "joinTime": "2024-03-01T19:02:15Z",
    "status": "alive",
    "position": {"x": 1250, "y": 890},
    "health": 100,
    "armor": 75,
    "kills": 3,
    "assists": 2,
    "score": 45
  }
}
```

## 🚀 실시간 게임 엔진

### 1. 게임 상태 머신 (switch문 마스터리)
```javascript
class GameStateMachine {
    constructor(gameSession) {
        this.gameSession = gameSession;
        this.state = 'waiting';
        this.stateHistory = [];
        this.eventQueue = [];
        this.stateHandlers = new Map();
        
        this.initializeStateHandlers();
        this.startStateMachine();
    }
    
    // 게임 이벤트 처리 (복잡한 switch문)
    handleGameEvent(event) {
        let result = null;
        
        switch (event.type) {
            case 'player_join':
                result = this.handlePlayerJoin(event);
                break;
                
            case 'player_leave':
                result = this.handlePlayerLeave(event);
                break;
                
            case 'player_kill':
                result = this.handlePlayerKill(event);
                break;
                
            case 'player_death':
                result = this.handlePlayerDeath(event);
                break;
                
            case 'player_respawn':
                result = this.handlePlayerRespawn(event);
                break;
                
            case 'zone_update':
                result = this.handleZoneUpdate(event);
                break;
                
            case 'item_pickup':
                result = this.handleItemPickup(event);
                break;
                
            case 'chat_message':
                result = this.handleChatMessage(event);
                break;
                
            case 'admin_action':
                result = this.handleAdminAction(event);
                break;
                
            default:
                console.warn(`처리되지 않은 이벤트 타입: ${event.type}`);
                result = { processed: false, error: 'Unknown event type' };
        }
        
        // 상태별 추가 검증
        switch (this.state) {
            case 'waiting':
                if (!['player_join', 'admin_action'].includes(event.type)) {
                    console.warn(`대기 상태에서 ${event.type} 이벤트는 무시됩니다.`);
                    return { processed: false, reason: 'Invalid state for event' };
                }
                break;
                
            case 'active':
                // 모든 이벤트 허용
                break;
                
            case 'finished':
                if (!['player_leave', 'chat_message', 'admin_action'].includes(event.type)) {
                    return { processed: false, reason: 'Game finished' };
                }
                break;
        }
        
        return result;
    }
    
    // 점수 계산 시스템 (클로저 활용)
    createScoreCalculator(gameSettings) {
        // 클로저로 게임 설정 보존
        const settings = { ...gameSettings };
        let totalPointsAwarded = 0;
        let bonusMultiplier = settings.bonusMultiplier || 1.0;
        
        return {
            // 킬 점수 계산
            calculateKillScore: (killData) => {
                let basePoints = settings.pointsPerKill || 10;
                let multiplier = 1.0;
                
                // 보너스 조건 검사
                if (killData.headshot) multiplier += 0.5;
                if (killData.distance > 200) multiplier += 0.3;
                if (killData.weapon === 'sniper_rifle') multiplier += 0.2;
                
                const finalScore = Math.round(basePoints * multiplier * bonusMultiplier);
                totalPointsAwarded += finalScore;
                
                return {
                    basePoints,
                    multiplier,
                    bonusMultiplier,
                    finalScore,
                    breakdown: {
                        headshot: killData.headshot ? 'x1.5' : '',
                        longRange: killData.distance > 200 ? 'x1.3' : '',
                        weapon: killData.weapon === 'sniper_rifle' ? 'x1.2' : ''
                    }
                };
            },
            
            // 생존 점수 계산
            calculateSurvivalScore: (survivalTime) => {
                const minutesSurvived = Math.floor(survivalTime / 60);
                const basePoints = settings.pointsPerSurvival || 5;
                const survivalScore = minutesSurvived * basePoints * bonusMultiplier;
                
                totalPointsAwarded += survivalScore;
                return Math.round(survivalScore);
            },
            
            // 통계 정보 반환
            getStats: () => ({
                totalPointsAwarded,
                currentMultiplier: bonusMultiplier,
                settings: { ...settings }
            }),
            
            // 멀티플라이어 업데이트
            updateMultiplier: (newMultiplier) => {
                bonusMultiplier = newMultiplier;
            }
        };
    }
}
```

### 2. 플레이어 데이터 관리 (for...in 고급 활용)
```javascript
class PlayerDataManager {
    constructor() {
        this.players = new Map();
        this.playerStats = new Map();
        this.leaderboards = new Map();
        this.updateQueue = [];
    }
    
    // 플레이어 데이터 일괄 업데이트 (for...in 활용)
    updatePlayersData(playersData) {
        const updateResults = {
            updated: 0,
            added: 0,
            errors: []
        };
        
        // for...in으로 객체 순회
        for (const playerId in playersData) {
            if (!playersData.hasOwnProperty(playerId)) continue;
            
            try {
                const playerData = playersData[playerId];
                const existingPlayer = this.players.get(playerId);
                
                if (existingPlayer) {
                    // 기존 플레이어 업데이트
                    this.updateExistingPlayer(playerId, playerData, existingPlayer);
                    updateResults.updated++;
                } else {
                    // 새 플레이어 추가
                    this.addNewPlayer(playerId, playerData);
                    updateResults.added++;
                }
                
                // 통계 업데이트
                this.updatePlayerStatistics(playerId, playerData);
                
                // 리더보드 업데이트 큐에 추가
                this.queueLeaderboardUpdate(playerId);
                
            } catch (error) {
                updateResults.errors.push({
                    playerId,
                    error: error.message
                });
                console.error(`플레이어 ${playerId} 업데이트 실패:`, error);
            }
        }
        
        // 리더보드 일괄 업데이트
        this.processLeaderboardUpdates();
        
        return updateResults;
    }
    
    // 플레이어 검색 및 필터링 (for...in + 복잡한 조건)
    searchPlayers(criteria) {
        const results = [];
        
        // 모든 플레이어 순회
        for (const playerId in this.players) {
            const player = this.players.get(playerId);
            let matches = true;
            
            // 검색 조건 확인 (for...in으로 조건 순회)
            for (const criterion in criteria) {
                if (!criteria.hasOwnProperty(criterion)) continue;
                
                const value = criteria[criterion];
                if (!value) continue; // 빈 조건 무시
                
                switch (criterion) {
                    case 'username':
                        if (!player.username.toLowerCase().includes(value.toLowerCase())) {
                            matches = false;
                        }
                        break;
                        
                    case 'rank':
                        if (player.rank !== value) {
                            matches = false;
                        }
                        break;
                        
                    case 'country':
                        if (player.country !== value) {
                            matches = false;
                        }
                        break;
                        
                    case 'minLevel':
                        if (player.level < parseInt(value)) {
                            matches = false;
                        }
                        break;
                        
                    case 'maxLevel':
                        if (player.level > parseInt(value)) {
                            matches = false;
                        }
                        break;
                        
                    case 'status':
                        if (player.currentGame?.status !== value) {
                            matches = false;
                        }
                        break;
                        
                    case 'team':
                        if (player.team !== value) {
                            matches = false;
                        }
                        break;
                        
                    default:
                        // 커스텀 속성 검색
                        const playerValue = this.getNestedValue(player, criterion);
                        if (!playerValue || !playerValue.toString().toLowerCase()
                            .includes(value.toLowerCase())) {
                            matches = false;
                        }
                }
                
                if (!matches) break; // 조건 불일치 시 즉시 중단
            }
            
            if (matches) {
                results.push({
                    ...player,
                    matchScore: this.calculateMatchScore(player, criteria)
                });
            }
        }
        
        // 관련성 순으로 정렬
        return results.sort((a, b) => b.matchScore - a.matchScore);
    }
    
    // 리더보드 생성 및 관리
    generateLeaderboards() {
        const leaderboards = {
            topScorers: [],
            topKillers: [],
            topSurvivors: [],
            mostImproved: [],
            teamRankings: new Map()
        };
        
        const playerArray = Array.from(this.players.values());
        
        // 점수 기준 리더보드
        leaderboards.topScorers = playerArray
            .filter(p => p.currentGame?.score > 0)
            .sort((a, b) => (b.currentGame?.score || 0) - (a.currentGame?.score || 0))
            .slice(0, 50);
        
        // 킬 기준 리더보드
        leaderboards.topKillers = playerArray
            .filter(p => p.currentGame?.kills > 0)
            .sort((a, b) => (b.currentGame?.kills || 0) - (a.currentGame?.kills || 0))
            .slice(0, 50);
        
        // 팀별 랭킹 (for...in으로 팀 그룹핑)
        const teamGroups = {};
        
        for (const player of playerArray) {
            if (!player.team) continue;
            
            if (!teamGroups[player.team]) {
                teamGroups[player.team] = {
                    teamName: player.team,
                    members: [],
                    totalScore: 0,
                    totalKills: 0,
                    averageLevel: 0
                };
            }
            
            teamGroups[player.team].members.push(player);
            teamGroups[player.team].totalScore += player.currentGame?.score || 0;
            teamGroups[player.team].totalKills += player.currentGame?.kills || 0;
        }
        
        // 팀 통계 계산 (for...in으로 팀 순회)
        for (const teamName in teamGroups) {
            const team = teamGroups[teamName];
            team.averageLevel = team.members.reduce((sum, p) => sum + p.level, 0) / team.members.length;
            team.averageScore = team.totalScore / team.members.length;
            
            leaderboards.teamRankings.set(teamName, team);
        }
        
        return leaderboards;
    }
}
```

### 3. 실시간 업데이트 시스템 (WebSocket 시뮬레이션)
```javascript
class RealtimeGameUpdater {
    constructor(gameStateMachine, playerManager, uiRenderer) {
        this.gameStateMachine = gameStateMachine;
        this.playerManager = playerManager;
        this.uiRenderer = uiRenderer;
        
        this.updateInterval = null;
        this.eventGenerators = [];
        this.isRunning = false;
        this.updateFrequency = 100; // 10fps
        
        this.initializeEventGenerators();
    }
    
    startRealtimeUpdates() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        console.log('🔴 실시간 업데이트 시작');
        
        // 메인 업데이트 루프
        this.updateInterval = setInterval(() => {
            this.processGameUpdates();
        }, this.updateFrequency);
        
        // 이벤트 생성기들 시작
        this.eventGenerators.forEach(generator => generator.start());
    }
    
    processGameUpdates() {
        const startTime = performance.now();
        
        try {
            // 1. 게임 상태 업데이트
            this.gameStateMachine.update();
            
            // 2. 플레이어 데이터 동기화
            this.synchronizePlayerData();
            
            // 3. 실시간 이벤트 처리
            this.processRealtimeEvents();
            
            // 4. UI 업데이트
            this.updateUI();
            
            // 5. 성능 모니터링
            const processingTime = performance.now() - startTime;
            if (processingTime > 50) { // 50ms 이상 소요시 경고
                console.warn(`⚠️ 느린 업데이트 감지: ${processingTime.toFixed(2)}ms`);
            }
            
        } catch (error) {
            console.error('실시간 업데이트 오류:', error);
        }
    }
    
    // 랜덤 게임 이벤트 생성기
    initializeEventGenerators() {
        // 킬 이벤트 생성기
        this.eventGenerators.push({
            start: () => {
                this.killEventInterval = setInterval(() => {
                    this.generateRandomKillEvent();
                }, Math.random() * 5000 + 2000); // 2-7초 간격
            },
            stop: () => clearInterval(this.killEventInterval)
        });
        
        // 플레이어 이동 이벤트 생성기
        this.eventGenerators.push({
            start: () => {
                this.moveEventInterval = setInterval(() => {
                    this.generatePlayerMovements();
                }, 500); // 0.5초 간격
            },
            stop: () => clearInterval(this.moveEventInterval)
        });
        
        // 아이템 획득 이벤트 생성기
        this.eventGenerators.push({
            start: () => {
                this.itemEventInterval = setInterval(() => {
                    this.generateItemEvents();
                }, Math.random() * 3000 + 1000); // 1-4초 간격
            },
            stop: () => clearInterval(this.itemEventInterval)
        });
    }
    
    generateRandomKillEvent() {
        const alivePlayers = Array.from(this.playerManager.players.values())
            .filter(p => p.currentGame?.status === 'alive');
        
        if (alivePlayers.length < 2) return;
        
        const killer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const victim = alivePlayers.filter(p => p.id !== killer.id)
            [Math.floor(Math.random() * (alivePlayers.length - 1))];
        
        const weapons = ['assault_rifle', 'sniper_rifle', 'shotgun', 'pistol', 'grenade'];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        
        const killEvent = {
            id: `kill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'player_kill',
            timestamp: new Date().toISOString(),
            gameId: this.gameStateMachine.gameSession.id,
            data: {
                killerId: killer.id,
                killerName: killer.displayName,
                victimId: victim.id,
                victimName: victim.displayName,
                weapon: weapon,
                headshot: Math.random() < 0.3, // 30% 헤드샷 확률
                distance: Math.random() * 300 + 50, // 50-350m
                position: {
                    x: Math.random() * 2000,
                    y: Math.random() * 2000
                }
            }
        };
        
        // 이벤트 처리
        this.gameStateMachine.handleGameEvent(killEvent);
        
        // UI에 킬 피드 표시
        this.uiRenderer.showKillFeed(killEvent);
    }
}
```

### 4. 대량 DOM 이벤트 관리 (이벤트 위임)
```javascript
class ScoreboardEventManager {
    constructor(containerElement) {
        this.container = containerElement;
        this.eventHandlers = new Map();
        this.activeElements = new Set();
        
        this.setupEventDelegation();
    }
    
    setupEventDelegation() {
        // 단일 이벤트 리스너로 모든 하위 이벤트 처리
        this.container.addEventListener('click', (event) => {
            this.handleClick(event);
        });
        
        this.container.addEventListener('mouseover', (event) => {
            this.handleMouseOver(event);
        });
        
        this.container.addEventListener('mouseout', (event) => {
            this.handleMouseOut(event);
        });
        
        this.container.addEventListener('contextmenu', (event) => {
            this.handleContextMenu(event);
        });
    }
    
    handleClick(event) {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        
        const action = target.dataset.action;
        const playerId = target.dataset.playerId;
        const teamId = target.dataset.teamId;
        
        // 액션별 처리 (switch문 활용)
        switch (action) {
            case 'view-player-details':
                this.showPlayerDetails(playerId);
                break;
                
            case 'spectate-player':
                this.spectatePlayer(playerId);
                break;
                
            case 'mute-player':
                this.togglePlayerMute(playerId);
                break;
                
            case 'report-player':
                this.showReportDialog(playerId);
                break;
                
            case 'view-team':
                this.showTeamDetails(teamId);
                break;
                
            case 'sort-column':
                const column = target.dataset.column;
                const direction = target.dataset.sortDirection || 'desc';
                this.sortScoreboard(column, direction);
                break;
                
            case 'filter-toggle':
                const filter = target.dataset.filter;
                this.toggleFilter(filter);
                break;
                
            case 'refresh-data':
                this.requestDataRefresh();
                break;
                
            default:
                console.warn(`처리되지 않은 액션: ${action}`);
        }
        
        // 이벤트 버블링 방지 (필요한 경우)
        if (target.dataset.stopPropagation === 'true') {
            event.stopPropagation();
        }
    }
    
    // 동적 툴팁 시스템
    handleMouseOver(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipData = target.dataset.tooltip;
        const playerId = target.dataset.playerId;
        
        // 플레이어 정보 기반 동적 툴팁 생성
        if (playerId) {
            const player = this.getPlayerData(playerId);
            if (player) {
                this.showPlayerTooltip(target, player, event);
            }
        } else {
            this.showStaticTooltip(target, tooltipData, event);
        }
    }
    
    // 대량 DOM 요소 생성 최적화
    renderScoreboardRows(players) {
        const fragment = document.createDocumentFragment();
        const startTime = performance.now();
        
        players.forEach((player, index) => {
            const row = this.createPlayerRow(player, index);
            fragment.appendChild(row);
        });
        
        // 기존 내용 교체
        const tbody = this.container.querySelector('.scoreboard-body');
        tbody.innerHTML = '';
        tbody.appendChild(fragment);
        
        const renderTime = performance.now() - startTime;
        console.log(`📊 ${players.length}개 행 렌더링 완료: ${renderTime.toFixed(2)}ms`);
        
        // 새로 생성된 요소들을 활성 요소 세트에 추가
        this.updateActiveElements();
    }
    
    createPlayerRow(player, index) {
        const row = document.createElement('tr');
        row.className = `scoreboard-row ${player.currentGame?.status || 'unknown'}`;
        row.dataset.playerId = player.id;
        row.dataset.index = index;
        
        // 복잡한 플레이어 정보 HTML 생성
        row.innerHTML = `
            <td class="rank-cell">${index + 1}</td>
            <td class="player-cell">
                <div class="player-info">
                    <img src="${player.avatar}" alt="avatar" class="player-avatar">
                    <div class="player-details">
                        <span class="player-name" data-action="view-player-details" 
                              data-player-id="${player.id}" data-tooltip="player-details">
                            ${player.displayName}
                        </span>
                        <span class="player-level">Lv.${player.level}</span>
                        <span class="player-rank rank-${player.rank.toLowerCase()}">${player.rank}</span>
                    </div>
                </div>
            </td>
            <td class="score-cell">
                <span class="current-score">${player.currentGame?.score || 0}</span>
                <span class="score-change ${this.getScoreChangeClass(player)}">
                    ${this.formatScoreChange(player)}
                </span>
            </td>
            <td class="kills-cell">${player.currentGame?.kills || 0}</td>
            <td class="assists-cell">${player.currentGame?.assists || 0}</td>
            <td class="status-cell">
                <span class="status-indicator ${player.currentGame?.status || 'unknown'}">
                    ${this.formatStatus(player.currentGame?.status)}
                </span>
            </td>
            <td class="actions-cell">
                <button data-action="spectate-player" data-player-id="${player.id}" 
                        class="btn-spectate" title="관전하기">👁️</button>
                <button data-action="mute-player" data-player-id="${player.id}" 
                        class="btn-mute" title="음소거">🔇</button>
                <button data-action="report-player" data-player-id="${player.id}" 
                        class="btn-report" title="신고하기">⚠️</button>
            </td>
        `;
        
        return row;
    }
}
```

## 🎮 실습 과제 (실전 난이도)

### 🟢 **기본 (Basic)**
1. 기본 스코어보드 렌더링
2. 단순 상태 변경 (switch문 기초)
3. 플레이어 정보 표시

### 🟡 **중급 (Intermediate)**
4. 실시간 점수 업데이트 (setInterval 활용)
5. 게임 이벤트 처리 (switch문 + for...in)
6. 기본 이벤트 위임

### 🔴 **고급 (Advanced)**
7. 복잡한 상태 머신 구현
8. 클로저 기반 점수 계산 시스템
9. 대량 DOM 이벤트 최적화

### 🟣 **전문가 (Expert)**
10. WebSocket 완벽 시뮬레이션
11. 실시간 리더보드 동기화
12. 메모리 누수 제로 구현

### 🔥 **마스터 (Master)**
13. 1000명 플레이어 동시 처리
14. 실시간 충돌 감지 및 해결
15. 완전한 게임 엔진 구현

## 📈 성능 목표

- ✅ **동시 플레이어**: 500명 이상
- ✅ **업데이트 주기**: 10fps (100ms)
- ✅ **이벤트 처리**: 1ms 이내
- ✅ **메모리 사용량**: 안정적 유지
- ✅ **UI 반응성**: 지연 없음

## 🚀 시작하기

1. **게임 데이터 준비**: `data/game-simulation.json` 확인
2. **서버 실행**: `json-server --watch data/game-simulation.json --port 3001`  
3. **실시간 모니터링**: Performance 탭에서 FPS 확인
4. **메모리 체크**: Memory 탭에서 누수 감시

---

**🔥 도전**: 이 프로젝트는 **실제 게임 서버**와 같은 복잡성을 가집니다!
실시간 처리의 진정한 어려움을 경험해보세요.