<template>
    <div class="all">
        <AdminHeader />
        <div class="wrap">
            <div class="admin-management-container">
                <AdminNavbar />
                <div class="wrapper">
                    <!-- 타이틀 부분 -->
                    <div class="title-box">
                        <h2 class="pretendard-bold-normal-black-28px">장비 관리</h2>
                    </div>

                    <div class="search_box">
                        <div class="select_box_1">
                            <!-- 대회이름을 선택할 수 있는 select box -->
                            <select class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                                <option value="branchName">매장이름</option>
                            </select>
                        </div>
                        <div class="select_box_2">
                            <!-- 검색어 입력 필드 -->
                            <input type="text" class="pretendard-regular-normal-mountain-mist-18px"
                                placeholder="매장명을 입력하세요" v-model="searchQuery" />
                            <img class="search-btn-10"
                                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                                alt="searchBtn" />
                        </div>
                    </div>

                    <!-- 장비 추가 -->
                    <div class="table-container">
                        <div class="machine_title">
                            <div class="list_title pretendard-bold-log-cabin-24px">
                                매장 장비 리스트
                            </div>
                            <div class="list_button">
                                <button class="pretendard-regular-normal-mine-shaft-16px" @click="deleteSelected">
                                    선택 삭제
                                </button>
                                <!-- 24.11.18 수정 -->
                                <button class="pretendard-regular-normal-mine-shaft-16px" @click="openModal(mode)">
                                    장비 추가
                                </button>
                            </div>
                        </div>
                        <!-- 24.12.03 수정 - 스크롤 추가 -->
                        <div class="equipment-table-wrapper">
                            <table class="equipment-table">
                                <thead>
                                    <tr class="pretendard-bold-mine-shaft-18px">
                                        <th>
                                            <input type="checkbox" @click="toggleAll" v-model="isAllSelected" />
                                        </th>
                                        <th>매장</th>
                                        <th>키오스크</th>
                                        <th>카메라센서</th>
                                        <th>빔 프로젝트</th>
                                        <th>오토티업기</th>
                                        <th>티 브러쉬</th>
                                        <th>타석매트</th>
                                        <!-- 24.12.03 수정 - 추가 -->
                                        <th>추가장비</th>
                                        <!-- <th v-for="(detail, index) in equipmentDetailsHeaders" :key="'header-' + index">
                                            {{ detail }}
                                        </th> -->
                                        <!-- <th class="pretendard-light-granite-gray-16px" v-for="a in machine.equipmentDetails">
                                            {{ a.title }}
                                        </th> -->

                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <!-- <tbody>
                                <tr v-for="machine in filteredItems" :key="machine.id"
                                    class="pretendard-light-granite-gray-16px">
                                    <td>
                                        <input type="checkbox" v-model="selectedMachine" :value="machine" />
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.branchName }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.kiosk }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.cameraSensor }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.beamProjector }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.autoTeeUp }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.teeBrush }}
                                    </td>
                                    <td class="pretendard-light-granite-gray-16px">
                                        {{ machine.targetMat }}
                                    </td>
                                    <td>
                                        <button class="game-list-btn pretendard-semi-bold-log-cabin-14px"
                                            @click="openModal(machine)">
                                            수정
                                        </button>
                                    </td>
                                </tr>
                            </tbody> -->
                                <tbody>
                                    <tr v-for="machine in paginatedItems" :key="machine.id"
                                        class="pretendard-light-granite-gray-16px">
                                        <td>
                                            <input type="checkbox" v-model="selectedMachine" :value="machine" />
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.branchName }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.kiosk }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.cameraSensor }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.beamProjector }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.autoTeeUp }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.teeBrush }}
                                        </td>
                                        <td class="pretendard-light-granite-gray-16px">
                                            {{ machine.targetMat }}
                                        </td>
                                        <!-- 24.12.03 수정 - 추가 -->
                                        <td class="pretendard-light-granite-gray-16px">
                                            <div v-if="machine.equipmentDetails && machine.equipmentDetails.length">
                                                <div v-for="(detail, index) in machine.equipmentDetails" :key="index">
                                                    {{ detail.title }} [ {{ detail.num }} ]
                                                </div>
                                            </div>
                                            <div v-else>-</div>
                                        </td>
                                        <!-- <td v-for="(header, idx) in equipmentDetailsHeaders" :key="'header-' + idx">
                                            {{ (machine.equipmentDetails && machine.equipmentDetails[idx]) ?
                                                machine.equipmentDetails[idx].num : '-' }}
                                        </td>
                                        <td v-if="!(machine.equipmentDetails && machine.equipmentDetails.length > 0)"
                                            v-for="n in equipmentDetailsHeaders.length" :key="'empty-cell-' + n"
                                            class="pretendard-light-granite-gray-16px">
                                            -
                                        </td> -->
                                        <!-- <td class="pretendard-light-granite-gray-16px" v-for="a in machine.equipmentDetails">
                                        {{ a.num }}
                                    </td> -->
                                        <td>
                                            <!-- 24.11.18 수정 -->
                                            <button class="game-list-btn pretendard-semi-bold-log-cabin-14px"
                                                @click="openModal(mode, machine)">
                                                수정
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div class="pagination-controls">
                            <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                                :class="{ disabled: currentPage === 1 }" />
                            <div class="page-numbers pretendard-medium-log-cabin-16px">
                                <!-- 24.12.04 수정 - 추가 -->
                                <div v-for="page in visiblePages" :key="page"
                                    :class="['page-number', { active: page === currentPage }]" @click="goToPage(page)">
                                    {{ page }}
                                </div>
                            </div>
                            <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
                                :class="{ disabled: currentPage === totalPages }" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 24.11.18 수정 -->
            <!-- 24.12.03 재수정 - confirm 변경 -->
            <!-- 24.12.13 수정 - :branches 추가 -->
            <AdminShopAddModal v-if="isModalVisible" :machine="equipmentModalData" :branches="filteredBranchesModalData"
                @close="closeModal" @confirm="closeModal" />
        </div>
    </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import AdminShopAddModal from "./AdminShopAddModal.vue";
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
    name: "AdminEquipmentManagement",
    components: {
        AdminHeader,
        AdminNavbar,
        AdminShopAddModal,
    },
    data() {
        return {
            arrowLeftImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
            arrowRightImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
            currentPage: 1,
            itemsPerPage: 5, // Display 5 users per page
            selectedMachine: [],
            searchQuery: "",
            isModalVisible: false,
            machine: [],
            equipmentDetails: [],
            equipmentModalData: null, //24.11.18 추가 
            mode: null, // 24.12.03 수정 - 추가
        };
    },
    computed: {
        // 24.12.04 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
        // 24.12.03 수정 - 추가
        equipmentDetailsHeaders() {
            let equipmentDetails = [];
            // `paginatedItems`의 각 항목을 확인하여 `equipmentDetails`를 추출
            this.machine.forEach(item => {
                if (item.equipmentDetails) {
                    equipmentDetails = equipmentDetails.concat(item.equipmentDetails);
                }
            });
            console.log('123 equipmentDetails', equipmentDetails);
            // 중복을 제거하고 제목만 가져오기
            return [...new Set(equipmentDetails.map(detail => detail.title))];
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredItems.slice(start, start + this.itemsPerPage);
        },
        isAllSelected() {
            return (
                this.paginatedItems.length > 0 &&
                this.paginatedItems.every((machine) =>
                    this.selectedMachine.includes(machine)
                )
            );
        },
        filteredItems() {
            if (!this.searchQuery) {
                return this.machine; // 검색어가 없을 때 전체 목록 반환
            }
            const query = this.searchQuery.toLowerCase();
            return this.machine.filter((machine) =>
                machine.branchName.toLowerCase().includes(query)
            );
        },
    },
    mounted() {
        this.getEquipment()
        console.log('paginatedItems:', this.paginatedItems);
    },
    // 24.12.04 수정 - 추가
    watch: {
        filteredItems() {
            this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
        },
    },
    methods: {
        async getEquipment() {
            try {
                this.machine = await adminStore.getTask('branch-equipment');
                console.log("this.machine:", this.machine);
                console.log(this.machine[0].equipmentDetails.length)
                console.log(this.machine[0].equipmentDetails[0].title)

            } catch (error) {
                console.error("Error adding manager:", error);
            }
        },
        toggleAll() {
            if (this.isAllSelected) {
                // 모든 항목을 선택 해제
                this.selectedMachine = this.selectedMachine.filter(
                    (machine) => !this.paginatedItems.includes(machine)
                );
            } else {
                // 모든 항목을 선택
                const newSelection = this.paginatedItems.filter(
                    (machine) => !this.selectedMachine.includes(machine)
                );
                this.selectedMachine = this.selectedMachine.concat(newSelection);
            }
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
            // 24.12.04 수정 - 추가
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // openModal() {
        //     console.log('openModal called'); // 디버깅용
        //     this.isModalVisible = true;
        // },
        // 24.11.18 수정
        // 24.12.13 수정 - async 추가가
        async openModal(mode, machine) {
            console.log('openModal called'); // 디버깅용
            this.mode = mode;

            // 24.12.13 수정 - 전체 매장 가져오기 추가
            let shopOptions = [];
            try {
                // 매장 데이터 가져오기
                const response = await adminStore.getTask("v1/branch/list");
                console.log('gameshop', response);

                // 매장 데이터 설정
                shopOptions = response.map(shop => ({
                    id: shop.id,
                    name: shop.name.trim().toLowerCase(), // 공백 제거 및 소문자로 통일
                }));
            } catch (error) {
                console.error("매장 데이터를 가져오는 중 오류 발생:", error);
                return; // 오류 발생 시, 모달을 열지 않음
            }


            // 24.12.12 수정 - 이미 추가된 매장 필터링
            const addedBranches = Array.from(
                new Set(
                    this.machine
                        .filter((item) => item.branchName)
                        .map((item) => item.branchName?.trim().toLowerCase()) // 공백 제거 및 소문자로 통일
                )
            );
            console.log('addedBranches', addedBranches);

            // 24.12.12 수정 - 이미 추가된 매장 제외 필터링
            // 전체 매장에서 추가된 매장을 제외한 목록 생성
            const filteredBranches = shopOptions.filter(
                (shop) => !addedBranches.includes(shop.name)
            );
            console.log('filteredBranches', filteredBranches);

            // this.machine.branchName을 동일하게 처리한 후 비교
            console.log('this.machine branchNames processed:', this.machine.map(item => item.branchName?.trim().toLowerCase()));

            // 24.12.13 수정 - 모달 데이터 설정
            this.filteredBranchesModalData = filteredBranches, // 필터링된 매장 리스트 전달

                console.log('filteredBranchesModalData', this.filteredBranchesModalData);

            this.equipmentModalData = machine;
            this.isModalVisible = true;
        },
        // closeModal() {
        //     this.isModalVisible = false;
        //     this.getEquipment()
        // },
        // 24.11.18 수정
        closeModal() {
            this.isModalVisible = false;
            this.equipmentModalData = null;
            this.getEquipment()
        },
        // 24.12.03 수정 - 추가
        handleAddEquipment(newEquipment) {
            // equipmentModalData의 equipmentDetails 배열에 추가
            if (!this.equipmentModalData.equipmentDetails) {
                this.$set(this.equipmentModalData, 'equipmentDetails', []); // 배열 초기화
            }
            this.equipmentModalData.equipmentDetails.push(newEquipment);
            this.closeModal();

        },
        async deleteSelected() {
            if (this.selectedMachine.length === 0) {
                alert("삭제할 항목을 선택해주세요.");
                return;
            }
            // 24.12.03 수정 - 추가
            // deleteTask
            console.log("this.selectedMachine : : : ", this.selectedMachine)
            if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
                for (var a = 0; a < this.selectedMachine.length; a++) {
                    const res = await adminStore.deleteTask(`branch-equipment/${parseInt(this.selectedMachine[a].id)}`);
                    console.log("delete branch-equipment :", JSON.stringify(res));
                }

                // 선택된 리스트 삭제
                this.machine = this.machine.filter(
                    (machine) => !this.selectedMachine.includes(machine)
                );
                this.selectedMachine = [];

                // 페이지가 삭제 후 총 페이지 수보다 클 경우 현재 페이지를 조정
                if (this.currentPage > this.totalPages) {
                    this.currentPage = this.totalPages || 1;
                }
            }
        },
    },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.admin-management-container {
    background: #f5f6f6;
    display: flex;
    height: 100%;
    flex-direction: row;
}

