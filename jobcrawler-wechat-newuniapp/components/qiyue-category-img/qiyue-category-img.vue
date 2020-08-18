<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click.stop="categoryClickMain(item,index)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item[label]}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<view class="navrightButton">
					<button class="button"  :style="size == '7寸' ? 'color:'+fontColor + ';background-color:'+buttonBackground : ''" @click.stop="sevenClick"> 7寸</button>
					<button class="button" :style="size == '8寸' ? 'color:'+fontColor + ';background-color:'+buttonBackground : ''" @click.stop="eightClick"> 8寸</button>
					<button class="button" :style="size == '10寸' ? 'color:'+fontColor + ';background-color:'+buttonBackground : ''"  @click.stop="tenClick"> 10寸</button>
				</view>
				
				
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation >
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<image :src="item[imgSrc]" />
						<!-- <view>{{item[label]}}</view> -->
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				},
				fontColor:"#ffffff",
				buttonBackground: "#007AFF",
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			size: {
				type: String,
				default: '7寸'
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#F24544'
			},
			activeBackgroundColor: {
				type: String,
				default: '#e5e5e5'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
				
			},
			sevenClick(){
				const _this =this
				
			},
			eightClick(){
				const _this =this
			
			},
			tenClick(){
				const _this =this
			},
			
			
		},
		mounted() {
			this.categoryActive = this.defaultActive 
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight -110;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 20%;
		background-color:#FFFFFF;
	}

	.nav-left-item {
		height: 50px;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}

	.nav-right {
		width: 80%;
		/* padding-top: 11px; */
		background-color:#F0F0F0;
		.navrightButton{
			display: flex;
			padding: 10rpx 0;
		}
	}
	.button{
		background-color: #FFFFFF;
		font-size: 25rpx;
		// color: #000000;	
	}
	// .buttonafter{
	// 	background-color: #007AFF;
	// 	font-size: 25rpx;
	// 	color: #FFFFFF;
	// }


	.nav-right-item {
		width: 45%;
		/* height: 100px; */
		float: left;
		text-align: center;
		padding: 5px;
		font-size: 13px;
	}

	.nav-right-item image {
		/* width: 120upx;
		height: 120upx; */
		width: 133.937px;
		height: 170.079px;

	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
