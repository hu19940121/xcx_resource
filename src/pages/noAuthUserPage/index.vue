<template>
  <div class="noAuthUserPage">
    <img src='./images/index_img_nouserinfo.png' />
    <span>玩物星球俱乐部小程序请求获得您的\n用户信息，点击确定登录小程序</span>
    <button type='primary' size='mini' @getuserinfo="onGotUserInfo" open-type="getUserInfo">确定</button>
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
              openGidData: detail.encryptedData,
              openGidiv: detail.iv,
              type: 1
            }
            self.login(params)
          }
        })
      }
    }
  }
</script>

<style scoped>
.noAuthUserPage {
  text-align: center
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
.noAuthUserPage button {
  display: block;
  width: 260rpx;
  margin: 20rpx auto 0;
}
</style>