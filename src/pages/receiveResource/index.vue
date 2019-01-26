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
        <!-- <span v-if="userInfo.phone" class="tip btn btn-red" @click="openTaskDialog">前往领取</span> -->
        <form @submit="formSubmit" report-submit="true">
          <!-- <button formType="submit">发送模板消息</button> -->
          <button formType="submit"  class="tip btn btn-red">前往领取</button>
        </form>
        <!-- <button v-else class="tip btn btn-red" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">前往领取</button> -->
      </div>
      <!-- <div class="menu">
        <img class="icon" src="./images/task_icon_shortvip.png" alt="">
        <div class="menu-desc">
          <p>玩物星球短期会员</p>
          <p>送xx课时xx</p>
        </div>
        <span class="tip btn">前往开通</span>
      </div> -->
      <div class="menu">
        <img class="icon" src="./images/task_icon_yeartvip.png" alt="">
        <div class="menu-desc">
          <p>玩物星球年度会员</p>
          <p>送xx课时xx</p>
        </div>
        <span class="tip btn" @click="linkToForm">前往开通</span>
      </div>
      <!-- <div class="menu">
        <img class="icon" src="./images/task_icon_online.png" alt="">
        <div class="menu-desc">
          <p>购买在线课程</p>
          <p>该资源所属的完整课程</p>
        </div>
        <span class="tip btn">前往购买</span>
      </div> -->
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
      :show="taskDialogvisible"
      @close="taskDialogvisible = false"
      >
      <div class="lq-dialog">
        <h1 class="title">完成以下任务免费领取资源</h1>
        <div class="task">
          <img src="./images/popup_icon_share.png" alt="">
          <div class="task-desc">
            <p>{{taskInfo.name}}</p>
            <span>{{taskInfo.progress ? taskInfo.progress  : 0 }}/{{taskInfo.condition}}</span>
            <!-- <span v-else>3/3</span> -->
          </div>
          <span v-if="taskInfo.taskStatus" class="share">已完成</span>
          <div v-else>
            <button v-if="taskInfo.type === 1"  class="share" open-type="share" >
              去分享
            </button>
            <button v-if="taskInfo.type === 2" class="share" @click="linkToCreatePoster" >
              生成海报
            </button>
          </div>
        </div>
        <div class="task-flow">
          <p class="flow-title">
            任务流程：
          </p>
          <p v-if="taskInfo.type === 1">点击去分享，分享至三个群，即可完成任务</p>
          <p v-if="taskInfo.type === 2">点击按钮生成海报分享至朋友圈，三个好友通过海报关注服务号，即可完成任务</p>
          <!-- <p>2.好友点击(好友点击查看文章)</p>
          <p>3.分享好友(将文章分享至群)</p> -->
        </div>
        <button class="lq-btn"  @click="receive">领取</button>
        <!-- <button class="lq-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">分享任务领取</button> -->
      </div>
    </van-dialog>
    <van-dialog
      :closeOnClickOverlay="true"
      use-slot
      async-close
      confirmButtonOpenType='getPhoneNumber'
      :show="phoneDialogVisible"
      @close="phoneDialogVisible = false"
      @getphonenumber = 'getPhoneNumber'
      >
      <p class="tips">'玩物立志'需要获取您的手机号</p>
    </van-dialog>
    <!-- <van-dialog id="van-dialog" /> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { showModal } from '../../utils/index.js'
