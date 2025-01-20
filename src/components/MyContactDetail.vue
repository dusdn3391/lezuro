<template>
  <div class="container-center-horizontal">
    <div class="contactview-1 screen">
      <div class="overlap-group-5">
        <div class="overlap-group1-9">
          <div class="group-33594-1">
            <Header />
            <x2-f-ym-mc :frame7291Props="x2FYmMcProps.frame7291Props" />
            <h1 class="text-59 valign-text-middle pretendard-bold-mine-shaft-38px">
              {{ text59 }}
            </h1>
            <x-footer :className="xFooterProps.className" />
          </div>
          <div class="frame-7914">
            <div class="frame-7754">
              <div class="text-71 valign-text-middle pretendard-bold-log-cabin-30px">
                1:1문의 등록 샘플 입니다
              </div>
              <div class="frame-7835">
                <div class="frame-7835-item valign-text-middle pretendard-regular-normal-mountain-mist-20px">
                  2024-04-11
                </div>
                <div class="rectangle-509276"></div>
                <div class="frame-7835-item valign-text-middle pretendard-regular-normal-mountain-mist-20px">
                  작성자 : 레저로 박
                </div>
                <div class="frame-7731-1">
                  <div class="text-73 valign-text-middle pretendard-semi-bold-monza-14px">
                    답변완료
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-7916">
            <div class="frame-7915">
              <div class="frame-7836 pretendard-light-granite-gray-18px">
                <p class="lorem-ipsum-dolor-si valign-text-middle">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem.
                </p>
                <p class="lorem-ipsum-dolor-si-1 valign-text-middle">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem.
                </p>
              </div>
              <article class="frame-7923-3">
                <div class="text_label-31 valign-text-middle pretendard-medium-white-18px">
                  목록으로
                </div>
              </article>
            </div>
            <div class="frame-7911">
              <div class="frame-79">
                <div class="frame-7307">
                  <div class="text-74 pretendard-bold-black-20px">답변</div>
                </div>
                <div class="frame-79">
                  <div class="frame-7850">
                    <div class="frame-7844">
                      <div class="frame-7843">
                        <img class="group-736"
                          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-736@2x.png"
                          alt="Group 736" />
                        <div class="text-75 pretendard-medium-mine-shaft-20px">
                          레저로 관리자
                        </div>
                      </div>
                      <div class="date pretendard-regular-normal-mountain-mist-18px">
                        2024-06-23
                      </div>
                    </div>
                    <div class="rectangle-509280"></div>
                    <p class="text-76 pretendard-regular-normal-granite-gray-18px" v-html="text76"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <frame7727 :frame7673Props="frame7727Props.frame7673Props" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import X2FYmMc from "./X2FYmMc";
import XFooter from "./XFooter";
import Frame7731 from "./Frame7731";
import Frame7712 from "./Frame7712";
import Frame7844 from "./Frame7844";
import Frame7727 from "./Frame7727";
export default {
  name: "MyContactDetail",
  components: {
    Header,
    X2FYmMc,
    XFooter,
    Frame7731,
    Frame7712,
    Frame7844,
    Frame7727,
  },
  props: [
    "text59",
    "text71",
    "date",
    "text72",
    "text74",
    "text76",
    "group736",
    "x2FYmMcProps",
    "xFooterProps",
    "frame7712Props",
    "frame7844Props",
    "frame7727Props",
  ],
  methods: {
    goToContactList() {
      this.$router.push({ path: "/myprofile" });
    },
  },
};
</script>

<style>
.contactview-1 {
  align-items: flex-start;
  background-color: var(--blackwhitewhite);
  display: flex;
  width: 1920px;
}

.overlap-group-5 {
  height: 2149px;
  position: relative;
  width: 1920px;
}

.overlap-group1-9 {
  height: 2149px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1920px;
}

.group-33594-1 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  left: 0;
  min-height: 2149px;
  position: absolute;
  top: 0;
  width: 1920px;
}

.text-59 {
  height: 27px;
  letter-spacing: 0;
  line-height: normal;
  margin-left: 260px;
  margin-top: 104px;
  position: relative;
  width: 140px;
}

.frame-7914 {
  align-items: flex-start;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--alto);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-style: solid;
  border-right-width: 1px;
  display: flex;
  flex-direction: column;
  height: 1224px;
  left: 260px;
  padding: 40px;
  position: absolute;
  top: 413px;
  width: 1400px;
}

.frame-7754 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  padding: 40px 0px;
  position: relative;
  width: 100%;
}

.text-71 {
  height: 35px;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: 658px;
}

.frame-7835 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.frame-7835-item {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.rectangle-509276 {
  background-color: var(--mountain-mist);
  height: 11px;
  position: relative;
  width: 1px;
}

.frame-7916 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 30px;
  left: 300px;
  position: absolute;
  top: 616px;
  width: 1320px;
}

.frame-7915 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7836 {
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid;
  border-color: var(--alto);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  position: relative;
  width: 100%;
}

.lorem-ipsum-dolor-si {
  align-self: stretch;
  letter-spacing: 0;
  line-height: 28px;
  margin-top: -1px;
  position: relative;
}

.lorem-ipsum-dolor-si-1 {
  align-self: stretch;
  letter-spacing: 0;
  line-height: 28px;
  position: relative;
}

.frame-7911 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-79 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  position: relative;
  width: 100%;
}

.frame-7307 {
  align-items: center;
  align-self: stretch;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--mountain-mist);
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 30px 0px 15px;
  position: relative;
  width: 100%;
}

.text-74 {
  letter-spacing: -0.8px;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.frame-7850 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 0px 0px 50px;
  position: relative;
  width: 100%;
}

.rectangle-509280 {
  align-self: stretch;
  background-color: var(--hint-of-red);
  height: 200px;
  position: relative;
  width: 100%;
}

.text-76 {
  left: 25px;
  letter-spacing: -0.72px;
  line-height: 32px;
  position: absolute;
  top: 81px;
}
</style>
