<template>
  <div class="resourceCate">
    <div :style="'background:url('+ cateInfo.image + ') no-repeat;background-size:cover;'" class="banner">
      <span class="cate-name">
        {{cateInfo.name}}
      </span>
      <div class="shadow"></div>
    </div>
    <div class="resource-list">
      <articleItem v-for="(article,index) in articleList" :key="index" :articleData="article" />
      <div class="no-resource" v-if="articleList.length === 0">
        <img src="http://image.steam001.com/no-resource-cate.png" alt="">
        <p>资源上架中，敬请期待</p>
        <span @click="linkToIndex">看看其他资源</span>
      </div>
    </div>
  </div>
</template>

<script>
  import articleItem from '@/components/articleItem'
  export default {
    data () {
      return {
        pageNum: 1,
        pageSize: 5,
        articleList: [],
        cateInfo: {}
      }
    },
    onLoad () {
      this.getArticleListByIconId()
    },
    methods: {
      getArticleListByIconId () {
        let params = {
          iconId: this.$root.$mp.query.id,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$http(this.$apis.getArticleListByIconId, params).then(res => {
          this.cateInfo = res.data[0]
          this.$setNavigationBarTitle(this.cateInfo.name)
          // const { articleVOPageInfo } = this.cateInfo
          // const { isLastPage } = articleVOPageInfo
          // let articleListTem = this.articleList
          // if (res.code === 200) {
          //   if (this.pageNum === 1) {
          //     articleListTem = []
          //   }
          //   let articleList = articleVOPageInfo.list || []
          //   if (isLastPage) { // 如果是最后一页
          //     this.articleList = articleListTem.concat(articleList)
          //     this.hasMoreData = false
          //   } else {
          //     this.articleList = articleListTem.concat(articleList)
          //     this.hasMoreData = true
          //     this.pageNum = this.pageNum + 1
          //   }
          // }
          this.articleList = this.cateInfo.articleVOList || []
          console.log('this.articleList', this.articleList)
        })
      },
      // 跳转至首页
      linkToIndex () {
        wx.reLaunch({
          url: '/pages/index/main'
        })
      }
    },
    components: {
      articleItem
    }
  }
</script>

<style lang="stylus" scoped>
.resourceCate
  .banner
    display flex
    justify-content center
    align-items center
    position relative
    width 100%
    height 227rpx
    .cate-name
      width 310rpx
      height 89rpx
      text-align center
      line-height 89rpx
      border 3rpx solid #fff
      font-size 36rpx
      color #fff
      z-index 1
    .shadow
      position absolute
      top 0
      width 100%
      height 100%
      background rgba(0,0,0,0.5)
  .resource-list
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