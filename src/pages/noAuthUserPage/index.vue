<template>
  <div class="noAuthUserPage">
    <!-- <img src='./images/index_img_nouserinfo.png' /> -->
    <!-- <p>玩物星球俱乐部小程序请求获得您的用户信息，点击确定登录小程序</p> -->
    <button class="auth-btn" type='primary' size='mini' @getuserinfo="onGotUserInfo" open-type="getUserInfo">授权登录</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions(['login']),
      onGotUserInfo (res) {
        let self = this
        const detail = res.mp.detail
        wx.login({
          success: function (loginRes) {
            const code = loginRes.code
            let params = {
              code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
            self.login(params)
          }
        })
      }
    }
  }
</script>

<style scoped>
.auth-btn{

}
.noAuthUserPage {
  width: 100%;
  height: 100vh;
  text-align: center;
  background: url('http://image.steam001.com/shouquan.jpg');
  background-size: 100% 100%;
  overflow: hidden;
}
.noAuthUserPage-img{
  width: 100%;
}
.noAuthUserPage image {
  display: block;
  width: 300rpx;
  height: 300rpx;
  margin: 80rpx auto 0;
}
.noAuthUserPage text {
  font-size: 26rpx;
  color: #333
}
.noAuthUserPage p {
  padding: 0 50rpx;
  font-size: 26rpx;
  color: #333
}
.noAuthUserPage button {
  display: block;
  margin: 20rpx auto 0;
  width: 280rpx;
  height: 80rpx;
  background: #FFFFFF;
  border: 1rpx solid #333333;
  border-radius: 10rpx;
  margin-top: 624rpx;
  color:#333333;
  line-height: 80rpx;
}
</style>