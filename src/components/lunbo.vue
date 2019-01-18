<template>
  <div class="lunbo">
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
    >
      <swiper-item v-for="(img,index) in imageList" :key="index">
        <img :src="img"></img>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ['imageList']
  }
</script>

<style lang="stylus" scoped>
  .lunbo
    width 100%
    height 100%
    swiper
      width 100%
      height 100%
    img
      width 100%
      height 100%
</style>