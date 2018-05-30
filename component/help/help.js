Component({
  properties: { 
    date:null//传过来的属性值date
  },
  data: {
    page:'',
    p_top:0,
    p_left:0
  },
  ready: function () { 
    this.setData({
      page:this.data.date
    });
  } 

}) 