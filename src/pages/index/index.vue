<template>
  <div class="index">
    <div class="banner">
      <lunbo :imageList="bannerList" />
    </div>
    <div class="menu-list-wrapper">
      <div class="menu-list">
        <div class="menu" v-for="(menu,index) in menuList" :key="index" @click="linkToCate(menu.url)">
          <img :src="menu.icon" alt="">
          <p>{{menu.text}}</p>
        </div>
      </div>
    </div>
    <div class="early-new">
      <lunbo :imageList="earlyList" />
    </div>
    <div class="article-list">
      <articleItem />
      <articleItem />
      <articleItem />
      <articleItem />
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import articleItem from '@/components/articleItem'
import lunbo from '@/components/lunbo'

export default {
  data () {
    return {
      userInfo: {},
      bannerList: [
        'http://image.steam001.com/index_banner01.png',
        'http://image.steam001.com/index_banner01.png'
      ],
      earlyList: [
        'http://image.steam001.com/02.png'
      ],
      menuList: [
        {
          icon: './images/index_tabicon_01.png',
          text: '限时免费',
          url: '/pages/resourceCate/main'
        }, {
          icon: './images/index_tabicon_02.png',
          text: '限量领取'
        }, {
          icon: './images/index_tabicon_03.png',
          text: '测一测'
        }, {
          icon: './images/index_tabicon_04.png',
          text: '纪录片'
        }, {
          icon: './images/index_tabicon_05.png',
          text: '英文绘本'
        }, {
          icon: './images/index_tabicon_06.png',
          text: '趣味科学'
        }, {
          icon: './images/index_tabicon_07.png',
          text: '大语文'
        }, {
          icon: './images/index_tabicon_08.png',
          text: '限时免费'
        }, {
          icon: './images/index_tabicon_09.png',
          text: '新人礼包'
        }, {
          icon: './images/index_tabicon_10.png',
          text: '学习广场'
        }

      ]
    }
  },
  methods: {
    linkToCate (url) {
      wx.navigateTo({
        url: url
      })
    }
    // linkToDetail () {
    //   wx.navigateTo({
    //     url: '/pages/goodsDetail/main?id=2'
    //   })
    // },
    // ...mapActions(['getUserInfo', 'changeTestT'])
  },
  onLoad () {
    this.$setNavigationBarTitle('玩物立志')
    // this.userInfo = wx.getStorageSync('userInfo')
  },
  computed: {
  },
  components: {
    articleItem,
    lunbo
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    // this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
.index
  .banner
    width 100%
    height 245rpx
    img
      width 100%
      height 100%
  .menu-list-wrapper
    padding 20rpx 10rpx
    background #31B6FF
    .menu-list
      display flex
      flex-wrap wrap
      justify-content space-around
      // margin-top 50rpx
      background #fff
      border-radius: 6rpx;
      .menu
        display flex
        flex-direction column
        align-items center
        padding 24rpx 20rpx
        img
          width 100rpx
          height 100rpx
        p
          font-size 26rpx
  .early-new
    height 250rpx
</style>
