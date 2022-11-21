<template>
  <div class="homePage">
    <div class="container">
      <h1><span style="color:#E30A35FF">B</span>yte<span style="color: #e30a35">S</span>ync</h1>
      <div class="line-t-30"></div>
      <h2>端到端实时在线文本分享服务。分享更私密，真正做到无痕迹。</h2>
      <div class="line-t-50"></div>
      <button class="create" @click="createRoomFunc">创&nbsp;&nbsp;建</button>
      <div class="line-t-20"></div>
<!--      <h3>或者</h3>-->
<!--      <div class="line-t-20"></div>-->
<!--      <div class="btn">-->
<!--        <div class="code">-->
<!--          <input v-model="roomId" type="text" placeholder="验证码" class="editCode"/>-->
<!--        </div>-->
<!--        <button class="smooth" @click="joinRoomFunc">加入</button>-->
<!--      </div>-->

      <footer class="footer">
        <div class="logos">
          <a title="推荐使用FireFox浏览器" target="_blank" href="https://www.mozilla.org/" class="mozilla-logo">Mozilla Firefox</a>
          <a title="推荐使用Chrome浏览器" target="_blank" href="https://chrome.google.com/" class="google-logo">Google Chrome</a>
        </div>
        <ul class="navUl">
          <li class="li">
            <a>法律</a>
            <a>隐私</a>
            <a>Github</a>
            <a>反馈</a>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {fly} from "@/utils/request";
import SocketService from "@/utils/websocket";
const store = useStore();
const roomId = ref("")

const createRoomFunc = () => {
  fly.post("api/newPcConnect",{}).then( res => {
    if(res.code == 200){
      //返回成功，进行websoket连接登录
      SocketService.Instance.connect(res.data.roomId,res.data.userId,"create");
    }
  }).catch(err => {
    console.log(err);
  })
}

const joinRoomFunc = () => {
  console.log(roomId.value);
}
</script>

<style scoped lang="less">
.homePage{
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
  background-image: url("../assets/bg.svg");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
    margin-top: -100px;
    h1 {
      font-size: 100px;
      font-weight: 700;
      margin: 0;
      color: orange;
    }
    h2{
      color:#656769;
    }
    button {
      margin: 5px;
      width: 200px;
      color: #ffffff;
      font-weight: bold;
      background-color: rgb(0, 103, 206);
      border-radius: 20px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      &:hover{
        box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      }
    }
    .editCode {
      margin: 10px;
      width: 200px;
      border: none;
      border-radius: 8px;
      padding: 0.7em 1.2em;
      font-size: 1em;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      &:hover{
        box-shadow: 0 2px 10px rgba(157, 17, 17, 0.12);
        border: 1px solid rgb(0, 103, 206);
      }
    }

    .create{
      --width: 150px;
      --timing: 2s;
      border: 0;
      width: var(--width);
      padding-block: 0.7em;
      color: #fff;
      font-weight: bold;
      font-size: 1em;
      background: royalblue;
      transition: all 0.2s;
      &:hover {
        background-image: linear-gradient(to right, rgb(250, 82, 82), rgb(250, 82, 82) 16.65%, rgb(190, 75, 219) 16.65%, rgb(190, 75, 219) 33.3%, rgb(76, 110, 245) 33.3%, rgb(76, 110, 245) 49.95%, rgb(64, 192, 87) 49.95%, rgb(64, 192, 87) 66.6%, rgb(250, 176, 5) 66.6%, rgb(250, 176, 5) 83.25%, rgb(253, 126, 20) 83.25%, rgb(253, 126, 20) 100%, rgb(250, 82, 82) 100%);
        animation: var(--timing) linear dance6123 infinite;
        transform: scale(1.1) translateY(-1px);
      }
    }
    .btn{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 60px;
      .error {
        border-bottom: 3px solid red;
      }
    }

  }
  .footer{
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 30px 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .logos{
      width: 260px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      .mozilla-logo{
        background-image: url("../assets/firefox.svg");
        background-repeat: no-repeat;
        background-size: 90px,48px;
        overflow: hidden;
        text-indent: 120%;
        white-space: nowrap;
        display: inline-block;
        height: 38px;
        width: 100px;
        flex-shrink: 0;
      }
      .google-logo{
        margin-left: 20px;
        background-image: url("../assets/Google_Chrome_icon.svg");
        background-repeat: no-repeat;
        background-size: 90px,48px;
        overflow: hidden;
        text-indent: 120%;
        white-space: nowrap;
        display: inline-block;
        height: 32px;
        width: 100px;
        flex-shrink: 0;
      }
    }
    .navUl{
      color: #4a4a4f;
      font-size: 13px;
      font-weight: bold;
      display: none;
      .li{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        align-content: center;
        a{
          margin: 0px 10px;
        }
      }
    }
  }
}
@keyframes dance6123 {
  to {
    background-position: var(--width);
  }
}

</style>
