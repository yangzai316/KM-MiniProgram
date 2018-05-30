// pages/project/project.js
const app = getApp()
Page({ 
	data:{
		allData:null,
		allDataLen:0
	},
	onLoad: function (options) { 
		let allData = {};   
		let storageInfo = wx.getStorageInfoSync().keys;
		for(let item of storageInfo) {   
		    let itemData = wx.getStorageSync(item);
			let day = new Date(item*1000);
			let dayY = day.getFullYear();
			let day_m = day.getMonth()+1;
			let dayM = day_m>9?day_m:'0'+day_m;
			let dayD = day.getDate()>9?day.getDate():'0'+day.getDate();
			let dayString = `${dayY}-${dayM}-${dayD}`;   
		  	allData[item] = {}; 
		  	allData[item].dayString = dayString; 
		  	allData[item].Num = Object.keys(itemData).length; 
		};   
		this.setData({
			allData:allData,
			allDataLen:Object.keys(allData).length
		}); 
  	} 
});  