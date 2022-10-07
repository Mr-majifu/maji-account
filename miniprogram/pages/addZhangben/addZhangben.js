// pages/addZhangben/addZhangben.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountBookName: '', // 账本名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  _createAccountBook: function() {
    wx.cloud.callFunction({
      name: 'majiAccountFunction',
      // 传给云函数的参数
      data: {
        type: 'createAccountBook',
        accountBookName: this.accountBookName,
      },
      success: function(res) {
        console.log(res)
      },
      fail: console.error
    })
  },
})