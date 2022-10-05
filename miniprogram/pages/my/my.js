// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOk: false,
    nickName: "",
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("这里的options", options);
    // this.setData({
    //   nickName: options.nickName,
    //   avatarUrl: options.avatarUrl
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //小程序声明周期的可见性函数里面来控制显示
  onShow() {
    let userInfo = wx.getStorageSync('userInfo')
    console.log("我的缓存信息", userInfo);
    if (userInfo) {
      this.setData({
        loginOk: true,
        nickName: userInfo.nickName, //从缓存中拿数据
        avatarUrl: userInfo.avatarUrl
      })
    } else {
      this.setData({
        loginOk: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 微信授权登录，当用户点击“未登录”时登录，其实是为了获取用户信息，电话等
  _login() {
    wx.getUserProfile({
        desc: '用户完善会员资料',
      })
      .then(res => {
        console.log("用户允许了微信授权登录", res);
        wx.reLaunch({
          //将微信头像和微信名称传递给【我的】页面
          url: '/pages/my/my?nickName=' + res.userInfo.nickName + '&avatarUrl=' + res.userInfo.avatarUrl,
        })
        //保存用户登录信息到缓存
        wx.setStorageSync('userInfo', res.userInfo)
      })
      .catch(err => {
        console.log("用户拒绝了微信授权登录", err);
      })
  },

  // 退出登录
  _exitLogin() {
    wx.showModal({
      content: "确定退出吗"
    }).then(res => {
      if (res.confirm) {
        console.log("用户点击了确定");
        this.setData({
          loginOk: false
        })
        //清空登录的缓存
        wx.setStorageSync('userInfo', null)
      } else if (res.cancel) {
        console.log("用户点击了取消");
      }
    })
  },

  _click: function() {
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'add',
    //   // 传给云函数的参数
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    // })
    // .then(res => {
    //   console.log(res.result.sum) // 3
    // })
    // .catch(console.error)
    wx.cloud.callFunction({
      name: 'test',
    }).then(res => {
      console.log(res.result);
    }).catch(
      console.error
    )
  },


})