<template>
  <footer :class="[`footer`, className || ``]">
    <div class="frame-7503">
      <div class="frame-7502">
        <div class="title_img">
          <img class="lezuro_logo_white-2"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/lezuro-logo-white-2@2x.png"
            alt="Lezuro_logo_white 2" />
        </div>

        <div class="frame-7501">
          <div class="frame-7304">
            <div class="text-1-1 valign-text-middle pretendard-regular-normal-white-16px"
              @click="goToPage('/termsview?tab=이용약관')">
              이용약관
            </div>
            <img class="line"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/line-3.svg"
              alt="Line 3" />
            <!-- 24.12.20 수정 - 폰트 수정  -->
            <div class="text-1-1 valign-text-middle pretendard-regular-normal-white-16px"
              @click="goToPage('/termsview?tab=개인정보처리방침')">
              개인정보취급방침
            </div>
            <img class="line"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/line-3.svg"
              alt="Line 4" />
            <div class="text-1-1 valign-text-middle pretendard-regular-normal-white-16px"
              @click="goToPage('/termsview?tab=위치정보이용약관')">
              위치정보이용약관
            </div>
          </div>
          <p class="x valign-text-middle pretendard-regular-normal-white-15px">
            <span>

              <div class="footer-1">
                <span class="valign-text-middle pretendard-regular-normal-white-15px"> 법인명(상호) : (주)국제파크골프</span>
                <span>/</span>
                <span class="valign-text-middle pretendard-regular-normal-white-15px"> 대표자(성명) : 김재열</span>
                <span class="after_none">/</span>
                <span class="after_display valign-text-middle pretendard-regular-normal-white-15px">사업자 등록번호 안내 :
                  104-86-26271 <span class="after_block"> / </span> </span>

              </div>
              <div class="footer-2">
                <span class="valign-text-middle pretendard-regular-normal-white-15px">통신판매업신고 : 2023-인천계양-1586</span>
                <span>/</span>
                <span class="valign-text-middle pretendard-regular-normal-white-15px"> 개인정보보호책임자
                  : 김용훈(leisurero.official@gmail.com) </span>
              </div>
              <div class="footer-3">
                <span class="valign-text-middle pretendard-regular-normal-white-15px">전화 : 1800-9394</span>
                <span class="after_none">/</span>
                <span class="after_display valign-text-middle pretendard-regular-normal-white-15px"> 주소 : 21077 인천광역시
                  계양구 아나지로 524-1</span>
              </div>

              <span class="span pretendard-regular-normal-white-15px">

                <div class="last">
                  <span>©레저로 All rights reserved.</span>
                  <div class="frame-7500">
                    <div class="group-729">
                      <img class="vector-1"
                        src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector.svg"
                        alt="Vector" />
                    </div>
                    <div class="group-730">
                      <img class="vector-2"
                        src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-1.svg"
                        alt="Vector" />
                    </div>
                    <div class="group-731">
                      <img class="group-728"
                        src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-728@2x.png"
                        alt="Group 728" />
                    </div>
                  </div>
                </div>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "XFooter",
  props: ["className"],
  methods: {
    goToPage(route) {
      this.$router.push(route); // router로 이동
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #292929;
  /* Background color as seen in the image */
  padding: 80px 13.5%;
  width: 100%;
  color: white;
}

.frame-7503 {
  width: 100%;
}

.lezuro_logo_white-2 {
  height: 40px;
  margin-bottom: 20px;
}

.frame-7304 {
  display: flex;
  gap: 20px;
}

.text-1-1 {
  cursor: pointer;
  color: white;
  line-height: 1.5;
}

.footer-1,
.footer-2,
.footer-3 {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.x {
  line-height: 1.6;
}

.span1 {
  text-decoration: underline;
}

.group-729,
.group-730,
.group-731 {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.vector-1,
.vector-2,
.group-728 {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.last {
  display: flex;
  justify-content: space-between;
}

.after_block {
  display: none;
}

/* 반응형 스타일 */


.frame-7500,
.frame-7500-41 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: flex-end;
  position: relative;
}

.group-729 {
  background-color: var(--red);
  border-radius: 15px;
  height: 30px;
  position: relative;
  width: 30px;
}

.vector-1 {
  height: 10px;
  left: 12px;
  position: absolute;
  top: 10px;
  width: 8px;
}

.group-730 {
  background-image: url(https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/mask-group@2x.png);
  background-size: 100% 100%;
  height: 30px;
  position: relative;
  width: 30px;
}

.vector-2 {
  height: 12px;
  left: 9px;
  position: absolute;
  top: 9px;
  width: 12px;
}

.group-731 {
  background-color: var(--harlequin);
  border-radius: 15px;
  height: 30px;
  position: relative;
  width: 30px;
}

.group-728 {
  height: 12px;
  left: 8px;
  position: absolute;
  top: 10px;
  width: 13px;
}

.last {
  margin-top: 30px;
}
</style>

<style scoped src="@/style/common/footer.css"></style>
