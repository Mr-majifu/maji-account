// pages/mingxi/mingxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  // 转到帐本页面
  _toZhangBen: function() {
    wx.navigateTo({
      url: '/pages/zhangben/zhangben',
    })
  },

  // 转到搜索页面
  _toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 转到detail页面
  _toDetail: function() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  // 转到jizhang页面
  _toJiZhang: function() {
    wx.navigateTo({
      url: '/pages/jizhang/jizhang',
    })
  },
})