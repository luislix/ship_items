<template>
	<div class="shipWay">
		<myheader></myheader>
		<div class="list">
			<van-cell-group>
				<van-cell title="主题" :value="list.title" class="cell"/>
				<van-cell title="航线起点" :value="list.initialAddress" />
				<van-cell title="航线终点" :value="list.terminationAddress" class="cell" />
				<van-cell title="联系人" :value="list.contactName" />
				<van-cell title="联系电话" :value="list.telephone" @click="$tools.callPhone(list.telephone)" class="cell"/>
				<van-cell title="QQ号码" :value="list.qq" />
			</van-cell-group>
		</div>
		<div class="mark">
			<van-cell-group>
				<van-cell title="备注" />
				<van-cell :title="list.remarks"/>
			</van-cell-group>
		</div>
	</div>    
</template>
<script>
import { queryWaterLineById} from '@/api/index.js'
export default {
	data(){
		return{
			list:''
		}
	},
	created(){
		this.getData();
	},
	methods:{
	   getData(){
		queryWaterLineById(this.$route.query.id).then(
			res=>{
				console.log(res);
				this.list = res.data.data;
			}
		)}
	},
}
</script>
<style lang="less" scoped>
 .shipWay{
	background: #eeeeee;
	height: 100%;
	.list{
		margin-bottom: .2rem;
		background: #ffffff;
		.van-cell__title{
			text-align: left;
		}
	}
	.mark{
		text-align: left;
	}
 }
</style>