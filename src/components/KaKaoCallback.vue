<template>
 

    <p>카카오 로그인중</p>


</template>

<script>
import axios from 'axios';

export default {
name: 'KaKaoCallback',
// layout: 'signin',
async mounted() {
    console.log("Access Token:", this.$route.query.accessToken);
    console.log("User ID:", this.$route.query.userId);
  const access_token = this.$route.query.accessToken
//   const query = hash.substring(hash.indexOf('=') + 1)
//   const code = query.substring(0, query.indexOf('&'))
//   console.log("code--- API 통신중 ~~~~~~~> ")
  
  // console.log(hash)
  // console.log(query)
  // var header = "Bearer " + code; // Bearer 다음에 공백 추가
   
    
    // const me = await axios.get(`https://www.talktalkboard.com/api/naverLogin.php?access_token=${access_token}`)
    try{
        const me = await axios.post('https://13.124.62.68:3000/api/v1/auth/kakao/login',{
        accessToken : access_token
        },
        {
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
        },
        })
    
    
            //   console.log(me.data.message)
            console.log("ME : : : : : :"+JSON.stringify(me))
            if(me.data.refreshToken){
                localStorage.setItem('refreshToken', me.data.refreshToken);
                localStorage.setItem('Token', me.data.token);
                localStorage.setItem('loginInfo', JSON.stringify(me.data.user));
                localStorage.setItem("userLogin" ,"true");
                this.$router.replace('/')  
            }else{
                alert("이미 등록된 계정입니다.")
                this.$router.replace('/login')  
        }
    }
    catch(error){
        console.log("error" , error)
        alert("휴대폰 인증 후 재 가입해 주세요.")
        this.$router.replace('/login')  

    }
   
  
  
},
}
</script>

<style>
</style>