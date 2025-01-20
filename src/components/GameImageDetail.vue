<template>
  <div class="container-center-horizontal">
    <div class="tournamentgallery-2 screen">
      <n-tbq-j2 />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <view :text89="viewProps.text89" :className="viewProps.className" />
      <div class="frame-7692-3">
        <div class="frame-7691-4">
          <div class="group-764-5">
            <div class="frame-7727-6">
              <frame76737 />
              <frame76736 :className="frame76736Props.className" />
              <frame76715 :text1072="frame76715Props.text1072" />
            </div>
          </div>
        </div>
      </div>
      <div class="frame-7809"><img class="rectangle-509271-1" :src="rectangle509271" alt="Rectangle 509271" /></div>
      <x-footer :className="xFooterProps.className" />
      <img class="material-symbolsclose-5" :src="materialSymbolsClose" alt="material-symbols:close" />
    </div>
  </div>
</template>

<script>
import NTbqJ2 from "./NTbqJ2";
import RjZsWi from "./RjZsWi";
import View from "./View";
import Frame76737 from "./Frame76737";
import Frame76736 from "./Frame76736";
import Frame76715 from "./Frame76715";
import XFooter from "./XFooter";
export default {
  name: "GameImageDetail",
  components: {
    NTbqJ2,
    RjZsWi,
    View,
    Frame76737,
    Frame76736,
    Frame76715,
    XFooter,
  },
  props: [
    "rectangle509271",
    "materialSymbolsClose",
    "rJZsWIProps",
    "viewProps",
    "frame76736Props",
    "frame76715Props",
    "xFooterProps",
  ],
};
</script>

<style>
.tournamentgallery-2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid;
  border-color: var(--black);
  display: flex;
  flex-direction: column;
  height: 2519px;
  overflow: hidden;
  position: relative;
  width: 1920px;
}

.frame-7692-3 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 51px;
  position: relative;
  width: 1400px;
}

.frame-7691-4 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 40px;
  position: relative;
  width: 100%;
}

.group-764-5 {
  height: 60px;
  position: relative;
  width: 1399.98px;
}

.frame-7727-6 {
  align-items: center;
  display: inline-flex;
  position: relative;
}

.frame-7809 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--alto);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-style: solid;
  border-right-width: 1px;
  display: flex;
  gap: 10px;
  height: 1575px;
  justify-content: center;
  padding: 50px 0px;
  position: relative;
  width: 1400px;
}

.rectangle-509271-1 {
  height: 1415px;
  object-fit: cover;
  position: relative;
  width: 1000px;
}

.material-symbolsclose-5 {
  align-self: flex-start;
  height: 30px;
  margin-left: -943px;
  margin-top: 11821px;
  width: 30px;
}
</style>
