Page({
    data: {
        userInfo: {
            nickName: '骑着猪去旅行',
            avatarUrl: '../../image/code.png'
        }
    },

    getUserInfo () {
        let that = this;
        wx.getUserInfo({
            success (res) {
                console.log(res)
                that.setData({ userInfo: res.userInfo })
            }
        })
    },

    onLoad (params) {
        wx.login({
            success (res) {
                if (res.code) {
                    console.log('登录成功！' + res.code)
                } else {
                    console.error('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    }

})
