<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <h1 class="title"><span style="color:#E30A35FF">B</span>yte<span style="color:#E30A35FF">S</span>ync</h1>
        <button @click="copyCode" title="点击复制ID">{{roomId}}</button>
        <div v-if="isConnect" class="dot green" title="Connected"></div>
        <div v-if="!isConnect" class="dot red" title="UnConnected"></div>
      </div>
      <div class="right">
        <button class="send" @click="sendContentFunc">发送</button>
        <button class="send" @click="saveLocalFunc">存储到本地</button>
        <button class="dismiss" title="断开" @click="CloseConnectHandleFunc">
          <div class="close"></div>
        </button>
      </div>
    </div>
    <WangEditor ref="editorRef"></WangEditor>
<!--    <CodeEditor></CodeEditor>-->

  </div>
</template>

<script setup>
import WangEditor from "@/components/WangEditor";
import { createToaster } from "@meforma/vue-toaster";
import VueSimpleAlert from "vue3-simple-alert";
import {computed, getCurrentInstance, ref} from "vue";
import useClipboard from 'vue-clipboard3'
import {useStore} from "vuex";
import {fly} from "@/utils/request";
import SocketService from "@/utils/websocket";
import CodeEditor from "@/components/CodeEditor";
import {utils} from "@/utils/func";
const toaster = createToaster({ /* options */ });
const instance = getCurrentInstance()
const { toClipboard } = useClipboard()
const store = useStore();
const CloseConnectHandleFunc = () => {
  let roomId = store.getters.getRoomId;
  let userId = store.getters.getUserId;
  fly.post("api/checkOwner",{roomId:roomId,userId:userId}).then( res => {
    console.log(res);
    if(res.code == 200){
      let msgStr = "";
      if(res.data.owner === 1){
        msgStr = "由于您是创建者，您断开会导致所有在线用户断开连接，确定断开吗？";
      } else {
        msgStr = "确定断开连接吗？";
      }
      VueSimpleAlert.confirm(msgStr,"提示").then(()=>{

      }).catch(()=>{

      })
    }
  }).catch(err => {
    toaster.error(err.message);
  })

}
const roomId = computed({
  get() {
    return store.getters.getRoomId;
  },
  set() {},
})
const isConnect = computed({
  get() {
    return store.getters.getIsConnect;
  },
  set() {},
})
const copyCode = async () => {
  try {
    await toClipboard(roomId.value).then(()=>{
      toaster.success(`复制成功`);
    }).catch(()=>{
      toaster.error(`复制失败`);
    });
  } catch(e){
    console.log(e);
  }
}
const editorRef = ref(null);
const sendContentFunc = () => {
  let roomId = store.getters.getRoomId;
  let userId = store.getters.getUserId;
  let content = editorRef.value.getEditorHtml();
  console.log(editorRef.value.getEditorHtml());
  let msgId = utils.getContentId(content);
  console.log(msgId)
  fly.post("api/sendData",{roomId:roomId,userId:userId,msgId:msgId,content:content}).then( res => {
    console.log(res);
    if(res.code == 200){

    }
  }).catch(err => {
    toaster.error(err.message);
  })

}

const saveLocalFunc = () => {
  let content = editorRef.value.getEditorHtml();
  console.log(editorRef.value.getEditorHtml());
  let msgId = utils.getContentId(content);
  console.log(msgId)
  fly.post("api/saveDoc",{content:content}).then( res => {
    console.log(res);
    if(res.code == 200){

    }
  }).catch(err => {
    toaster.error(err.message);
  })
}
</script>

<style scoped lang="less">
.container{
  overflow: hidden;
  height: 100%;
  .header{
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 300px;
      .title{
        margin: 20px;
        font-size: 25px;
        color: orange;
      }
      button{
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.4em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #f9f9f9;
        cursor: pointer;
      }
      .dot{
        height: 10px;
        width: 10px;
        border-radius: 50%;
        &.red{
          background-color: #c82222;
        }
        &.green{
          background-color: #009400;
        }
      }
    }
    .right{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;
      align-content: center;
      width: 300px;
      .send{
        padding: 4px 15px;
        border: none;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        background-color: #409eff;
        text-align: center;
        text-transform: uppercase;
        font-size: 14px;
        transition: .3s;
        z-index: 1;
        font-family: inherit;
        color: #fff;
        cursor: pointer;
        margin-right: 20px;
        &::before {
          content: '';
          width: 0;
          height: 300%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          background: #17C3B2;
          transition: .5s ease;
          display: block;
          z-index: -1;
        }
        &:hover {
          color: #fff;
        }
        &:hover::before {
          width: 105%;
        }
      }
      .dismiss{
        border-radius: 10px;
        border: 1px solid transparent;
        padding: 0.3em;
        margin-right: 30px;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #9b0707;
        cursor: pointer;
        &:hover{
          box-shadow: 0 2px 10px rgb(225 148 148 / 12%);
          background-color: red;
        }
        div{
          width: 16px;
          height: 16px;
          background: url("data:image/png;base64,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") no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
