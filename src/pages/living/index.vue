<template>
  <div class="living">
    <div class="video-wrapper">
      <video src=""></video>
    </div>
    <div class="video-info">
      <img :src="avatar" alt="">
      <div class="info-desc">
        <p class="teacher">大树</p>
        <p class="video-introduce">蒙德里安各自话长对方的说法水电费是的水电费蒙德里安各自话长对方的说法水电费是的水电费</p>
      </div>
    </div>
    <div class="main-wrapper">
      <div v-for="(item,index1) in questionList" :key="index1">
        <div class="question-wrapper">
          <div class="item question">
            <p><span class="presenter">{{item.teacher}}(老师)</span>{{item.question}}</p>
          </div>
          <p v-show="userInfo.identity === 0 "  class="tiwen-tip" @click="ask(index1)">对这段有问题？点击提问</p>
        </div>
        <div class="ask-wrapper" v-for="(ask,index2) in item.askList" :key="index2">
          <div class="item ask-and-replay">
            <p :class="[{ 'dashed-border': ask.replyList.length > 0 }, 'ask-question']">
              <span class="asker">{{ask.asker}}：（提问）</span> {{ask.text}}
            </p>
            <p class="reply-question" v-for="(reply,index3) in ask.replyList" :key="index3">
              <span class="replyer">{{reply.replyer}}老师答复：</span>{{reply.text}}
            </p>
          </div>
          <p v-show="userInfo.identity ===1 " class="tiwen-tip">点击回答这个学员</p>
        </div>
      </div>
    </div>
    <van-dialog
        :title="dialogTitle"
        use-slot
        :closeOnClickOverlay="true"
        :asyncClose="true"
        :show="visible"
        show-cancel-button
        @confirm="submit"
        @cancel=" visible = false "
      >
        <van-field
          :value="inputValue"
          label="问题"
          :placeholder="placeholder"
          @change="onChange"
        />
    </van-dialog>
  </div>
</template>

<script>
  import questionList from './mock.js'
  export default {
    data () {
      return {
        visible: false,
        avatar: 'http://img2.imgtn.bdimg.com/it/u=3453901106,1598529040&fm=26&gp=0.jpg',
        questionList: questionList,
        userInfo: {
          identity: 0 // 1 老师 0 学生
        },
        inputValue: '', // 输入的问题 或者 输入的答案
        dialogTitle: '',
        placeholder: '',
        questionIndex: null
      }
    },
    methods: {
      ask (index) {
        this.inputValue = ''
        this.visible = true
        this.dialogTitle = '提问问题'
        this.placeholder = '请输入问题'
        this.questionIndex = index
      },
      replay () {
        this.inputValue = ''
        this.visible = true
        this.dialogTitle = '回答问题'
        this.placeholder = '请输入答案'
      },
      onChange (event) {
        const { mp } = event
        this.inputValue = mp.detail
      },
      submit (e) {
        if (!this.inputValue) {
          e.mp.detail.dialog.stopLoading()
          wx.showToast({
            title: '请输入内容',
            icon: 'none'
          })
          return false
        }
        const { questionIndex } = this
        const askQuestionItem = {
          asker: '凯尔',
          text: this.inputValue,
          replyList: []
        }
        this.questionList[questionIndex].askList.push(askQuestionItem)
        this.visible = false
      }
    }
  }
</script>

<style lang="stylus">
  page
    background #efeff4
  .living
    font-size 28rpx
    .video-wrapper
      width 100%
      height 420rpx
      video
        height 100%
        width 100%
    .video-info
      display flex
      align-items center
      height 130rpx
      padding 0 24rpx
      background #fff
      img
        width 80rpx
        height 80rpx
        border-radius 50%
      .info-desc
        margin-left 30rpx
        .teacher
          font-size 30rpx
          color #4B6996
          padding-bottom 10rpx
        .video-introduce
          width 590rpx
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
    .main-wrapper
      padding 24rpx
      .tiwen-tip
        color #FF0036
        text-align right 
        padding-bottom 10rpx
      .item
        width 700rpx
        padding 20rpx 10rpx
        margin-bottom 20rpx
        box-sizing border-box
        border-radius 4rpx
        .dashed-border
          border-bottom 1rpx dashed #000
        &.question
          background #565A5E 
          color #FFFFFF
          p
            line-height 40rpx  
        &.ask-and-replay
          background #fff
          p
            line-height 40rpx  
          .ask-question
            padding-bottom 14rpx
            .asker
              color #31B6FF
          .reply-question
            padding-top 14rpx
            .replyer
              color #FF0036
</style>