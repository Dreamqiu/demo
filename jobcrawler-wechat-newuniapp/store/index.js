import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {  //全局变量定义
		hasLogin: false, //用户是否登录
		uerInfo: {}, //用户存放用户登录数据
		openid: null,
		testvuex:false,
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF']
	},
	mutations: {  //全局方法定义
		login(state, provider) {
			state.hasLogin = true;
			state.uerInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state){
			state.testvuex = true
		},
		setTestFalse(state){
			state.testvuex = false
		},
        setColorIndex(state,index){
            state.colorIndex = index
        }
	},
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					// uni.login({
					// 	success: (data) => {
					// 		commit('login')
					// 		setTimeout(function () { //模拟异步请求服务器获取 openid
					// 			const openid = '123456789'
					// 			console.log('uni.request mock openid[' + openid + ']');
					// 			commit('setOpenid', openid)
					// 			resolve(openid)
					// 		}, 1000)
					// 	},
					// 	fail: (err) => {
					// 		console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
					// 		reject(err)
					// 	}
					// })
					
				}
			})
		}
	}
})

export default store
