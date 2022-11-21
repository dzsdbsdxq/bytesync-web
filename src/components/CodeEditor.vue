<template>
  <div class="rich_content">
    <div class="content">
      <div class="editor-container">
        <div class="editor-text-area">
          <Codemirror
              v-model:value="code"
              :options="cmOptions"
              class="codeStyle"
              border
              placeholder="test placeholder"
              :height="'100%'"
              @change="change"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js";
// theme
import "codemirror/theme/dracula.css";
import {ref} from "vue";

const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`);
const cmOptions = {
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
  lineNumbers: false, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
}
const change = () => {

}
</script>

<style scoped lang="less">
.rich_content{
  .content{
    height: calc(100% - 80px);
    background-color: rgb(245, 245, 245);
    overflow-y: auto;
    position: relative;
    .editor-container{
      width: 850px;
      height: 100%;
      margin: 30px auto 0px auto;
      background-color: #fff;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      .editor-text-area{
        height: 100%;
        min-height: 900px;
        margin-top: 20px;
        .codeStyle{
          font-size : 21px;
          line-height : 153%;
        }
      }
    }
  }
}
</style>
