<template>
  <div class="receiveRes">
    <div class="banner">
      <img src="./images/page_task.png" alt="">
    </div>
    <div class="menu-list">
      <div class="menu">
        <img class="icon" src="./images/task_icon_get.png" alt="">
        <div class="menu-desc">
          <p class="color-red">领取本节所有资料</p>
          <p class="color-red">完成任务领取</p>
        </div>
        <span class="tip btn btn-red" @click=" visible = true ">前往领取</span>
      </div>
      <div class="menu">
        <img class="icon" src="./images/task_icon_shortvip.png" alt="">
        <div class="menu-desc">
          <p>玩物星球短期会员</p>
          <p>送xx课时xx</p>
        </div>
        <span class="tip btn">前往开通</span>
      </div>
      <div class="menu">
        <img class="icon" src="./images/task_icon_yeartvip.png" alt="">
        <div class="menu-desc">
          <p>玩物星球短期会员</p>
          <p>送xx课时xx</p>
        </div>
        <span class="tip btn">前往开通</span>
      </div>
      <div class="menu">
        <img class="icon" src="./images/task_icon_online.png" alt="">
        <div class="menu-desc">
          <p>购买在线课程</p>
          <p>该资源所属的完整课程</p>
        </div>
        <span class="tip btn">前往购买</span>
      </div>
      <div class="menu" @click="linkToCooperate">
        <img class="icon" src="./images/task_icon_pass.png" alt="">
        <div class="menu-desc">
          <p>合作授权</p>
          <p>xxxxx</p>
        </div>
        <span class="tip btn">联系我们</span>
      </div>
    </div>
    <van-dialog
      :closeOnClickOverlay="true"
      use-slot
      async-close
      :showConfirmButton="false"
      :show="visible"
      @close="onClose"
      >
      <div class="lq-dialog">
        <h1 class="title">完成以下任务免费领取资源</h1>
        <div class="task">
          <img src="./images/popup_icon_share.png" alt="">
          <div class="task-desc">
            <p>分享文章至3个群</p>
            <span v-if="shareStatus === 0">0/3</span>
            <span v-else>3/3</span>
          </div>
          <span class="share" @click="goShare" >
            去分享
          </span>
        </div>
        <div class="task-flow">
          <p class="flow-title">
            任务流程：
          </p>
          <p>1.分享好友(将文章分享至群)</p>
          <p>2.好友点击(好友点击查看文章)</p>
          <p>3.分享好友(将文章分享至群)</p>
        </div>
        <button class="lq-btn" @click="lq">分享任务领取</button>
      </div>
    </van-dialog>
    <!-- <van-dialog id="van-dialog" /> -->
  </div>
</template>

<script>
// import Dialog from '@/../static/vant/dialog/dialog'
export default {
  data () {
    return {
      visible: false,
      shareStatus: 0 // 分享状态
    }
  },
  methods: {
    linkToCooperate () {
      wx.navigateTo({
        url: '/pages/cooperation/main'
      })
    },
    onClose () {
      this.visible = false
    },
    onClosed () {

    },
    goShare () {
      console.log('share')

      this.shareStatus = 1
    },
    lq () {
      if (this.shareStatus !== 1) {
        wx.showToast({
          title: '你还没有完成任务哦~ 还不能领取',
          icon: 'none'
        })
        return false
      }
      wx.showLoading({
        title: '领取中...'
      })
      setTimeout(() => {
        wx.hideLoading()
        this.visible = false
        wx.navigateTo({
          url: '/pages/living/main'
        })
      }, 3000)
    }
  }
}
</script>

<style lang="stylus">
  page{
    background-color: #e9f2f9 ;
  }
  .receiveRes
    .banner
      width 100%
      height 500rpx
      img
        width 100%
        height 100%
    .menu-list
      margin-top -72rpx
      padding 20rpx 30rpx
      .menu
        position relative
        display flex
        align-items center
        width 690rpx
        height 200rpx
        padding-left 18rpx
        margin-bottom 28rpx
        box-sizing border-box
        border-radius 10rpx
        box-shadow  0 0 10rpx 0 rgba(0,0,0,0.11)
        background #fff
        img
          width 100rpx
          height 100rpx
        .menu-desc
          padding-left 20rpx
          p:nth-child(1)
            font-size 30rpx
            color #000
          p:nth-child(2)
            font-size 24rpx
            color #999999
            margin-top 10rpx
          .color-red
            color red
        .tip
          position absolute
          top 70rpx
          right 34rpx
          background #31B6FF
          &.btn
            width 170rpx
            height 60rpx
            line-height 60rpx
            text-align center
            color #fff
            border-radius 56rpx
            font-size 20rpx
            &.btn-red
              background #FF0036 
    .lq-dialog
      width 90%
      padding 10rpx 5%
      height 670rpx
      // box-sizing border-box
      font-size 28rpx
      .title
        padding 46rpx 0
        font-size 40rpx
        text-align center
        color #31B6FF
      .task
        display flex
        align-items center
        padding-bottom 30rpx
        border-bottom 2rpx solid #CCCCCC
        img
          width 86rpx
          height 86rpx
        .task-desc
          margin-left 10rpx
          width 400rpx
          span
            color #999
            font-size 24rpx
        .share
          width 150rpx
          height 70rpx
          text-align center
          line-height 70rpx
          border 2px solid #31B6FF;
          border-radius 53rpx
          color #31B6FF
      .task-flow
        margin-top 10rpx
        p
          padding 14rpx 0 
      .lq-btn
        margin-top 34rpx
        background #31B6FF;
        box-shadow 0 10rpx 0 0 #00A5DF;
        border-radius 12rpx
        color #fff
</style>