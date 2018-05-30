// pages/project/project.js
const app = getApp();
Page({  
	goProject(){
		wx.switchTab({
		  url: '/pages/project/project'
		})
	} 
});