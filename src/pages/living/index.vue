<template>
  <div class="living">
    <div class="video-wrapper">
      <video :src="videoInfo.url" 
        @timeupdate="timeupdate" 
        danmu-btn="true"
        enable-danmu="true"
        :danmu-list="danmuList"
        id="myVideo"
      ></video>
    </div>
    <!-- <div class="send-danmu-wrapper">
      <input type="text" v-model="danmuValue">
      <span @click="sendDanmu">发送</span>
    </div> -->
    <div class="video-info">
      <img :src="videoInfo.teacherAvatar" alt="">
      <div class="info-desc">
        <p class="teacher">{{videoInfo.showTeacherName}}</p>
        <p class="video-introduce">{{videoInfo.name}}</p>

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
        <!-- <div v-if="currentQuestion">
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
            </div> -->
            <!-- <p v-show="userInfo.identity ===1 " class="tiwen-tip">点击回答这个学员</p> -->
            <!-- <p  class="tiwen-tip" @click="openDialog('reply',askIndex)">点击回答这个学员</p>
          </div>
        </div> -->
        <div v-if="currentQuestion">
          <div class="question-wrapper">
            <div class="item question">
              <p><span class="presenter">{{currentQuestion.teacherName}}(老师): </span>{{currentQuestion.content}}</p>
            </div>
            <p v-if="userInfo.identity === 1 "  class="tiwen-tip" @click="openDialog('ask')">对这段有问题？点击提问</p>
          </div>
          <div class="ask-wrapper" v-for="(askAndReply,askAndReplyIndex) in askAndReplyList" :key="askAndReplyIndex">
            <div class="item ask-and-replay">
              <p :class="[{ 'dashed-border': askAndReply.replyList.length > 0 }, 'ask-question']">
                <span class="asker">{{askAndReply.askUser}}:（提问）</span> {{askAndReply.content}}
              </p>
              <p class="reply-question" v-for="(reply,replyIndex) in askAndReply.replyList" :key="replyIndex">
                <span class="replyer"><span @click="openDialog('toOthers',replyIndex,reply,reply.fromUserId,reply.fromUserName)" :class="[{'colorRed':reply.identity === 2}]">{{reply.fromUserName}}</span> 回复 <span @click="openDialog('toOthers',replyIndex,reply,reply.toUserId,reply.toUserName)">{{reply.toUserName}}：</span></span>{{reply.content}}
              </p>
            </div> 
            <!-- <p v-if="userInfo.identity === 2 " class="tiwen-tip">点击回答这个学员</p> -->
            <p  class="tiwen-tip" @click="openDialog('reply',askAndReplyIndex,askAndReply)">点击回答这个学员</p>
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
  import { questionList } from './mock.js'
  export default {
    data () {
      return {
        userInfo: {}, // identity 1学生 2老师
        askAndReplyList: [],
        danmuValue: '',
        visible: false,
        avatar: 'http://img2.imgtn.bdimg.com/it/u=3453901106,1598529040&fm=26&gp=0.jpg',
        questionList: questionList,
        questionsList: [],
        inputValue: '', // 输入的问题 或者 输入的答案
        dialogTitle: '',
        placeholder: '',
        questionIndex: null,
        askIndex: null,
        videoUrl: 'http://resource.kaier001.com/zhongdiangong.mp4',
        currentQuestion: null,
        replyList: [], // 评论回复列表
        loadStatus: true, // 防止scrolltolower多次执行
        danmuList: [],
        videoInfo: {}
      }
    },
    onLoad () {
      this.getVideoById()
      this.userInfo = wx.getStorageSync('userInfo')
    },
    onReady () {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    methods: {
      async getVideoById () {
        let videoRes = await this.$http(this.$apis.getVideoById, {id: this.$root.$mp.query.id})
        this.videoInfo = videoRes.data
        let questionRes = await this.$http(this.$apis.getQuestionList, {videoId: this.videoInfo.id})
        this.questionsList = questionRes.data || []
      },
      // 解析生成评论回复列表
      analysisData (dataList) {
        let tempList = []
        dataList.map((item, index) => {
          let arr = []
          tempList.push({
            id: item.id,
            toUserId: item.toUserId,
            fromUserId: item.fromUserId,
            askUser: item.fromUserName,
            content: item.content,
            replyList: item.twiceReplySetList ? this.mapList(item.twiceReplySetList, arr) : []
          })
        })
        return tempList
      },
      // 递归取出树的节点 [{},{},{}]
      mapList (treeData, arr) {
        treeData.length > 0 && treeData.map(item => {
          console.log('item', item)
          arr.push({
            id: item.id,
            toUserId: item.toUserId,
            fromUserId: item.fromUserId,
            fromUserName: item.fromUserName,
            toUserName: item.toUserName,
            content: item.content,
            identity: item.identity
          })
          if (item.twiceReplySetList) {
            this.mapList(item.twiceReplySetList, arr)
          }
        })
        return arr
      },
      // 打开问题窗口
      openDialog (type, index, currentAskAndReply, toUserId, name) {
        this.inputValue = ''
        this.visible = true
        this.videoContext.pause()
        if (type === 'ask') {
          this.dialogTitle = '提问问题'
          this.placeholder = '请输入问题'
        } else if (type === 'reply') {
          this.dialogTitle = '回答问题'
          this.placeholder = '请输入答案'
          this.replyId = currentAskAndReply.id
          this.toUserId = currentAskAndReply.fromUserId
        } else if (type === 'toOthers') {
          this.toUserName = name
          this.toUserId = toUserId
          this.dialogTitle = `回复给${name}`
          this.placeholder = '输入内容'
          this.replyId = currentAskAndReply.id
        }
      },

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
        let params = {}
        if (this.dialogTitle === '提问问题') {
          params = {
            questionId: this.currentQuestion.id,
            toUserId: this.currentQuestion.userId,
            videoId: this.videoInfo.id,
            content: this.inputValue
          }
        } else {
          params = {
            questionId: this.currentQuestion.id,
            toUserId: this.toUserId,
            videoId: this.videoInfo.id,
            content: this.inputValue,
            replyId: this.replyId
          }
        }
        this.$http(this.$apis.addReply, params).then(res => {
          if (res.code === 200) {
            this.getReplyListByQueId(this.currentReplyId)
            this.visible = false
            this.videoContext.play()
          }
        })
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
      sendDanmu () {
        this.videoContext.sendDanmu({
          text: this.danmuValue,
          color: this.getRandomColor()
        })
      },
      // 根据问题id和视频id获取问题和回复列表
      getReplyListByQueId (id) {
        let params = { questionId: id, videoId: this.videoInfo.id }
        this.$http(this.$apis.getReplyList, params).then(res => {
          if (res.data) {
            this.askAndReplyList = this.analysisData(res.data)
          } else {
            this.askAndReplyList = []
          }
          console.log('this.askAndReplyList', this.askAndReplyList)
        })
      },
      // 监听视频播放进度
      timeupdate (e) {
        const { mp } = e
        this.currentTime !== parseInt(mp.detail.currentTime) && this.questionsList.map((item, index) => {
          if (item.timePoint === parseInt(mp.detail.currentTime)) {
            this.currentTime = parseInt(mp.detail.currentTime)
            this.currentQuestion = item
            this.getReplyListByQueId(item.id)
            this.currentReplyId = item.id
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
              color #000
            .colorRed
              color #FF0036
</style>