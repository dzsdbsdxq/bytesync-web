<template>
  <div class="page">
    <Editor></Editor>
  </div>
</template>

<script setup>
import Editor from "@/components/Editor";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {fly} from "@/utils/request";
import SocketService from "@/utils/websocket";
const route = useRoute()

console.log(route.params.code);

onMounted(()=>{
  fly.post("api/login",{roomId:route.params.code}).then( res => {
    if(res.code == 200){
      //返回成功，进行websoket连接登录
      SocketService.Instance.connect(res.data.roomId,res.data.userId,"login");
    }
  }).catch(err => {
    console.log(err);
  })
})
</script>

<style scoped lang="less">
.page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(249,249,250,1);
  color: #333;
  &:before{content:'';display:table;}
}
</style>
