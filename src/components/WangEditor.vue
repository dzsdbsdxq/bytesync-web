<template>
  <div class="rich_content">
    <div class="toolbar">
      <div class="editor-toolbar">
        <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
        />
      </div>
    </div>
    <div class="content">
      <div class="editor-container">
        <div class="editor-text-area">
          <Editor
              style="min-height:900px;overflow-y: hidden;"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              mode="simple"
              @onCreated="handleCreated"
              @onChange="onEditorContentChange"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p></p>')


onMounted(() => {
  //console.log(Toolbar.getConfig().toolbarKeys);
})

const toolbarConfig = {
  excludeKeys:[
      'group-image',
      'group-video',
      'fullScreen'
  ]
}
const editorConfig = { placeholder: '请输入内容...',autoFocus:true, scroll: true, }
const onEditorContentChange = (editor) => {   // TS 语法
// editorConfig.onChange = (editor) => {            // JS 语法
  // editor changed
  console.log('content', editor.getHtml())
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const getEditorHtml = () => {
    return editorRef.value.getHtml();
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
defineExpose({getEditorHtml})
</script>

<style scoped lang="less">
.rich_content{
  .toolbar{
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    .editor-toolbar{
      background-color: #FCFCFC;
      margin: 0 auto;
    }
  }
  .content{
    height: calc(100% - 40px);
    background-color: rgb(245, 245, 245);
    overflow-y: auto;
    position: relative;
    .editor-container{
      width: 850px;
      margin: 30px auto 150px auto;
      background-color: #fff;
      padding: 20px 50px 50px 50px;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      .editor-text-area{
        height: 100%;
        min-height: 900px;
        margin-top: 20px;
      }
    }
  }
}
</style>
