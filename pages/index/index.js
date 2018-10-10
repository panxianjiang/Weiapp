//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorDots: true, // loading

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    banners: ['../../images/nav/my-on.png', '../../images/nav/my-on.png','../../images/nav/my-on.png']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getStorage({
            key: 'nimei',
            success: function (res) {
              console.log(res.data)
              if (res.data) {
                console.log("jslkjl")
                that.setData({
                  userInfo: res.data,
                  hasUserInfo: true
                })
              } else if (that.data.canIUse) {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                app.userInfoReadyCallback = res => {
                  that.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                }
              } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                // wx.getUserInfo({
                //   success: res => {
                //     app.globalData.userInfo = res.userInfo
                //     this.setData({
                //       userInfo: res.userInfo,
                //       hasUserInfo: true
                //     })
                //   }
                // })
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    var that=this
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // wx.setStorageSync('nimei', e.detail.userInfo)
    wx.setStorage({
      key: 'nimei',
      data: that.data.userInfo
    });
  
  }
})
