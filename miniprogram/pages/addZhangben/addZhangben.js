// pages/addZhangben/addZhangben.js

const app = getApp()

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

  async _createAccountBook() {
    try {
      // 调用 createAccountBook 云函数
      const res = await app.call({
        name: 'majiAccountFunction',
        data: {
          type: 'createAccountBook',
          accountBookName: this.data.accountBookName,
        },
      })
      if (res.success == true) {
        wx.navigateBack({
          // delta: 0,
        })
      }
    } catch (error) {
      wx.showToast({
        title: '创建失败，请重试',
        icon: 'error',
        duration: 2000
      })
    }
  },
  
})