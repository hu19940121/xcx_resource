<template>
  <div class="giftPackage">
    <div class="no-resource">
      <img  src="http://image.steam001.com/no-gift.png" alt="">
      <p>礼包上架中，敬请期待</p>
      <span @click="linkToIndex">去首页看看</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    onLoad () {
      this.$setNavigationBarTitle('新人礼包')
    },
    methods: {
      // 跳转至首页
      linkToIndex () {
        wx.reLaunch({
          url: '/pages/index/main'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.giftPackage
  .no-resource
    width 100%rpx
    margin-top 212rpx
    text-align center
    font-size 30rpx
    color #66656A 
    p
      line-height 60rpx
    img
      width 264rpx
      height 264rpx
    span
      color #31B6FF 
</style>