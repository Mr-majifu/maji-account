const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  try {
    let {
      OPENID
    } = cloud.getWXContext()
    return {
      success: true,
      data: OPENID
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};