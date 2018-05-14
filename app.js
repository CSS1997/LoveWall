//app.js
const AV = require('./libs/av-weapp-min.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
  },
  onShow:function () {
    AV.init({
      appId: 'iYWKqvUU1zbmrysnzj4DEdo8-gzGzoHsz',
      appKey: 'usSS5Xxq93FBQ3VKX8RdMjde',
    });
  },
  scroll:function(e){
    console.log(e);
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              var util = require('utils/util.js');  
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    specialCode:0
  }
});