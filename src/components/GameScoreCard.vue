<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal_title">
        <h2 class="pretendard-extra-extra-bold-log-cabin-24px">스코어 카드</h2>
        <!-- 24.12.16 수정 - class 명 수정 -->
        <img class="class"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
          alt="material-symbols:close" @click="closeModal" />
      </div>
      <div class="my_card">
        <span class="pretendard-bold-log-cabin-18px">{{ content.username }}님의 스코어카드</span>
      </div>
      <!-- 720px 초과 -->
      <div class="info">
        <table>
          <tr>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">일시</label>
            </th>
            <td class="pretendard-regular-normal-granite-gray-16px">{{ content.date }}</td>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">장소</label>
            </th>
            <td class="pretendard-regular-normal-granite-gray-16px">{{ content.location }}</td>
          </tr>
          <tr>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">코스</label>
            </th>
            <td class="pretendard-regular-normal-granite-gray-16px">{{ content.course }}</td>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">홀</label>
            </th>
            <td class="pretendard-regular-normal-granite-gray-16px">{{ content.holes }}</td>
          </tr>
          <tr>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">타수</label>
            </th>
            <td class="pretendard-regular-normal-granite-gray-16px">{{ content.totalScore }}</td>
            <th>
              <label class="pretendard-semi-bold-log-cabin-18px">플레이어</label>
            </th>
            <!-- 24.12.27 수정 -->
            <td class="pretendard-regular-normal-granite-gray-16px"> {{ content.scorecard.length }}명</td>
          </tr>
        </table>
      </div>
      <!-- 720px 이하 -->
      <div class="react-info">
        <!-- 24.12.16 수정 - 폰트 추가 -->
        <table>
          <tr>
            <th> <label class="pretendard-semi-bold-log-cabin-14px">일시</label></th>
            <td class="pretendard-regular-normal-granite-gray-14px">{{ content.date }}</td>
          </tr>
          <tr>
            <th> <label class="pretendard-semi-bold-log-cabin-14px">장소</label></th>
            <td class="pretendard-regular-normal-granite-gray-14px">{{ content.location }}</td>
          </tr>
          <tr>
            <th class="pretendard-semi-bold-log-cabin-14px">코스</th>
            <td class="pretendard-regular-normal-granite-gray-14px">{{ content.course }}</td>
          </tr>
          <tr>
            <th class="pretendard-semi-bold-log-cabin-14px">홀</th>
            <td class="pretendard-regular-normal-granite-gray-14px">{{ content.holes }}</td>
          </tr>
          <tr>
            <th class="pretendard-semi-bold-log-cabin-14px">타수</th>
            <td class="pretendard-regular-normal-granite-gray-14px">{{ content.totalScore }}</td>
          </tr>
          <tr>
            <th class="pretendard-semi-bold-log-cabin-14px">플레이어</th>
            <!-- 24.12.27 수정 -->
            <td class="pretendard-regular-normal-granite-gray-16px"> {{ content.scorecard.length }}명</td>
          </tr>
        </table>
      </div>
      <!-- 24.12.27 수정 - 추가 -->
      <div class="playing" v-for="(player, playerIndex) in chunks" :key="'player-' + playerIndex">
        <div class="player_name">
          <span class="pretendard-semi-bold-log-cabin-20px">{{ player.playerName }}</span>
        </div>
        <!-- 24.12.16 수정 - playing-table-div 추가  -->

        <!-- <div class="playing-table-div" v-for="(table, tIndex) in tables" :key="tIndex"> -->
        <!-- 24.12.27 수정 -->
        <div class="score-card" v-for="(chunk, chunkIndex) in player.playerChunks" :key="'chunk-' + chunkIndex">
          <table>
            <thead>
              <!-- 24.12.27 수정- 폰트 -->
              <tr class="pretendard-semi-bold-log-cabin-18px">
                <th>Hole</th>
                <!-- <th v-for="i in table.holes" :key="i" class="pretendard-semi-bold-log-cabin-18px">
                  {{ i }}
                </th> -->
                <!-- 24.12.27 수정 -->
                <th v-for="hole in chunk.holes" :key="'hole-' + hole">
                  {{ hole }}
                </th>
                <th>합계</th>
              </tr>
              <!-- 24.12.27 수정- 폰트 -->
              <tr class="pretendard-bold-mine-shaft-18px">
                <th>PAR</th>
                <!-- <th v-for="i in table.holes" :key="i" class="pretendard-bold-mine-shaft-18px">
                  {{ player.par[i - 1] }}
                </th> -->
                <!-- 24.12.27 수정 -->
                <th v-for="(par, parIndex) in chunk.pars" :key="'par-' + parIndex">{{
                  par }}</th>
                <!-- <th class="pretendard-bold-mine-shaft-18px "> -->
                <!-- 1~9까지, 10~18까지의 par 합계 계산 -->
                <!-- {{ calculateParSum(player.par, table.holes) }} -->
                <!-- 24.12.27 수정 -->
                <th>{{ chunk.parSum }}</th>
                <!-- </th> -->
              </tr>
            </thead>
            <tbody>
              <!-- 24.12.16 수정 - 폰트 추가  -->
              <tr class="pretendard-regular-normal-mine-shaft-18px">
                <td>점수</td>
                <!-- <td class="pretendard-regular-normal-mine-shaft-18px" v-for="i in table.holes" :key="i">
                  {{ player.scores[i - 1] }}
                </td> -->
                <!-- 24.12.27 수정 -->
                <td v-for="(score, scoreIndex) in chunk.scores" :key="'score-' + scoreIndex">{{ score }}</td>
                <!-- <td class="pretendard-regular-normal-mine-shaft-18px">{{ calculateTotalWithPar(player.scores,
                  player.par, table.holes) }}</td> -->
                <!-- 24.12.27 수정 -->
                <td>{{ chunk.scoreSum }}</td>
              </tr>
              <tr class="pretendard-regular-normal-mine-shaft-18px">
                <td>퍼트</td>
                <!-- <td class="pretendard-regular-normal-mine-shaft-18px" v-for="i in table.holes" :key="i">
                  {{ player.putts[i - 1] }}
                </td> -->
                <!-- 24.12.27 수정 -->
                <td v-for="(putt, puttIndex) in chunk.putts" :key="'putt-' + puttIndex">{{ putt }}</td>
                <!-- <td class="pretendard-regular-normal-mine-shaft-18px">{{ calculateTotal(player.putts, table.holes) }}
                </td> -->
                <!-- 24.12.27 수정 -->
                <td>{{ chunk.puttSum }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameScoreCard",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      players: this.content.scorecard || [], // 24.12.27 수정 - 추가 : content에서 scorecard 데이터를 받음
      tables: [],
      scorecard: [], // 24.12.27 수정 - 추가 : scorecard 배열을 초기화
      chunks: [], // 24.12.27 수정 - 추가 : 분할된 데이터를 저장할 배열
    };
  },
  created() {
    // console.log("content 데이터:", this.content);
    // if (typeof this.content.holes === 'string') {
    //   const holeCount = parseInt(this.content.holes.replace(/[^0-9]/g, ""), 10);
    //   if (holeCount) {
    //     this.tables = this.generateTables(holeCount);
    //     console.log("생성된 테이블 데이터:", this.tables);
    //   } else {
    //     console.error("holeCount가 유효하지 않습니다:", holeCount);
    //   }
    // } else {
    //   console.error("hole 정보가 문자열이 아닙니다:", this.content.hole);
    // }
    // if (this.content.scorecard.length > 0) {
    //   this.tables = this.splitScorecard();
    //   console.log("분할된 테이블 데이터:", this.tables);
    // } else {
    //   console.error("scorecard 데이터가 없습니다.");
    // }


    // 24.12.27 수정 - 추가
    this.splitScorecard(); // 컴포넌트가 생성되었을 때 데이터 분할 실행
  },
  methods: {
    // 24.12.27 수정 - 추가
    splitScorecard() {
      const chunks = [];
      const chunkSize = 9; // 각 청크 크기 (9홀씩 묶기)

      // 각 플레이어 이름별로 데이터 나누기
      this.content.scorecard.forEach((playerCard) => {
        const playerName = playerCard.name;
        const parArray = playerCard.par || [];
        const scoreArray = playerCard.score || [];
        const puttArray = playerCard.putts || [];

        // 18홀로 제한 (홀은 한 사람당 최대 18홀)
        const maxHoles = 18;
        const parLimited = parArray.slice(0, maxHoles);
        const scoreLimited = scoreArray.slice(0, maxHoles);
        const puttLimited = puttArray.slice(0, maxHoles);

        let playerChunks = [];
        let holeStart = 1; // 홀 번호 시작

        // 각 플레이어의 홀을 chunkSize 단위로 나누기
        for (let i = 0; i < parLimited.length; i += chunkSize) {
          const chunk = parLimited.slice(i, i + chunkSize);
          const scoreChunk = scoreLimited.slice(i, i + chunkSize);
          const puttChunk = puttLimited.slice(i, i + chunkSize);

          // 각 청크가 chunkSize 크기가 안되면 '-'로 채우기
          while (chunk.length < chunkSize) {
            chunk.push('-');
            scoreChunk.push('-');
            puttChunk.push('-');
          }

          // 각 청크의 합 계산
          const parSum = chunk.filter((val) => val !== '-').reduce((a, b) => a + b, 0);
          const scoreSum = scoreChunk.filter((val) => val !== '-').reduce((a, b) => a + b, 0);
          const puttSum = puttChunk.filter((val) => val !== '-').reduce((a, b) => a + b, 0);

          const holes = Array.from({ length: chunk.length }, (_, idx) => holeStart + idx);
          holeStart += chunk.length;

          playerChunks.push({
            playerName: playerName, // 플레이어 이름 추가
            holes: holes,
            pars: chunk,
            scores: scoreChunk,
            putts: puttChunk,
            parSum: parSum,
            scoreSum: scoreSum,
            puttSum: puttSum,
          });
        }

        // 플레이어별 chunks에 추가
        chunks.push({ playerName, playerChunks });
      });

      // 이 부분에서 chunks 값을 this.chunks로 할당하여 반영
      this.chunks = chunks;

      console.log('데이터', chunks);  // 콘솔에 확인하여 chunks 배열 구조를 출력해보기


    },
    // generateTables(holeCount) {
    //   const tables = [];
    //   let start = 1;
    //   while (start <= holeCount) {
    //     const end = Math.min(start + 8, holeCount);
    //     const holes = [];
    //     for (let i = start; i <= end; i++) {
    //       holes.push(i);
    //     }
    //     tables.push({ holes });
    //     start = end + 1;
    //   }
    //   return tables;
    // },
    // calculateTotal(array, holes) {
    //   return array
    //     .slice(holes[0] - 1, holes[holes.length - 1])
    //     .reduce((a, b) => a + b, 0);
    // },
    // calculateTotalWithPar(scores, par, holes) {
    //   const totalScore = scores
    //     .slice(holes[0] - 1, holes[holes.length - 1])
    //     .reduce((a, b) => a + b, 0);
    //   const totalPar = par
    //     .slice(holes[0] - 1, holes[holes.length - 1])
    //     .reduce((a, b) => a + b, 0);
    //   return `${totalScore} (${totalScore + totalPar})`;
    // },
    // calculateParSum(par, holes) {
    //   return par.slice(holes[0] - 1, holes[holes.length - 1]).reduce((a, b) => a + b, 0);
    // },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped src="@/style/record/gamescorecard.css"></style>