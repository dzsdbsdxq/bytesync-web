<template>
  <div class="page">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
export default {
  name: "ShareView",
  components: {Editor}
}
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
