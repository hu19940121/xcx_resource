<template>
  <div class="createPoster">
    <div v-if="!settingVisible && erCodeImg">
      <painter dirty :customStyle="customStyle" @imgOK="imgOK" @imgErr="imgERR" :palette="template" />
      <div class="btn-wrapper">
        <button class="btn btn-save" @click="savePoster">
          保存到手机
        </button>
        <button class="btn btn-share" >
          分享图片
        </button>
      </div>
    </div>
    <van-dialog
      :closeOnClickOverlay="true"
      use-slot
      async-close
      confirmButtonOpenType='openSetting'
      @opensetting='openSetting'
      :show="settingVisible"
      @close="onClose"
      >
      <p class="tips">'玩物立志'需要保存图片或者视频到你的相册</p>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      erCodeImg: '',
      settingVisible: false,
      posterPath: '',
      customStyle: '',
      template: {
        width: '600rpx',
        height: '1080rpx',
        background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547993240392&di=5eff48880589ff361b3938b2e8e6bad9&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F341%2F00958.jpg',
        views: [
          {
            type: 'text',
            text: '中间的文字sdasdasd萨达萨达所',
            css: {
              top: '60rpx',
              left: '300rpx',
              align: 'center',
              fontSize: '30rpx',
              color: '#fff'
            }
          }
          // {
          //   type: 'text',
          //   text: "mode: 'aspectFill' 或 无",
          //   css: {
          //     left: '210rpx',
          //     fontSize: '30rpx',
          //     top: '290rpx'
          //   }
          // },
        ]
      }
    }
  },
  onLoad () {
    this.getErcode()
  },
  methods: {
    onClose () {
      this.settingVisible = false
    },
    save () {
      console.log('on save click')
    },
    imgOK (e) {
      this.posterPath = e.mp.detail.path
      console.log('e', e.mp)
    },
    imgERR (e) {
      console.log(e)
    },
    openSetting (e) {
    },
    savePoster () {
      const { posterPath } = this
      wx.saveImageToPhotosAlbum({
        filePath: posterPath,
        success: res => {
          wx.showModal({
            title: '分享二维码已保存到系统相册',
            content: '快去分享给朋友，让更多的朋友发现这里的美好',
            success: res => console.log(res),
            error: err => console.log(err)
          })
        },
        fail: err => {
          // 如果失败 则就认为用户点击了取消授权保存相册操作（暂时处理）
          console.log(err)
          console.log('打开设置窗口')
          this.settingVisible = true
          // if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
          //   console.log('打开设置窗口')
          //   this.settingVisible = true
          // }
        }
      })
      // this.template = {} // 重置,下次点击生成时重新生成
    },
    getErcode () {
      wx.showLoading({
        title: '获取二维码中'
      })
      setTimeout(() => {
        wx.hideLoading()
        this.erCodeImg = 'ssss'
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.createPoster
  padding 0 76rpx
  margin-top 20rpx
  .tips
    width 80%
    margin 0 auto
    padding  30rpx 0
    text-align center
  .btn-wrapper
    padding-top 20rpx
    display flex
    justify-content space-between
    .btn
      display block
      width 260rpx
      height 80rpx
      border-radius 60rpx
      text-algin center
      line-height 80rpx
      font-size 28rpx
      border 1rpx solid #3F51B5
      &.btn-save
        color #3F51B5
        background #fff
      &.btn-share
        color #fff
        background #3F51B5

</style>
