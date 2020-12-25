//app网络请求
import axios from 'axios'
import { Toast } from 'mand-mobile';

// Vue.prototype.$message = messageM
const BASE_URL = 'http://www.awakenchain.com/';
const BASE_URL_IMG = BASE_URL;
// const DEBUG_BASE_URL = constant.namespace

// axios 配置
// axios.defaults.timeout = constant.timeout;
axios.defaults.withCredentials = false;
axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.post["Content-Type"] = "application/json";



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem("token");
  if (token) {
    // config.headers['Access-Token'] = token ;
    // config.headers['Accept'] = 'Content-Type:application/json'
    // config.headers['Accept'] = 'Content-Type: multipart/form-data'
    config.headers['Authorization'] = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log("error", error)
  return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //   console.log('response',response);

  sessionStorage.setItem('isNeedLogin', false);
  if (response.data.code == 'NEED_LOGIN') {

    // console.log("sessionStorage.getItem('isNeedLogin')", sessionStorage.getItem('isNeedLogin'))
    // if (sessionStorage.getItem('isNeedLogin') == 'false') {
    //   reLogin()
    // }
    Message.error("登录过期请重新登录!", 3);
    setTimeout(function () {
      router.replace({
        path: '/' // 到登录页重新获取token
      })
    }, 1000);

    localStorage.removeItem('token');
    return false
  }
  if (response.headers.authorization) {
    localStorage.setItem('token', response.headers.authorization)
  }
  axios.defaults.headers.common["Authorization"] =
    response.headers.authorization;
  return response;
}, function (err) {
  // 对响应数据做点什么
  err.message = '连接服务器失败!'
  // alert("网络异常");
  const hide = Message.loading("网络异常  !", 0);
  // const hide = this.$message.loading('Action in progress..', 0);
  setTimeout(hide, 1500);
  console.log("error", err)
  return Promise.reject(err);
});



//重新登录弹窗
function reLogin() {
  sessionStorage.setItem('isNeedLogin', true);
  let secondsToGo = 5;
  const modal = Modal.error({
    title: '登录过期请重新登录！',
    content: ` ${secondsToGo} 秒后自动跳转到首页`,
    okText: '现在就去',
    okType: 'default',
    onOk() {
      clearInterval(interval);
      clearTimeout(time);
      modal.destroy();
      router.replace({
        path: '/' // 到登录页重新获取token
      })
    },
  })
  const interval = setInterval(() => {
    console.log(secondsToGo)
    secondsToGo -= 1;
    modal.update({
      content: ` ${secondsToGo} 秒后自动跳转到首页`,
    });
  }, 1000);
  const time = setTimeout(() => {
    clearInterval(interval);
    modal.destroy();
    router.replace({
      path: '/' // 到登录页重新获取token
    })
  }, 5000);
}



function post(url, params, successCallBack, fail) {

  axios.post(url, params)

    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (response) {
      console.log(response);
      fail && fail(response)
    })
};

function postFrom(url, params, successCallBack, fail) {
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Content-Type': 'application/json'
    },
  };
  axios.post(url, Qs.stringify(params), config)

    .then(function (response) {

      successCallBack(response.data);

    })
    .catch(function (response) {
      console.log(response);
      fail && fail(response)

    })

};

function getForm(url, params, successCallBack, fail) {
  var config = {
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded'

      // 'Content-Type': 'application/json'
      'Content-Type': 'application/xhtml+xml'
    },
  };
  axios.get(url, config)

    .then(function (response) {

      successCallBack(response.data);

    })
    .catch(function (response) {
      console.log(response);
      fail && fail(response)

    })

};

function get(url, params, successCallBack, fail) {

  axios.get(url)

    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (response) {
      console.log(response);
      fail && fail(response)
    })

}
export default {
  //登录
  login: function (params, callback) {
    post(DEBUG_BASE_URL + "api/user/login", params, callback);
  },
  //注册
  register: function (params, callback) {
    post(DEBUG_BASE_URL + "api/user/register", params, callback);
  },
  // 首页数据
  getHomeData: function (params, callback, fail) {
    get(DEBUG_BASE_URL + "api/push/getData", params, callback, fail);
  },

  //级联选择数据
  getAreaData: function (params, callback, fail) {
    post("/division/list", params, callback, fail);
  },

  //从事行业数据
  getTypeData: function (params, callback, fail) {
    get("/industry/list", params, callback, fail);
  },

  //获取短信验证码
  getcode: function (params, callback, fail) {
    post("/member/send/mobile/check", params, callback, fail);
  },
  //短信验证码验证
  codeCfir: function (params, callback, fail) {
    post("/member/online/register", params, callback, fail);
  },
  // 设置登陆&支付安全信息
  setPassword: function (params, callback, fail) {
    post("/member/reg/password/add", params, callback, fail);
  },
  // 个人客户资料登记
  setPersonData: function (params, callback, fail) {
    post("/customer/add", params, callback, fail);
  },
  // 个人客户银行卡新增
  setPersonBank: function (params, callback, fail) {
    post("/customer/add", params, callback, fail);
  },
  // 客户资料登记
  setOrgData: function (params, callback, fail) {
    post("/merchant/add", params, callback, fail);
  },
  // 客户信息资料更新修改
  updateData: function (params, callback, fail) {
    post("merchant/update/basic", params, callback, fail);
  },
  // 单位客户邮箱重新发送
  sendEmailagain: function (params, callback, fail) {
    post("/member/reg/reEmail/act", params, callback, fail);
  },
  // 用户修改时，查询数据
  getExistData: function (params, callback, fail) {
    get("/merchant/fetch/" + params, callback, fail);
  },


  fetchPubKey: function (params, callback, fail) {
    get('/member/fetch/memberPubKey/' + params.scope + '/' + params.key, null, callback, fail);
  },
  getEncryptData: function (pubKey, data) {
    var crypt = new JSEncrypt();
    crypt.setKey(pubKey);
    var enc = crypt.encrypt(data);
    return enc;
  }

}
