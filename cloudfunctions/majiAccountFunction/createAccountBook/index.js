const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 创建新的账本
exports.main = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()

    const db = cloud.database()
    const accountBook = db.collection('account-book')
    let msg = ''
    
    await accountBook.add({
      data: {
        createUserId: OPENID, // 创建者的 openId
        accountBookName: event.accountBookName, // 账本名称
      },
    }).then(res => {
      msg = '创建账本成功'
    })
    return {
      success: true,
      msg: msg
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};