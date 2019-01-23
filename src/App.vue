<script>
// import { mapActions } from 'vuex'
export default {
  onLaunch () {
    const token = wx.getStorageSync('token')
    console.log('token', token)
    if (!token) {
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/noAuthUserPage/main'
        })
      }, 500)
    }
  },
  methods: {
    // ...mapActions(['login'])
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
