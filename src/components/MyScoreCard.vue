<template>
  <!-- <div class="container-center-horizontal"> -->
  <div class="scorecard-2 screen">
    <Header />
    <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
    <!-- <view :text89="viewProps.text89" :className="viewProps.className" /> -->
    <!-- 24.12.16 수정 - 폰트 추가 -->
    <div class="scorecard-wrap">
      <div class="title pretendard-bold-log-cabin-38px">스코어 카드</div>
      <div class="frame-7829">
        <div class="record_container">
          <div class="level_box">
            <div class="current_level pretendard-bold-white-18px">현재 내 등급 표시
            </div>
            <!-- 24.12.16 수정 - level-align 추가 -->
            <div class="level-align">
              <div class="level_color" :class="levelColor"></div>
              <div class="level_title pretendard-medium-white-14px">{{ levelTitle }}</div>
            </div>
          </div>
          <div class="score_container">
            <div class="record">
              <div class="best_scrore">
                <div class="b_title pretendard-medium-log-cabin-20px">베스트 기록</div>
                <table>
                  <thead>
                    <tr class="pretendard-medium-log-cabin-16px">
                      <th v-for="(header, index) in TableHeaders" :key="index">
                        {{ header }}
                      </th>
                    </tr>
                  </thead>
                  <!-- 24.12.26 수정 - tbody 수정 -->
                  <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                  <tbody v-if="!bestscore && !Averbestscore && !bestPutt && !AverbestPutt && !bestTee && !AverbestTee">
                    <tr class="pretendard-regular-normal-black-14px">
                      <td colspan="3">데이터가 없습니다.</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr class="pretendard-regular-normal-black-14px">
                      <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        {{ cell }}
                      </td> -->
                      <td>최고 스코어</td>
                      <td>{{ bestscore.toFixed(2) }}타</td>
                      <td>{{ Averbestscore.toFixed(2) }}타</td>
                    </tr>
                    <tr class="pretendard-regular-normal-black-14px">
                      <td>최장 퍼팅거리</td>
                      <td>{{ bestPutt.toFixed(2) }}m</td>
                      <td>{{ AverbestPutt.toFixed(2) }}m</td>
                    </tr>
                    <tr class="pretendard-regular-normal-black-14px">
                      <td>최장 티샷거리</td>
                      <td>{{ bestTee.toFixed(2) }}m</td>
                      <td>{{ AverbestTee.toFixed(2) }}m</td>
                    </tr>
                  </tbody>

                </table>
              </div>
              <div class="avg_record">
                <div class="avg_title pretendard-medium-log-cabin-20px">
                  평균 기록
                  <!-- 24.12.26 수정 - v-model, change 추가 -->
                  <select class="pretendard-regular-normal-granite-gray-14px" v-model="lengths" @change="getScore">
                    <!-- 여기에 직접 옵션을 추가하세요 -->
                    <!-- 24.11.14 수정 - option 변경 -->
                    <!-- <option value="1">전체 경기</option>
                    <option value="2">최근 5경기</option>
                    <option value="3">최근 10경기</option>
                    <option value="4">최근 15경기</option>
                    <option value="5">최근 30경기</option>
                    <option value="6">최근 50경기</option> -->
                    <!-- 24.12.26 수정 - 추가  -->
                    <option v-for="option in lengthOptions" :key="option.value" :value="option.value">{{ option.text }}
                    </option>
                  </select>
                </div>
                <table>
                  <thead>
                    <tr class="pretendard-medium-log-cabin-16px">
                      <th v-for="(header, index) in TableHeaders" :key="index">
                        {{ header }}
                      </th>
                    </tr>
                  </thead>
                  <!-- 24.12.27 수정 - tbody 수정 -->
                  <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                  <tbody v-if="!score && !Averscore && !teeshot && !Averteeshot && !putt && !Averputt">
                    <tr class="pretendard-regular-normal-black-14px">
                      <td colspan="3">데이터가 없습니다.</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <!-- <tr class="pretendard-regular-normal-black-14px" v-for="(row, rowIndex) in AvgTableData"
                      :key="rowIndex">
                      <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        {{ cell }}
                      </td>
                    </tr> -->
                    <tr class="pretendard-regular-normal-black-14px">
                      <td>타수</td>
                      <td>{{ score.toFixed(2) }}타</td>
                      <td>{{ Averscore.toFixed(2) }}타</td>
                    </tr>
                    <tr class="pretendard-regular-normal-black-14px">
                      <td>티샷거리</td>
                      <td>{{ teeshot.toFixed(2) }}m</td>
                      <td>{{ Averteeshot.toFixed(2) }}m</td>
                    </tr>
                    <tr class="pretendard-regular-normal-black-14px">
                      <td>퍼팅거리</td>
                      <td>{{ putt.toFixed(2) }}m</td>
                      <td>{{ Averputt.toFixed(2) }}m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="game">
          <div class="game_tab pretendard-bold-log-cabin-18px">
            <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
              :class="['tab', { active: selectedTab === tab }]" class="pretendard-bold-mine-shaft-18px">
              {{ tab }}
              <!-- 데이터 개수 표시 -->
              <span v-if="tab === '전체 경기'">{{
                totalEntireGameData
              }}</span>
              <span v-if="tab === '일반 경기'">{{
                totalGameCompetitionData
              }}</span>
              <span v-if="tab === '대회 경기'">{{
                totalCompetitionGameData
              }}</span>
            </div>
          </div>
          <div class="game_table">
            <!-- 전체 경기 탭 -->
            <!-- 720px 초과 -->
            <div v-if="selectedTab === '전체 경기'" class="table_box">
              <table class="table">
                <thead>
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th v-for="(header, index) in CTableHeaders" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                  <tr v-if="paginatedEntireGameData.length === 0" class="pretendard-regular-normal-mine-shaft-18px">
                    <td colspan="6">데이터가 없습니다.</td>
                  </tr>
                  <tr v-else class="pretendard-regular-normal-mine-shaft-18px"
                    v-for="(game, rowIndex) in paginatedEntireGameData" :key="rowIndex">
                    <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                      <span @click="openModal(row)">
                        {{ cell }}
                      </span>
                    </td> -->
                    <!-- 24.12.27 수정 - 추가 -->
                    <td>{{ game.date }}</td>
                    <td>{{ game.location }}</td>
                    <td>{{ game.course }}</td>
                    <td>{{ game.holes }}</td>
                    <td> {{ game.totalScore }}</td>
                    <td @click="openModal(game)">상세보기</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 720px 이하 -->
            <div class="game-list" v-if="selectedTab === '전체 경기'">
              <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
              <div v-if="paginatedEntireGameData.length === 0" class="pretendard-regular-normal-mine-shaft-18px" style="text-align: center; padding-top: 10px;">
                데이터가 없습니다.
              </div>
              <div v-else v-for="(game, index) in paginatedEntireGameData" :key="index" class="game-item">
                <div class="game-info">
                  <div class="game-info-title">
                    <h3 class="pretendard-semi-bold-log-cabin-18px">
                      {{ game.location }}
                    </h3>
                    <span class="game-date">{{ game.date }}</span>
                  </div>
                  <div class="game-details">
                    <span class="pretendard-regular-normal-granite-gray-14px">코스
                      <div class="game-info-line"></div>
                      {{ game.course }}
                    </span>
                    <span class="pretendard-regular-normal-granite-gray-14px">홀
                      <div class="game-info-line"></div>
                      {{ game.holes }}
                    </span>
                    <span class="pretendard-regular-normal-granite-gray-14px">타수
                      <div class="game-info-line"></div>
                      {{ game.totalScore }}
                    </span>
                  </div>
                  <button class="score-card-btn pretendard-regular-normal-tuatara-14px" @click="openModal(game)">
                    스코어 카드 보기
                  </button>
                </div>
              </div>
            </div>
            <!-- 일반 경기 탭 -->
            <!-- 720px 초과 -->
            <div v-if="selectedTab === '일반 경기'" class="table_box">
              <table class="table">
                <thead>
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th v-for="(header, index) in CTableHeaders" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                   <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                   <tr v-if="paginatedGameCompetitionData.length === 0" class="pretendard-regular-normal-mine-shaft-18px">
                    <td colspan="6">데이터가 없습니다.</td>
                  </tr>
                  <tr v-else class="pretendard-regular-normal-mine-shaft-18px"
                    v-for="(game, rowIndex) in paginatedGameCompetitionData" :key="rowIndex">
                    <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                      <span @click="openModal(row)">
                        {{ cell }}
                      </span>
                    </td> -->
                    <!-- 24.12.27 수정 - 추가 -->
                    <td>{{ game.date }}</td>
                    <td>{{ game.location }}</td>
                    <td>{{ game.course }}</td>
                    <td>{{ game.holes }}</td>
                    <td> {{ game.totalScore }}</td>
                    <td @click="openModal(game)">상세보기</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 720px 이하 -->
            <div class="game-list" v-if="selectedTab === '일반 경기'">
                <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                <div v-if="paginatedGameCompetitionData.length === 0" class="pretendard-regular-normal-mine-shaft-18px" style="text-align: center; padding-top: 10px;">
                데이터가 없습니다.
              </div>
              <div v-else v-for="(game, index) in paginatedGameCompetitionData" :key="index" class="game-item">
                <div class="game-info">
                  <div class="game-info-title">
                    <h3 class="pretendard-semi-bold-log-cabin-18px">{{ game.location }}</h3>
                    <span class="game-date">{{ game.date }}</span>
                  </div>
                  <div class="game-details">
                    <span class="pretendard-regular-normal-granite-gray-14px">코스 <div class="game-info-line"></div>{{
                      game.course }}</span>
                    <span class="pretendard-regular-normal-granite-gray-14px">홀 <div class="game-info-line"></div>{{
                      game.holes }}</span>
                    <span class="pretendard-regular-normal-granite-gray-14px">타수 <div class="game-info-line"></div>{{
                      game.totalScore }}</span>
                  </div>
                  <button class="score-card-btn pretendard-regular-normal-tuatara-14px" @click="openModal(game)">스코어 카드
                    보기</button>
                </div>
              </div>
            </div>
            <!-- 대회 경기 탭 -->
            <!-- 720px 초과 -->
            <div v-if="selectedTab === '대회 경기'" class="table_box">
              <table class="table">
                <thead>
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th v-for="(header, index) in CTableHeaders" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                   <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                   <tr v-if="paginatedCompetitionGameData.length === 0" class="pretendard-regular-normal-mine-shaft-18px">
                    <td colspan="6">데이터가 없습니다.</td>
                  </tr>
                  <tr v-else class="pretendard-regular-normal-mine-shaft-18px"
                    v-for="(game, rowIndex) in paginatedCompetitionGameData" :key="rowIndex">
                    <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                      <span @click="openModal(row)">
                        {{ cell }}
                      </span>
                    </td> -->
                    <!-- 24.12.27 수정 - 추가 -->
                    <td>{{ game.date }}</td>
                    <td>{{ game.location }}</td>
                    <td>{{ game.course }}</td>
                    <td>{{ game.holes }}</td>
                    <td> {{ game.totalScore }}</td>
                    <td @click="openModal(game)">상세보기</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 720px 이하 -->
            <div class="game-list" v-if="selectedTab === '대회 경기'">
                <!-- 24.12.27 수정 - 데이터가 없습니다 추가  -->
                <div v-if="paginatedCompetitionGameData.length === 0" class="pretendard-regular-normal-mine-shaft-18px" style="text-align: center; padding-top: 10px;">
                데이터가 없습니다.
              </div>
              <div v-else v-for="(game, index) in paginatedCompetitionGameData" :key="index" class="game-item">
                <div class="game-info">
                  <div class="game-info-title">
                    <h3 class="pretendard-semi-bold-log-cabin-18px">
                      {{ game.location }}
                    </h3>
                    <span class="game-date">{{ game.date }}</span>
                  </div>
                  <div class="game-details">
                    <span class="pretendard-regular-normal-granite-gray-14px">코스
                      <div class="game-info-line"></div>
                      {{ game.course }}
                    </span>
                    <span class="pretendard-regular-normal-granite-gray-14px">홀
                      <div class="game-info-line"></div>
                      {{ game.holes }}
                    </span>
                    <span class="pretendard-regular-normal-granite-gray-14px">타수
                      <div class="game-info-line"></div>
                      {{ game.totalScore }}
                    </span>
                  </div>
                  <button class="score-card-btn pretendard-regular-normal-tuatara-14px" @click="openModal(game)">
                    스코어 카드 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 24.12.16 수정 -->
          <!-- 페이징 버튼들 -->
          <div class="pagination-controls" v-show="selectedTab === '전체 경기'">
            <img class="pagination-arrow" @click="prevPage('entire')" :src="arrowLeftImage" :alt="'Previous'"
              :disabled="currentPageEntire === 1" />
            <div class="page-numbers pretendard-medium-log-cabin-16px">
              <!-- 24.12.16 수정 -  totalPagesEntire - visiblePagesEntire 변경 -->
              <div v-for="page in visiblePagesEntire" :key="page" @click="goToPage(page, 'entire')" :class="['page-number',
                { active: currentPageEntire === page },
              ]">
                {{ page }}
              </div>
            </div>
            <img class="pagination-arrow flipped" @click="nextPage('entire')" :src="arrowRightImage" :alt="'Next'"
              :disabled="currentPageEntire === totalPagesEntire" />
          </div>
          <div class="pagination-controls" v-show="selectedTab === '일반 경기'">
            <img class="pagination-arrow" @click="prevPage('game')" :src="arrowLeftImage" :alt="'Previous'"
              :disabled="currentPageGame === 1" />
            <div class="page-numbers  pretendard-medium-log-cabin-16px">
              <!-- 24.12.16 수정 -  totalPagesGame - visiblePagesGame 변경 -->
              <div v-for="page in visiblePagesGame" :key="page" @click="goToPage(page, 'game')" :class="[
                'page-number',
                { active: currentPageGame === page },
              ]">
                {{ page }}
              </div>
            </div>

            <img class="pagination-arrow flipped" @click="nextPage('game')" :src="arrowRightImage" :alt="'Next'"
              :disabled="currentPageGame === totalPagesGame" />

          </div>
          <div class="pagination-controls" v-show="selectedTab === '대회 경기'">
            <img class="pagination-arrow" @click="prevPage('competition')" :src="arrowLeftImage" :alt="'Previous'"
              :disabled="currentPageCompetition === 1" />
            <div class="page-numbers  pretendard-medium-log-cabin-16px">
              <!-- 24.12.16 수정 -  totalPagesCompetition - visiblePagesCompetition 변경 -->
              <div v-for="page in visiblePagesCompetition" :key="page" @click="goToPage(page, 'competition')" :class="[
                'page-number',
                { active: currentPageCompetition === page },
              ]">
                {{ page }}
              </div>
            </div>

            <img class="pagination-arrow flipped" @click="nextPage('competition')" :src="arrowRightImage" :alt="'Next'"
              :disabled="currentPageCompetition === totalPagesCompetition" />
          </div>
        </div>
      </div>
    </div>

    <x-footer />
    <GameScoreCard v-if="isModalVisible" :content="modalData" @closeModal="closeModal" />
  </div>
  <!-- </div> -->
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import GameScoreCard from "./GameScoreCard";

