<template>
  <div class="receive-success">
    <div class="banner">
      <img :src="banner" alt="">
    </div>
    <div class="receive-info">
      <h1 class="title">资料领取成功</h1>
      <p>您领取的资料已发送至您的玩物星球账号中</p>
      <p>您的账号为：xxxxxxxxxxx</p>
      <p>初始密码为：xxxxxx</p>
      <p>请前往玩物星球官网：www.steam001.com使用</p>
      <p class="tip">下滑查看使用流程</p>
    </div>
    <div class="use-explain">
      <img :src="explain" />
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banner: 'http://image.steam001.com/xcx_resourcegitf_get.jpg',
        explain: 'http://image.steam001.com/xcx_resourcegetpage_img_howtouse.png'
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('领取资料')
    },
    methods: {

    }
  }
</script>

<style lang="stylus">
page{
  background #4f2b11
}
.receive-success
  .banner
    width 100%
    height 520rpx
    img
      width 100%
      height 100%
  .receive-info
    width 690rpx
    height 520rpx
    padding 0 48rpx
    margin 0 auto
    border 5rpx solid #281303
    border-radius 10rpx
    box-sizing border-box
    background #FFFFFF
    transform translateY(-138rpx)
    .title
      text-align center
      font-size 48rpx
      padding 40rpx 0
    p
      font-size 28rpx
      padding-bottom 14rpx
    p:nth-child(1)
      padding-bottom 28rpx
    .tip
      color #FF0036 
      padding-top 28rpx
  .use-explain
    width 690rpx
    height 1382rpx
    margin 0 auto 
    transform translateY(-120rpx)
    img
      width 100%
      height 100%
</style>