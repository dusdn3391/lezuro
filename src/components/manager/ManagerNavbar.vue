<template>
  <nav class="sidebar">
    <!-- 상단 매장 정보 -->
    <div class="store-info">
      <div class="store-name">{{ storeName }} 지점</div>
      <div class="store-manager">
        <span>점장 {{ managerName }}님</span>
        <!-- 24.12.04 수정 -->
        <span class="store-type" :style="{
          backgroundColor: pricingPlan === '정액제' ? '#184199' :
            pricingPlan === '종량제' ? '#f4bc1c' :
              pricingPlan === '프리패스' ? '#d30f1a' : '#1e4eb0'
        }">{{ pricingPlan }}</span>
      </div>
      <div class="contract-info">
        <!-- <div class="contract-item">
          <span>만료일</span>
          <span class="date">2024-08-01</span>
        </div> -->
        <!-- <div class="lineone"></div> -->
        <div class="contract-item">
          <span>비용</span>
          <span class="price">₩ {{point === null ? 0 : point.toLocaleString()}}</span>
        </div>
      </div>
    </div>

    <!-- 메뉴 리스트 -->
    <div class="menu-list">
      <div v-for="item in menuItems" :key="item.name">
        <div
          :class="['mainmenu-item pretendard-regular-normal-mine-shaft-18px', { active: selectedMenu === item.name }]"
          @click="selectMenu(item)">
          <img :src="selectedMenu === item.name ? item.activeIcon : item.icon" :alt="item.name" class="menu-icon" />
          <span class="menu-text">{{ item.label }}</span>

          <img v-if="item.name === '운영 관리' || item.name === '고객센터' || item.name === '통계' || item.name === '대회'"
            :src="selectedMenu === item.name ? downIcon : rightIcon" class="toggle-icon" />
        </div>

        <!-- 운영 관리 서브메뉴 -->
        <div v-if="selectedMenu === '운영 관리' && item.name === '운영 관리'" class="submenu">
          <div v-for="submenuItem in operationSubmenu" :key="submenuItem.name"
            :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
            @click="selectSubmenu(submenuItem)">
            <span class="submenu-text">• {{ submenuItem.label }}</span>
          </div>
        </div>

        <!-- 고객센터 서브메뉴 -->
        <div v-else-if="selectedMenu === '고객센터' && item.name === '고객센터'" class="submenu">
          <div v-for="submenuItem in contactSubmenu" :key="submenuItem.name"
            :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
            @click="selectSubmenu(submenuItem)">
            <span class="submenu-text">• {{ submenuItem.label }}</span>
          </div>
        </div>
        <!-- 통계 서브메뉴 -->
        <div v-else-if="selectedMenu === '통계' && item.name === '통계'" class="submenu">
          <div v-for="submenuItem in statisticSubmenu" :key="submenuItem.name"
            :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
            @click="selectSubmenu(submenuItem)">
            <span class="submenu-text">• {{ submenuItem.label }}</span>
          </div>
        </div>
        <!-- 대회 서브메뉴 -->
        <div v-else-if="selectedMenu === '대회' && item.name === '대회'" class="submenu">
          <div v-for="submenuItem in gameSubmenu" :key="submenuItem.name"
            :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
            @click="selectSubmenu(submenuItem)">
            <span class="submenu-text">• {{ submenuItem.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "ManagerNavBar",
  data() {
    return {
      storeName: "레저로 파크골프 파주점",
      managerName: "박길동",
      pricingPlan: "정액제",
      point : 0, 
      selectedMenu: '',
      selectedSubmenu: '',
      downIcon: require('../../../img/Vector 2.png'),
      rightIcon: require('../../../img/Vector 3.png'),
      menuItems: [
        { icon: require('../../../img/Vector-3.png'), activeIcon: require('../../../img/Vector-3-active.png'), name: '대시보드', label: '대시보드', link: '/managerroom' },
        { icon: require('../../../img/Group.png'), activeIcon: require('../../../img/Group-active.png'), name: '운영 관리', label: '운영 관리', link: '/managerroom' },
        { icon: require('../../../img/Vector-4.png'), activeIcon: require('../../../img/Vector-4-active.png'), name: '룸 관리', label: '룸 관리', link: '/managerroom-management' },
        { icon: require('../../../img/Group-707.png'), activeIcon: require('../../../img/Group-707-active.png'), name: '포인트 관리', label: '포인트 관리', link: '/managerpoint-management' },
        { icon: require('../../../img/Vector-5.png'), activeIcon: require('../../../img/Vector-5-active.png'), name: '고객센터', label: '고객센터', link: '/managercontact' },
        // { icon: require('../../../img/Vector-6.png'), activeIcon: require('../../../img/Vector-6-active.png'), name: '통계', label: '통계', link: '/managervisitor-statistics' },
        { icon: require('../../../img/Vector-7.png'), activeIcon: require('../../../img/Vector-7-active.png'), name: '대회', label: '대회', link: '/managergame-write' },
      ],
      operationSubmenu: [
        { name: '예약 관리', label: '예약 관리', link: '/managerroom' },
        { name: '예약접수 관리', label: '예약접수 관리', link: '/managerreservation' },
        { name: '홈페이지 관리', label: '홈페이지 관리', link: '/managerhomepage' },
      ],
      contactSubmenu: [
        // { name: '메뉴얼', label: '메뉴얼', link: '/manager-contact' },
        // { name: 'FAQ', label: 'FAQ', link: '/manager-contact' },
        { name: '1:1 문의', label: '1:1 문의', link: '/managercontact' },
        { name: 'A/S 관리', label: 'A/S 관리', link: '/manageras-management' },
      ],
      statisticSubmenu: [
        { name: '방문자 통계', label: '예약 관리', link: '/managervisitor-statistics' },
        { name: '예약 통계', label: '예약 통계', link: '/managerreservation-statistics' },
        { name: '게임 통계', label: '게임 통계', link: '/managergame-statistics' },
        { name: '회원 통계', label: '회원 통계', link: '/manageruser-statistics' },
      ],
      gameSubmenu: [
        { name: '대회 개최', label: '대회 개최', link: '/managergame-write' },
        { name: '대회 관리', label: '대회 관리', link: '/managergame-managementlist' },
      ],
    };
  },
  watch: {
    $route() {
      this.updateSelectedMenu();
    },
  },
  created() {
    this.updateSelectedMenu();
  },
  mounted() {
    const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
    this.storeName = managerInfo.identifier
    this.managerName = managerInfo.name
    this.pricingPlan = managerInfo.pricingPlan
    this.point = managerInfo.point

  },
  methods: {
    updateSelectedMenu() {
      const currentPath = this.$route.path;

      // Main menu 업데이트
      const currentItem = this.menuItems.find(item => currentPath.startsWith(item.link));
      if (currentItem) {
        this.selectedMenu = currentItem.name;
      }

      // 고객센터 메뉴가 선택된 경우 서브메뉴를 감지
      if (this.selectedMenu === '운영 관리') {
        const currentSubmenuItem = this.operationSubmenu.find(submenuItem => currentPath === submenuItem.link);
        if (currentSubmenuItem) {
          this.selectedSubmenu = currentSubmenuItem.name;
        } else {
          this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
        }
      } else if (this.selectedMenu === '고객센터') {
        const currentSubmenuItem = this.contactSubmenu.find(submenuItem => currentPath === submenuItem.link);
        if (currentSubmenuItem) {
          this.selectedSubmenu = currentSubmenuItem.name;
        } else {
          this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
        }
      } else if (this.selectedMenu === '통계') {
        const currentSubmenuItem = this.statisticSubmenu.find(submenuItem => currentPath === submenuItem.link);
        if (currentSubmenuItem) {
          this.selectedSubmenu = currentSubmenuItem.name;
        } else {
          this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
        }
      } else if (this.selectedMenu === '대회') {
        const currentSubmenuItem = this.gameSubmenu.find(submenuItem => currentPath === submenuItem.link);
        if (currentSubmenuItem) {
          this.selectedSubmenu = currentSubmenuItem.name;
        } else {
          this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
        }
      }
      else {
        this.selectedSubmenu = ''; // 서브메뉴가 없는 경우 리셋
      }
    },
    selectMenu(item) {
      if (this.selectedMenu === item.name) {
        // this.selectedMenu = ''; // 서브메뉴를 닫음
      } else {
        this.selectedMenu = item.name; // 선택된 메뉴로 설정

        // 서브메뉴가 있는 경우 첫 번째 서브메뉴를 기본 선택하고 이동
        if (item.name === '운영 관리') {
          this.selectedSubmenu = this.operationSubmenu[0].name;
          this.$router.push(this.operationSubmenu[0].link);
        } else if (item.name === '고객센터') {
          this.selectedSubmenu = this.contactSubmenu[0].name;
          this.$router.push(this.contactSubmenu[0].link);
        } else if (item.name === '통계') {
          this.selectedSubmenu = this.statisticSubmenu[0].name;
          this.$router.push(this.statisticSubmenu[0].link);
        } else if (item.name === '대회') {
          this.selectedSubmenu = this.gameSubmenu[0].name;
          this.$router.push(this.gameSubmenu[0].link);
        } else {
          // 서브메뉴가 없는 경우 초기화
          this.selectedSubmenu = '';
          this.$router.push(item.link);
        }
      }
    },
    selectSubmenu(submenuItem) {
      this.selectedSubmenu = submenuItem.name;
      this.$router.push(submenuItem.link);
    }
  }
};
</script>

<style scoped>
.sidebar {
  /* width: 360px; */
  /* 24.11.27 수정 */
  width: 18.7%;
  max-width: 360px;
  background-color: #fff;
  /* padding: 20px; */
  /* 24.12.23 수정 - 추가 */
  padding: 20px 0;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  /* Box shadow 추가 */
}

.store-info {
  text-align: center;
  margin-bottom: 20px;
}

.store-name {
  margin-bottom: 10px;
}

.store-manager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.store-type {
  background-color: #1e4eb0;
  color: #fff;
  padding: 10px 12px;
  border-radius: 5px;
}

.contract-info {
  border: 1px solid #ddd;
  /* 24.12.23 수정 - 추가 */
  margin: 0 20px;
}

.contract-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.contract-item span {
  line-height: 80%;
}

/* 24.11.27 수정 */
.lineone {
  /* width: 280px; */
  width: 100%;
  height: 1px;
  background-color: #ccc;
  /* margin-left: 20px; */
}

.date {
  color: #1e4eb0;
  font-weight: bold;
}

.price {
  font-weight: bold;
  color: #333;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;

}

.menu-list :link {
  text-decoration: none;
}

.menu-list :visited {
  color: #333;
  text-decoration: none;
}

.mainmenu-item {
  display: flex;
  align-items: center;
  padding: 22.5px 20px;
  cursor: pointer;
  gap: 10px;
}

.mainmenu-item.active {
  width: 100%;
  background-color: #DFE9FF;
  color: #184199;
  font-family: var(--font-family-pretendard-bold);
  font-weight: 700;
}

.icon-space {
  padding: 0 10px;
  margin: 0 10px;
}

.twomenu {
  list-style: none;
  padding-left: 20px;
  margin-top: 10px;
  margin-left: 20px;
}

.submenu-item {
  padding: 11.5px 30px;
  position: relative;
  margin-bottom: 10px;
}

.submenu-item.active {
  display: block;
  width: 100%;
  color: #184199;
  font-family: var(--font-family-pretendard-bold);
  font-weight: 700;
}

/* 드롭다운 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.submenu-item:hover {
  color: #184199;
}

.mainmenu-item:hover {
  color: #184199;
  background-color: #dfe9ff;
}

/* 오른쪽 아이콘 스타일 */
.toggle-icon {
  margin-left: auto;
  width: 12px;
}
</style>
