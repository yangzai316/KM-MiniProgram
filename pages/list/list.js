// pages/project/project.js
const app = getApp()
Page({
	data:{
		storageData:[],
		completeKey:9,
		classActive9:true,
		classActive1:false,
		classActive0:false,
		dayId:0,
		dayString:''
	},
	onLoad: function (options) {  
		let dayId = ''; 
		if(options.dayId){
			dayId = options.dayId;
		}else{
	    	dayId = (+new Date((new Date()).toDateString()))/1000+''; 
		}; 
		let day = new Date(dayId*1000);
		let dayY = day.getFullYear();
		let day_m = day.getMonth()+1;
		let dayM = day_m>9?day_m:'0'+day_m;
		let dayD = day.getDate()>9?day.getDate():'0'+day.getDate();
		let dayString = `${dayY}-${dayM}-${dayD}`;
		this.setData({
			dayId:dayId,
			dayString:dayString
		});
	    this.setOneDayAllData(dayId);
  	}, 
  	changeStatus(e){ 
    	const status = e.currentTarget.dataset.status;  
    	if(status==9){
	    	this.setData({
	    		completeKey:9,
				  classActive9:true,
				  classActive1:false,
				  classActive0:false
	    	});
    	}else if(status==1){
	    	this.setData({
	    		completeKey:1,
				  classActive9:false,
				  classActive1:true,
				  classActive0:false
	    	});
    	}else{
	    	this.setData({
	    		completeKey:0,
				  classActive9:false,
				  classActive1:false,
				  classActive0:true
	    	});
    	}; 
  },
  changeCompleted(e){
  	  const _this = this;
      let dayId = this.data.dayId; 
      const itemId = e.currentTarget.dataset.id;
      let itemData = app.getOneItemData(dayId,itemId); 
      itemData.completed = !itemData.completed; 
      app.addOneItemData(dayId,itemId,itemData,function(){
      	 _this.setOneDayAllData(dayId);  
      });
  },
  setOneDayAllData(dayId){
    let dayData = app.getOneDayData(dayId);
    this.setData({
      storageData:dayData
    });
  }
});