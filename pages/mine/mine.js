//index.js
//获取应用实例
const app = getApp();
Page({
  data: { 
    userInfo: {},
    currentSize:0
  },
  onLoad: function () {
    const _this = this;
    wx.getStorageInfo({
      success: function(res) { 
        _this.setData({
          currentSize: (Math.floor(res.currentSize/res.limitSize*10000)/100)
        });
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo
          });
        }
      });
    };   
  },
  clearData(){
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '确定清空所有的备忘数据？数据一旦清空，将无法恢复！',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorageSync(); 
          _this.setData({
            currentSize:0
          });
        };
      }
    });   
  },
  preview(){
    wx.previewImage({ 
      urls: ['https://raw.githubusercontent.com/yangzaihuangzi/yangzaihuangzi.github.io/master/img/shang.jpg'] 
    });
  }   
});
