// pages/project/project.js
const app = getApp();
Page({ 
	data:{ 
		detailData:null,
		itemId:'',
		timeDate:'',
		dayId:''
	},
	onLoad(options){  
		const dayId = options.dayId; 
		const itemId = options.itemId; 
		let currentObj = new Date(dayId*1000); 
		let timeDate = currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日';  
		let dayData = app.getOneItemData(dayId,itemId);
		this.setData({
			detailData: dayData,
			itemId:itemId,
			dayId:dayId,
			timeDate:timeDate
		})
	},
	removeStorage(){
		const itemId = this.data.itemId;
		const dayId = this.data.dayId; 
		app.removeOneItemData(dayId,itemId,function(){
			wx.showToast({
				title: '删除成功',
				icon: 'success' , 
				success:function(){ 
					wx.redirectTo({
					   url: '/pages/list/list?dayId='+dayId
					});			  	
				}
			});
		});
	}
})