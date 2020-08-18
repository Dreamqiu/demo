<template>
	<view>
		
		<view class="heard">
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;" @click="backStep"> 上一步 </button></view>
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;" @click="nextStep"> 下一步 </button></view>
		</view>
		
		<view v-for="(item,index) in imgList" :key="index" class="imgNav">
			<image :src="item.src" @click="editLetter(item.id)"></image>
		</view>
		
		
		<!-- 底部导航栏 -->
		<!-- <view class="footer">
			<view style="width: 100rpx;height:70rpx;margin: 0 30rpx;" @click="checkedLetter">
				<image  src="../../static/icon/网信模板.png" class="tabber" v-show="letter"></image>
				<image  src="../../static/icon/网信模板1.png" class="tabber" v-show="!letter"></image>
			</view>
			<view style="width: 100rpx; height:70rpx;" @click="checkedImg">
				<image src="../../static/icon/图库1.png" style="width: 70%;height: 100%;" v-show="!img"></image>
				<image src="../../static/icon/图库.png" style="width: 70%;height: 100%;" v-show="img"></image>
			</view>
			<view style="width: 100rpx; height:70rpx;margin: 0 30rpx;" @click="checkedMap">
				<image src="../../static/icon/贴图1.png" style="width: 70%;height: 100%;" v-show="!map"></image>
				<image src="../../static/icon/贴图.png"  style="width: 70%;height: 100%;" v-show="map"></image>
			</view>
		</view> -->
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// letter:true,
				// img:false,
				// map:false,
				imgList:[
					{id:0,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF1.png'},
					{id:1,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF2.png'},
					{id:2,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF3.png'},
					{id:3,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF4.png'},
					{id:4,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF5.png'},
					{id:5,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF6.png'},
					{id:6,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF7.png'},
					{id:7,src:'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/letter/%E6%A8%A1%E6%9D%BF8.png'},
				],
				size:'',
			}
		},
		onLoad(option) {
			this.size = option.size
		},
		methods:{
			//编辑网信
			editLetter(id){
				uni.navigateTo({
					url:'./editletter?id='+id
				})
			},
			backStep(){
				uni.navigateBack({
					delta:1
				})
			},
			
			nextStep(){
				// debugger
				uni.navigateTo({
					url:"/pages/ordercreate/ordercreate?size="+this.size
				})
			},
			// //自定义的底层tabber
			// checkedLetter(){
			// 	if(this.letter == true){
			// 		this.letter =true
			// 	}else{
			// 		this.letter =true
			// 	}
			// 	if(this.img == true){
			// 		this.img = false
			// 	}
			// 	if(this.map == true){
			// 		this.map = false
			// 	}
			// },
			// checkedImg(){
			// 	if(this.img == true){
			// 		this.img =true
			// 	}else{
			// 		this.img =true
			// 	}
			// 	if(this.letter == true){
			// 		this.letter = false
			// 	}
			// 	if(this.map == true){
			// 		this.map = false
			// 	}
			// 	uni.navigateTo({
			// 		url:"/pages/img/img"
			// 	})
			// },
			// checkedMap(){
			// 	if(this.map == true){
			// 		this.map =true
			// 	}else{
			// 		this.map =true
			// 	}
			// 	if(this.letter == true){
			// 		this.letter = false
			// 	}
			// 	if(this.img == true){
			// 		this.img = false
			// 	}
			// 	uni.navigateTo({
			// 		url:"/pages/map/map"
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F2F6F9;
		height: 120%;
	}
	/* 固定头部 */
	.heard{
		position:fixed;
		display: flex;
		justify-content: space-between;
		z-index: 1;
		width: 90%;
		margin: 0 auto;
		padding: 10rpx 5%;
		background-color: #fff;
		text-align: center;
		line-height: 32px;
		
	}
	
	.imgNav{
		width: 30%;
		float: left;
		padding: 0 10rpx;
		text-align: center;

		image{
			width: 240rpx;
			height: 380rpx;

		}
	}
	
	//底层选择框
	.footer{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		left: 0;
		bottom: 0;
		z-index: 100;
		width: 100%;
		height: 120upx;
		font-size: 30upx;
		background-color: #fff;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.tabber{
			width: 100%;
			height: 100%;
		}
	}
</style>
