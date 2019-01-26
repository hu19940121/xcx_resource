<template>
  <div class="receive-success">
    <div class="banner">
      <img :src="banner" alt="">
    </div>
    <div v-if="resourceInfo.type === 1" class="receive-info">
      <h1 class="title">资料领取成功</h1>
      <p>您领取的资料已发送至您的玩物星球账号中</p>
      <p>您的账号为：{{userInfo.phone}}</p>
      <p>初始密码为：{{initPass}}</p>
      <p>请前往玩物星球官网：www.steam001.com使用</p>
      <p class="tip">下滑查看使用流程</p>
    </div>
    <div v-else class="receive-info">
      <h1 class="title">资源领取成功</h1>
      <div class="content-wrapper">
        <p>您领取的资源如下：</p>
        <p>资源名称：{{resourceInfo.name}}</p>
        <p>百度云盘地址：<span>{{resourceInfo.url}}</span></p>
        <!-- <p>提取码：xxxxxx  <button class="copyBtn" size="mini" type="primary">一键复制</button></p> -->
        <p>提取码：{{resourceInfo.password}}</p>
        <button class="copyBtn" size="mini" type="primary" @click="copyToCut">一键复制领取资源</button> 
        <!-- <p>请享用</p> -->
      </div>
    </div>
    <div v-if="resourceInfo.type === 1" class="use-explain">
      <img :src="explain" />
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        initPass: 'wanwu123',
        userInfo: {},
        resourceInfo: {},
        // resourceType: 3, // resourceType 1:课程资源 2:直播资源 3:链接资源 4:实物
        banner: 'http://image.steam001.com/xcx_resourcegitf_get.jpg',
        explain: 'http://image.steam001.com/xcx_resourcegetpage_img_howtouse.png'
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('领取资料')
      this.getResourceDetailById()
      this.userInfo = wx.getStorageSync('userInfo')
    },
    methods: {
      getResourceDetailById () {
        this.$http(this.$apis.getResourceDetailById, {id: this.$root.$mp.query.id}).then(res => {
          this.resourceInfo = res.data
        })
      },
      // 复制到剪切板
      copyToCut () {
        wx.setClipboardData({
          data: `链接为：${this.resourceInfo.url} 提取码为：${this.resourceInfo.password}`,
          success: function (res) {
            wx.showToast({'title': '复制成功~', icon: 'none'})
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
page{
  background #4f2b11
}
.receive-success
  .banner
    width 100%
    height 520rpx
    img
      width 100%
      height 100%
  .receive-info
    width 690rpx
    min-height 520rpx
    padding 0 48rpx
    padding-bottom 20rpx
    margin 0 auto
    border 5rpx solid #281303
    border-radius 10rpx
    box-sizing border-box
    background #FFFFFF
    transform translateY(-138rpx)
    .title
      text-align center
      font-size 48rpx
      padding 40rpx 0
    .content-wrapper
      width 100%
    p
      width 100%
      font-size 28rpx
      padding-bottom 54rpx
      word-wrap break-word
    p:nth-child(1)
      padding-bottom 28rpx
    .tip
      color #FF0036 
      padding-top 28rpx
  .use-explain
    width 690rpx
    height 1382rpx
    margin 0 auto 
    transform translateY(-120rpx)
    img
      width 100%
      height 100%
</style>