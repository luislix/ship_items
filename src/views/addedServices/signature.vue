<template>
	<div id="app" class="pageCommonStyle">
		<vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'5rem'" :disabled="disabled" :defaultUrl="dataUrl"></vueSignature> 
		<!-- <vueSignature ref="signature1" :sigOption="option"></vueSignature>  -->
		<van-button type="info" @click="save">Save</van-button>
		<van-button type="info" @click="clear">Clear</van-button>
		<van-button type="info" @click="undo">Undo</van-button>
		<van-button type="info" @click="addWaterMark">addWaterMark</van-button>
		<van-button type="info" @click="handleDisabled">disabled</van-button>
	</div>
</template>

<script>
import {uploadImg} from '@/api/index'
export default {
	name: "app",
	data() {
		return {
			option:{
				penColor:"rgb(0, 0, 0)",
				backgroundColor:"rgb(255,255,255)"
			},
			disabled:false,
			dataUrl:""
		};
	},
	methods:{
		save(){
			var _this = this;
			let isEmpty = _this.$refs.signature.isEmpty();
			console.log(isEmpty)
			if(isEmpty){
				return this.$toast('请签名')
			}
			var png = _this.$refs.signature.save()
			var jpeg = _this.$refs.signature.save('image/jpeg')
			var svg = _this.$refs.signature.save('image/svg+xml');
			console.log(png);
			console.log(jpeg);
            console.log(svg);
            let formData = new FormData();
            formData.append('imgfile',png);
            console.log(formData);
            // uploadImg(formData,+new Date()+'.png',localStorage.getItem('token')).then(res=>{
            //     console.log(res)
            // })
		},
		// 清空
		clear(){
			var _this = this;
			_this.$refs.signature.clear();
		},
		// 撤销
		undo(){
			var _this = this;
			_this.$refs.signature.undo();
		},
		// 添加水印
		addWaterMark(){
			var _this = this;
			_this.$refs.signature.addWaterMark({
				text:"mark text",          // watermark text, > default ''
				font:"20px Arial",         // mark font, > default '20px sans-serif'
				style:'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill		
				fillStyle:"red",           // fillcolor, > default '#333' 
				strokeStyle:"blue",	   // strokecolor, > default '#333'	
				x:100,                     // fill positionX, > default 20
				y:200,                     // fill positionY, > default 20				
				sx:100,                    // stroke positionX, > default 40
				sy:200                     // stroke positionY, > default 40
			});
		},
		fromDataURL(url){
			var _this = this;
			_this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
		},
		handleDisabled(){
			var _this = this;
			_this.disabled  = !_this.disabled
		}
	}
};
</script>