<template>
  <div class="myResource">
    <div class="resource-item" v-for="(item,index) in list" :key="index">
      <articleItem :showBorder="false" />
      <button class="see-btn" @click="linkToRecSuccess(index)">
        <img src="./save.png" alt="">
        查看资源
      </button>
    </div>
  </div>
</template>

<script>
  import articleItem from '@/components/articleItem'
  export default {
    data () {
      return {
        list: [1, 1, 1, 1, 1]
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('我解锁的课程')
    },
    methods: {
      linkToRecSuccess (index) {
        if (index % 2 === 0) {
          wx.navigateTo({
            url: '/pages/receiveSuccess/main'
          })
        } else {
          wx.navigateTo({
            url: '/pages/living/main'
          })
        }
      }
    },
    components: {
      articleItem
    }
  }
</script>

<style lang="stylus" scoped>
.myResource
  padding 10rpx 25rpx
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