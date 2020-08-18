<template>
	<view>
		<view class="user-section">
			<image class="portrait" :src="storageUserinfo.avatarUrl || 'http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/huipai/missing-face.png' "></image>
			<view class="info-box" v-show="!showLogin">
				<text class="username">{{storageUserinfo.nickName}}</text>
			</view>
			<view class='bottomoutside'>
				<button v-show="showLogin" class='bottom' open-type="getUserInfo" lang="zh_CN"  @getuserinfo="wxGetUserInfo" withCredentials="true" >
					点击显示微信头像
				</button>  
			</view>
		</view>
		
		<view class="list-outside">
			<uni-list >
			<uni-list-item title="我的订单" thumb="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/user/%E8%AE%A2%E5%8D%95.png" />
			<uni-list-item title="购物车" thumb="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/user/%E8%B4%AD%E7%89%A9%E8%BD%A6.png" />
			<uni-list-item title="客服微信" thumb="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/user/%E5%AE%A2%E6%9C%8D.png" />
			<uni-list-item title="商务合作" thumb="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/user/%E5%90%88%E4%BD%9C.png" />
			<uni-list-item title="了解我们" thumb="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/user/%E4%BA%86%E8%A7%A3.png" />
			</uni-list>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #F2F6F9;
	}
	.user-section{
		text-align: center;
		background-color: #FFFFFF;
		box-shadow: 2px 0px 5px rgba(0,0,0,.1);
		image{
			width: 130upx;
			height: 130upx;
			border-radius: 50%;
		}
	}
	.username {
		font-size: 30rpx;
		margin-left: 20upx;
	}
	.bottom {
		font-size: 30rpx;	
		cursor: pointer;
		border: 2 solid #FFFFFF;
		text-align: center;
		text-decoration: none;
		font-weight: bolder;
	}
	.list-outside{
		margin-top: 20rpx;
		border-radius: 10px;

	}
	
	
</style>
