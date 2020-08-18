<template>
	<view class="">
		<view class="heard">
			<view style="font-size: 30rpx;">相框DIY设计</view>
			<view> <button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;" @click="nextStep"> 下一步 </button></view>
		</view>
		<view style="height:100rpx ;"></view>
		
		
			<view class="box-outsider" v-if="size == '7寸' && style == '竖款' " >
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="198.4252" height="256.252" enableUndo="true" ></canvas-drag>	
			</view>

			<view class="box-outsider" v-else-if="size == '8寸' && style == '竖款' " >
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="229.0392" height="286.866" enableUndo="true" ></canvas-drag>
			</view>	
		
			<view class="box-outsider" v-else-if="size == '10寸' && style == '竖款'  " style="justify-content: flex-end;" >
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="293.6692" height="351.496" enableUndo="true" ></canvas-drag>
			</view>
		
			<view class="box-outsider" v-else-if="size == '7寸' && style == '横款' "  style="justify-content:center">
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="256.252" height="198.4252" enableUndo="true" ></canvas-drag>
			</view>
	
			<view class="box-outsider" v-else-if="size == '8寸' && style == '横款' " style="justify-content:center">
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="286.866" height="229.039" enableUndo="true" ></canvas-drag>
			</view>
		
			<view class="box-outsider" v-else-if="size == '10寸' && style == '横款' " style="justify-content:center">
				<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
					width="351.496" height="293.6692" enableUndo="true" ></canvas-drag>
			</view>

			
			<!-- <cropper ref="cropperImg" @update="receive" :closepreview="closepreview" ></cropper> -->
			<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="false" :maxWidth="500" :minHeight="300"></kps-image-cutter>
		
		<!-- 左侧选择框 -->
		<view class="leftbottom">
			<view class="imgout" @click="toggleSpec">
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E9%80%89%E6%8B%A9%E5%B0%BA%E5%AF%B8.png" ></image>
			</view>
			<view class="imgout"  @click="toggleText()">
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E6%96%87%E5%AD%97%E8%BE%93%E5%85%A5.png" ></image>
			</view>
			<view class="imgout" @click="onAddImage">
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E6%B7%BB%E5%8A%A0%E5%9B%BE%E7%89%87.png"></image>
			</view>
		</view>
		
		<!-- 底部导航栏 -->
		<view class="footer">
			<view style="width: 100rpx; height:70rpx;" @click="chooseImg" >
				<!-- @click="toggleImg" -->
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/icon/%E5%9B%BE%E5%BA%931.png" style="width: 70%;height: 100%;" v-show="!img"></image>
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/icon/%E5%9B%BE%E5%BA%93.png" style="width: 70%;height: 100%;" v-show="img"></image>
			</view>
			<view style="width: 100rpx; height:70rpx;margin: 0 30rpx;" @click="chooseMap">
				<!-- @click="toggleMap" -->
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/icon/%E8%B4%B4%E5%9B%BE1.png" style="width: 70%;height: 100%;" v-show="!map"></image>
				<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/icon/%E8%B4%B4%E5%9B%BE.png"  style="width: 70%;height: 100%;" v-show="map"></image>
			</view>
		</view>
		
		
		<!-- 选择尺寸弹出层 -->
		<view
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view style="margin-left: 20rpx;margin-top: 20rpx;">请选择相框尺寸</view>
				<view class="size-outside" >
					<view class="size-inside">
						<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/7%E5%AF%B8.png" style="width: 80%;height:250rpx;"></image>
						<view>169x220mm</view>
					</view>
					<view class="size-inside">
						<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/8%E5%AF%B8.png" style="width: 90%;height: 280rpx;"></image>
						<view>196x247mm</view>
					</view>
					<view class="size-inside">
						<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/10%E5%AF%B8.png" style="width: 100%;height: 300rpx;"></image>
						<view>252x304mm</view>
					</view>
				</view>
				<view>
					<radio-group @change="radioChange" style="display: flex;justify-content: space-around;">
						<label v-for="(item,index) in imageList" :key="index" >
							<radio :value="item.name" :checked="index === current" />
							<label>{{item.name}}</label>
						</label>
					</radio-group>	
				</view>
				<view>
					<radio-group @change="styleRadioChange" style="display: flex;justify-content: space-around;">
						<label v-for="(item,index) in styleRadio" :key="index" >
							<radio :value="item.name" :checked="index === currentstyle" />
							<label>{{item.name}}</label>
						</label>
					</radio-group>
					
				</view>
				
				<view class="buttonDefine">
					<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E7%A1%AE%E5%AE%9A%E6%8C%89%E9%92%AE.png" @click="sizechecked()"></image>
				</view>
			</view>
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
					<input focus type="text" v-model="textValue" />
				</view>
				
				<view>
					<radio-group @change="textRadioChange" style="display: flex;justify-content: space-around;">
						<label v-for="(item,index) in textRadioDirection" :key="index" >
							<radio :value="item.name" :checked="index === current" />
							<label>{{item.name}}</label>
						</label>
					</radio-group>
				</view>
				
				<view style="margin-left: 20rpx;margin-top: 20rpx;">选择颜色</view>
				<view class="text-color">
					<view v-for="(item,index) in textColor" :key="index" class="text-color-img"  @click="chooseColor(index,item.color)">
						<image :src="item.url"  :class="{selected:item.selected}"></image>
					</view>
				</view>
				<view class="buttonDefine">
					<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E5%8F%96%E6%B6%88%E6%96%87%E5%AD%97.png" style="margin-right: 50rpx;" @click="textcancel()"></image>
					<image src="http://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com/resources/yunhiadingzhi/map/image/%E7%A1%AE%E8%AE%A4.png" @click="textchecked()"></image>
				</view>
			</view>
		</view>
		
		<!-- 图库弹出层 -->
		<!-- <view
			class="popup spec" 
			:class="imgClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleImg"
		>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<category-img :size="size" :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category-img>
			</view>
		</view> -->
		
		<!-- 贴图弹出层 -->
		<!-- <view
			class="popup spec" 
			:class="mapClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleMap"
		>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<category :categoryListMap="categoryListMap" :subCategoryListMap="subCategoryListMap" @categoryMainClickMap="categoryMainClickMapMap" @categorySubClickMap="categorySubClickMap"></category>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	
	import canvasDrag from "@/components/canvas-drag/index";
	import cropper from "@/pages/cropper/index";
	
	
	// import categoryImg from "../../components/qiyue-category-img/qiyue-category-img.vue"
	// import {imgTextList,loveTextList,familyTextList,otherTextList} from "../../Json.js"
	// import category from "../../components/qiyue-category/qiyue-category.vue"
	// import {textList,fontList,loveList,decorateList,cartoonList,balloonList,electrocardiogramList,leafList} from "../../Json.js"
	export default{
		data(){
			return{
				letter:false,
				img:false,
				map:false,
				specClass: 'none',//选择尺寸规格弹窗
				textClass:'none',//文字输入规格弹窗
				imgClass:'none',//图库规格弹窗
				mapClass:'none',//图标规格弹窗
				imageList:[
					{id:1,size:'169x220mm',name:'7寸'},
					{id:2,size:'196x247mm',name:'8寸'},
					{id:3,size:'196x247mm',name:'10寸'},
				],
				styleRadio:[
					{id:1,name:'竖款'},
					{id:2,name:'横款'},
				],
				style:'竖款',
				currentstyle:0,
				current:0, //当前选中的尺寸按钮
				size:'7寸', //当前选中的尺寸，默认选中7寸
				textRadioDirection:[
					{id:1,name:'横向'},
					{id:1,name:'纵向'},
				],
				textCheckDirection:'横向', //文字的方向
				textValue:'',
				textColor:[
					{id:0,url:'../../static/color/果绿.png',selected:false,color:'#9FD6AC'},{id:1,url:'../../static/color/白.png',selected:false,color:'#FFFFFF'},
					{id:2,url:'../../static/color/蛋黄.png',selected:false,color:'#FFD159'},{id:3,url:'../../static/color/橙.png',selected:false,color:'#FEC345'},
					{id:4,url:'../../static/color/粉.png',selected:false,color:'#FFCDD4'},{id:5,url:'../../static/color/海蓝.png',selected:false,color:'#00A8F5'},
					{id:6,url:'../../static/color/黑.png',selected:false,color:'#000000'},{id:7,url:'../../static/color/红.png',selected:false,color:'#FF5B71'},
					{id:8,url:'../../static/color/蓝.png',selected:false,color:'#04C5F0'},{id:9,url:'../../static/color/绿.png',selected:false,color:'#57BB73'},
					{id:10,url:'../../static/color/浅紫.png',selected:false,color:'#B28FF7'},{id:11,url:'../../static/color/紫.png',selected:false,color:'#E4BEE3'},
				],
				logo:'',//贴图图片
				lognimg:'', //图库
				fontColorChecked:'#000000', //选中的字体颜色,要传递给canvas-drag组件，默认黑色
				pictureOut:'',
				closepreview:false,
				
				// //图库弹出层
				// categoryList:[],
				// subCategoryList:[],
				// //图标弹出层
				// categoryListMap:[],
				// subCategoryListMap:[],
				
				url: "", //需要裁剪的图片路径，为空时控件隐藏，不为空时控件显示
				path: "", //裁剪的图片路径
			}
		},
		components:{canvasDrag,cropper,kpsImageCutter}, //categoryImg,category,
		onLoad(option) {
			this.onLoadStorage()
			//路由有传递数据时加载
			
			if(option.lognimg != undefined){
				this.logoimg = option.lognimg
				this.addMaterial()
			}
			if(option.logomap != undefined){
				// this.logomap = option.logomap
				//贴图里面都是已经上传的网络图片，先下载图片
				uni.downloadFile({
					url: option.logomap,
					success: (res) => {
					    if (res.statusCode === 200) {
					        console.log('下载成功：' + res.tempFilePath);
							this.setData({
								graph: {
									x:20,
									y:50,
									w: 80,
									h: 80,
								  type: 'image',
								  url:res.tempFilePath, //网上下载的临时文件
								}
							});
					    }
					},
					fail:(res) =>{
						console.log(res)
					}
				})
			}
		},
		onShow() {
			
		},
		onReady(){
			
		},
		methods:{
			
			//页面进入的时候加载storage中的数据
			onLoadStorage(){
				//页面加载，如果storage中有数据，则加载到画布中
				const _this =this
				uni.getStorage({
					key:'SIZE',
					success:res =>{
						_this.size = res.data
					},
					fail:res =>{
						_this.size ='7寸'
					}
				})
				uni.getStorage({
					key:'STYLE',
					success:res =>{
						_this.style = res.data
					},
					fail:res =>{
						_this.style ='竖款'
					}
				})
				uni.getStorage({
					key:'CANVAS',
					success:res =>{
						const listCanvas = res.data
						for(let i=0;i<listCanvas.length;i++){
							if(listCanvas[i].type =="text"){
								_this.setData({
									graph: {
										x:listCanvas[i].x,
										y:listCanvas[i].y,
										w:listCanvas[i].w,
										h:listCanvas[i].h,
										type: 'text',
										rotate: listCanvas[i].rotate,
										text: listCanvas[i].text,
										color: listCanvas[i].color,
										fontSize: listCanvas[i].fontSize,
									}
								});
							}else if( listCanvas[i].type =="image"){
								uni.downloadFile({
									url: listCanvas[i].url,
									success: (res) => {
									    // console.log(res.tempFilePath)
										_this.setData({
											graph: {
												x:listCanvas[i].x,
												y:listCanvas[i].y,
												w:listCanvas[i].w,
												h:listCanvas[i].h,
												type: 'image',
												url: res.tempFilePath,
												rotate: listCanvas[i].rotate,
											}
										});
									}
								})
							}
						}
					},
					fail:res =>{
						
					}
				})
			},
			
			//图库添加到画布中
			addMaterial(){
				const _this = this
				var w=0
				var h=0
				if(_this.size == '7寸' && _this.style == '竖款'){
					w=293.6692
					h=351.496
				}else if(_this.size == '8寸' && _this.style == '竖款'){
					w=158.74
					h=216.5668
				}else if(_this.size == '10寸' && _this.style == '竖款'){
					w=293.6692
					h=351.496
				}else if(_this.size == '7寸' && _this.style == '横款'){
					w=190.488
					h=132.6616
				}else if(_this.size == '8寸' && _this.style == '横款'){
					w=216.5668 
					h=158.74
				}else if(_this.size == '10寸' && _this.style == '横款'){
					w=351.496
					h=293.6692
				}
				uni.downloadFile({
					url: _this.logoimg,
					success: (res) => {
					    if (res.statusCode === 200) {
					        // console.log('下载成功：' + res.tempFilePath);
							_this.setData({
								graph: {
									x:0,
									y:0,
									w:w,
									h:h,
									type: 'image',
									url: res.tempFilePath, //网上下载的临时文件
								}
							});
					    }
					},
					fail:(res) =>{
						console.log(res)
					}
				})
			},
			
			onok(ev) {
				//获取到剪裁的图片，写入到画布中
				this.path = ev.path;
				//做判断相框的样式，传入制定宽度的图片
				var x=0
				var y=0
				var w=0
				var h=0
				if(this.size == '7寸' && this.style == '竖款'){
					x=32.882
					y=32.882
					w=132.6616
					h=190.488
				}else if(this.size == '8寸' && this.style == '竖款'){
					x=35.1496
					y=35.1496
					w=158.74
					h=216.5668
				}else if(this.size == '10寸' && this.style == '竖款'){
					x=39.685
					y=39.685
					w=214.2992
					h=272.126
				}else if(this.size == '7寸' && this.style == '横款'){
					x=32.882
					y=32.882
					w=190.488
					h=132.6616
				}else if(this.size == '8寸' && this.style == '横款'){
					x=35.1496
					y=35.1496
					w=216.5668 
					h=158.74
				}else if(this.size == '10寸' && this.style == '横款'){
					x=39.685
					y=39.685
					w=272.126
					h=214.2992
				}
				this.setData({
					graph: {
						x:x,
						y:y,
						w:w,
						h:h,
						type: 'image',
						url: this.path,
					}
				});
				this.url = "";
			},
			oncancle() { 
				// url设置为空，隐藏控件
				this.url = "";
			},
			
			//选择尺寸按钮
			radioChange: function(evt) {
				for (let i = 0; i < this.imageList.length; i++) {
					if (this.imageList[i].name === evt.target.value) {
						this.current = i;
						this.size = this.imageList[i].name;
						break;
					}
				}
			},
			//确定尺寸
			sizechecked(){
				let _this =this
				//规格弹窗关闭
				if(_this.specClass === 'show'){
					_this.specClass = 'hide';
					setTimeout(() => {
						_this.specClass = 'none';
					}, 250);
				}
				//把尺寸保存在本地
				uni.setStorage({
					key:'SIZE',
					data:this.size
				})
				//把选择的款式保存在本地
				uni.setStorage({
					key:'STYLE',
					data:this.style
				})
			},
			//选择横款或竖宽按钮
			styleRadioChange:function(evt){
				for (let i = 0; i < this.styleRadio.length; i++) {
					if (this.styleRadio[i].name === evt.target.value) {
						this.currentstyle = i;
						this.style = this.styleRadio[i].name;
						break;
					}	
				}
			},
			
			// //通过receive方法调用子组件传递过来的数据
			// receive:function(imageSrc){
			// 	const _this =this
			// 	//获取到的剪裁的图片加入画布
			// 	_this.closepreview = false
			// 	_this.setData({
			// 		graph: {
			// 			w: 132.6616,
			// 			h: 190.488,
			// 			type: 'image',
			// 			url: imageSrc,
			// 		}
			// 	});
			// 	// debugger	
			// },
			//添加图片
			onAddImage() {
				
				uni.chooseImage({
					success: (res) => {
						// 设置url的值，显示控件
						this.url = res.tempFilePaths[0];
					}
				});
				
			},
			stopPrevent(){},
			//显示尺寸弹窗
			toggleSpec(){
				let _this =this
				if(_this.specClass === 'show'){
					_this.specClass = 'hide';
					setTimeout(() => {
						_this.specClass = 'none';
					}, 250);
				}else if(_this.specClass === 'none'){
					_this.specClass = 'show';
				}
				
			},
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
			// //图库弹窗显示
			// toggleImg(){
			// 	let _this =this
			// 	if(_this.imgClass === 'show'){
			// 		_this.imgClass = 'hide';
			// 		_this.img = false
			// 		setTimeout(() => {
			// 			_this.imgClass = 'none';
			// 		}, 250);
			// 	}else if(_this.imgClass === 'none'){
			// 		_this.imgClass = 'show';
			// 		_this.img = true
			// 		_this.map = false
			// 	}
			// },
			chooseImg(){
				this.onExportJson()
				uni.navigateTo({
					url:'/pages/img/img?size='+this.size
				})
			},
			chooseMap(){
				this.onExportJson()
				uni.navigateTo({
					url:'/pages/map/map'
				})
			},
			//图标弹窗显示
			// toggleMap(){
			// 	let _this =this
			// 	if(_this.mapClass === 'show'){
			// 		_this.mapClass = 'hide';
			// 		_this.map = false
			// 		setTimeout(() => {
			// 			_this.mapClass = 'none';
			// 		}, 250);
			// 	}else if(_this.mapClass === 'none'){
			// 		_this.mapClass = 'show';
			// 		_this.map = true
			// 		_this.img = false
			// 	}
				
			// },
			//选择文字颜色
			chooseColor(index,color){
				let _this = this
				//处理选中
				for(var i=0;i<_this.textColor.length;i++){
					if(i == index){
						_this.textColor[i].selected = true
					}else{
						_this.textColor[i].selected = false
					}
				}
				//选中的颜色,改变文字颜色
				_this.fontColorChecked = color
			},
			//选择文本方向按钮
			textRadioChange:function(evt){
				for (let i = 0; i < this.textRadioDirection.length; i++) {
					if (this.textRadioDirection[i].name === evt.target.value) {
						this.current = i;
						this.textCheckDirection = this.textRadioDirection[i].name;
						break;
					}	
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
							x:20,
							y:10,
							type: 'text',
							text: value,
							color:_this.fontColorChecked, //传入的文字的颜色，其他属性都可以这么更改！
							textDirection:_this.textCheckDirection //传入的文本方向
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
				//置空输入框和颜色选择
				_this.textValue = ""
				for(var i=0;i<_this.textColor.length;i++){
					_this.textColor[i].selected = false	
				}
			},
			//取消文字
			textcancel(){
				let _this =this
				//弹窗关闭
				if(_this.textClass === 'show'){
					_this.textClass = 'hide';
					setTimeout(() => {
						_this.textClass = 'none';
					}, 250);
				}
				//置空输入框和颜色选择
				_this.textValue = ""
				for(var i=0;i<_this.textColor.length;i++){
					_this.textColor[i].selected = false	
				}
			},
			
			// categoryMainClick(category){
			// 	this.subCategoryList = category.subCategoryList;
			// },
			// categorySubClick(category){
			// 	console.log(category);
			// 	//图库里面都是已经上传的网络图片，要先下载图片
			// 	uni.downloadFile({
			// 		url: category.logo,
			// 		success: (res) => {
			// 		    if (res.statusCode === 200) {
			// 		        console.log('下载成功：' + res.tempFilePath);
			// 				// downloadLogo = res.tempFilePath;
			// 				this.setData({
			// 					graph: {
			// 						x:0,
			// 						y:0,
			// 					  w: 293.6692,
			// 					  h: 351.496,
			// 					  type: 'image',
			// 					  url:res.tempFilePath, //网上下载的临时文件
			// 					}
			// 				});
			// 		    }
			// 			if(this.imgClass === 'show'){
			// 				this.imgClass = 'hide';
			// 				setTimeout(() => {
			// 					this.imgClass = 'none';
			// 				}, 250);
			// 			}
			// 			if(this.mapClass === 'show'){
			// 				this.mapClass = 'hide';
			// 				setTimeout(() => {
			// 					this.mapClass = 'none';
			// 				}, 250);
			// 			}
			// 		}
			// 	})
			// },
			
			// categoryMainClickMapMap(category){
			// 	this.subCategoryListMap = category.subCategoryListMap;
			// },
			// categorySubClickMap(category){
			// 	console.log(category);
			// 	//贴图里面都是已经上传的网络图片，先下载图片
			// 	uni.downloadFile({
			// 		url: category.logo,
			// 		success: (res) => {
			// 		    if (res.statusCode === 200) {
			// 		        console.log('下载成功：' + res.tempFilePath);
			// 				this.setData({
			// 					graph: {
			// 						x:20,
			// 						y:50,
			// 						w: 80,
			// 						h: 80,
			// 					  type: 'image',
			// 					  url:res.tempFilePath, //网上下载的临时文件
			// 					}
			// 				});
			// 		    }
			// 			if(this.mapClass === 'show'){
			// 				this.mapClass = 'hide';
			// 				setTimeout(() => {
			// 					this.mapClass = 'none';
			// 				}, 250);
			// 			}
			// 			if(this.imgClass === 'show'){
			// 				this.imgClass = 'hide';
			// 				setTimeout(() => {
			// 					this.imgClass = 'none';
			// 				}, 250);
			// 			}
			// 		},
			// 		fail:(res) =>{
			// 			console.log(res)
			// 			debugger
			// 		}
			// 	})
				
			// },
			//画布导出到本地，跳转路由的时候都要保存
			onExportJson(){
				const _this = this
				_this.$refs.canvasRef.exportJson().then(res =>{
					uni.setStorage({
						key:'CANVAS',
						data:res,
					})
				}).catch(e => {
					console.error(e);
				});
			},
			
			//下一步
			nextStep(){
				//导出图片
				const _this = this
				
				_this.onExportJson()
				
				_this.$refs.canvasRef.exportFun().then(imgArr => {
					console.log(JSON.stringify(imgArr));
					_this.pictureOut = JSON.stringify(imgArr)
					//去掉头尾的分号
					// _this.pictureOut =_this.pictureOut.substr(1).substr(0, _this.pictureOut.length - 1)
					// //将图片路径传到oss
					// uni.uploadFile({
					// 	url:'https://yunhaicard-public-sz.oss-cn-shenzhen.aliyuncs.com',
					// 	filePath: _this.pictureOut, 
					// 	fileType: 'image', 
					// 	name: 'file', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
					// 	formData:{
					// 		name: _this.pictureOut,
					// 		// 'key' : "${filename}",
					// 		// 'policy': 'yourpolicycaculated',
					// 		'OSSAccessKeyId': 'LTAIHtprjZf7SOg1', 
					// 		'success_action_status' : '200', 
					// 		//让服务端返回200,不然，默认会返回204
					// 		// 'signature': 'yoursignaturecaculated',
					// 	},
					// 	success: (uploadFileRes) => {
					// 		console.log(uploadFileRes.data);
					// 	}
					// })
					
					
				}).catch(e => {
					console.error(e);
				});
				
				
				uni.navigateTo({
					url:"/pages/boxdiy/boxdiy?size="+_this.size
				})
			},
		},
		mounted() {
			//图库分类，再这里判断尺寸不同的时候显示的相框款式的不同
	// 		for(var i=0;i<imgTextList.length;i++){
	// 			var subList = []; 
	// 				if(i==0){
	// 					for(var j=0;j<loveTextList.length;j++){
	// 						subList.push({"name":"分类"+i+":商品"+j,"logo":loveTextList[j].src})	
	// 					}
	// 				}
	// 				if(i==1){
	// 					for(var j=0;j<familyTextList.length;j++){
	// 						subList.push({"name":"分类"+i+":商品"+j,"logo":familyTextList[j].src})	
	// 					}
	// 				}
	// 				if(i==6){
	// 					for(var j=0;j<otherTextList.length;j++){
	// 						subList.push({"name":"分类"+i+":商品"+j,"logo":otherTextList[j].src})	
	// 					}
	// 				}
				
	
	
	// 			this.categoryList.push({"name":imgTextList[i],"subCategoryList":subList})
	// 		}
	// 		this.subCategoryList = this.categoryList[0].subCategoryList;
			
			
	// 		//贴图需要加载的数据
	// 		for(var i=0;i<textList.length;i++){
	// 			var subList = [];
	// 			if(i==0){
	// 				for(var j=0;j<fontList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":fontList[j].src})	
	// 				}
	// 			}
	// 			if(i==1){
	// 				for(var j=0;j<loveList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":loveList[j].src})	
	// 				}
	// 			}
	// 			if(i==2){
	// 				for(var j=0;j<decorateList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":decorateList[j].src})	
	// 				}
	// 			}
	// 			if(i==3){
	// 				for(var j=0;j<cartoonList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":cartoonList[j].src})	
	// 				}
	// 			} 
	// 			if(i==5){
	// 				for(var j=0;j<balloonList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":balloonList[j].src})	
	// 				}
	// 			} 
	// 			if(i==6){
	// 				for(var j=0;j<electrocardiogramList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":electrocardiogramList[j].src})	
	// 				}
	// 			}
	// 			if(i==7){
	// 				for(var j=0;j<leafList.length;j++){
	// 					subList.push({"name":"分类"+i+":商品"+j,"logo":leafList[j].src})	
	// 				}
	// 			}
	// 			this.categoryListMap.push({"name":textList[i],"subCategoryListMap":subList})
	// 		}
	// 		this.subCategoryListMap = this.categoryListMap[0].subCategoryListMap;
		}
	}
</script>

<style lang="scss">
	//固定头部
	.heard{
		position:fixed;
		display: flex;
		justify-content: space-between;
		z-index: 1;
		width: 90%;
		// height: 8%;
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
		margin-right: 16rpx
	}
	
	// 左侧选择框,固定的
	.leftbottom{
		position: fixed;
		bottom:120upx;
		// width: 20%;
		// height:400upx;
		// z-index: 98;
		background-color: #ffffff;
		// box-shadow: 2px 0px 5px rgba(0,0,0,.1);
		padding: 15px 0px 0px 15px;
		.imgout{
			width:100rpx;
			height:100rpx;
			padding-bottom: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}

	}
	//底层选择框
	.footer{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-around;
		// left: 0;
		right:0;
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
			min-height: 40vh;
			// height:100%;
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
		.size-outside{
			display: flex;
			justify-content: space-around;
			// height: 400rpx;
			align-items: flex-end;
			padding: 0 10px 10upx 0;
		}
		.size-inside{
			width: 100%;
			text-align: center
		}
		.text-color{
			display: flex;
			flex-wrap:wrap;
			justify-content: center;
			.text-color-img{
				width: 70upx;
				height: 70upx;
				margin: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.selected{
				border-bottom: 1px solid #1989FA;
				padding-bottom: 2px;
			}
		}
		.buttonDefine{
			text-align: center;
			margin-bottom:120rpx;
			margin-top: 20rpx;
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
