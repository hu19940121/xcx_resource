<template>
  <div class="completeInfo">
    <div class="form-wrapper">
      <div class="form-item">
        <p class="field-name">手机号</p>
        <input class="field-input" v-model.lazy="form.phone" type="text">
      </div>
      <div class="form-item">
        <p class="field-name">学员姓名(昵称)</p>
        <input class="field-input" v-model.lazy="form.kidName" type="text">
      </div>
      <div class="form-item">
        <p class="field-name">出生年月</p>
        <!-- <input class="field-input" type="text"> -->
        <picker
          mode="date"
          :value="date"
          @change="bindDateChange"
        >
          <view class="picker">{{ form.birthday ? form.birthday : '请选择日期'}}</view>
        </picker>
      </div>
      <div class="form-item">
        <p class="field-name">学员性别</p>
        <div class="sex">
          <div :class="['sex-item',{'active': form.sex === 1}]" @click="form.sex = 1">男</div>
          <div :class="['sex-item',{'active': form.sex === 0}]" @click="form.sex = 0">女</div>
        </div>
      </div>
      <div class="form-item">
        <p class="field-name">学员年级</p>
        <picker mode="multiSelector"  @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray" class="pickerStyle">
          <view class="picker">
            <text> {{form.currentLevel ? form.currentLevel : "选择年级"}} </text>
          </view>
        </picker>
      </div>
      <button class="submit-btn" @click="submit">完成</button>
    </div>
  </div>
</template>

<script>
  import { objectMultiArray } from './data.js'
  import { mapActions } from 'vuex'
  import { formatTime } from '../../utils/index.js'

  export default {
    data () {
      return {
        form: {
          currentLevel: null,
          birthday: null,
          sex: 0, // 1 :男 0 :女
          phone: null,
          kidName: null
        },
        multiIndex: [0, 0],
        multiArray: [['幼儿园', '小学'], ['小班', '中班', '大班']]
  
      }
    },
    mounted () {
      // Object.assign(this.$data, this.$options.data())
      // this.$root.$mp.query
    },
    onLoad () {
      this.form = {
        currentLevel: null,
        birthday: null,
        sex: 0, // 1 :男 0 :女
        phone: null,
        kidName: null
      }
      this.$setNavigationBarTitle('完善信息')
      this.form.phone = wx.getStorageSync('userInfo').phone
      this.getKidInfo()
    },
    methods: {
      ...mapActions(['getUserInfo']),
      async getKidInfo () {
        let res = await this.$http(this.$apis.getKidInfo, {})
        let { kidVO } = res.data
        this.form = {
          ...kidVO,
          birthday: formatTime(kidVO.birthday, true, '-')
        }
      },
      bindDateChange (e) {
        const { mp } = e
        this.form.birthday = mp.detail.value
      },
      bindMultiPickerChange (e) {
        const { mp } = e
        this.multiIndex = mp.detail.value
        const { multiArray, multiIndex } = this
        const currentLevel = multiArray[0][multiIndex[0]] + '-' + multiArray[1][multiIndex[1]]
        this.form.currentLevel = currentLevel
      },
      bindMultiPickerColumnChange (e) {
        const { mp } = e
        let data = {
          multiArray: this.multiArray,
          multiIndex: this.multiIndex
        }
        data.multiIndex[mp.detail.column] = mp.detail.value
        switch (mp.detail.column) {
          case 0:
            let list = []
            for (var i = 0; i < objectMultiArray.length; i++) {
              if (objectMultiArray[i].parid === objectMultiArray[mp.detail.value].id) {
                list.push(objectMultiArray[i].name)
              }
            }
            this.$set(this.multiArray, '1', list)
            // this.multiArray[1] = list
            this.multiIndex[0] = mp.detail.value
            console.log('multiArray', this.multiArray)
        }
      },
      showTip (tipStr) {
        wx.showToast({
          title: tipStr,
          icon: 'none'
        })
      },
      submit () {
        const { form: { currentLevel, birthday, phone, kidName } } = this
        if (!currentLevel) {
          this.showTip('请输入年级~')
          return false
        }
        if (!birthday) {
          this.showTip('请输入出生日期~')
          return false
        }
        if (!phone) {
          this.showTip('请输入手机号~')
          return false
        }
        if (!kidName) {
          this.showTip('请输入孩子名称~')
          return false
        }
        // if (!currentLevel || !birthday || !phone || !kidName) {
        //   wx.showToast({
        //     title: '必填不能为空哦~',
        //     icon: 'none'
        //   })
        //   return false
        // }
        if (!(/^1[34578]\d{9}$/.test(this.form.phone))) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
          return false
        }
        let params = {
          ...this.form
        }
        this.$http(this.$apis.perfectKid, params).then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: '保存成功'
            })
            this.getUserInfo(() => {
              wx.switchTab({
                url: '/pages/personal/main'
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" >
page{
  background-color #EFEFF4
}
.completeInfo
  .form-wrapper
    position relative
    width 670rpx
    margin: 0 auto
    margin-top 40rpx
    padding: 0 65rpx
    padding-bottom 48rpx
    padding-top 30rpx
    box-sizing border-box
    box-shadow 0 0 20px 0 rgba(0,0,0,0.10)
    border-radius 6px
    background-color #fff
    font-size 28rpx
    .form-item
      padding 28rpx 0
      .picker
        padding-top 20rpx
        padding-bottom 10rpx
        border-bottom 1rpx solid #DEDEDE
      .field-name
        padding-bottom 10rpx
        color #666666
      .field-input
        border-bottom 1rpx solid #DEDEDE
      .sex
        display flex
        justify-content space-around
        width 100%
        padding-top 14rpx
        .sex-item
          width 164rpx
          height 90rpx
          text-align center
          line-height 90rpx
          border-radius 14rpx
          border 1rpx solid #eee
          &.active
            border 1rpx solid blue
            color blue
    .submit-btn
        color #fff
        background #31B6FF;
        box-shadow 0 8rpx 8rpx 0 rgba(15,55,114,0.29);
        border-radius: 10rpx

</style>