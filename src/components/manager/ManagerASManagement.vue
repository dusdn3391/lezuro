<template>
    <div class="all">
        <ManagerHeader />
        <div class="wrap">
            <div class="as-container">
                <ManagerNavbar />
                <div class="wrapper">
                    <!-- 타이틀 부분 -->
                    <div class="title-box">
                        <div class="pretendard-bold-normal-black-28px">A/S 관리</div>
                    </div>
                    <!-- Select box 부분 -->
                    <div class="search-box">
                        <div class="date-search">
                            <span class="date pretendard-regular-normal-mine-shaft-18px">날짜검색</span>
                            <!-- 24.12.09 수정 - 추가 -->
                            <div v-for="dateTab in dateTabs" :key="dateTab"
                                :class="['datetab-btn pretendard-regular-normal-mine-shaft-16px', { active: selectedDateTab === dateTab }]"
                                @click="selectDateTab(dateTab)">
                                {{ dateTab }}
                            </div>
                            <!-- 날짜 선택 부분 -->
                            <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate" /> -->
                            <!-- 24.12.09 수정 - 추가 : max, change-->
                            <input type="date" class="date pretendard-regular-normal-mine-shaft-18px"
                                v-model="selectedDate.start" @change="validateStartDate" :max="today" />
                            ~
                            <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate" /> -->
                            <!-- 24.12.09 수정 - 추가 : max, change-->
                            <input type="date" class="date pretendard-regular-normal-mine-shaft-18px"
                                v-model="selectedDate.end" @change="validateEndDate" :max="today" />
                        </div>
                        <div class="store-search">
                            <span class="date pretendard-regular-normal-mine-shaft-18px">A/S검색</span>
                            <!-- select box -->
                            <select class="pretendard-regular-normal-mine-shaft-18px">
                                <option value="asDetails">제목</option>
                            </select>

                            <!-- 검색어 입력 input 박스 -->
                            <div class="search-container">
                                <input type="text" class="search-input pretendard-regular-normal-mountain-mist-18px"
                                    v-model="searchQuery" placeholder="검색어를 입력해주세요" />
                                <img src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                                    alt="searchBtn" />
                            </div>
                        </div>
                    </div>

                    <div class="list-box">
                        <div class="list-box-btn">
                            <div class="pretendard-bold-log-cabin-24px">A/S 리스트</div>
                            <div>
                                <button class="delete-btn pretendard-semibold-mountain-mist-16px"
                                    @click="deleteSelected">
                                    선택 삭제
                                </button>
                                <button class="add-btn pretendard-semibold-mountain-mist-16px" @click="addAS">
                                    A/S 추가
                                </button>
                            </div>
                        </div>
                        <!-- 룸 리스트 부분 -->
                        <div class="as-list-box">
                            <div class="tabs">
                                <button v-for="tab in tabs" :key="tab" :class="[
                                    'tab-btn pretendard-semibold-mountain-mist-16px',
                                    { active: selectedTab === tab },
                                ]" @click="selectTab(tab)">
                                    {{ tab }}
                                    <span :style="{ color: selectedTab === tab ? 'white' : 'blue' }">
                                        {{ statusCounts[tab.replace(" 내역", "")] }}
                                    </span>
                                </button>
                            </div>
                            <div class="course-list">
                                <div class="table-container">
                                    <table>
                                        <thead>
                                            <tr class="pretendard-bold-mine-shaft-18px">
                                                <th>
                                                    <input type="checkbox" v-model="isAllSelected"
                                                        @change="toggleSelectAll" />
                                                </th>
                                                <th>번호</th>
                                                <th>AS 신청 내역</th>
                                                <th>접수일시</th>
                                                <th>진행상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list, index) in paginatedItems" :key="index"
                                                class="pretendard-semibold-mountain-mist-16px">
                                                <td class="pretendard-regular-normal-granite-gray-18px">
                                                    <input type="checkbox" v-model="selectedItems" :value="list.id" />
                                                </td>
                                                <td class="pretendard-regular-normal-granite-gray-18px"
                                                    @click="toGoAsDetail(list)">
                                                    <!-- {{ lists.length - ((currentPage - 1) * itemsPerPage + index) }} -->
                                                    {{ list.id }}
                                                </td>
                                                <td class="pretendard-regular-normal-granite-gray-18px"
                                                    @click="toGoAsDetail(list)">
                                                    <!-- 24.12.03 수정 - descrition을 title로 수정 -->
                                                    {{ list.title }}
                                                </td>
                                                <td class="pretendard-regular-normal-granite-gray-18px"
                                                    @click="toGoAsDetail(list)">
                                                    {{ list.requestedAt.split('T')[0] }}

                                                </td>
                                                <td class="pretendard-regular-normal-granite-gray-18px"
                                                    @click="toGoAsDetail(list)">
                                                    <span :class="statusClass(list.status)">{{
                                                        list.status
                                                        }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="pagination-controls">
                                        <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage"
                                            :alt="'Previous'" :class="{ disabled: currentPage === 1 }" />
                                        <div class="page-numbers pretendard-medium-log-cabin-16px">
                                            <!-- 24.12.09 수정 - 추가 -->
                                            <div v-for="page in visiblePages" :key="page" :class="[
                                                'page-number',
                                                { active: page === currentPage },
                                            ]" @click="goToPage(page)">
                                                {{ page }}
                                            </div>
                                        </div>
                                        <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage"
                                            :alt="'Next'" :class="{ disabled: currentPage === totalPages }" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { managerStore } from '../../store/managerStore';  // API 호출
