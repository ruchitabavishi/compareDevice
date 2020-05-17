<template>
    <div class="feature-class">
        <div v-for="featureLst in featuresList" :key="featureLst.title" :class="{'bold' : showHeader}">
            <div class="bg-grey p8 title" :class="{'hide-text' : !showHeader}">{{featureLst.title.toUpperCase()}} </div>
            <div v-for="featureObj in  featureLst.features" :key="featureObj.fefeatureName">
                <div class="p8 hidden" v-if="!isDataAvailable">{{space}}</div>
                <div v-else class="feature-value">
                    <div class="p8" v-if="!isOnlyDiff">{{getValue(featureObj)}}</div>
                    <div class="p8" v-else>
                        <span v-if="featureObj.properties && featureObj.properties.isDifferent"> {{getValue(featureObj)}} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        id: {
            type:Object,
            default: null,
        },
        featuresList: Array,
        isOnlyDiff: Boolean,
        isDataAvailable: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            space: 'dummy'
        }
    },
    methods:{
        getValue(obj){
            if(this.id)
                return obj.values[this.id.id]
            else
                return obj.featureName
        }
    }
}
</script>

<style scoped>
    .hide-text{
		color: #F0F0F0
    }
    .feature-class{
        font-size: 14px
    }
    .bg-grey{
		background: #F0F0F0
    }
    @media only screen and (min-width: 601px) and (max-width: 1380px){
        .feature-value{
            max-width: 125px
        }
    }
</style>