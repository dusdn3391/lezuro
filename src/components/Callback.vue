<template>
 

      <p>네이버 로그인중</p>


</template>

<script>
import axios from 'axios';

export default {
  name: 'callback',
  // layout: 'signin',
  async mounted() {
   
    const hash = this.$route.hash
    const query = hash.substring(hash.indexOf('=') + 1)
    const code = query.substring(0, query.indexOf('&'))
    console.log("code--- API 통신중 ~~~~~~~> ")
    console.log(code)
    // console.log(hash)
    // console.log(query)
    // var header = "Bearer " + code; // Bearer 다음에 공백 추가
     
      const access_token = code;
      // const me = await axios.get(`https://www.talktalkboard.com/api/naverLogin.php?access_token=${access_token}`)
      const me = await axios.post('https://13.124.62.68:3000/api/v1/auth/naver/login',{
        accessToken : access_token
      },
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      })
    
    
    console.log(me.data.message)
    console.log("ME : : : : : :"+JSON.stringify(me))
    if(me.data.refreshToken){
      localStorage.setItem('refreshToken', me.data.refreshToken);
      localStorage.setItem('Token', me.data.token);
      localStorage.setItem('loginInfo', JSON.stringify(me.data.user));
      localStorage.setItem("userLogin" ,"true");
      this.$router.replace('/')  
    }else{
      this.$router.replace('/login')  
    }
    
    
  },
}
</script>

<style>
</style>