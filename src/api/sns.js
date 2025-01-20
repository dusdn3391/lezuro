import express from 'express'
import axios from 'axios'
import qs from 'qs'
import wrap from '../wrap'

const router = express.Router()

/**
 * 카카오 계정 정보 조회 by oauth_token
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
 * https://axios-http.com/docs/urlencoded
 */
router.get('/kakao/me', wrap.asyncWrapper(async (req, res, next) => {
  // console.log(req.query.code)
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: 'Bearer ',
    },
  }

  console.log("process.env.KAKAO_REST_KEY : : :" , process.env.KAKAO_REST_KEY)
  console.log("process.env.KAKAO_CALLBACK_URI : : :" , process.env.KAKAO_CALLBACK_URI)
  console.log("process.env.KAKAO_CALLBACK_URI : : :" , req.query.code)
  console.log("process.env.KAKAO_CALLBACK_URI : : :" , process.env.KAKAO_SECRET_KEY)
  
  // const param = {
  //   grant_type: 'authorization_code',
  //   client_id: process.env.KAKAO_REST_KEY,
  //   redirect_uri: process.env.KAKAO_CALLBACK_URI,
  //   code: req.query.code,
  //   client_secret: process.env.KAKAO_SECRET_KEY
  // }
  // redirect_uri: 'http://localhost:3000/auth/callback/kakao',
  const param = {
    grant_type: 'authorization_code',
    client_id: '97cf66deea8bab703813e699ae44f246',
    redirect_uri: 'https://tarotfriends.com/auth/callback/kakao',
    code: req.query.code,
    client_secret: 'OC8vXWLD9U3Q9vu9jmhp38veGfAl5l05'
  }

  const query = qs.stringify(param)
  // console.log("queryquery : : : :",JSON.stringify(query))

  try {
    // access_token 발급받기
    const token = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      query,
      config
    )
    console.log("tokenInfo " ,  token)

    // 발급받은 토큰값 'Authorization : Bearer 토큰' 헤더에 설정
    config.headers.Authorization += token.data.access_token

    // 토큰으로 유저정보 조회
    const me = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      config
    )

    // 조회된 유저정보
    console.log("me.data : : : : " ,  JSON.stringify(me.data))
    return res.json({
      id: me.data.id,
      email: me.data.kakao_account.email,
    })
  } catch (err) {
    // 인증관련 401 403 오류 등등 핸들링 하기
    console.error(err)
    return next({ status: 401, message: err })
  }
}))

/**
 * 네이버 계정 정보 조회 by access_token
 * https://developers.naver.com/docs/login/devguide/devguide.md
 */
router.get('/naver/me', wrap.asyncWrapper(async (req, res, next) => {
  // console.log(req.query.code)
  try {
    // 토큰으로 유저정보 조회
    const me = await axios.post(
      'https://openapi.naver.com/v1/nid/me',
      {},
      {
        headers: { Authorization: `Bearer ${req.query.code}` },
      }
    )
    // console.log(me.data)
    if (me.data.resultcode !== '00') {
      return res.json({
        success: false,
        message: me.data.message,
        resultcode: me.data.resultcode
      })
    }
    return res.json(me.data.response)
  } catch (err) {
    console.error(err)
    return next({ status: 401, message: err })
  }
}))

router.get('/naver', wrap.asyncWrapper(async (req) => {
    console.log(req.query.code)
    try {
      // 토큰으로 유저정보 조회
      const me = await axios.post(
        'https://openapi.naver.com/v1/nid/me',
        {},
        {
          headers: { Authorization: `Bearer ${req.query.code}` },
        }
      )
      console.log(me.data)
      // if (me.data.resultcode !== '00') {
      //   return res.json({
      //     success: false,
      //     message: me.data.message,
      //     resultcode: me.data.resultcode
      //   })
      // }
      return res.json(me.data.response)
    } catch (err) {
      console.error(err)
      return next({ status: 401, message: err })
    }
  }))

module.exports = router
