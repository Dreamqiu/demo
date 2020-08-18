<template>
	<view>
		
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" >
					<image :src="pictureOut" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item class="swiper-item" >
					<image src="../../static/color/浅紫.png" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			
		</view>
		
		<view style="border-bottom: 1px solid #e5e5e5;margin: 10px;"></view>
		<view  class="allOutside">
			<view style="display: flex;justify-content: space-between;">
				<view>智慧个性相框</view>
				<view style="color: #FF0000;">￥{{unitPice}}</view>
			</view>
		</view>
		<view style="border-bottom: 1px solid #e5e5e5;margin: 10px;"></view>
		
		<view class="sizeNumber">
			<view class="size">
				<view>定制尺寸</view>
				<view>{{size}}</view>
			</view>
			<view class="size">
				<view>定制数量</view>
				<uni-number-box :value="numberValue" @change="change" :min="1" />
			</view>
		</view>
		<view style="border-bottom: 1px solid #e5e5e5;margin: 10px;"></view>
		
		<view style="margin: 0 auto;width: 90%;">
			<view style="display: flex;justify-content: space-between;">
				<view>发票信息</view>
				<switch checked @change="switch1Change" />
			</view>
			<view v-show="checkedInvoice">
				<uinput label="发票抬头" v-model="invoiceRise" placeholder="请输入发票抬头"></uinput>
				<uinput label="纳锐识别码" v-model="identificationNumber"  placeholder="请输入纳锐人识别码"></uinput>
			</view>
			
		</view>
		<view style="border-bottom: 1px solid #e5e5e5;margin: 10px;"></view>
		
		<view class="address" >
			<view style="display: flex;justify-content: space-between;">  
				<view>收货地址</view>
				<view  @click="editAddress()">编辑地址</view>
			</view>
			<view style="display: flex;">
				<input v-model="name" placeholder="姓名" ></input>
				<input v-model="phone" placeholder="电话"></input>
			</view>
			<uinput type="textarea" height="200" tlposition="none" :maxlength="-1" placeholder="地址" v-model="address"> </uinput>
			<uinput type="textarea" height="200" tlposition="none" :maxlength="-1" placeholder="留言" v-model="message"> </uinput>
		</view>
		
		<!-- 底部导航栏 -->
		<view class="footer">
			<view class="textshow">
				<view style="color:red">合计：{{price}}元</view>
				<view>数量：{{numberValue}}件</view>
			</view>
			<view class="buttonoutside">
				<button class="submitbutton" @click="submit">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uinput from "@/components/poiuy-uinput/uinput.vue"
	export default {
		data(){
			return{
				checkedInvoice:true,
				invoiceRise:'', //发票抬头
				identificationNumber:'', //纳锐人识别码
				size:'',
				numberValue:1,//定制数量
				name:'',
				phone:'',
				address:'',
				message:'',
				unitPice:'',//单价
				pictureOut:'',
			}
		},
		computed:{
			price(){
				if(this.size == '7寸'){
					return 138*this.numberValue
				}else if(this.size == '8寸'){
					return 158*this.numberValue
				}else if(this.size == '10寸'){
					return 188*this.numberValue
				}
			}
		},
	    components: {uinput},
		onLoad(option) {
			this.size = option.size
			if(this.size == '7寸'){
				this.unitPice = 138
			}else if(this.size == '8寸'){
				this.unitPice = 158
			}else if(this.size == '10寸'){
				this.unitPice = 188
			}
			// uni.getStorage({
			// 	key:'PICTURE',
			// 	success: function (res) {
			// 		this.pictureOut = res.data
			// 	}
			// })
		},
		methods:{
			//数量
			change(value) {
				this.numberValue = value
			},
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			
			//发票控制
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				//打开时e.target.value为true
				this.checkedInvoice = e.target.value
			},
			//提交订单
			submit(){
				let _this = this
				let size = _this.size
				let num = _this.numberValue
				let price = _this.price
				if(_this.checkedInvoice == true){
					let invoiceRise = _this.invoiceRise
					let identificationNumber = _this.identificationNumber
				}
				let name = _this.name
				let phone = _this.phone
				let address = _this.address
				let message = _this.message
				
			}
		}
	}
	
</script>

<style lang="scss">
	page{
		font-size: 28rpx;
		height: 140%;
	}
	
	.carousel {
		height: 500upx;
		width: 100%;
		position:relative;
		swiper{
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			width: 400rpx;
			height: 400upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.allOutside{
		margin: 0 auto;
		width: 90%;
	}
	.sizeNumber{
		margin: 0 auto;
		width: 90%;
		.size{
			display: flex;
			justify-content: space-between;
			margin: 20rpx 0;
		}
	}
	.address{
		margin: 0 auto;
		width: 90%;
		input{
			margin: 4px;
			border: 1px solid #c0c0c0;
			width: 100%;
			padding: 0 10px;
			font-size: 28upx;
			height: 60upx;
			border-radius: 8upx;
			transition: all .3s;
			line-height: 70upx;
			color: #707070;
			box-sizing: border-box;
		}
		textarea{
			margin: 4px;
			border: 1px solid #c0c0c0;
			width: 100%;
			padding: 0 10px;
			font-size: 28upx;
			height: 100upx;
			border-radius: 8upx;
			transition: all .3s;
			line-height: 70upx;
			color: #707070;
			box-sizing: border-box;
		}
	}
	
	/* 底层框 */
	.footer{
		position: fixed;
		align-items: center;
		justify-content: space-between;
		left: 0;
		bottom: 0;
		z-index: 100;
		width: 100%;
		height: 150upx;
		font-size: 30upx;
		background-color: #fff;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
	}
	.textshow{
		display:flex;
		justify-content:space-between;
		width: 90%;
		margin:10rpx 5%;
		text-align: center;
	}
	.buttonoutside {
		/* margin: 0 auto; */
		/* margin-top: 20rpx; */
		text-align: center;
	
		}
	.submitbutton{
		width: 90%;
		height: 100%;
		color: #fff;
		font-size: 32upx;
		background-color: #1989FA;
		border: none;
	}
</style>
