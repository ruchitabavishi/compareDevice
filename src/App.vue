<template>
	<div class="app" v-if="deviceList" style="margin-left:100px; margin-right:100px">
		<h1> Compare </h1>
		<p>{{noOfItemSelected}} items selected</p>
		<div class="flex bottom-seperator">
		<div class="w-full relative" style="width:70%">
			<div class="show-diff">
				<input type="checkbox" id="checkbox" v-model="isOnlyDiff">
				<label for="checkbox">Show only differances</label>
			</div>
		</div>
		<div class="w-full pr50"  style="margin-left:50px; margin-right:50px" >
			<ImageSection :selectedItemId="selectedItemId1" class="relative"
			:deviceList="deviceList" :device="device" :eventString="'selectedItemId1'"/>
		</div>

		<div class="w-full" >
			<ImageSection :selectedItemId="selectedItemId2" :deviceList="deviceList" 
			:device="device" :eventString="'selectedItemId2'"/>
		</div>
		</div>
		<div class="flex">
			<div class="w-full vertical-seperator" style="width:70%">
				<FeatureList :isDataAvailable="true" :featuresList="deviceList.featuresList" :isOnlyDiff="isOnlyDiff"/>
			</div>
			<div class="w-full vertical-seperator">
				<FeatureList :isDataAvailable="!selectedItemId1 ? false : true" :showHeader="false"
				:featuresList="deviceList.featuresList" :isOnlyDiff="isOnlyDiff" :id="selectedItemId1"/>
			</div>
			<div class="w-full" >
				<FeatureList :isDataAvailable="!selectedItemId2 ? false : true" :showHeader="false"
				:featuresList="deviceList.featuresList" :isOnlyDiff="isOnlyDiff" :id="selectedItemId2"/>
			</div>

		</div>

	</div>
</template>


<script>
import foodItem from "../store/compare";
import ImageSection from "./components/imageSection"
import FeatureList from './components/featureList'
export default {
	name: "app",
	components:{
		ImageSection,
		FeatureList
	},
	data() {
		return {
			isOnlyDiff: false,
			selectedItemId1 : null,
			selectedItemId2 : null,
			device: [],
			deviceList: null,
			noOfItemSelected: 0
		};
	},
	created() {
		this.$root.$on("changeDevice", this.setId);
		this.$root.$on("clearSelection", this.clearSelection);

		
  	},
	mounted() {
		foodItem.getDeviceFeatures().then(resp => {
			console.log(resp.data.products)
			let deviceListResp = resp.data.products
			Object.keys(deviceListResp.compareSummary.titles).forEach((key,ndex) =>{ 
				this.device.push({
					id: key,
					title:deviceListResp.compareSummary.titles[key].title,
				})
			})
			this.deviceList = deviceListResp
			console.log(this.deviceList)
		})
	},
	methods:{
		setId(val){
			this[val.id] = val.obj
			this.noOfItemSelected++
		},
		clearSelection(value){
			this[value.id] = value.val
			this.noOfItemSelected--
		}
	}
};
</script>

<style scoped>

	.vertical-seperator{
		border-right: 1px solid #b2b2b2;
	}
	.bottom-seperator{
		padding-bottom: 12px;
		border-bottom:1px solid #F0F0F0
	}
	.show-diff{
		position: absolute;
		bottom: 20px
	}
	.app >>> .vs__dropdown-toggle{
		width: 70%;
		border: none;
		border-bottom: 2px solid rgba(60,60,60,.26);
		border-radius: 0px
	}
	.select-class{
		max-width: 540px
	}
	p{
		font-size: 20px
	}

</style>

