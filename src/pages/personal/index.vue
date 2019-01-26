<template>
  <div class="personal">
    <div class="userinfo-card">
      <img class="card-avatar" :src="userInfo.avatarUrl" alt="">
      <p class="card-nickname">{{userInfo.nickName}}</p>
      <!-- <p class="card-memeber-tips">您还不是会员</p> -->
      <!-- <p class="card-memeber-right">查看会员权益</p> -->
      <!-- <span class="btn">
        开通会员
      </span> -->
    </div>
    <div class="menu-list">
      <div class="menu" @click="linkToCompleteInfo">
        <img class="icon" src="./images/my_icon_data.png" alt="">
        <div class="menu-desc">
          <p>我的基本信息</p>
          <p>我的基本信息</p>
        </div>
        <span  class="tip menu1">{{hasKid === 1 ?'已完善' :'尚未完善'}}</span>
      </div>
      <div class="menu" @click="linkToMyRes">
        <img class="icon" src="./images/my_icon_course.png" alt="">
        <div class="menu-desc">
          <p>我解锁的课程</p>
          <p>您有新课程解锁</p>
        </div>
        <span class="tip menu2"></span>
      </div>
      <!-- <div class="menu" @click="linkToPlanet">
        <img class="icon" src="./images/my_icon_wwlz.png" alt="">
        <div class="menu-desc">
          <p>前往玩物星球小程序</p>
          <p>在玩物星球小程序发布您的作品</p>
        </div>
      </div> -->
      <div class="menu" @click="linkTofuli">
        <img class="icon" src="./images/my_icon_present.png" alt="">
        <div class="menu-desc">
          <p>领取福利</p>
          <p>您有新的福利待领取</p>
        </div>
      </div>
      <div class="menu" @click="linkToContact">
        <img class="icon" src="./images/my_icon_talk.png" alt="">
        <div class="menu-desc">
          <p>联系客服</p>
          <p>问题请联系我们</p>
        </div>
      </div>
    </div>
    <!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->

  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      hasKid: null,
      userInfo: {} // identity 1 学生 2老师
    }
  },
  onLoad () {
    this.$setNavigationBarTitle('个人中心')
    // this.userInfo = wx.getStorageSync('userInfo')
  },
  onShow () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.hasKid = wx.getStorageSync('hasKid')
  },
  methods: {
    // getPhoneNumber (e) {
    //   const { mp } = e
    //   console.log(mp.detail)
    // },
    // 跳转至联系人
    linkToContact () {
      wx.navigateTo({
        url: '/pages/customService/main'
      })
    },
    // 跳转至完善信息
    linkToCompleteInfo () {
      wx.navigateTo({
        url: '/pages/completeInfo/main'
      })
    },
    // 跳转至我的资源
    linkToMyRes () {
      wx.navigateTo({
        url: '/pages/myResource/main'
      })
    },
    // 跳转到领取福利
    linkTofuli () {
      wx.navigateTo({
        url: '/pages/giftPackage/main'
      })
    },
    // 跳转至玩物星球俱乐部小程序
    linkToPlanet () {
      wx.navigateToMiniProgram({
        appId: 'wxac35230c99e1209b',
        path: 'pages/index/index',
        extraData: {},
        envVersion: 'develop',
        success: function () {
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.personal
  padding 20rpx 30rpx
  .userinfo-card
    position relative
    width 690rpx
    height 350rpx
    padding 34rpx 30rpx
    // background #383838
    background url('http://image.steam001.com/banner.png')
    background-size 100% 100%
    border-radius 14rpx
    box-sizing border-box
    overflow hidden
    .card-avatar
      width 120rpx
      height 120rpx
      border-radius 50%
    .card-nickname
      font-size 32rpx
      color #ffffff
    .card-memeber-tips
      font-size 24rpx
      color #dddddd
      margin-top 10rpx
    .card-memeber-right
      width 160rpx
      margin-top 42rpx 
      font-size 24rpx
      color #C1B4A3
      background url('./images/my_img_legal.png') no-repeat right 
      background-size 15rpx 25rpx
    .btn
      display block
      position absolute
      top 206rpx
      left 550rpx
      width 128rpx
      height 52rpx 
      border 10rpx solid #2C2C2C
      border-top-left-radius 64rpx
      border-bottom-left-radius 64rpx
      line-height 52rpx
      text-align center
      background #000
      font-size 24rpx
      color #C1B4A3 
  .menu-list
    padding-top 20rpx
    .menu
      position relative
      display flex
      align-items center
      width 690rpx
      height 120rpx
      padding-left 18rpx
      margin-bottom 28rpx
      box-sizing border-box
      border-radius 10rpx
      box-shadow  0 0 10rpx 0 rgba(0,0,0,0.11)
      background #fff
      img
        width 70rpx
        height 70rpx
      .menu-desc
        padding-left 20rpx
        p:nth-child(1)
          font-size 30rpx
          color #000
        p:nth-child(2)
          font-size 24rpx
          color #999999
          margin-top 10rpx
      .tip
        position absolute
        top 20rpx
        right 20rpx
        background red
        &.menu1
          width 110rpx
          height 32rpx
          line-height 32rpx
          text-align center
          color #fff
          border-radius 22rpx
          font-size 20rpx
        &.menu2
          width 20rpx
          height 20rpx
          border-radius 50%
          background #FF0036
</style>