import ManagerHeader from './ManagerHeader.vue';
import ManagerNavbar from "./ManagerNavbar.vue";

export default {
    name: "ManagerASManagement",
    components: {
        ManagerHeader,
        ManagerNavbar,
    },
    data() {
        return {
            selectedDate: {
                start: '',
                end: '',
            },
            // 24.12.09 수정 - 추가
            selectedDateTab: "전체",
            // 24.12.09 수정 - 추가
            dateTabs: ["전체"],
            selectedTab: "전체 내역",
            tabs: ["전체 내역", "진행중", "취소", "접수", "완료"],
            selectedStore: "",
            selectedAsDetails: "",
            searchQuery: "",
            selectedItems: [],
            lists: [
            ],
            arrowLeftImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
            arrowRightImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
            currentPage: 1,
            itemsPerPage: 5, // Display 6 courses per page
        };
    },
    computed: {
        // 24.12.09 수정 - 추가 : 오늘날짜 계산
        today() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        // 24.12.09 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
        visiblePages() {
            const totalPages = this.totalPages;
            const currentPage = this.currentPage;
            const maxVisiblePages = 5;

            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = startPage + maxVisiblePages - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        },
        totalPages() {
            return Math.ceil(this.filteredLists.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredLists.slice(start, start + this.itemsPerPage);
        },
        filteredLists() {
            let result = this.lists;

            // 매장 검색 필터
            if (this.selectedStore) {
                result = result.filter((list) => list.title === this.selectedStore);
            }

            // 제목 검색 필터
            if (this.selectedAsDetails) {
                result = result.filter((list) => list.description === this.selectedAsDetails);
            }

            // 검색어 필터
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(
                    (list) =>
                        list.description.toLowerCase().includes(query) ||
                        list.title.toLowerCase().includes(query)
                );
            }

            // 날짜 검색 필터
            if (this.selectedDate.start && this.selectedDate.end) {
                const startDate = new Date(this.selectedDate.start);
                let endDate = new Date(this.selectedDate.end);

                // endDate가 선택된 경우, 시간을 23:59:59로 설정
                endDate.setHours(23, 59, 59, 999);

                result = result.filter(
                    (list) =>
                        new Date(list.requestedAt) >= startDate && new Date(list.requestedAt) <= endDate
                );
            } else if (this.selectedDate.start) {
                // startDate만 있을 경우 필터링
                const startDate = new Date(this.selectedDate.start);
                result = result.filter((list) => new Date(list.requestedAt) >= startDate);
            } else if (this.selectedDate.end) {
                // endDate만 있을 경우 필터링, 시간을 23:59:59로 설정
                const endDate = new Date(this.selectedDate.end);
                endDate.setHours(23, 59, 59, 999);
                result = result.filter((list) => new Date(list.requestedAt) <= endDate);
            }

            // 탭 필터
            if (this.selectedTab !== "전체 내역") {
                result = result.filter((list) => list.status === this.selectedTab);
            }

            // 24.12.09 수정 - 추가
            // 전체 탭이 선택되었으면 모든 데이터를 반환
            if (this.selectedDateTab === "전체") {
                return result;
            }

            // 24.12.09 수정 - 추가
            // 날짜 검색 필터
            if (this.selectedDate.start || this.selectedDate.end) {
                const startDate = this.selectedDate.start ? new Date(this.selectedDate.start) : null;
                const endDate = this.selectedDate.end ? new Date(this.selectedDate.end) : null;

                result = result.filter((list) => {
                    const createdAt = new Date(list.createdAt);
                    if (startDate && createdAt < startDate) return false; // 시작 날짜 이전 데이터 제외
                    if (endDate && createdAt > endDate) return false; // 종료 날짜 이후 데이터 제외
                    return true;
                });
            }
            return result;
        },
        // 상태별 항목 수 계산
        statusCounts() {

            return {
                전체: this.lists.length,
                진행중: this.lists.filter((list) => list.status === "진행중").length,
                취소: this.lists.filter((list) => list.status === "취소").length,
                접수: this.lists.filter((list) => list.status === "접수").length,
                완료: this.lists.filter((list) => list.status === "완료").length,
            };
        },
        isAllSelected: {
            get() {
                if (this.paginatedItems.length === 0) return false;
                return this.paginatedItems.every((item) =>
                    this.selectedItems.includes(item.id)
                );
            },
            set(value) {
                if (value) {
                    const newSelections = this.paginatedItems
                        .map((item) => item.id)
                        .filter((id) => !this.selectedItems.includes(id));
                    this.selectedItems = [...this.selectedItems, ...newSelections];
                } else {
                    const toRemove = this.paginatedItems.map((item) => item.id);
                    this.selectedItems = this.selectedItems.filter(
                        (id) => !toRemove.includes(id)
                    );
                }
            },
        },
    },
    mounted() {
        this.getAS()
    },
    // 24.12.09 수정 - 추가
    watch: {
        filteredLists() {
            this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
        },
    },
    methods: {
        // 24.12.09 수정 - 추가
        selectDateTab(dateTab) {
            this.selectedDateTab = dateTab;
            if (dateTab === "전체") {
                // 전체를 선택하면 날짜 초기화
                this.selectedDate.start = "";
                this.selectedDate.end = "";
            }
        },
        // 24.12.09 수정 - 추가
        validateStartDate() {
            const today = new Date();
            if (new Date(this.selectedDate.start) > today) {
                alert("오늘 이후의 날짜는 선택할 수 없습니다.");
                this.selectedDate.start = ""; // 초기화
            } else if (this.selectedDate.end && new Date(this.selectedDate.start) > new Date(this.selectedDate.end)) {
                alert("시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
                this.selectedDate.start = ""; // 초기화
            }
            this.selectedDateTab = ""; // 전체 탭 해제
        },
        // 24.12.09 수정 - 추가
        validateEndDate() {
            const today = new Date();
            if (new Date(this.selectedDate.end) > today) {
                alert("오늘 이후의 날짜는 선택할 수 없습니다.");
                this.selectedDate.end = ""; // 초기화
            } else if (this.selectedDate.start && new Date(this.selectedDate.end) < new Date(this.selectedDate.start)) {
                alert("종료 날짜는 시작 날짜보다 이를 수 없습니다.");
                this.selectedDate.end = ""; // 초기화
            }
            this.selectedDateTab = ""; // 전체 탭 해제
        },
        async getAS() {
            try {
                // API 데이터 요청
                const response = await managerStore.getTask(`as-requests`);
                console.log("response as", response);

                // 로컬 스토리지에서 managerInfo 가져오기
                const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));

                // managerInfo가 없는 경우 에러 처리
                if (!managerInfo) {
                    console.error("managerInfo 없음");
                    return;
                }

                // managerTokenId 추출
                const managerTokenId = managerInfo.id;
                console.log('managerTokenId', managerTokenId);

                // managerTokenId와 일치하는 branch.managerid 필터링
                const filteredBranches = response.filter(as => as.branch?.managerid == managerTokenId);

                console.log('Filtered Branches:', filteredBranches);

                // branch.id가 특정 ID(예: 첫 번째 데이터의 ID)와 일치하는 데이터 필터링
                if (filteredBranches.length > 0) {
                    const branchId = filteredBranches[0].branch?.id; // 첫 번째 데이터의 branch.id 추출
                    console.log('branchId', branchId);

                    const filteredAS = filteredBranches.filter(as => as.branch?.id === branchId);

                    console.log("filteredAS:", filteredAS);

                    // 필요한 데이터만 저장
                    this.lists = filteredAS;
                } else {
                    this.lists = [];
                }
            } catch (error) {
                console.error("Error fetching AS data:", error);
            }
        },
        addAS() {
            this.$router.push({ path: "/manageras-write" });
        },
        selectTab(tab) {
            this.selectedTab = tab;
            this.currentPage = 1; // 탭 선택 시 페이지를 초기화
        },
        statusClass(status) {
            if (status === "접수") return "status-reception";
            if (status === "진행중") return "status-processing";
            if (status === "취소") return "status-hold";
            if (status === "완료") return "status-complete";
            return "";
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        goToPage(page) {
      // this.currentPage = page;
      // 24.12.09 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
        toggleSelectAll() {
            if (this.isAllSelected) {
                this.selectedItems = this.paginatedItems.map((item) => item.id);
            } else {
                this.selectedItems = [];
            }
        },
        async deleteSelected() {
            if (this.selectedItems.length === 0) {
                alert("삭제할 항목을 선택해주세요.");
                return;
            }

            if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
                for (var i = 0; i < this.selectedItems.length; i++) {
                    const deleteDt = await managerStore.deleteTask(`as-requests/${this.selectedItems[i]}`);
                }
                console.log('this.selectedItems  : : ', this.selectedItems)
                this.lists = this.lists.filter(
                    (list) => !this.selectedItems.includes(list.number)
                );
                this.selectedItems = [];
                console.log('this.selectedItems  : : ', this.selectedItems)

                // 페이지가 삭제 후 총 페이지 수보다 클 경우 현재 페이지를 조정
                if (this.currentPage > this.totalPages) {
                    this.currentPage = this.totalPages || 1;
                }
                this.getAS()

            }
        },
        search() {
            // 검색 버튼 클릭 시 페이지를 첫 페이지로 이동
            this.currentPage = 1;
        },
        toGoAsDetail(item) {
            // Step 1: 클릭된 항목의 전체 정보와 ID 출력
            console.log("Step 1: 클릭된 A/S 항목", item);
            console.log("Step 1: 선택된 A/S 항목 ID:", item.id);

            if (item.id) {
                // Step 2: 라우터 이동 전 ID 출력
                console.log("Step 2: 라우터 이동 준비, ID:", item.id);

                // 라우터로 페이지 이동
                this.$router.push({
                    path: "/manageras-detail",
                    query: { id: item.id }
                });

                // Step 3: 라우터 이동 후 출력 (라우터의 beforeEach 훅에서 확인 가능)
                console.log("Step 3: 라우터 이동 완료");
            } else {
                console.error("Step 1: 항목에 ID가 없습니다:", item);
            }
        },
    },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.as-container {
    background-color: #f5f6f6;
    display: flex;
    height: 100%;
    width: 100%;
    /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
    flex-direction: row;
}

/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}

