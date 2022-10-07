// app.js
App({

  flag: false,

  // 小程序启动时触发
  async onLaunch(e) {
    await this.initcloud()
    // 判断 本地存储没有 userOpenid 并且没有 user
    if (!wx.getStorageSync('userOpenid') && !wx.getStorageSync('user')) {
      // 静默登录，没有弹窗询问，实际上我拿到了openid，能够进行绑定
      const res = await this.call({
        name: 'majiAccountFunction',
        data: {
          type: 'getOpenId',
        }
      })
      if (res.success == true) {
        wx.setStorageSync('userOpenid', res.data)
      } else {
        console.log("获取 openId 失败");
      }
    }
    // 注册用户
    await this.call({
      name: 'majiAccountFunction',
      data: {
        type: 'registerUser',
      }
    })
  },

  // 初始化云
  async initcloud() {
    const shareinfo = wx.getExtConfigSync() // 检查 ext 配置文件
    const normalinfo = require('./envList.js').envList || [] // 读取 envlist 文件
    if (shareinfo.envid != null) { // 如果 ext 配置文件存在，环境共享模式
      this.c1 = new wx.cloud.Cloud({ // 声明 cloud 实例
        resourceAppid: shareinfo.appid,
        resourceEnv: shareinfo.envid
      })
      // 装载云函数操作对象返回方法
      this.cloud = async function () {
        if (this.flag !== true) { // 如果第一次使用返回方法，还没初始化
          await this.c1.init() // 初始化一下
          this.flag = true // 设置为已经初始化
        }
        return this.c1 // 返回 cloud 对象
      }
    } else { // 如果 ext 配置文件不存在，正常云开发模式
      if (normalinfo.length !== 0 && normalinfo[0].envId != null) { // 如果文件中 envlist 存在
        wx.cloud.init({ // 初始化云开发环境
          traceUser: true,
          env: normalinfo[0].envId
        })
        // 装载云函数操作对象返回方法
        this.cloud = () => {
          return wx.cloud // 直接返回 wx.cloud
        }
      } else { // 如果文件中 envlist 不存在，提示要配置环境
        this.cloud = () => {
          throw new Error('当前小程序没有配置云开发环境，请在 envList.js 中配置你的云开发环境')
        }
      }
    }
    console.log("云服务初始化成功");
  },

  async call(obj) {
    try {
      const cloud = await this.cloud()
      const res = await cloud.callFunction({ // 调用云函数
        name: obj.name, // 应用唯一的服务函数
        data: obj.data
      })
      console.log('【云函数调用成功】', res)
      if (res.result !== false) { // 如果返回值不为false，则证明正常访问
        return res.result
      } else { // 否则
        wx.hideLoading()
        wx.showModal({ // 提示一下
          content: '函数服务没有支持该操作！',
          showCancel: false
        })
      }
    } catch (e) { // 网络问题出现
      let flag = e.toString()
      flag = flag.indexOf('FunctionName') == -1 ? flag : '请在cloudfunctions文件夹中wishes-520上右键，创建部署云端安装依赖，然后再次体验'
      console.error('【云函数调用失败】', flag)
      wx.hideLoading()
      wx.showModal({
        content: flag, // 此提示可以在正式时改为 "网络服务异常，请确认网络重新尝试！"
        showCancel: false
      })
      throw flag
    }
  },


});