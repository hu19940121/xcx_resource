<template>
  <div :class="['article-item', {'border-bottom':showBorder},]" @click="linkToDetail">
    <div class="item-left">
      <p class="title">资源列表01的标题，资源列表01的标题，标题的长度就这么多字，多了省略资源列表01的标题，标题的长度就这么多字，多了省略标题的长度就这么多字，多了省略.........</p>
      <p class="content">最近直播01的预览。内容只有两行，在这个位置的时候就可以打省略号了最近直播01的预览。内容只有两行，在这个位置的时候就可以打省略号了</p>
      <p class="at">#老师有话说#  #乐高编程#</p>
    </div>
    <div class="item-right">
      <img src="../pages/index/images/wx.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBorder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    linkToDetail () {
      wx.navigateTo({
        url: '/pages/resourceDetail/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .article-item
    display flex
    justify-content space-between
    width 700rpx
    margin 0 auto
    padding 10rpx
    padding-top 20rpx
    &.border-bottom
      border-bottom 1px solid #eee
    .item-left
      width 454rpx
      .title
        margin-bottom 20rpx
        font-size 30rpx
        word-break break-all
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
      .content
        margin-bottom 20rpx
        font-size 26rpx
        color #888888
        word-break break-all
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
      .at
        font-size 24rpx
        color #888888
    .item-right
      img
        margin-top 20rpx
        width 180rpx
        height 180rpx
</style>