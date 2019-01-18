<template>
  <div class="container">
    商品详情页面
    {{goodsInfo.theme}}
    <img :src="goodsInfo.banner" />
    {{userInfo.nickName}}
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userInfo: {},
      goodsId: '',
      goodsInfo: {}
    }
  },
  onLoad (options) {
    this.userInfo = wx.getStorageSync('userInfo')
    this.getGoodsInfo(options.id)
    // if (this.userInfo.userId) {
    //   this.getGoodsInfo(options.id)
    //   this.goodsId = options.id
    // } else {
    //   this.getUserInfo()
    // }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    getGoodsInfo (id) {
      this.$http(this.$apis.selectLineCourseTermInfoById, {id}).then(res => {
        this.goodsInfo = res.data.lineCourseTermVO
      })
    }
  },
  computed: {
    // ...mapState(['userInfo'])
  },
  onShareAppMessage: function (res) {
    const { goodsId } = this
    return {
      path: `/pages/goodsDetail/main?id=${goodsId}`
    }
  }

}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
