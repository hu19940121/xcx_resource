<template>
  <div class="cooperation">
    <div class="banner">
      <img :src="banner" alt="">
    </div>
    <div class="cooperation-desc">
      <div class="detail">
        <p>申请合作授权，您将获得</p>
        <p>xxx</p>
        <p>xxx</p>
        <p>xxx</p>
      </div>
      <div class="contact">
        <p class="title">通过以下方式联系合作：</p>
        <div class="way">
          <span>拨打电话：</span>
          <span class="way-btn" @click="call">点击拨号</span>
        </div>
        <div class="way">
          <span>微信客服：</span>
          <span class="way-btn" @click="copyToCut('Yasouzedlessin')">复制微信号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banner: 'http://image.steam001.com/page_bg_together.png',
        phone: '15313855386'
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('申请合作')
    },
    methods: {
    // 拨打电话
      call () {
        wx.makePhoneCall({
          phoneNumber: this.phone,
          success: function () {

          },
          fail: function () {
  
          }
        })
      },
      // 复制微信号到剪切板
      copyToCut (number) {
        wx.setClipboardData({
          data: number,
          success: function (res) {
            wx.showToast({'title': '复制成功~', icon: 'none'})
          }
        })
      }
    }

  }
</script>

<style lang="stylus">
page{
  background #3a53ab
}
.cooperation
  .banner
    width 100%
    height 558rpx
    img
      width 100%
      height 100%
  .cooperation-desc
    position relative
    top -200rpx
    width 690rpx
    height 920rpx
    margin 0 auto
    padding 50rpx 40rpx
    background #FEFEFF
    border 4rpx solid #000000;
    border-radius 16rpx
    box-sizing border-box
    font-size 32rpx
    p
      line-height 50rpx
    .detail
      min-height 500rpx
    .contact
      .title
        padding-bottom 40rpx
      .way
        display flex
        justify-content space-between
        align-items center
        margin-bottom 30rpx
        .way-btn
          width 160rpx
          height 60rpx
          line-height 60rpx
          text-align center
          color #fff
          background #31B6FF
          border-radius 39rpx
          font-size 28rpx
</style>