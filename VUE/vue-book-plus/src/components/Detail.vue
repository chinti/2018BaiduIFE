<template>
 <div class = "detail">
    <MHeader :back = "true">详情页</MHeader>
    <div>
      <ul>
        <li>
          <label for = "bookName">书的名称</label>
          <input type = "text" v-model = "book.bookName" id = "bookName">
        </li>
        <li>
          <label for = "bookInfo">书的信息</label>
          <input type = "text" v-model = "book.bookInfo" id = "bookInfo">
        </li>
        <li>
          <label for = "bookPrice">书的价格</label>
          <input type = "text" v-model.number = "book.bookPrice" id = "bookPrice">
        </li>
        <li>
          <button @click = "update">确认修改</button>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
import MHeader from "../base/MHeader.vue"
import {findOneBook,updateBook} from '../api/index.js'
 export default {
   data () {
     return {
       book: {}
     }
   },
   watch: {
     $route() { // 只要路径变化 重新获取数据
      this.getData();
     }
   },
   created() {  //页面一夹在 需要根据id 发送请求
    this.getData();
   },
   methods: {
     async getData() {
       this.book = await findOneBook(this.bid);
       // 如果是空对象，需要跳转回列表页
       Object.keys(this.book).length>0?void 0 :this.$router.push('/list')
     },
     async update() { // 点击修改图书信息
        await updateBook(this.bid,this.book)
        this.$router.push('/list') // 修改完成后跳转页面
     }
   },
   computed: {
      bid() {
        return this.$route.params.bid
      }
   },
   components: {
    MHeader,
   }
 }
</script>

<style scoped lang = "less">
.detail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 1;
  ul {
    margin: 50px 10px 0 10px;
    li {
      label {
        display:  block;
        font-size: 25px;
      }
      input {
        margin: 10px 0 ;
        height: 25px;
        width: 100%;
        border: 1px solid grey;
        border-radius: 2px;
      }
      button {
        display: block;
        width: 60px;
        height: 25px;
        background: #2aabd2;
        color: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
      }
    }
  }
}

 
</style>
