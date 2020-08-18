<template>
	<view>
		<view class="heard">
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;width: 600rpx;" @click="customized"> 立即定制 </button></view>
		</view>
		<!-- <view style="height:100rpx ;"></view> -->
		<view style="width: 100%;">
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E8%AF%A6%E6%83%85.png" class="image-bg"></image>
			<!-- <image class="image-bg" src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/1%E4%B8%AA%E6%80%A7%E5%B1%95%E7%8E%B0.png"></image> -->
			<!-- <image class="image-bg" src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/2%E5%93%81%E8%B4%A8%E4%BB%8B%E7%BB%8D.png"></image>
			<image class="image-bg" src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/3%E4%BA%A7%E5%93%81%E5%B1%95%E7%A4%BA.png" ></image>
			<image class="image-bg" src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/%E5%AE%9A%E5%88%B6%E6%96%B9%E5%BC%8F%E6%96%87%E6%A1%88.png" ></image> -->
			
		</view>
		
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			customized(){
				uni.navigateTo({
					url:'/pages/size/chooicesize'
				})
			},
		}
	}
</script>

<style>
	//固定头部
	.heard{
		position:fixed;
		display: flex;
		justify-content: space-around;
		z-index: 1;
		width: 100%;
		/* height: 8%; */
		margin: 0 auto;
		padding: 5px 0px;
		background-color: #fff;
		text-align: center;
		line-height: 32px;
	}
	.image-bg {
	    position: absolute;
	    width: 100%;
	    height: 900%;
	}
</style>
