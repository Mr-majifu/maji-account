const getOpenId = require('./getOpenId/index');
const registerUser = require('./registerUser/index');
const createAccountBook = require('./createAccountBook/index');
const getAccountBook = require('./getAccountBook/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'registerUser':
      return await registerUser.main(event, context);
    case 'createAccountBook':
      return await createAccountBook.main(event, context);
    case 'getAccountBook':
      return await getAccountBook.main(event, context);
  }
};
