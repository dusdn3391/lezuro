<template>
  <div class="container-center-horizontal">
    <div class="secession-2 screen">
      <div class="frame-7812-3">
        <div class="deletion-title ">
          <!-- 24.12.23 수정 - button 삭제 -->
          <img src="../../img/x.png" @click="closeModal">
          <span class="title-text pretendard-extra-extra-bold-black-30px">회원탈퇴</span>
        </div>
        <div class="frame-7907">
          <div class="frame-7811">
            <img class="objects-1"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/objects-1.svg"
              alt="Objects" />
            <div class="frame-7810-4">
              <h1 class="text-1787 valign-text-middle pretendard-bold-mine-shaft-48px">회원탈퇴가 완료되었습니다</h1>
              <p class="text-1788 valign-text-middle pretendard-regular-normal-log-cabin-28px">
                그동안 이용해주시고 사랑해주셔서 감사합니다. 더욱 더 노력하고 발전하는 레저로가 되겠습니다.
              </p>
            </div>
          </div>
          <!-- 24.12.23 수정 - button 으로 변경 -->
          <button class="deletion-button pretendard-regular-normal-white-18px" @click="confirmDeletation">
            확인하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { taskStore } from "@/store/taskStore";

export default {
  name: "AccountDeletion",
  components: {
  },
  methods:{
    async  confirmDeletation(){
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      
      const res = await taskStore.deleteTask(`v1/auth/${parseInt(loginInfo.id)}`);
      console.log("RESPONSE:", res);
      this.logOut()
    },
    logOut() {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Token");
      localStorage.removeItem("loginInfo");
      this.$router.replace({ path:"/" })
      window.location.reload();
    },
    closeModal(){
       this.$router.replace({path:"/myprofile"})
    }
  }
};
</script>

<style scoped>
.secession-2 {
  background-color: var(--gallery);
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  justify-content: center;
  align-items: center;

}

.frame-7812-3 {
  background-color: var(--blackwhitewhite);
  border-radius: 20px;
  margin-top: 1px;
  padding: 70px 50px 60px;
  margin: 0 auto;
  position: relative;
  width: 800px;
}

.deletion-title {
  display: none;
}

.frame-7907 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7811 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 100px;
  position: relative;
  width: 100%;
}

.objects-1 {
  height: 180px;
  position: relative;
  width: 180px;
}

.frame-7810-4 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.text-1787 {
  letter-spacing: 0;
  line-height: 60px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.text-1788 {
  align-self: stretch;
  height: 100px;
  width: 76%;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  text-align: center;
  margin: 0 auto;
}

.deletion-button {
  width: 100%;
  background-color: #D30F1A;
  text-align: center;
  padding: 23.5px 0px;
  /* 24.12.23 수정 - 추가 */
  cursor: pointer;
  border: none;
}

@media (max-width:720px) {
  .secession-2 {
    background-color: #ffffff;
    align-items: normal;
    /* 24.12.23 수정 - 추가 */
    width: 100%;
    max-width: 720px;
    min-width: 360px;
    height: 100%;
  }

  .frame-7812-3 {
    padding: 18.5px 25px;
  }

  .deletion-title {
    display: flex;
    align-items: center;
    background-color: #fff;
    /* 24.12.23 수정 - 추가 */
    position: relative;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    /* 24.12.23 수정 - 추가 */
    position: absolute;
    left: 0px;
  }

  .title-text {
    text-align: center;
    width: 100%;
    font-size: 18px;
  }

  .frame-7907 {
    margin-top: 100px;
  }

  .frame-7811 {
    gap: 0px;
  }

  .frame-7810-4 {
    gap: 0px;
  }

  .objects-1 {
    width: 80px;
  }

  .text-1787 {
    font-size: 24px;
  }

  .text-1788 {
    font-size: 16px;
    /* width: 310px; */
    /* 24.12.23 수정 - 추가 */
    width: 100%;
  }

  /* 24.12.23 수정 - 추가 */
  .deletion-button {
    height: 40px;
    padding: 0;
    border-radius: 4px;
    font-size: 14px;
  }



}
</style>