/* 타이틀 박스 */
.title-box {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
}

/* search-box */
.search-box {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 190px;
    width: 100%;
}


.date-search {
    display: flex;
    align-items: center;
    /* 24.12.09 수정 - 추가 */
    gap: 10px;
}

.date-search input {
    width: 17%;
    height: 60px;
    border: 1px solid #ddd;
    /* 24.12.09 수정 - margin 삭제 */
    /* margin: 12px; */
    padding: 0 20px;
}

/* 24.12.09 수정 - 추가*/
.datetab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 16px 30px;
  border: 1px solid #ddd;
  gap: 10px;
  background-color: #fff;
}

/* 24.12.09 수정 */
.datetab-btn.active,
.tab-btn.active {
  background-color: #184199;
  color: #fff;
}

.store-search {
    width: 100%;
    display: flex;
    align-items: center;
}

select {
    align-items: center;
    background-color: var(--blackwhitewhite);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    width: 17%;
    border: 1px solid #ddd;
    margin: 12px;
}

.search-container {
    width: 73%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 60px;
    justify-content: space-between;
}

.search-container img {
    height: 24px;
    position: relative;
    width: 24px;
    text-align: right;
}

.search-input {
    border: none;
    outline: none;
    padding: 10px;
    width: 300px;
}

/* 리스트 박스 */
.list-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    padding: 30px;
}

