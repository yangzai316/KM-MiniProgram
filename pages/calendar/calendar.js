var app = getApp();
Page({
    data: {
        currentDate: '',
        dayList: '',
        currentDayList: '',
        currentObj: '',
        currentDay: '',
        currentMonth:'',
        x:0,
        hasDataArr:null
    },
    onLoad: function (options) {  
        var currentObj = this.getCurrentDayString(); 
        this.setData({
            currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
            currentDay: currentObj.getDate(),
            currentObj: currentObj,
            currentMonth: currentObj.getMonth()+1
        })
        this.setSchedule(currentObj)
    },
    doDay: function (direction ) { 
        var currentObj = this.data.currentObj;
        var Y = currentObj.getFullYear();
        var m = currentObj.getMonth() + 1;
        var d = currentObj.getDate();
        var str = '';  
        if (direction  == 1) {
            m -= 1;
            if (m <= 0) {
                str = (Y - 1) + '/' + 12 + '/' + d;
            } else {
                str = Y + '/' + m + '/' + d;
            };
        } else {
            m += 1;
            if (m <= 12) {
                str = Y + '/' + m + '/' + d;
            } else {
                str = (Y + 1) + '/' + 1 + '/' + d;
            };
        };
        currentObj = new Date(str);  
        this.setData({
            currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
            currentObj: currentObj,
            currentMonth: currentObj.getMonth()+1
        });
        this.setSchedule(currentObj);
    },
    getCurrentDayString: function () { 
        var c_obj = new Date()
        var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
        return new Date(a) 
    },
    setSchedule: function (currentObj) {  
        var Y = currentObj.getFullYear();
        var m = currentObj.getMonth() + 1;
        var d = currentObj.getDate();
        var currentDayNum = new Date(Y, m, 0).getDate();
        //获取当月的字符串范围
        let dataCodeMin = (+new Date(`${Y}-${m}-1`))/1000;
        let dataCodeMax = (+new Date(`${Y}-${m}-${currentDayNum}`))/1000; 
        let storageKeys = wx.getStorageInfoSync().keys; 
        let toMonthCodes = []; 
        for(let item of storageKeys){ 
            if(dataCodeMin<= item&& item<=dataCodeMax){  
                toMonthCodes.push(new Date(item*1000).getDate()); 
            };
        }; 
        var currentDayWeek = currentObj.getUTCDay() + 1;  
        var result = currentDayWeek - (d % 7 - 1); 
        var firstKey = result < 0 ? 7 + result : result; 
        var currentDayList = {};
        var f = 0;
        for (let i = 0; i < 42; i++) {
            currentDayList[i] = {};
            if (i < firstKey) {
                currentDayList[i].dayNum = '';
            }else{
                if (f < currentDayNum) {
                    currentDayList[i].dayNum = f + 1;
                    f = f + 1;
                    for(let j of toMonthCodes){ 
                        if(j == f) { 
                            currentDayList[j-1+firstKey].has = true;
                            break;
                        };
                    }; 
                } else if (f >= currentDayNum) {
                    break; 
                };
            };
        }; 
        this.setData({
            currentDayList: currentDayList,
            hasDataArr:toMonthCodes
        });
    },
    slideStart(e){
        this.setData({
            x:e.changedTouches[0].pageX
        }); 
    },
    slideEnd(e){ 
        if(Math.abs(this.data.x - e.changedTouches[0].pageX)<20){//不是滑动，距离太小
            let dayNum = e.target.dataset.daynum;
            if(!dayNum || dayNum=='') return;
            if(dayNum=='0'){  //回到今天 
                const currentObj = this.getCurrentDayString(); 
                this.setData({
                    currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日',
                    currentObj: currentObj,
                    currentMonth: currentObj.getMonth()+1
                });
                this.setSchedule(currentObj); 
            }else{//跳到某天的list页
                const currentObj = this.data.currentObj; 
                const dayId = (+new Date(currentObj.getFullYear() + '-' + (currentObj.getMonth() + 1) + '-' + dayNum + ' 00:00:00:00'))/1000; 
                wx.redirectTo({
                   url: '/pages/list/list?dayId='+dayId
                }); 
            }; 
        }else{ 
            let direction = this.data.x > e.changedTouches[0].pageX ? 2 : 1;//向左划:向右划 
            this.doDay(direction); 
        };
    } 
})