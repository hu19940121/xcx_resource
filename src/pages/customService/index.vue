<template>
  <div class="customservice">
    <div class="customer" v-for="(item,index) in customerList" :key="index">
      <div class="left">
        <img :src="item.icon" alt="">
      </div>
      <div class="mid">
        <p>{{item.name}}</p>
        <p>{{item.desc}}</p>
      </div>
      <div class="right">
        <button v-if="item.type ==='phone' " class="btn" @click="call(item.number)">点击拨号</button>
        <button v-else class="btn" @click="copyToCut(item.number)">复制微信号</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        customerList: [
          {
            type: 'phone',
            name: '电话客服',
            icon: './images/talk_icon_phone.png',
            desc: '每周二-周六10:00-18:30',
            number: '15313855386'
          }, {
            type: 'wx',
            name: '微信客服1',
            icon: './images/talk_icon_weixin.png',
            desc: '玩物星球凯尔老师',
            number: 'Yasuozedleesin'
          }, {
            type: 'wx',
            name: '微信客服2',
            icon: './images/talk_icon_weixin.png',
            desc: '玩物星球凯尔老师',
            number: 'Yasuozedleesin'
          }
        ]
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('联系客服')
    },
    methods: {
    // 拨打电话
      call (number) {
        wx.makePhoneCall({
          phoneNumber: number,
          success: function () {

          },
          fail: function () {
  
          }
        })
      },
      // 复制微信号到剪切板
      copyToCut (number) {
        wx.setClipboardData({
          data: number,
          success: function (res) {
            wx.showToast({'title': '复制成功~', icon: 'none'})
          }
        })
      }
    }

  }
</script>

<style lang="stylus" scoped>
.customservice
  .customer
    display flex
    align-items center
    width 100%
    height 140rpx
    padding 0 30rpx
    border-bottom 1px solid #eee
    .left
      flex .5
      img
        width 90rpx
        height 90rpx
    .mid
      flex 1.5
      p:nth-child(1)
        font-size 30rpx
      p:nth-child(2)
        margin-top 10rpx
        font-size 26rpx
    .right 
      flex 1
      padding-right 16rpx
      .btn
        width 178rpx
        height 64rpx
        background #31B6FF
        line-height 64rpx
        text-align center
        font-size 26rpx
        color #fff
</style>