export default {
  name: "MyScoreCard",
  data() {
    return {
      level: 1,
      loginInfo: {},
      bestRecordDt: [],
      tournamentDt: [],
      TableHeaders: ["항목", "내 기록", "등급평균"],
      bestTableData: [], // 베스트 기록
      AvgTableData: [], // 평균 기록
      CTableHeaders: ["일시", "장소", "코스", "홀", "타수", "스코어 카드"],
      gameCompetitionData: [], // 일반 경기
      competitionGameData: [], // 대회 경기
      currentPage: 1,
      selectedTab: "전체 경기",
      itemsPerPage: 5, // 한 페이지당 보여줄 데이터 수
      currentPageEntire: 1,
      currentPageGame: 1,
      currentPageCompetition: 1,
      itemsPerPage: 5,
      tabs: ["전체 경기", "일반 경기", "대회 경기"],
      isModalVisible: false,
      modalData: null,
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      lengths: 5, // 24.12.26 수정 - 추가 : 기본값 5
      // lengths: null, // 기본값: 전체 경기
      lengthOptions: [
        { value: 0, text: '전체 경기' }, 
        { value: 5, text: '최근 5경기' },
        { value: 10, text: '최근 10경기' },
        { value: 15, text: '최근 15경기' },
        { value: 30, text: '최근 30경기' },
        { value: 50, text: '최근 50경기' },
      ], // 24.12.26 수정 - 추가 : 선택할 수 있는 옵션들
      bestscore: null, // 24.12.26 수정 - 추가
      Averbestscore: null, // 24.12.26 수정 - 추가
      bestPutt: null, // 24.12.26 수정 - 추가
      AverbestPutt: null, // 24.12.26 수정 - 추가
      bestTee: null, // 24.12.26 수정 - 추가
      Averteeshot: null, // 24.12.26 수정 - 추가
      AverbestTee: null, // 24.12.27 수정 - 추가
      Averscore: null, // 24.12.27 수정 - 추가
      Averputt: null, // 24.12.27 수정 - 추가
      putt: null, // 24.12.27 수정 - 추가
      score: null, // 24.12.27 수정 - 추가
      teeshot: null, // 24.12.27 수정 - 추가
    };
  },
  components: {
    GameScoreCard,
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  computed: {
    // 24.12.16 수정 - 추가 : '전체 경기' 페이지 번호 계산
    visiblePagesEntire() {
      return this.getVisiblePages(this.currentPageEntire, this.totalPagesEntire);
    },
    // 24.12.16 수정 - '일반 경기' 페이지 번호 계산
    visiblePagesGame() {
      return this.getVisiblePages(this.currentPageGame, this.totalPagesGame);
    },
    // 24.12.16 수정 - '대회 경기' 페이지 번호 계산
    visiblePagesCompetition() {
      return this.getVisiblePages(this.currentPageCompetition, this.totalPagesCompetition);
    },
    levelColor() {
      const colors = ["gold", "silver", "brown", "green", "yellow", "red"];
      return colors[this.level - 1] || "default-color";
    },
    levelTitle() {
      return `${this.level} `;
    },
    // async getBestScore(courseId) {
    //   // `/api/games/tournament-record/{courseId}`
    //   this.bestRecordDt = await taskStore.getTask(
    //     `/api/games/best-record/${courseId}`
    //   );
    //   console.log("this.bestRecordDt : : : : : : ", this.bestRecordDt);
    //   localStorage.setItem("bestRecordDt", JSON.stringify(this.bestRecordDt));
    // },
    // async getGameScore(courseId) {
    //   this.tournamentDt = await taskStore.getTask(
    //     `/api/games/tournament-record/${courseId}`
    //   );
    //   console.log("this.tournamentDt : : : : : : ", this.tournamentDt);
    //   localStorage.setItem("tournamentDt", JSON.stringify(this.tournamentDt));
    // },
    paginatedEntireGameData() {
      const start = (this.currentPageEntire - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return [...this.gameCompetitionData, ...this.competitionGameData]
        .slice(start, end)
      // .map(({ id, date, location, course, holes, totalScore }) => ({
      //   date,
      //   location,
      //   course,
      //   holes, // hole을 먼저 배치
      //   totalScore, // totalscore을 그 다음 배치
      //   detail: "상세보기",// '상세보기' 추가
      // }));
    },
    totalPagesEntire() {
      return Math.ceil(
        (this.gameCompetitionData.length + this.competitionGameData.length) /
        this.itemsPerPage
      );
    },
    paginatedGameCompetitionData() {
      const start = (this.currentPageGame - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.gameCompetitionData
        .slice(start, end)
      // .map(({ id, date, location, course, holes, totalScore }) => ({
      //   date,
      //   location,
      //   course,
      //   holes, // hole을 먼저 배치
      //   totalScore, // totalscore을 그 다음 배치
      //   detail: "상세보기" // '상세보기' 추가
      // }));
    },
    totalPagesGame() {
      return Math.ceil(this.gameCompetitionData.length / this.itemsPerPage);
    },
    paginatedCompetitionGameData() {
      const start = (this.currentPageCompetition - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.competitionGameData
        .slice(start, end)
      // .map(({ id, date, location, course, holes, totalScore }) => ({
      //   date,
      //   location,
      //   course,
      //   holes, // hole을 먼저 배치
      //   totalScore, // totalscore을 그 다음 배치
      //   detail: "상세보기", // '상세보기' 추가
      // }));
    },

    totalPagesCompetition() {
      return Math.ceil(this.competitionGameData.length / this.itemsPerPage);
    },
    totalEntireGameData() {
      return this.gameCompetitionData.length + this.competitionGameData.length;
    },
    totalGameCompetitionData() {
      return this.gameCompetitionData.length;
    },
    totalCompetitionGameData() {
      return this.competitionGameData.length;
    },
  },
  mounted() {
    this.getCompetitionGameDt();
    this.getGameCompetitionDt();
    // this.getbestscore() 
    this.getScore(); //24.12.26 수정 - 추가
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    this.loginInfo = loginInfo || {};
    console.log("초기화된 this.loginInfo:", this.loginInfo);
    if (loginInfo.grade) {
      this.level = loginInfo.grade; // grade 값을 level에 설정
    }
  },
  methods: {
    // 24.12.16 수정 - 추가 : 페이지 범위를 계산하는 함수
    getVisiblePages(currentPage, totalPages) {
      const pageSize = 5; // 최대 5개의 페이지 번호 표시
      const half = Math.floor(pageSize / 2);
      let startPage = Math.max(1, currentPage - half);
      let endPage = startPage + pageSize - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - pageSize + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    // 일반경기
    async getGameCompetitionDt() {
      // 24.12.27 수정 - 추가
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      // 24.12.27 수정 - 추가 : ${loginInfo.id}
      const data = await taskStore.getSelectTasks(`score-cards/list/${loginInfo.id}`);
      // holes와 totalScore에 텍스트 추가
      // if (!data || data.length === 0) {
      //   alert("로그인해주세요.");
      //   this.$router.push("/login"); // 로그인 페이지로 리다이렉트
      //   return;
      // }
      console.log("scorecard : : : 3", JSON.stringify(data));

      this.gameCompetitionData = data
      .filter(item => item.type === "game") // 24.12.27 수정 - 추가 : "game"인 것만 필터링
      .map(item => ({
        ...item,
        holes: `${item.holes}홀`, // '홀' 추가
        totalScore: `${item.totalScore}타`, // '타' 추가
        scorecard: item.scorecard // 24.12.27 수정 - 추가

      }));
      console.log("scorecard : : : 1", this.gameCompetitionData);
    },

    // 대회 경기
    async getCompetitionGameDt() {
      // 24.12.26 수정 - 추가
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      // 24.12.26 수정 - 추가 : ${loginInfo.id}
      const data = await taskStore.getSelectTasks(`score-cards/list/${loginInfo.id}`);
      console.log("scorecard : : : ", data);

      // holes와 totalScore에 텍스트 추가
      this.competitionGameData = data
      .filter(item => item.type === "competition") // 24.12.27 수정 -  추가 : "competition"인 것만 필터링
      .map(item => ({
        ...item,
        holes: `${item.holes}홀`, // '홀' 추가
        totalScore: `${item.totalScore}타`, // '타' 추가
        scorecard: item.scorecard // 24.12.27 수정 - 추가
      }));
      console.log("competitionGameData : : : ", this.competitionGameData);

    },

    async getbestscore() {
      this.bestTableData = await taskStore.getSelectTasks(
        `score-cards/best-record`
      );

      console.log("bestscorecard : : : ", this.bestTableData);
    },
    // 24.12.26 수정 - 추가
    async getScore() {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      console.log('loginInfo.id', loginInfo.id)
      // lengths 값 그대로 쿼리스트링에 추가
      const response = await taskStore.getSelectTasks(`score/${loginInfo.id}?lengths=${this.lengths}`);

      // // lengths가 null이면 lengths 파라미터를 생략
      // const url = this.lengths
      //   ? `score/${loginInfo.id}?lengths=${this.lengths}`
      //   : `score/${loginInfo.id}`; // lengths 없이 전체 요청

      // const response = await taskStore.getSelectTasks(url);

      console.log('loginInfo.id', loginInfo.id)
      console.log('response getScore', response)

      // 응답에서 필요한 데이터를 data 객체에 저장
      if (response) {
        this.bestscore = response.bestscore;
        this.Averbestscore = response.Averbestscore;
        this.bestPutt = response.bestPutt;
        this.AverbestPutt = response.AverbestPutt;
        this.bestTee = response.bestTee;
        this.AverbestTee = response.AverbestTee;
        this.score = response.score;
        this.Averscore = response.Averscore;
        this.putt = response.putt;
        this.Averputt = response.Averputt;
        this.teeshot = response.teeshot;
        this.Averteeshot = response.Averteeshot;
      }
      console.log('response 123', response)
    },
    openModal(game) {
      // localStorage에서 loginInfo를 가져와 username을 추출
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo")) || {};
      const username = loginInfo.name || "익명"; // name이 없으면 기본값으로 '익명'

      // 로그 출력
      console.log("localStorage에서 가져온 loginInfo:", loginInfo);
      console.log("추출한 username:", username);

      // game 데이터와 username을 포함한 modalData 구성
      this.modalData = {
        ...game, // game 데이터 복사
        username, // username 추가
        scorecard: game.scorecard || [], // 24.12.27 수정 - 추가 : scorecard 추가, 없으면 빈 배열
      };

      console.log("11 game:", game);

      // modalData 확인 로그 출력
      console.log("생성된 modalData:", this.modalData);

      this.isModalVisible = true; // 모달 열기
    },
    closeModal() {
      this.isModalVisible = false;
      this.modalData = null;
    },
    prevPage(type) {
      if (type === "entire" && this.currentPageEntire > 1) {
        this.currentPageEntire--;
      } else if (type === "game" && this.currentPageGame > 1) {
        this.currentPageGame--;
      } else if (type === "competition" && this.currentPageCompetition > 1) {
        this.currentPageCompetition--;
      }
    },
    nextPage(type) {
      if (type === "entire" && this.currentPageEntire < this.totalPagesEntire) {
        this.currentPageEntire++;
      } else if (
        type === "game" &&
        this.currentPageGame < this.totalPagesGame
      ) {
        this.currentPageGame++;
      } else if (
        type === "competition" &&
        this.currentPageCompetition < this.totalPagesCompetition
      ) {
        this.currentPageCompetition++;
      }
    },
    goToPage(page, type) {
      if (type === "entire") {
        this.currentPageEntire = page;
      } else if (type === "game") {
        this.currentPageGame = page;
      } else if (type === "competition") {
        this.currentPageCompetition = page;
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.currentPageEntire = 1;
      this.currentPageGame = 1;
      this.currentPageCompetition = 1;
    },
  },
};
</script>

<style scoped src="@/style/record/myscorecard.css"></style>
