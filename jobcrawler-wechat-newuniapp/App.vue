<script>
	
	//运用vuex状态管理，在应用进入时就进行登录判断
import {mapMutations} from 'vuex'
export default {
	data(){
		return{
			code:'',
		}
	},
	methods: {
		...mapMutations(['login'])
		
	},
	onLaunch: function() {
		console.log('App Launch');
		// let userInfo = uni.getStorageSync('userInfo') || ''
		// if(userInfo.id){
		// 	//更新登陆状态
		// 	uni.getStorage({
		// 		key: 'userInfo',
		// 		success: (res) => {
		// 			this.login(res.data);
		// 		}
		// 	});
		// }
		uni.getStorage({
			key: 'uerInfo',
			success:(res) => {
				this.login(res.data);
			},
			fail:() => {
				// 1.获取登录用户 code
				let _this =this
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						// console.log(loginRes);
						_this.code = loginRes.code;  
						// 2. 将用户登录code传递到后台置换用户Authorization信息，后台会存储SessionKey、OpenId
						uni.request({
							url: _this.apiServer+ 'login?code=' + _this.code + '&appid=wx256942d14af7e087',
							success: res => {
								// console.log(codeRes);
								this.login(res.data);  //vuex 中的mutations 登录成功后吧用户信息用vuex存到storage中
							}
						});
					},
					fail: () => {
						uni.showToast({
							title: 'uni.login 接口调用失败，将无法正常使用开放接口等服务',
							icon: 'none'
						});
					}
				});
			}
		});
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
