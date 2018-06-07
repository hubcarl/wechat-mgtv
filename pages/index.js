import newData from '../lib/mgtv.js';

Page({

    data: {
        loading: false,
        loadtxt: '正在加载',
        currentId: '1001',
        banners: [],
        RollLink: [],
        AvatorText: [],
        newList: [],
        section: [
            {name : '精选',id : '1001'},{name : '黄金单身汉',id : '1032'},
            {name : '综艺',id : '1003'},{name : '电视剧',id : '1004'},
            {name : '电影',id : '1005'},{name : '少儿',id : '1004'}
        ]
    },

    isEmptyObject: function(e){ //判断Object对象是否为空

        let t;  

        for (t in e)  
            return !1;  
        return !0 

    },

    onLoad: function(params){
       
        let _this = this;
        let param = {
          API_URL: 'http://127.0.0.1:3333/'+this.data.currentId+'.json', 
        };
        
        newData.result(param).then( data => {
          
            
            let datas = data.data.data,
                bannerData = [],
                AvatorData = [],
                RollData = [],
                lists = [],
                obj = {};  
            for (let i = 0; i < datas.length-10; i++) { 

                if( datas[i].type == 'banner' ){
                    bannerData = datas[i].templateData;
                }

                if( datas[i].type == 'roundAvatorText' ){
                    AvatorData = datas[i].templateData;
                }

                if( datas[i].type == 'textRollLink' ){
                    RollData = datas[i].templateData;
                }

                if( datas[i].type == 'title' ||
                    datas[i].type == 'normalLandScape' ||
                    datas[i].type == 'largeLandScapeNodesc' ||
                    datas[i].type == 'textMoreLink' ||
                    datas[i].type == 'normalLandScapeNodesc' &&
                    datas[i].templateData.length ){

                    if( datas[i].type == 'title' ){

                        if(!_this.isEmptyObject(obj)){
                            lists.push(obj);
                            obj = {};
                            obj.indexs = i;
                        }                     

                        if( datas[i+1].type == 'largeLandScapeNodesc' ){
                            obj.type = 'big';
                            obj.name1 = datas[i].templateData[0].name;
                            obj.name2 = datas[i+1].templateData[0].name;
                            obj.bigPic = datas[i+1].templateData[0].picUrl;
                        }else{
                            obj.title = datas[i].templateData[0].name;
                            obj.type = 'small';
                            
                        }
                    
                        obj.more = datas[i].templateData[0]['jumpChannel'] ? true : false;
                        obj.list = [];

                    }

                    if( datas[i].type == 'textMoreLink' ){
                        obj.links = datas[i].templateData[0].name;
                    }

                    if( datas[i].type == 'normalLandScape' ||
                        datas[i].type == 'normalLandScapeNodesc'){      
                        obj.list =  obj.list.concat(datas[i].templateData);
                    }

                }

            }        

            this.setData({
                loading: true,
                loadtxt: '来了来了',
                banners: bannerData,
                RollLink: RollData,
                AvatorText: AvatorData,
                newList: Object.assign([], lists)
            })

            console.log(this.data.newList)
        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })

            console.error(e);
        });

    },

    handleTap: function(e){

        console.log(e);
        let id = e.currentTarget.id;

        if(id){
            this.setData({ currentId: id })
            this.onLoad();
        }

    }
})