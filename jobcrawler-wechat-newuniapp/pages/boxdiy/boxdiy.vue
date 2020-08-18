<template>
	<view>
		<view class="heard">
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;" @click="backStep"> 上一步 </button></view>
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;" @click="nextStep"> 下一步 </button></view>
		</view>
		<view style="padding-top: 80rpx;text-align: center;font-size: 30rpx;padding-bottom: 20rpx;">包装盒添加文字</view>
		
		
		<view class="box-outsider" v-if="size == '7寸' ">
			<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" width="262.91335" height="208.3466" enableUndo="true"></canvas-drag>
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E5%8C%85%E8%A3%85%E7%9B%92.png" style="width: 262.91335px;height:208.3466px;position: absolute;z-index: -1;"></image>
		</view>
		
		<view class="box-outsider" v-else-if="size == '8寸' ">
			<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" width="289.701" height="233.646" enableUndo="true"></canvas-drag>
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E5%8C%85%E8%A3%85%E7%9B%92.png" style="width: 289.701px;height:233.646px;position: absolute;z-index: -1;"></image>
		</view>
		
		<view class="box-outsider" v-else-if="size == '10寸' ">
			<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" width="346.25185" height="289.701" enableUndo="true"></canvas-drag>
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E5%8C%85%E8%A3%85%E7%9B%92.png" style="width: 346.25185px;height:289.701px;position: absolute;z-index: -1;"></image>
		</view>
		
		
		<view class="leftbottom" @click="toggleText">
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E6%96%87%E5%AD%97%E8%BE%93%E5%85%A5.png" ></image>
		</view>
		
		<view class="footerImg">
			<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E6%A0%B7%E5%93%81%E5%B1%95%E7%A4%BA.png"></image>
		</view>
		
		<!-- 文字输入弹出层 -->
		<view
			class="popup spec" 
			:class="textClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleText"
		>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view style="margin-left: 20rpx;margin-top: 20rpx;">请输入文字</view>
				<view>
					<input focus type="text" v-model="textValue"/>
				</view>
				<view class="buttonDefine">
					<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E5%8F%96%E6%B6%88%E6%96%87%E5%AD%97.png" style="margin-right: 50rpx;" @click="textcancel()" ></image>
					<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E7%A1%AE%E8%AE%A4.png" @click="textchecked()"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import canvasDrag from "@/components/canvas-drag-box/index.vue";
	export default{
		data(){
			return{
				textClass:'none',//文字输入规格弹窗
				textValue:'',
				size:'',
			}
		},
		components:{canvasDrag},
		onLoad(option) {
			this.size = option.size
		},
		methods:{
			backStep(){
				uni.navigateBack({
					// delta:1
				})
			},
			
			nextStep(){
				this.$refs.canvasRef.exportFun().then(imgArr => {
					console.log(JSON.stringify(imgArr));
				  }).catch(e => {
					console.error(e);
				  });
				// debugger
				uni.navigateTo({
					url:"/pages/letter/letter?size="+this.size
					// url:"/pages/ordercreate/ordercreate?size="+this.size
				})
			},
			stopPrevent(){},
			//文本弹窗显示
			toggleText(){
				let _this =this
				if(_this.textClass === 'show'){
					_this.textClass = 'hide';
					setTimeout(() => {
						_this.textClass = 'none';
					}, 250);
				}else if(_this.textClass === 'none'){
					_this.textClass = 'show';
				}
			},
			//文本确认
			textchecked(){
				
				let _this =this
				let value = _this.textValue
				//添加文本
				if(value != ""){
					this.setData({
						graph: {
							type: 'text',
							text: value,
						}
					});
				}
				//弹窗关闭
				if(_this.textClass === 'show'){
					_this.textClass = 'hide';
					setTimeout(() => {
						_this.textClass = 'none';
					}, 250);
				}
			},
			textcancel(){
				let _this =this
				//弹窗关闭
				if(_this.textClass === 'show'){
					_this.textClass = 'hide';
					setTimeout(() => {
						_this.textClass = 'none';
					}, 250);
				}
			},
		}
	}
</script>

<style lang="scss">
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
	.box-outsider{
		position: relative;
		text-align: center;
		// width:100%;
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	// 左侧选择框,固定的
	.leftbottom{
		position: fixed;
		bottom:400upx;
		z-index: 98;
		background-color: #ffffff;
		// box-shadow: 2px 0px 5px rgba(0,0,0,.1);
		padding-left:15px;
		width:100rpx;
		height:100rpx;
		image{
			width: 100%;
			height: 100%;
		}
	
	}
	// 底部图片
	.footerImg{
		position: fixed;
		bottom:0;
		width: 100%;
		image{
			width: 100%;
			height: 350upx;
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			// min-height: 40vh;
			// height:50%;
			box-shadow: 0 -1px 5px rgba(0,0,0,.1);
			border-radius: 10upx 10upx 0 0;
			background-color: #F2F6F9;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: #fa436a;
				font-size: 30upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 0upx;
		margin: 0 auto;
		font-size: 25upx;
		.buttonDefine{
			text-align: center;
			margin:30rpx 0;
			image{
				width: 200rpx;
				height: 60rpx;
			}
		}
	}
	input{
		background-color: #FFFFFF;
		border-radius: 5px;
		margin: 5px 20px;
		font-size: 30rpx;
		padding: 5px;
	
	}
</style>
