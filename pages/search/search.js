import newData from '../../lib/mgtv.js';

Page({
    data: {
        ranking: [],
        loading: false,
        loadtxt: '正在加载',
        value: '搜索电影/电视剧/综艺...'
    },

    onLoad: function (params) {

        const _this = this;
        const arrSection = ['综艺热榜', '电视剧热榜']
        const param = {
            API_URL: 'http://127.0.0.1:3333/1021.json',
            data: {},
        };

        newData.result(param).then(data => {

            const lists = data.data.data;
            const newList = [];
            for (let i = 0; i < lists.length; i++) {

                let obj = {};
                obj.rankArr = [];
                obj.bigTitle = lists[i].name.slice(0, 8);
                obj.bigImgea = lists[i].picUrl;
                obj.bigSubtitle = lists[i].name;
                obj.section = arrSection[i];
                newList.push(obj);

            }
            this.setData({
                loadtxt: '来了来了',
                loading: true,
                ranking: Object.assign([], newList)
            })

        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })

            console.error(e);
        })

    },
    deleteTxt: function (e) {
        this.setData({
            value: '搜索电影/电视剧/综艺...'
        })

    },
    onFouse: function (e) {
        this.setData({
            value: ''
        })
    },
    onBlue: function () {
        this.setData({
            value: '搜索电影/电视剧/综艺...'
        })
    }
})