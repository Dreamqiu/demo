<template>
	<view >
		
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dots-styles="dotsStyles">
		    <swiper  @change="change" :style=" 'height:' + screenHeight  + 'px;' " >
		        <swiper-item v-for="(item ,index) in info" :key="index">
					<image :src="item.content" class="image-bg"></image>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		
		<view class="buttonDefine">
			<button @click="customized"> 开始定制 </button>
		</view>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		data() {
			return {
				info: [{
                content: 'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/index.png'
				}, {
					content: 'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/index1.png'
				}, {
					content: 'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/index2.png'
				}],
				current: 0,
				mode: 'dot',
				dotsStyles:{
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid',
					bottom:20
				},
				screenHeight:''//通过api获取屏幕的高度
			}
		},
		components: {uniSwiperDot},
		onLoad(){
			uni.getSystemInfo({
				success: (res) =>{
					this.screenHeight =res.screenHeight -100
					
				}
			})
		},
		methods: {
			customized(){
				uni.navigateTo({
					url:'/pages/size/chooicesize'
				})
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	// page{
	// 	height: 100%;
	// }
	.image-bg {
	    position: absolute;
	    z-index: -1;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
	}
	.buttonDefine{
		position:fixed;
		bottom:100upx;
		z-index: 2;
		width: 100%;
		text-align: center;
		button{
			background-color: #1C89FF;
			color: #FFFFFF;
			font-size: 30upx;
			border-radius: 20px;
			width: 250rpx;

		}
	}
	
</style>
