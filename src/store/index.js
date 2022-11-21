import { createStore } from 'vuex'
import {getStore, setStore} from "../utils/localStoreage";

export default createStore({
  state: {
    isConnect:false,
    roomId:getStore("roomId") !== "" ? getStore("roomId") :"",
    userId:getStore("userId") !== "" ? getStore("userId") :"",
    userCount:getStore("userCount") !== "" ? getStore("userCount") :"",
  },
  getters: {
    getIsConnect(state){
      return state.isConnect;
    },
    getRoomId(state){
      return state.roomId;
    },
    getUserId(state){
      return state.userId;
    },
    getUserCount(state){
      return state.userCount;
    },
  },
  mutations: {
    setIsConnectMutation:(state,isConnect) =>{
      state.isConnect = isConnect
    },
    setRoomIdMutation:(state,roomId) => {
      setStore('roomId',roomId);
      state.roomId = roomId;
    },
    setUserIdMutation:(state,userId) => {
      setStore('userId',userId);
      state.userId = userId;
    },
    setUserCountMutation:(state,userCount) => {
      setStore('userCount',userCount);
      state.userCount = userCount;
    },
  },
  actions: {
    setIsConnectAction({commit},isConnect) {
      commit("setIsConnectMutation",isConnect);
    },
    setUserIdAction ({commit}, userId) {
      commit('setUserIdMutation', userId);
    },
    setUserCountAction ({commit}, userCount) {
      commit('setUserIdMutation', userCount);
    },
    setRoomIdAction ({commit}, roomId) {
      commit('setRoomIdMutation', roomId);
    }
  },
  modules: {
  }
})
