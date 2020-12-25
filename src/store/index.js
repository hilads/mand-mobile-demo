import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {

    },
    state:{
        imageSize:1, //图片大小限制1M
        videoSize:10, //视频大小限制
        memberType:'',
        isUploadPlan:'',
        // wxHost:'ws://127.0.0.1:7069',
        wxHost:'ws://192.168.16.203:7069',
        fileHost:'http://192.168.16.203'
    },
    getters:{

    },
    mutations:{
     change_type(state, anotherType){
         state.memberType = anotherType
     },
     change_isUploadPlan(state, isUploadPlan){
         state.isUploadPlan = isUploadPlan
     }
    },
    actions:{
     changeType({commit},anotherType){
         commit('change_type',anotherType)
     },
     changeUploadPlan({commit},isUploadPlan){
         commit('change_isUploadPlan',isUploadPlan)
     },
    },

})