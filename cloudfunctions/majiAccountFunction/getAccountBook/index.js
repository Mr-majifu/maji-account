const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取当前用户的所有账本
exports.main = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()

    const db = cloud.database()
    const accountBook = db.collection('account-book')
    let msg = ''
    let response

    await accountBook.where({
      createUserId: OPENID, // 创建者的 openId
    }).get().then(res => {
      msg = '查询账本成功'
      response = res
    })
    return {
      success: true,
      msg: msg,
      res: response,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};