<template>
  <div :class="['article-item', {'border-bottom':showBorder},]" @click="linkToDetail">
    <div class="item-left">
      <p class="title">{{articleData.title}}</p>
      <p class="content" v-html="content"></p>
      <p class="at" >
        <span class="category" v-for="(item,index) in articleData.categoryVOList" :key="index">
          #{{item.name}}#
        </span>
      </p>
    </div>
    <div class="item-right">
      <img :src="articleData.thumbnailUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBorder: {
      type: Boolean,
      default: true
    },
    articleData: {
      type: Object,
      default: {
      }
    }
  },
  onLoad () {

  },
  methods: {
    linkToDetail () {
      wx.navigateTo({
        url: `/pages/resourceDetail/main?id=${this.articleData.id}`
      })
    }
  },
  computed: {
    content () {
      // console.log('删除img标签后的文章', this.articleData.content.replace(/<img.*?\/>/g, ''))
      return this.articleData.content.replace(/<img.*?>/g, '')
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