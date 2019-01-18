<template>
  <div class="container">
      <button @click="linkToDetail">进入商品详情</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    linkToDetail () {
      wx.navigateTo({
        url: '/pages/goodsDetail/main?id=2'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  .avatar
    width 100rpx
    height 100rpx
    border-radius 50%
</style>
