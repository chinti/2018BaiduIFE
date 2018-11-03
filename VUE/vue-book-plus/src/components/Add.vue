<template>
 <div>
    <MHeader>添加</MHeader>
    <div class = "content">
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
          <label for = "bookPrice">书的封面</label>
          <input type = "text" v-model = "book.bookCover" id = "bookCover">
        </li>
        <li>
          <button @click = "add">确认添加</button>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
import MHeader from '../base/MHeader'
import {addBook} from '../api'
 export default {
   data () {
     return {
       book: {}
     }
   },
   methods: {
    async add() {
      await addBook(this.book)
      this.$router.push('/list')
    }
   },
   components: {
     MHeader,
   }
 }
</script>

<style scoped lang = "less">
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
 
</style>
