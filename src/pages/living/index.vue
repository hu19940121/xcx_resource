<template>
  <div class="living">
    <div class="video-wrapper">
      <video :src="videoUrl" 
        @timeupdate="timeupdate" 
        danmu-btn="true"
        enable-danmu="true"
        :danmu-list="danmuList"
        id="myVideo"
      ></video>
    </div>
    <div class="send-danmu-wrapper">
      <input type="text" v-model="danmuValue">
      <span @click="sendDanmu">发送</span>
    </div>
    <div class="video-info">
      <img :src="avatar" alt="">
      <div class="info-desc">
        <p class="teacher">大树</p>
        <p class="video-introduce">蒙德里安各自话长对方的说法水电费是的水电费蒙德里安各自话长对方的说法水电费是的水电费</p>

      </div>
    </div>
    <!-- <input type="text" v-model="danmuValue"><button @click="sendDanmu">发送</button> -->
    <scroll-view
      scroll-y
      class="scroll-style"
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <div class="main-wrapper">
        <!-- <div v-for="(item,index1) in questionList" :key="index1">
          <div class="question-wrapper">
            <div class="item question">
              <p><span class="presenter">{{item.teacher}}(老师)：</span>{{item.question}}</p>
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
            </div> -->
            <!-- <p v-show="userInfo.identity ===1 " class="tiwen-tip">点击回答这个学员</p> -->
            <!-- <p  class="tiwen-tip" @click="replay(index1,index2)">点击回答这个学员</p>
          </div>
        </div> -->
        <div v-if="currentQuestion">
          <div class="question-wrapper">
            <div class="item question">
              <p><span class="presenter">{{currentQuestion.teacher}}(老师)</span>{{currentQuestion.question}}</p>
            </div>
            <p v-show="userInfo.identity === 0 "  class="tiwen-tip" @click="openDialog('ask',index1)">对这段有问题？点击提问</p>
          </div>
          <div class="ask-wrapper" v-for="(ask,askIndex) in currentQuestion.askList" :key="askIndex">
            <div class="item ask-and-replay">
              <p :class="[{ 'dashed-border': ask.replyList.length > 0 }, 'ask-question']">
                <span class="asker">{{ask.asker}}：（提问）</span> {{ask.text}}
              </p>
              <p class="reply-question" v-for="(reply,replyIndex) in ask.replyList" :key="replyIndex">
                <span class="replyer">{{reply.replyer}}老师答复：</span>{{reply.text}}
              </p>
            </div>
            <!-- <p v-show="userInfo.identity ===1 " class="tiwen-tip">点击回答这个学员</p> -->
            <p  class="tiwen-tip" @click="openDialog('reply',askIndex)">点击回答这个学员</p>
          </div>
        </div>
      </div>
    </scroll-view>

    <van-dialog
        :title="dialogTitle"
        use-slot
        :closeOnClickOverlay = "true"
        :asyncClose = "true"
        :show = "visible"
        show-cancel-button
        @confirm = "submit"
        @cancel="onCancel"
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
        danmuValue: '',
        visible: false,
        avatar: 'http://img2.imgtn.bdimg.com/it/u=3453901106,1598529040&fm=26&gp=0.jpg',
        questionList: questionList,
        userInfo: {
          identity: 0 // 1 老师 0 学生
        },
        inputValue: '', // 输入的问题 或者 输入的答案
        dialogTitle: '',
        placeholder: '',
        questionIndex: null,
        askIndex: null,
        videoUrl: 'http://resource.kaier001.com/zhongdiangong.mp4',
        currentQuestion: null,
        loadStatus: true, // 防止scrolltolower多次执行
        danmuList: [
          {
            text: '哈哈哈哈',
            color: '#ff0000',
            time: 1
          },
          {
            text: '我看到你了哦',
            color: '#ff00ff',
            time: 3
          }]
      }
    },
    onLoad () {
    },
    onReady () {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    methods: {
      openDialog (type, index) {
        this.inputValue = ''
        this.visible = true
        this.videoContext.pause()
        if (type === 'ask') {
          this.dialogTitle = '提问问题'
          this.placeholder = '请输入问题'
          this.questionIndex = index
        } else {
          this.dialogTitle = '回答问题'
          this.placeholder = '请输入答案'
          this.askIndex = index
        }
      },
      // replay (questionIndex, askIndex) {
      //   this.inputValue = ''
      //   this.visible = true
      //   this.dialogTitle = '回答问题'
      //   this.placeholder = '请输入答案'
      //   this.askIndex = askIndex
      //   this.questionIndex = questionIndex
      // },
      // replay (askIndex) {

      // },
      onCancel () {
        this.videoContext.play()
        this.visible = false
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
        // const { questionIndex, askIndex } = this
        const { askIndex } = this
        if (this.dialogTitle === '提问问题') {
          const askQuestionItem = {
            asker: '凯尔',
            text: this.inputValue,
            replyList: []
          }
          // questionList[questionIndex].askList.push(askQuestionItem)
          this.currentQuestion.askList.push(askQuestionItem)
        } else {
          const replayItem = {
            replyer: '凯尔',
            text: this.inputValue
          }
          // questionList[questionIndex].askList[askIndex].replyList.push(replayItem)
          this.currentQuestion.askList[askIndex].replyList.push(replayItem)
        }
        this.visible = false
        this.videoContext.play()
      },
      // 滚动条到达底部
      lower () {
        if (this.loadStatus) {
          this.loadStatus = false
          setTimeout(() => {
            console.log('solve')
            this.loadStatus = true
          }, 100)
        }
      },
      // 获取随机颜色
      getRandomColor () {
        let rgb = []
        for (let i = 0; i < 3; i++) {
          let color = Math.floor(Math.random() * 256).toString(16)
          color = color.length === 1 ? '0' + color : color
          rgb.push(color)
        }
        return '#' + rgb.join('')
      },
      sendDanmu () {
        this.videoContext.sendDanmu({
          text: this.danmuValue,
          color: this.getRandomColor()
        })
      },
      // 监听视频播放进度
      timeupdate (e) {
        const { mp } = e
        console.log('mp.detail.currentTime', parseInt(mp.detail.currentTime))
        questionList.map((item, index) => {
          if (item.time === parseInt(mp.detail.currentTime)) {
            this.currentQuestion = item
          }
        })
      }
    },
    computed: {
  
    }
  }
</script>

<style lang="stylus">
  page
    background #efeff4
  .living
    font-size 28rpx
    overflow hidden
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
    .scroll-style
      height 666rpx
    .send-danmu-wrapper
      width 100%
      height 56rpx
      padding 14rpx
      padding-top 39rpx
      display flex
      align-items center
      justify-content space-between
      background #fff
      box-sizing border-box
      input
        width 500rpx
        height 60rpx
        background #eee
        border-radius 30rpx
      span
        margin-right 40rpx
        padding 10rpx
        border-radius 10rpx
        border 1px solid green
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