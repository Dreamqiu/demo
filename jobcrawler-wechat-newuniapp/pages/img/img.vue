<template>
	<view>
		
		<category-img :size="size" :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category-img>
		
		
		
		<!-- 底部导航栏 -->
		<view class="footer">
			<!-- <view style="width: 100rpx;height:70rpx;margin: 0 30rpx;" @click="checkedLetter">
				<image  src="../../static/icon/网信模板.png" class="tabber" v-show="letter"></image>
				<image  src="../../static/icon/网信模板1.png" class="tabber" v-show="!letter"></image>
			</view> -->
			<view style="width: 100rpx; height:70rpx;" @click="checkedImg">
				<image src="../../static/icon/图库1.png" style="width: 70%;height: 100%;" v-show="!img"></image>
				<image src="../../static/icon/图库.png" style="width: 70%;height: 100%;" v-show="img"></image>
			</view>
			<view style="width: 100rpx; height:70rpx;margin: 0 30rpx;" @click="checkedMap">
				<image src="../../static/icon/贴图1.png" style="width: 70%;height: 100%;" v-show="!map"></image>
				<image src="../../static/icon/贴图.png"  style="width: 70%;height: 100%;" v-show="map"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import categoryImg from "../../components/qiyue-category-img/qiyue-category-img.vue"
	import {imgTextList,loveTextList,familyTextList,otherTextList} from "../../Json.js"
	export default{
		data(){
			return{
				letter:false,
				img:true,
				map:false,
				categoryList:[],
				subCategoryList:[],
				size:'7寸',
			}
		},
		components:{
			categoryImg
		},
		onLoad(option) {
			this.size = option.size
		},
		methods:{
			
			categoryMainClick(category){
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category){
				console.log(category);
				uni.navigateTo({
					url:"/pages/size/chooicesize?lognimg="+ category.logo
				})
				
			},
			
			//自定义的底层tabber
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
			// 	uni.navigateTo({
			// 		url:"/pages/letter/letter"
			// 	})
			// },
			checkedImg(){
				if(this.img == true){
					this.img =true
				}else{
					this.img =true
				}
				if(this.letter == true){
					this.letter = false
				}
				if(this.map == true){
					this.map = false
				}
			},
			checkedMap(){
				if(this.map == true){
					this.map =true
				}else{
					this.map =true
				}
				if(this.letter == true){
					this.letter = false
				}
				if(this.img == true){
					this.img = false
				}
				uni.navigateTo({
					url:"/pages/map/map"
				})
			},
		},
		mounted() {
			for(var i=0;i<imgTextList.length;i++){
				var subList = [];
				
				if(i==0){
					for(var j=0;j<loveTextList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":loveTextList[j].src})	
					}
				}
				if(i==1){
					for(var j=0;j<familyTextList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":familyTextList[j].src})	
					}
				}
				if(i==6){
					for(var j=0;j<otherTextList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":otherTextList[j].src})	
					}
				}
				this.categoryList.push({"name":imgTextList[i],"subCategoryList":subList})
			}
			this.subCategoryList = this.categoryList[0].subCategoryList;
		}
	}
</script>

<style lang="scss">
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
