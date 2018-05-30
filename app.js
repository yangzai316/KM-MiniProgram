//app.js
App({ 
	globalData: {
	    userInfo: null 
	},
	onLaunch: function () {  
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) { 
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo 
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  };
                }
              })
            }
          }
        }); 
    },
    //获取
    getOneDayData(dayId){
		let obj = wx.getStorageSync(dayId);
		return obj;
    },
    getOneItemData(dayId,itemId){
    	let dayData = wx.getStorageSync(dayId); 
    	for(let i in dayData){ 
    		if(i == itemId){ 
    			return dayData[itemId];
    		};
    	};
    },
    //添加
    addOneDayData(dayId,obj){  
    },
    addOneItemData(dayId,itemId,obj,fun){  
    	let dayData = wx.getStorageSync(dayId) || {};  
    	dayData[itemId] = obj;  
		wx.setStorage({
			key:dayId,
			data:dayData,
			success(){
				if(fun) fun();
			}
		});  	
    },
    //设置
    setOneDayData(dayId,obj){   
    },
    setOneItemData(dayId,itemId,obj){ 
    },
	//删除
    removeOneDayData(dayId){ 
    },
    removeOneItemData(dayId,itemId,fun){ 
    	let dayData = wx.getStorageSync(dayId) || {}; 
    	delete dayData[itemId]; 
		wx.setStorage({
			key:dayId,
			data:dayData,
			success(){
				if(fun) fun();
			}
		});
    }
});