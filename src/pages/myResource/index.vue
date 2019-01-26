<template>
  <div class="myResource">
    <van-tabs animated :border="false" >
      <van-tab title="正在解锁">
        <div class="resource-item" v-for="(article,index) in lockedResList" :key="index">
          <articleItem :showBorder="false" :articleData="article" />
          <button class="see-btn" @click="linkToReceiveRes(article.id,article.resourceVOList[0].id)">
            <img src="./save.png" alt="">
            继续完成
          </button>
        </div>
        <div class="no-resource" v-if="lockedResList.length===0">
          <img  src="http://image.steam001.com/no-resource.png" alt="">
          <p>您还没有在解锁的资源</p>
          <span @click="linkToIndex">去首页看看</span>
        </div>
      </van-tab>
      <van-tab title="已解锁">
        <div class="resource-item" v-for="(article,index) in unlockedResList" :key="index">
          <articleItem :showBorder="false" :articleData="article"/>
          <button class="see-btn" @click="linkToReceiveSuccess(article.resourceVOList[0].type,article.resourceVOList[0].id,article.resourceVOList[0].showVideoId)">
            <img src="./save.png" alt="">
            查看资源
          </button>
        </div>
        <div class="no-resource" v-if="unlockedResList.length===0">
          <img  src="http://image.steam001.com/no-resource.png" alt="">
          <p>您还没有已解锁的资源</p>
          <span @click="linkToIndex">去首页看看</span>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import articleItem from '@/components/articleItem'
  export default {
    data () {
      return {
        unlockedResList: [], // 已解锁
        lockedResList: []// 未解锁
      }
    },
    onLoad () {
      // wx.showNavigationBarLoading()
      this.$setNavigationBarTitle('我解锁的课程')
      this.getMyResource()
      this.getOngoingTask()
    },
    methods: {
      // 获取已解锁的资源
      getMyResource () {
        this.$http(this.$apis.getMyResource, {}).then(res => {
          this.unlockedResList = res.data || []
          console.log('this.unlockedResList', this.unlockedResList)
        })
      },
      // 获取正在解锁的资源
      getOngoingTask () {
        this.$http(this.$apis.getOngoingTask, {}).then(res => {
          this.lockedResList = res.data || []
          console.log('this.lockedResList', this.lockedResList)
        })
      },
      linkToReceiveRes (articleId, resourceId) {
        wx.navigateTo({
          url: `/pages/receiveResource/main?resourceId=${resourceId}&articleId=${articleId}`
        })
      },
      /**
     * resourceType 1:课程资源 2:直播资源 3:链接资源 4:实物
     */
      linkToReceiveSuccess (resourceType, resourceId, showVideoId) {
        return {
          1: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) },
          2: () => { wx.navigateTo({url: `/pages/living/main?id=${showVideoId}`}) },
          3: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) }
        }[resourceType]()
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

<style lang="stylus" scope>
.myResource
  padding 10rpx 25rpx
  .van-tabs__line
    background-color  #31B6FF
  .van-tab--active
    color #31B6FF
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
  .resource-item
    padding 18rpx 0rpx
    border-bottom 1px solid #eee
    .see-btn
      background #31B6FF
      color #fff
      height 80rpx
      line-height 80rpx
      margin-top 20rpx
      font-size 30rpx
      img
        width 30rpx
        height 30rpx
</style>