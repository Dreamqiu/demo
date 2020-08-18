<template>
	<view>
		<category :categoryListMap="categoryListMap" :subCategoryListMap="subCategoryListMap" @categoryMainClickMap="categoryMainClickMapMap" @categorySubClickMap="categorySubClickMap"></category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import {textList,fontList,loveList,decorateList,cartoonList,balloonList,electrocardiogramList,leafList} from "../../Json.js"
	export default {
		components:{
			category
		},
		data() {
			return {
				categoryListMap:[],
				subCategoryListMap:[],
				
			}
		},
		created(){
		},
		onLoad(options){	
		},
		methods: {
			categoryMainClickMapMap(category){
				this.subCategoryListMap = category.subCategoryListMap;
			},
			categorySubClickMap(category){
				console.log(category);
				uni.navigateTo({
					url:"/pages/size/chooicesize?logomap="+ category.logo
				})
				
			}
			
		},
		mounted() {
			for(var i=0;i<textList.length;i++){
				var subList = [];
				if(i==0){
					for(var j=0;j<fontList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":fontList[j].src})	
					}
				}
				if(i==1){
					for(var j=0;j<loveList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":loveList[j].src})	
					}
				}
				if(i==2){
					for(var j=0;j<decorateList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":decorateList[j].src})	
					}
				}
				if(i==3){
					for(var j=0;j<cartoonList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":cartoonList[j].src})	
					}
				} 
				if(i==5){
					for(var j=0;j<balloonList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":balloonList[j].src})	
					}
				} 
				if(i==6){
					for(var j=0;j<electrocardiogramList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":electrocardiogramList[j].src})	
					}
				}
				if(i==7){
					for(var j=0;j<leafList.length;j++){
						subList.push({"name":"分类"+i+":商品"+j,"logo":leafList[j].src})	
					}
				}
				this.categoryListMap.push({"name":textList[i],"subCategoryListMap":subList})
			}
			this.subCategoryListMap = this.categoryListMap[0].subCategoryListMap;
		}
	}
	    
</script>

<style>
</style>
