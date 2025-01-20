<template>
  <div class="modal-overlay">
    <div class="game-detail-view screen">
      <div class="game-detail-shop-name">
        <h1 class="game-detail-shop-name-font valign-text-middle pretendard-extra-extra-bold-log-cabin-24px">
          {{ shop.name }}
        </h1>
        <img class="material-symbolsclose-2"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
          alt="material-symbols:close" @click="closeModal" />
      </div>
      <div class="game-detail-photo-box">
        <div class="game-detail-photo-frame">
          <!-- <div v-for="(image, index) in images" :key="index" v-show="currentIndex === index">
            <img class="modal-slide-img" :src="image.src" :alt="'Slide ' + index" />
          </div> -->
          <!-- 24.12.12 수정 - 여러 장에서 한 장으로 변경 -->
          <img class="modal-slide-img" :src="shop.mapImage" :alt="'Slide ' + index" />
          <!-- <div class="slide-left-btn-box" @click="prevSlide">
            <div class="slide-btn-frame">
              <div class="slide-btn-frame-align">
                <img class="slide-btn"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-1.svg"
                  alt="Previous" />
              </div>
            </div>
          </div> -->
          <!-- <div class="slide-right-btn-box" @click="nextSlide">
            <div class="slide-btn-frame">
              <div class="slide-btn-frame-align">
                <img class="slide-btn"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-2.svg"
                  alt="Next" />
              </div>
            </div>
          </div> -->
          <!-- <div class="dots">
            <span v-for="(image, index) in images" :key="'dot-' + index"
              :class="{ 'active-dot': currentIndex === index }" @click="setCurrentSlide(index)"></span>
          </div> -->
        </div>
      </div>
      <tbody class="modal-table">
        <tr class="modal-table-row">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            매장주소
          </td>
          <td class="modal-table-row-end pretendard-medium-log-cabin-14px">
            {{ shop.address }}
          </td>
        </tr>
        <tr class="modal-table-row">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            전화번호
          </td>
          <td class="modal-table-row-end pretendard-medium-log-cabin-14px">
            {{ shop.telNumber }}
          </td>
        </tr>
        <tr class="modal-table-row">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            운영시간
          </td>
          <td class="modal-table-row-end modal-time-align pretendard-medium-log-cabin-14px">
            <div>
              평일 : {{ shop.weekdayHours }}</div> <span class="slash-modal">/</span>
            <div>주말 :{{ shop.weekendHours }}</div>
          </td>
        </tr>
        <tr class="modal-table-row">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            무료주차
          </td>
          <td class="modal-table-row-end pretendard-medium-log-cabin-14px">
            {{ shop.freeParking }}
          </td>
        </tr>
        <tr class="modal-table-row">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            매장규모
          </td>
          <td class="modal-table-row-end pretendard-medium-log-cabin-14px">
            {{ shop.storeScale }} 개 게임 룸
          </td>
        </tr>
        <tr class="modal-table-row modal-table-last">
          <td class="modal-table-row-first  pretendard-medium-white-14px">
            매장안내
          </td>
          <td class="modal-table-row-end pretendard-medium-log-cabin-14px">
            {{ shop.description }}
          </td>
        </tr>
      </tbody>
      <div class="modal-btn-align">
        <button class="modal-call-btn pretendard-bold-white-18px">전화걸기</button>
        <button class="modal-reservation-btn pretendard-bold-white-18px" @click="openReservationPage">예약하기</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "GameDetail",
  props: {
    shop: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      images: [
        { src: require("../../img/frame-7742.png"), },
        { src: require("../../img/frame-7742.png"), },
        { src: require("../../img/frame-7742.png"), },
        { src: require("../../img/frame-7742.png"), },
        { src: require("../../img/frame-7742.png"), },
      ],
      venue: {
        time1: "평일 09:00 ~ 24:00",
        time2: "주말 10:00 ~ 22:00",
        parking: "2시간 무료",
        room: "10개 게임 룸",
        info: "매장 특징을 입력하세요",
      },
    };
  },
  mounted() {
    
    this.startSlideshow();
    // this.images = [{ src: require(`${shop.mapImage}`), }];
  },
  methods: {
    closeModal() {
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송
    },
    openReservationPage() {
      // this.$router.push({ path: "/reservation-write" });
      this.$router.push({
      name: "reservation-write", // 해당 경로의 name을 지정하세요.
      params: {
        name: this.shop.name,
        branchId: this.shop.branchId,
        address: this.shop.address,
        managerid: this.shop.managerid,
        weekdayHours: this.shop.weekdayHours,
        weekendHours: this.shop.weekendHours,
        mapImage: this.shop.mapImage,
        storeScale :this.shop.storeScale,
        location: {
          latitude: this.shop.latitude,
          longitude: this.shop.longitude
        }
      }
    });
    },
    startSlideshow() {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 3000); // Move to the next slide every 3 seconds
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    setCurrentSlide(index) {
      this.currentIndex = index;
    },
  },
  beforeDestroy() {
    clearInterval(this.slideInterval); // Clear interval when component is destroyed
  }
};
</script>

<style scoped src="@/style/shop/gamedetail.css" />
