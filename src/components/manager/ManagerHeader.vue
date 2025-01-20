<template>
  <header>
    <div class="center">
    <!-- 로고 섹션 -->
    <div class="logo-container">
      <img src="../../../img/lezuro-logo-white-2-3@2x.png" alt="Logo" class="logo-image" />
    </div>
    <!-- 우측 메뉴 섹션 -->
    <div class="menu-container">
      <div class="menu-link" @click="$router.push('/')">
        <img src="../../../img/Vector-2.png" alt="" >
        홈페이지</div>
      <span class="separator">|</span>
      <div class="menu-link" @click="logOut()">로그아웃</div>
    </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';


export default {
  name: 'HeaderComponent',
  data() {
    return {
      isLoggedIn: false, // 로그인 상태
      activeMenu: '', // 현재 활성 메뉴 항목
      userName : '',
      cnt : 0
    };
  },
  mounted() {
    // 로그인 상태를 확인 (예: 로컬 스토리지에서 토큰 확인)
    const managerToken = localStorage.getItem("managerToken");
    
    console.log("managerToken : : : " , managerToken)
     
    if(managerToken){
    
      this.isLoggedIn =  true;
      // console.log("localStorage.getItem('loginInfo') : : :" ,localStorage.getItem('loginInfo'))
      const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
      console.log("managerToken : : : " , managerInfo)      
      this.checkAuth(managerInfo.id, managerToken)
      const isFirstLogin = localStorage.getItem("isFirstLogin");
      if (isFirstLogin === "true") {
        localStorage.setItem("isFirstLogin", "false"); // 새로고침 후 플래그를 false로 변경
        window.location.reload();
      }
    }else{
      this.$router.push({path:"/managerlogin"})
      this.isLoggedIn =  false;
    }
    // setTimeout(() => {
    //       this.logOut(); // 로그아웃 메서드 호출
    //     }, 60 * 60 * 1000); // 1시간 = 60분 * 60초 * 1000밀리초
    
    

  },
  methods: {
    async checkAuth(idx, tokens){
    
    try {
          const response = await axios.get(`https://13.124.62.68:3000/api/administrators/${idx}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens}`,
            },
          });
          console.log("response : : : : " , response)
          // this.getRefreshToken(tokens)

        } catch (error) {
          console.error("토큰 갱신 에러:", error);
          // 여기서 리프레시 토큰 및 엑세스 토큰 재 갱신
          this.logOut();
          //  this.getRefreshToken(idx,tokens)
          //   .then((data) => {
          //     console.log("갱신된 데이터:", data);
          //     localStorage.setItem('managerToken', data.token);});
          //     localStorage.setItem("isFirstLogin", "true"); 
            //   window.location.reload();
          
          throw error; // 에러를 호출한 곳으로 다시 던짐
        }
   },
    setActiveMenu(menu) {
      this.activeMenu = menu; // 클릭한 메뉴 항목을 활성화
    },
    logOut(){
      
      localStorage.removeItem("managerToken");
      localStorage.removeItem("managerInfo");
      window.location.reload();
    },
    async getRefreshToken(idx,tokens){
      console.log("이거타나요?"+ tokens)
      try {
          const response = await axios.get(`https://13.124.62.68:3000/api/v1/auth/refresh/${idx}`, {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${tokens}`,
            },
          });
          console.log("response?" , JSON.stringify(response))

          // Response 예제: 
          // {"token":"...", "refreshToken":"...", "tokenExpires":...}

          // 필요한 데이터만 리턴
          const { token, refreshToken, tokenExpires } = response.data;

          console.log("새로운 토큰:", token);
          console.log("새로운 리프레시 토큰:", refreshToken);
          console.log("토큰 만료 시간:", tokenExpires);

          // 객체 형태로 리턴
          return { token, refreshToken, tokenExpires };

        } catch (error) {
          console.error("토큰 갱신 에러:", error);
          throw error; // 에러를 호출한 곳으로 다시 던짐
        }
    },
  }
};
</script>

<style scoped>
header {
  height: 90px;
  background-color: #333;
}
.center{  display: flex;
  align-items: center;
    padding: 25px 41px;
  justify-content: space-between;}
.logo-container {
  display: flex;
  align-items: center;
  margin-left:76px;
}

.logo-image {
    width:126px;
}

.logo-text {
  color: white;
  margin-left: 10px;
}

.menu-container {
  display: flex;
  align-items: center;
  color: white;
}

.menu-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

.separator {
  color: white;
}
</style>