.list-box h4 {
    margin-bottom: 10px;
}

.list-box-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add-btn {
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: 150px;
    height: 45px;
    border: none;
    background-color: #184199;
    color: #fff;
}

.delete-btn {
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: 150px;
    height: 45px;
    border: none;
    background-color: #ccc;
    color: #fff;
    margin-right: 10px;
}

.table-container {
    background-color: #fff;
    width: 100%;
    overflow-x: auto;
}

.course-list {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 26px 0px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

th {
    background-color: #f5f5f5;
}

/* 방 리스트 박스 */
.as-list-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    background-color: #fff;
    padding: 30px;
}

.tabs {
    background-color: #fff;
    height: 45px;
}

.tab-btn {
    flex: 1;
    padding: 15px;
    text-align: center;
    border: none;
    background-color: #f5f5f5;
    cursor: pointer;
    width: 150px;
}

.tab-btn.active {
    background-color: #003399;
    color: #fff;
}

/* 테이블 스타일 */
.table-container {
    background-color: #fff;
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 26px 0px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

th {
    background-color: #f5f5f5;
}

/* 상태 - 접수 */
.status-reception,
.status-processing,
.status-hold,
.status-complete {
    color: #14b655;
    border: 1px solid #14b655;
    width: 80px;
    padding: 11px 0px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
}

/* 상태 - 진행중 */
.status-processing {
    color: #d30f1a;
    border: 1px solid #d30f1a;
}

/* 상태 - 취소 */
.status-hold {
    color: #999999;
    border: 1px solid #999999;
}

/* 상태 - 완료 */
.status-complete {
    color: #184199;
    border: 1px solid #184199;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.page-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.page-number {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #eeeeee;
    cursor: pointer;
}

.page-number.active {
    background-color: #d30f1a;
    color: white;
}

.page-number:hover {
    background-color: #eeeeee;
}

.pagination-arrow {
    cursor: pointer;
}

.pagination-arrow.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-arrow.flipped {
    transform: rotate(180deg);
}
</style>
