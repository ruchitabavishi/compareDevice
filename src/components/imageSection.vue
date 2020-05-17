<template>
    <div>
        <div class="img-div ">
            <div v-if="selectedItemId" class="relative">
			    <div class="close absolute" @click="clearSelectio()">X</div>
                <img :src="deviceList.compareSummary.images[selectedItemId.id]" class="img-cover " />
            </div>
            <img v-else :src="dummyImage" class="rounded img-cover"/>
        </div>
        <div v-if="selectedItemId">
            <div v-for="s in title" :key="s.title" >
                <div class="title"> {{s.title}}</div>
            </div>
            <div class="p8">
                <span class="rupee"> </span>
                {{selectedProduct.finalPrice}}
                <span class="discount-price"><s>{{selectedProduct.price}}</s></span>
                <span class="per-text">{{selectedProduct.totalDiscount}}% off</span>
            </div>
        </div>
        <div v-else> 
            <v-select :options="device" label="title" placeholder="Choose Product"
            v-model="selectedItemId" class="mt12" @input="deviceChange($event)"></v-select>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        selectedItemId: Object,
        deviceList: Object,
        device: Array,
        eventString: String
    },
    computed:{
        title(){
            var s = this.deviceList.compareSummary.titles[this.selectedItemId.id].title;

            var middle = Math.floor(s.length / 2);
            var before = s.lastIndexOf(' ', middle);
            var after = s.indexOf(' ', middle + 1);

            if (middle - before < after - middle) {
                middle = before;
            } else {
                middle = after;
            }
            return [
                {title:  s.substr(0, middle)},
                {title:  s.substr(middle + 1)}]
        },
        selectedProduct(){
            return this.deviceList.compareSummary.productPricingSummary[this.selectedItemId.id]
        }
    },
    methods:{
        clearSelectio(){
            let retObj = {
                id : this.eventString,
                val : null
            }
            this.$root.$emit("clearSelection",retObj)
        },
        deviceChange(value){
            let retObj = {
                id : this.eventString,
                obj : this.selectedItemId
            }
            this.$root.$emit("changeDevice",retObj)
        }
    },
    data(){
        return{
            dummyImage: 'https://dummyimage.com/400x250/F0F0F0/F0F0F0',
        }
    }
    
}
</script>

<style scoped>
	.close{
        cursor: pointer;
        right: -30px;
        z-index: 1000;
		border: 2px solid rgba(60,60,60,.26);
		padding: 4px 4px 8px 4px;
		border-radius: 100%;
		height: 10px;
		width: 10px
	}
    .discount-price{
        color: #b2b2b2
    }
    .per-text{
        color: green
    }
    .title{
        font-size: 18px;
        font-weight: bold;
        padding-left: 12px
    }
	.img-cover{
		max-width: 400px;
	}
    .img-div{
		max-width: 400px;
		min-height: 300px;
	}
    .rupee {
		background-position: left;
		width: 10px;
		height: 14px;
		background-image: url("http://i.stack.imgur.com/vJZ9m.png");
		display: inline-block;
		background-repeat: no-repeat;
	}
    @media only screen and (min-width: 601px) and (max-width: 1380px){
        .img-cover{
		    max-width: 250px;
	    }
        .img-div{
            max-width: 250px;
            min-height: 200px;
        }
    }
</style>