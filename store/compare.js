import Repository from '../services/apiHelper'

const res = '/v2/5e86ec5531000011d8814754'
export default{
    getDeviceFeatures(){
        return Repository.get(`${res}`)
    },
   
}