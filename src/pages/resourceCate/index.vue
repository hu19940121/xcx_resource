<template>
  <div class="resourceCate">
    <div style="background:url('http://image.steam001.com/index_banner01.png') no-repeat;background-size:cover;" class="banner">
      <span class="cate-name">
        {{cateName}}
      </span>
      <div class="shadow"></div>
    </div>
    <div class="resource-list">
      <articleItem />
      <articleItem />
      <articleItem />
      <articleItem />
    </div>
  </div>
</template>

<script>
  import articleItem from '@/components/articleItem'
  export default {
    data () {
      return {
        cateName: '限时免费'
      }
    },
    onLoad () {
      this.$setNavigationBarTitle(this.cateName)
    },
    methods: {

    },
    components: {
      articleItem
    }
  }
</script>

<style lang="stylus" scoped>
.banner
  display flex
  justify-content center
  align-items center
  position relative
  width 100%
  height 227rpx
  .cate-name
    width 310rpx
    height 89rpx
    text-align center
    line-height 89rpx
    border 3rpx solid #fff
    font-size 36rpx
    color #fff
    z-index 1
  .shadow
    position absolute
    top 0
    width 100%
    height 100%
    background rgba(0,0,0,0.5)
</style>