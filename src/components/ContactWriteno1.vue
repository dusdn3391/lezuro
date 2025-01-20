<template>
  <div class="container-center-horizontal">
    <div class="announcementswrite screen">
      <x9c-i-tt-g :frame7372Props="x9cITtGProps.frame7372Props" />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <view :text89="viewProps.text89" :className="viewProps.className" />
      <frame7782
        :frame776641Props="frame7782Props.frame776641Props"
        :frame776642Props="frame7782Props.frame776642Props"
        :frame77843Props="frame7782Props.frame77843Props"
        :frame7859Props="frame7782Props.frame7859Props"
      />
      <x-footer :className="xFooterProps.className" />
    </div>
  </div>
</template>

<script>
import X9cITtG from "./X9cITtG";
import RjZsWi from "./RjZsWi";
import View from "./View";
import Frame7782 from "./Frame7782";
import XFooter from "./XFooter";
export default {
  name: "ContactWriteno1",
  components: {
    X9cITtG,
    RjZsWi,
    View,
    Frame7782,
    XFooter,
  },
  props: ["x9cITtGProps", "rJZsWIProps", "viewProps", "frame7782Props", "xFooterProps"],
};
</script>

<style>
.announcementswrite {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  flex-direction: column;
  min-height: 1492px;
  position: relative;
  width: 1920px;
}
</style>