export default {
  data () {
    return {
      taskRate: 0, // 任务进度
      phoneDialogVisible: false, // 授权获取电话号码弹窗
      taskDialogvisible: false,
      userInfo: {},
      taskInfo: {} // type: 1 分享任务 2 关注任务
      // shareStatus: 0 // 分享状态
    }
  },
  onLoad () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.getTaskListByResourceIds()
  },
  methods: {
    ...mapActions(['getUserInfo']),
    linkToCooperate () {
      wx.navigateTo({
        url: '/pages/cooperation/main'
      })
    },
    linkToForm () {
      wx.navigateTo({
        url: '/pages/form/main'
      })
    },
    linkToCreatePoster () {
      const { resourceId, articleId } = this.$root.$mp.query
      let params = {
        resourceId,
        articleId,
        taskId: this.taskInfo.id
      }
      this.taskDialogvisible = false
      wx.navigateTo({
        url: `/pages/createPoster/main?params=${JSON.stringify(params)}`
      })
    },
    //  消息模板推送
    formSubmit  (e) {
      const { mp } = e
      let params = {fromId: mp.detail.formId}
      this.$http(this.$apis.testSend, params).then(res => {
        console.log(res)
      })
      this.openTaskDialog()
    },
    getPhoneNumber (e) {
      const { mp } = e
      if (mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.login({
          success: (res) => {
            // 调用后台接口解密获得手机号
            const params = {
              code: res.code,
              encryptedData: mp.detail.encryptedData,
              iv: mp.detail.iv
            }
            this.$http(this.$apis.getPhoneNumber, params).then(res => {
              this.getUserInfo()
              this.taskDialogvisible = true
            })
          }
        })
      } else {
        showModal('请同意获取您的手机号哦~')
      }
    },
    // 当用户拥有该任务，第二次或者第n次进入时，取得该任务的进度
    getUserTaskDetail () {
      const { resourceId, articleId } = this.$root.$mp.query
      const params = {
        resourceId,
        articleId,
        taskId: this.taskInfo.id
      }
      this.$http(this.$apis.getUserTaskDetail, params).then(res => {
        if (res.data) {
          this.taskInfo.progress = res.data.progress
          this.taskInfo.taskStatus = res.data.taskStatus
          // this.taskInfo.resourceId = res.data.resourceId
          // this.taskInfo.resourceType = res.data.resourceType
        }
      })
    },
    // 获取任务
    getTaskListByResourceIds () {
      console.log()
      const params = {resourceIds: this.$root.$mp.query.resourceId}
      this.$http(this.$apis.getTaskListByResourceIds, params).then((res) => {
        this.taskInfo = res.data[0]
        this.getUserTaskDetail()
      })
    },
    // 打开任务弹窗
    openTaskDialog () {
      this.taskDialogvisible = true
    },
    receive () {
      const { taskInfo } = this
      const { resourceId, articleId } = this.$root.$mp.query
      if (!taskInfo.taskStatus) { // taskStatus 0 没有完成任务 1已完成任务
        wx.showToast({
          title: '你还没有完成任务哦~ 还不能领取',
          icon: 'none'
        })
        return false
      }
      const params = {
        resourceId,
        articleId
      }
      this.$http(this.$apis.receiveResource, params).then(res => {
        if (res.code === 200) {
          this.taskDialogvisible = false
          wx.showToast({
            title: '领取成功!'
          })
          this.linkToResourceDeatail(res.data.type, res.data.id, res.data.showVideoId)
        }
      })
    },
    /**
     * resourceType 1:课程资源 2:直播资源 3:链接资源 4:实物
     */
    linkToResourceDeatail (resourceType, resourceId, showVideoId) {
      return {
        1: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) },
        2: () => { wx.navigateTo({url: `/pages/living/main?id=${showVideoId}`}) },
        3: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) }
      }[resourceType]()
    },
    // 分享成功
    shareTaskSuccess () {
      const { resourceId, articleId } = this.$root.$mp.query
      const params = {
        resourceId,
        articleId,
        taskId: this.taskInfo.id
      }
      this.$http(this.$apis.shareTaskSuccess, params).then(res => {
        this.taskInfo.progress = res.data.progress
        this.taskInfo.taskStatus = res.data.taskStatus
        // this.taskInfo.resourceId = res.data.resourceId
        // this.taskInfo.resourceType = res.data.resourceType
        // console.log(res)
      })
    }
  },
  // 分享
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // this.taskRate += 1
      this.shareTaskSuccess()
    }
    return {
      title: '自定义转发标题',
      path: `/pages/resourceDetail/main?id=${this.$root.$mp.query.articleId}`
    }
  }
}
</script>

<style lang="stylus">
  page{
    background-color: #e9f2f9 ;
  }
  .receiveRes
    .tips
      width 80%
      margin 0 auto
      padding  30rpx 0
      text-align center
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
      padding 0 5%
      padding-bottom 50rpx
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
          height 74rpx
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
          font-size 20rpx
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