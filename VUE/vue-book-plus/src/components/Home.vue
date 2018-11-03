<template>
 <div>
    <MHeader>首页</MHeader>
    <div class="content">
      <Loading v-if= "loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides = "sliders"></Swiper>
        <div class = "container">
          <h3>热门图书</h3>
          <ul>
            <li v-for = "(hot,index) in hotBooks" :key = "index">
              <img :src = "hot.bookCover" alt = "">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>      
    </div>
 </div>
</template>

<script>
 import MHeader from '../base/MHeader.vue';
 import Swiper from '../base/Swiper.vue';
 import Loading from '../base/Loading.vue';
 import {getAll} from '../api';
 export default {
   created() {
     // document.title = this.$route.meta.title;
     this.getData();
   }, 
   data () {
     return {
      sliders:[],hotBooks:[],loading:true
     }
   },
   methods: {
     async getData() {
       let [sliders,hotBooks] = await getAll();
       this.sliders = sliders;
       this.hotBooks = hotBooks;
       // 轮播图和热门图书已经获取完成
       this.loading = false;
     }
   },
   components: {
     MHeader,Swiper,Loading
   }
 }
</script>

<style scoped lang = 'less'>
  .container {
    width:90%;
    margin: 0 auto;
    h3 {
      color: #999;
      padding: 5px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      li {
        width: 50%;
        text-align: center;
        margin: 5px 0;
        img {
          width: 100%;
        }
      }
    }
  }

 
</style>
