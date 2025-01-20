<template>
    <div class="sidebar">
        <div class="store-info">
            <span>통합관리자</span>
        </div>
        <div class="menu-list">
            <div v-for="item in menuItems" :key="item.name">
                <div :class="['mainmenu-item pretendard-regular-normal-mine-shaft-18px', { active: selectedMenu === item.name }]"
                    @click="selectMenu(item)">
                    <img :src="selectedMenu === item.name ? item.activeIcon : item.icon" :alt="item.name"
                        class="menu-icon" />
                    <span class="menu-text">{{ item.label }}</span>

                    <!-- 24.11.20 수정 -->
                    <!-- '데이터 관리'와 '운영 관리' '고객센터' 메뉴에만 아이콘 추가 -->
                    <img v-if="item.name === '데이터 관리' || item.name === '운영 관리' || item.name === '고객센터'"
                        :src="selectedMenu === item.name ? downIcon : rightIcon" class="toggle-icon" />
                </div>

                <!-- 데이터 관리 서브메뉴 -->
                <div v-if="selectedMenu === '데이터 관리' && item.name === '데이터 관리'" class="submenu">
                    <div v-for="submenuItem in dataManagementSubmenu" :key="submenuItem.name"
                        :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
                        @click="selectSubmenu(submenuItem)">
                        <span class="submenu-text">• {{ submenuItem.label }}</span>
                    </div>
                </div>

                <!-- 운영 관리 서브메뉴 -->
                <div v-else-if="selectedMenu === '운영 관리' && item.name === '운영 관리'" class="submenu">
                    <div v-for="submenuItem in managerManagementSubmenu" :key="submenuItem.name"
                        :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
                        @click="selectSubmenu(submenuItem)">
                        <span class="submenu-text">• {{ submenuItem.label }}</span>
                    </div>
                </div>

                <!-- 24.11.20 수정 - 추가 -->
                <!-- 고객센터 서브메뉴 -->
                <div v-else-if="selectedMenu === '고객센터' && item.name === '고객센터'" class="submenu">
                    <div v-for="submenuItem in contactManagementSubmenu" :key="submenuItem.name"
                        :class="['submenu-item pretendard-light-granite-gray-18px', { active: selectedSubmenu === submenuItem.name }]"
                        @click="selectSubmenu(submenuItem)">
                        <span class="submenu-text">• {{ submenuItem.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminNavBar",
    data() {
        return {
            selectedMenu: '',
            selectedSubmenu: '',
            downIcon: require('../../../img/Vector 2.png'),
            rightIcon: require('../../../img/Vector 3.png'),
            menuItems: [
                { icon: require('../../../img/Vector-3.png'), activeIcon: require('../../../img/Vector-3-active.png'), name: '대시보드', label: '대시보드', link: '/admin-dashboard' },
                { icon: require('../../../img/Vector-9.png'), activeIcon: require('../../../img/Vector-9-active.png'), name: '데이터 관리', label: '데이터 관리', link: '/admingame-management' },
                { icon: require('../../../img/Group-707.png'), activeIcon: require('../../../img/Group-707-active.png'), name: '포인트 관리', label: '포인트 관리', link: '/adminpoint-management' },
                { icon: require('../../../img/Group.png'), activeIcon: require('../../../img/Group-active.png'), name: '운영 관리', label: '운영 관리', link: '/adminmanager-management' },
                { icon: require('../../../img/Vector-5.png'), activeIcon: require('../../../img/Vector-5-active.png'), name: '고객센터', label: '고객센터', link: '/admincontact-list' },
                { icon: require('../../../img/Vector-6.png'), activeIcon: require('../../../img/Vector-6-active.png'), name: '통계', label: '통계', link: '/admin-statistics' },
            ],
            dataManagementSubmenu: [
                // { name: '게임 관리', label: '게임 관리', link: '/admingame-management' },
                { name: '유저 관리', label: '유저 관리', link: '/adminuser-management' },
            ],
            managerManagementSubmenu: [
                { name: '점장 관리', label: '점장 관리', link: '/adminmanager-management' },
                { name: '장비 관리', label: '장비 관리', link: '/adminequipment-management' },
                { name: '코스 관리', label: '코스 관리', link: '/admincourse-management' },
                { name: 'A/S 관리', label: 'A/S 관리', link: '/adminas-management' },
                { name: '배너관리', label: '배너관리', link: '/adminbanner' },
            ],
            // 24.11.20 수정 - 추가
            contactManagementSubmenu: [
                { name: '1:1 문의', label: '1:1 문의', link: '/admincontact-list' },
                { name: '공지사항', label: '공지사항', link: '/adminnotice-list' },
                { name: '이벤트', label: '이벤트', link: '/adminevent-list' },
                { name: 'FAQ', label: 'FAQ', link: '/adminfaq-list' },
                { name: '이용약관', label: '이용약관', link: '/adminterms-list' },
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
    methods: {
        updateSelectedMenu() {
            const currentPath = this.$route.path;

            // Main menu 업데이트
            const currentItem = this.menuItems.find(item => currentPath.startsWith(item.link));
            if (currentItem) {
                this.selectedMenu = currentItem.name;
            }

            // 고객센터 메뉴가 선택된 경우 서브메뉴를 감지
            if (this.selectedMenu === '데이터 관리') {
                const currentSubmenuItem = this.dataManagementSubmenu.find(subItem => currentPath === subItem.link);
                if (currentSubmenuItem) {
                    this.selectedSubmenu = currentSubmenuItem.name;
                } else {
                    this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
                }
            } else if (this.selectedMenu === '운영 관리') {
                const currentSubmenuItem = this.managerManagementSubmenu.find(subItem => currentPath === subItem.link);
                if (currentSubmenuItem) {
                    this.selectedSubmenu = currentSubmenuItem.name;
                } else {
                    this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
                }
            }
            // 24.11.20 수정 - 추가
            else if (this.selectedMenu === '운영 관리') {
                const currentSubmenuItem = this.contactManagementSubmenu.find(subItem => currentPath === subItem.link);
                if (currentSubmenuItem) {
                    this.selectedSubmenu = currentSubmenuItem.name;
                } else {
                    this.selectedSubmenu = ''; // 서브메뉴가 없을 때는 리셋
                }
            } else {
                this.selectedSubmenu = ''; // 서브메뉴가 없는 경우 리셋
            }
        },
        selectMenu(item) {
            if (this.selectedMenu === item.name) {
                this.selectedMenu = ''; // 서브메뉴를 닫음
            } else {
                this.selectedMenu = item.name; // 선택된 메뉴로 설정

                // 서브메뉴가 있는 경우 첫 번째 서브메뉴를 기본 선택하고 이동
                if (item.name === '데이터 관리') {
                    this.selectedSubmenu = this.dataManagementSubmenu[0].name;
                    this.$router.push(this.dataManagementSubmenu[0].link);
                } else if (item.name === '운영 관리') {
                    this.selectedSubmenu = this.managerManagementSubmenu[0].name;
                    this.$router.push(this.managerManagementSubmenu[0].link);
                }
                // 24.11.20 수정 - 추가
                else if (item.name === '고객센터') {
                    this.selectedSubmenu = this.contactManagementSubmenu[0].name;
                    this.$router.push(this.contactManagementSubmenu[0].link);
                }
                else {
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
    width: 360px;
    background-color: #fff;
    padding: 20px 0;
    border-right: 1px solid #ddd;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    /* 패딩 포함 전체 크기 계산 */
    position: relative;
    /* 부모 컨테이너에 relative 위치 지정 */
}

.store-info {
    text-align: center;
    color: #333;
    width: 360px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
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