<template>
  <div class="navbar-18">
    <router-link :to="{ path: '/myscorecard' }">
      <div
        class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
      >
        기록실
      </div>
    </router-link>
    <router-link :to="{ path: '/game-list' }">
      <div
        class="navbar-link-text-20-1 valign-text-middle pretendard-semi-bold-log-cabin-18px"
      >
        대회
      </div>
    </router-link>
    <router-link :to="{ path: '/map-list' }">
      <div
        class="navbar-link-text-20-1 valign-text-middle pretendard-semi-bold-mine-shaft-18px"
      >
        매장·예약
      </div>
    </router-link>
    <router-link :to="{ path: '/course-list' }">
      <div
        class="navbar-link-text-20-1 valign-text-middle pretendard-semi-bold-log-cabin-18px"
      >
        코스
      </div>
    </router-link>
    <div
      class="navbar-link-text-20-1 valign-text-middle pretendard-semi-bold-log-cabin-18px"
    >
      가이드
    </div>
    <router-link :to="{ path: '/events-list' }">
        <div
          class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
        >
          커뮤니티
        </div>
    </router-link>
    <a href="#">
    <div
      class="navbar-link-text-20-1 valign-text-middle pretendard-semi-bold-log-cabin-18px"
    >
      고객센터
    </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar-18,
.navbar-19,
.navbar-20,
.navbar-21,
.navbar-22,
.navbar-23,
.navbar-24,
.navbar-25,
.navbar-26,
.navbar-27 {
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 616px;
}

.navbar-link-text-20-1,
.navbar-link-text-20-2,
.navbar-link-text-21,
.navbar-link-text-21-1,
.navbar-link-text-219,
.navbar-link-text-22,
.navbar-link-text-22-1,
.navbar-link-text-22-2,
.navbar-link-text-24,
.navbar-link-text-2 {
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}
</style>
