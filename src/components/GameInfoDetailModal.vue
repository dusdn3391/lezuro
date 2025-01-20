<template>
    <div class="modal-overlay">
        <div class="game-info-detail-modal-wrap screen">
            <div class="game-info-detail-modal-title">
                <h1
                    class="game-info-detail-modal-title-font valign-text-middle pretendard-extra-extra-bold-log-cabin-24px">
                    스코어 카드</h1>
                <img class="material-symbolsclose-3"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
                    alt="material-symbols:close" @click="closeModal" />
            </div>
            <div class="game-info-detail-modal-content">
                <div class="game-info-detail-modal-content-head">
                    <div class="game-info-detail-modal-content-title-align">
                        <!-- 24.12.26 수정 - 기본이미지 변경, 사용자 프로필 이미지 적용용 -->
                        <img class="game-info-detail-modal-profile-image"
                            :src="selectedUser.profileImage || profileImg" />
                        <!-- 24.12.24 수정 -->
                        <div
                            class="game-info-detail-modal-profile-name valign-text-middle pretendard-bold-log-cabin-18px">
                            {{ selectedUser.name }}님의
                            스코어카드</div>
                    </div>
                </div>
                <div class="game-info-detail-modal-content-body">
                    <div class="game-info-detail-modal-content-info">
                        <!-- 720px 초과 -->
                        <div class="table">
                            <!-- Table data rendering -->
                            <div class="table-item">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        일시
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div class="valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 2024-06-25 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].dates }}
                                    </div>
                                </div>
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        장소
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 서울 레저로 파크 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].location }}
                                    </div>
                                </div>
                            </div>
                            <!-- More table items here -->
                            <div class="table-item">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        코스
                                    </div>
                                </div>
                                <!-- 24.12.26 수정 - v-if 추가 -->
                                <div class="table-item-content">
                                    <div class="valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 레저로 A코스 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].course }}
                                    </div>
                                </div>
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        홀
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div class="valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 9 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ rankingData[0].round }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-item">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        타수
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div class="valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 61 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ rankingData[0].shot }}
                                    </div>
                                </div>
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        플레이어
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 3명 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ selectedUser.name[0].length }}명
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 720px 이하 -->
                        <div class="table-container">
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        일시
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 2024-06-25 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].dates }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        장소
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 서울 레저로 파크 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].location }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        코스
                                    </div>
                                </div>
                                <!-- 24.12.26 수정 - v-if 추가 -->
                                <div class="table-item-content" v-if="courses && courses.length">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 레저로 A코스 -->
                                        <!-- 24.12.27 수정 - 추가 -->
                                        {{ rankingData[0].course }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        홀
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 9 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ rankingData[0].round }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        타수
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 61 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ rankingData[0].shot }}
                                    </div>
                                </div>
                            </div>
                            <div class="table-container-row">
                                <div class="table-item-title">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                                        플레이어
                                    </div>
                                </div>
                                <div class="table-item-content">
                                    <div
                                        class="table-item-title-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
                                        <!-- 3명 -->
                                        <!-- 24.12.26 수정 - 추가 -->
                                        {{ selectedUser.name[0].length }}명
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="score-card-wrapper">
                        <!-- 24.12.26 수정 - 추가 -->
                        <div class="score-card" v-for="(scorecardChunk, chunkIndex) in splitScorecard"
                            :key="'chunk-' + chunkIndex">
                            <table>
                                <thead>
                                    <tr class="sum-font pretendard-semi-bold-log-cabin-18px">
                                        <th>Hole</th>
                                        <!-- 24.12.26 수정 -->
                                        <th v-for="hole in scorecardChunk.holes" :key="'hole-' + hole">
                                            {{ hole }}
                                        </th>
                                        <th>합계</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="par-col pretendard-bold-mine-shaft-18px">
                                        <td>PAR</td>
                                        <!-- 24.12.26 수정 -->
                                        <td v-for="(par, parIndex) in scorecardChunk.pars" :key="'par-' + parIndex">{{
                                            par }}</td>
                                        <!-- <td>{{ totalPar }}</td> -->
                                        <!-- 24.12.26 수정 -->
                                        <td>{{ scorecardChunk.parSum }}</td>
                                    </tr>
                                    <tr class="score-font pretendard-regular-normal-mine-shaft-18px">
                                        <td>점수</td>
                                        <!-- <td v-for="(score, index) in courseName.scores" :key="'score-' + index">{{ score
                                            }}
                                        </td> -->
                                        <!-- 24.12.26 수정 -->
                                        <td v-for="(score, scoreIndex) in scorecardChunk.scores"
                                            :key="'score-' + scoreIndex">{{ score }}</td>
                                        <!-- <td> {{ scoreOverPar }} ({{ totalScore }}) </td> -->
                                        <!-- 24.12.26 수정 -->
                                        <td>{{ scorecardChunk.scoreSum }}</td>
                                    </tr>
                                    <tr class="puts-font pretendard-regular-normal-mine-shaft-18px">
                                        <td>퍼트</td>
                                        <!-- 24.12.26 수정 -->
                                        <td v-for="(putt, puttIndex) in scorecardChunk.putts"
                                            :key="'putt-' + puttIndex">{{ putt }}</td>
                                        <!-- <td v-for="(putt, index) in courseName.putts" :key="'putt-' + index">{{ putt }} -->
                                        <!-- </td> -->
                                        <!-- <td>{{ totalPutts }}</td> -->
                                        <!-- 24.12.26 수정 -->
                                        <td>{{ scorecardChunk.puttSum }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "GameInfoDetailModal",
    data() {
        return {
            profileImg: require("../../img/group-736@2x.png"),
        }
    },
    // 24.12.24 수정 - 추가 
    props: {
        rankingData: {
            type: Array,
            required: true, // RankingData는 필수값
        },
        selectedUser: {
            type: Object,
            required: true, // 선택된 유저 정보는 필수값
        },
        courses: {  // 부모 컴포넌트에서 전달한 courses를 받음
            type: Array,
            required: true, // courses는 필수값
        },
    },

    computed: {
        // 24.12.26 수정 - 추가
        // 9홀 단위로 데이터를 나누기 전에 this.scorecard가 정의되어 있는지 확인
        splitScorecard() {
            const chunkSize = 9; // 9홀씩 나눔
            const chunks = [];
            let holeStart = 1; // 홀 번호 시작

            // scorecard[0].par을 기준으로 9홀씩 나누기
            const parArray = this.rankingData[0].scorecard[0].par || []; // scorecard에서 par 배열을 가져옴
            const scoreArray = this.rankingData[0].scorecard[0].score || []; // score 배열을 가져옴
            const puttArray = this.rankingData[0].scorecard[0].putts || []; // putt 배열을 가져옴

            console.log('parArray', parArray);
            console.log('scoreArray', scoreArray);
            console.log('puttArray', puttArray);

            for (let i = 0; i < parArray.length; i += chunkSize) {
                const chunk = parArray.slice(i, i + chunkSize);
                const scoreChunk = scoreArray.slice(i, i + chunkSize); // 해당 chunk의 점수
                const puttChunk = puttArray.slice(i, i + chunkSize); // 해당 chunk의 퍼트

                // 9홀이 안 될 경우 빈 데이터를 채움
                while (chunk.length < chunkSize) {
                    chunk.push('-'); // 빈 데이터를 채움
                    scoreChunk.push('-'); // 점수도 빈 값으로 채움
                    puttChunk.push('-'); // 퍼트도 빈 값으로 채움
                }

                // 각 청크의 합계를 계산
                const parSum = chunk.filter(val => val !== '-').reduce((a, b) => a + b, 0);
                const scoreSum = scoreChunk.filter(val => val !== '-').reduce((a, b) => a + b, 0);
                const puttSum = puttChunk.filter(val => val !== '-').reduce((a, b) => a + b, 0);

                // 홀 번호 생성
                const holes = Array.from({ length: chunk.length }, (_, i) => holeStart + i);
                holeStart += chunk.length; // 다음 청크의 시작 번호 조정

                // 홀, PAR, 점수, 퍼트 데이터를 각각 추출하여 반환
                chunks.push({
                    holes: holes, // 생성된 홀 번호
                    pars: chunk, // 실제 PAR 값을 사용
                    scores: scoreChunk, // 실제 점수를 사용
                    putts: puttChunk, // 실제 퍼트를 사용
                    parSum: parSum, // 합계 추가
                    scoreSum: scoreSum,
                    puttSum: puttSum,
                });
            }

            console.log('chunks', chunks);
            return chunks;
        },

        totalPar() {
            // return this.courseName.pars.reduce((sum, par) => sum + par, 0);
            // 24.12.26 수정 - 추가
            // // rankingData가 존재하고 par 배열이 있는 경우 합산
            if (this.rankingData.length > 0 && this.rankingData[0].scorecard[0] && Array.isArray(this.rankingData[0].scorecard[0].par)) {
                return this.rankingData[0].scorecard[0].par.reduce((sum, par) => sum + (parseInt(par) || 0), 0);
            }
            // 데이터가 없을 경우 기본값 0 반환
            return 0;
        },
        totalScore() {
            // return this.courseName.scores.reduce((sum, score) => sum + score, 0);
            // 24.12.26 수정 - 추가
            // // rankingData가 존재하고 score 배열이 있는 경우 합산
            if (this.rankingData.length > 0 && this.rankingData[0].scorecard[0] && Array.isArray(this.rankingData[0].scorecard[0].score)) {
                return this.rankingData[0].scorecard[0].score.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
            }
            // 데이터가 없을 경우 기본값 0 반환
            return 0;
        },
        scoreOverPar() {
            return this.totalPar + this.totalScore;
        },
        totalPutts() {
            // return this.courseName.putts.reduce((sum, putt) => sum + putt, 0);
            // 24.12.26 수정 - 추가
            // rankingData가 존재하고, putts 배열이 있는 경우 합산
            if (this.rankingData.length > 0 && this.rankingData[0].scorecard[0] && Array.isArray(this.rankingData[0].scorecard[0].putts)) {
                return this.rankingData[0].scorecard[0].putts.reduce((sum, putt) => sum + (parseInt(putt) || 0), 0);
            }
            // 데이터가 없을 경우 기본값 0 반환
            return 0;
        },
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Emit close event to parent to hide the modal
        },
    },
};
</script>

<style scoped src="@/style/game/gameinfodetailmodal.css" />
