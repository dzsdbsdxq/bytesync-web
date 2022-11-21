<template>
  <div class="page">
    <Home v-if="!isConnect"></Home>
    <Editor v-if="isConnect"></Editor>
  </div>
</template>

<script setup>
import Home from "@/components/Home";
import Editor from "@/components/Editor";
import {useStore} from "vuex";
import {computed} from "vue";
import {useRoute} from "vue-router";
const { params } = useRoute();
const store = useStore();
const isConnect = computed({
  get() {
    return store.getters.getIsConnect === false ? false:true;
  },
  set() {},
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