.wrapper {
    flex-grow: 1;
    padding: 30px;
    gap: 20px;
}

/* 타이틀 박스 */
.title-box {
    width: 100%;
    background-color: #fff;
    padding: 24px 30px;
    margin-bottom: 20px;
}

.machine_title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.pretendard-regular-normal-mine-shaft-16px {
    border: none;
    background-color: #184199;
    width: 150px;
    height: 45px;
    font-weight: 600;
    line-height: 21.48px;
    color: #ffffff;
}

.list_button button:nth-child(1) {
    background-color: #ccc;
}

.list_button {
    display: flex;
    gap: 10px;
}

.table-container {
    margin-top: 20px;
    background-color: #fff;
    width: 100%;
    overflow-x: auto;
}

/* 24.12.03 수정 - 추가 */
.equipment-table-wrapper {
    width: 100%;
    /* 테이블이 지정된 너비를 넘지 않도록 설정 */
    overflow-x: auto;
    /* 가로 스크롤 허용 */
    white-space: nowrap;
    /* 텍스트 줄바꿈 방지 */
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-table th,
.equipment-table td {
    padding: 26px 0px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

.equipment-table td button {
    border: 1px solid #d30f1a;
    background-color: #fff;
    color: #d30f1a;
    padding: 11px 27.5px;
    border-radius: 5px;
}

.equipment-table th {
    background-color: #f5f5f5;
}

.blue {
    background-color: #184199;
}

.yellow {
    background-color: #f4bc1c;
}

.red {
    background-color: #d30f1a;
}

/* 정액제 사용 정보 */
.search_box {
    width: 100%;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
    gap: 10px;
    display: flex;
}

.select_box_1 {
    align-items: center;
    background-color: var(--blackwhitewhite);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    width: 250px;
    border: 1px solid #ddd;
}

.select_box_1 select {
    width: 100%;
    border: 0px;
}

.select_box_2 {
    align-items: center;
    background-color: var(--blackwhitewhite);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    /* width: 1170px; */
    /* 24.11.18 수정 */
    width: 100%;
    border: 1px solid #ddd;
}

.select_box_2 input {
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
}

/* 네거티브 금액: 빨간색 */
.negative-money {
    color: #d30f1a;
}

.table-container {
    padding: 30px;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

/* 24.11.11 수정 - 추가 */
.page-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* 24.11.18 수정 - 색상 추가 */
.page-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #eeeeee;
}

/* 24.11.18 수정 */
.page-number.active {
    background-color: #d30f1a;
    color: white;
}

/* 24.12.04 수정 - 추가 */
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
