import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // JIM:JIM,
        talk: [],
        contractInfo: '',
        shipOrderInfo: '',
        contractDetails: '',
        flag: localStorage.getItem("flag") ? localStorage.getItem("flag") : 0,
        shipContractId: '',
        goodsContractId: '',
        offset: 0,
    },
    mutations: {
        setContract(state, data) {
            state.contractInfo = data;
        },
        setShipOrderInfo(state, data) {
            state.shipOrderInfo = data;
        },
        lookContractDetails(state, data) {
            state.contractDetails = data;
        },
        setShipContractId(state, data) {
            state.shipContractId = data;
        },
        setGoodsContractId(state, data) {
            state.goodsContractId = data;
        },
        setOffset(state, data) {
            state.offset = data;
        }
    },
    actions: {},
    modules: {}
})