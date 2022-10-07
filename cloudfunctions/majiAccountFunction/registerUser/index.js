const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 注册用户，如果第一次用就注册
exports.main = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()

    // 在数据库中查询此用户
    const db = cloud.database()
    const user = db.collection('user') // 集合
    const res = await user.where({
      openid: OPENID
    }).get()
    let msg = ''
    if (res.data.length !== 0) { // 用户存在
      msg = '用户已存在'
    } else { // 用户不存在
      // add user
      await user.add({
        data: {
          openid: OPENID,
        },
      }).then(res => {
        msg = '添加用户成功'
      })
    }
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