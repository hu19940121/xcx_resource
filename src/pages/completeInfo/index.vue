<template>
  <div class="completeInfo">
    <div class="form-wrapper">
      <div class="form-item">
        <p class="field-name">手机号</p>
        <input class="field-input" v-model="form.phone" type="text">
      </div>
      <div class="form-item">
        <p class="field-name">学员姓名(昵称)</p>
        <input class="field-input" v-model="form.nickName" type="text">
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
            <text> {{form.grade ? form.grade : "选择年级"}} </text>
                <!-- <text wx:if="{{grade}}">{{grade}}</text>
                <text wx:else>选择年级</text> -->
          </view>
        </picker>
      </div>
      <button class="submit-btn" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
  import { objectMultiArray } from './data.js'
  export default {
    data () {
      return {
        form: {
          grade: null,
          birthday: null,
          sex: 0, // 1 :男 0 :女
          phone: null,
          nickName: null
        },
        multiIndex: [0, 0],
        multiArray: [['幼儿园', '小学'], ['小班', '中班', '大班']]
  
      }
    },
    methods: {
      bindDateChange (e) {
        const { mp } = e
        this.form.birthday = mp.detail.value
      },
      bindMultiPickerChange (e) {
        const { mp } = e
        this.multiIndex = mp.detail.value
        const { multiArray, multiIndex } = this
        const grade = multiArray[0][multiIndex[0]] + '-' + multiArray[1][multiIndex[1]]
        this.form.grade = grade
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
      submit () {
        const { form: { grade, birthday, sex, phone, nickName } } = this
        if (!grade || !birthday || !sex || !phone || !nickName) {
          wx.showToast({
            title: '必填不能为空哦~',
            icon: 'none'
          })
          return false
        }
        if (!(/^1[34578]\d{9}$/.test(this.form.phone))) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
          return false
        }
        wx.showToast({
          title: '保存成功'
        })
        console.log(this.form)
      }
    },
    onLoad () {
      this.$setNavigationBarTitle('完善信息')
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
        border-bottom 1rpx solid #eee
      .field-name
        padding-bottom 10rpx
        color #666666
      .field-input
        border-bottom 1rpx solid #eee
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