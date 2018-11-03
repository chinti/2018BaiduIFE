<template>
 <div>
    <MHeader>列表页</MHeader>
    <div class = "content"  ref = "scroll"  @scroll = "loadMore">
        <ul>
          <router-link v-for = "(book,index) in books" :key = "index" tag = "li" :to = "{name:'detail', params:{ bid:book.bookId }}">
            <img v-lazy = "book.bookCover" alt = "">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <div class = "btn-list">
                <button @click.stop = "remove(book.bookId)" >删除</button>
                <button @click.stop = "addCart(book)" >添加</button>
              </div>
            </div> 
          </router-link>
        </ul>
        <div @click = "more" class = "more">加载更多</div>
    </div>
 </div>
</template>

<script>
  import {pagination,removeBook} from '../api'
  import MHeader from '../base/MHeader.vue'
  import * as Types from '../store/mutations-types.js'
  export default {
    data () {
      return {
        // offset偏移量 hasMore 是否有更多
        books:[],offset:0, hasMore: true, isLoading: false
      }
    },
    mounted() {
      let scroll =  this.$refs.scroll;
      let top = scroll.offsetTop;
      let distance = 0;
      let isMove = false;
      scroll.addEventListener('touchstart', (e) => {
        // 滚动条位于顶端 并div在顶端时
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
        let start = e.touches[0].pageY; // 手指点击的开始
        let move = (e) => {
          isMove = true;
          let current =  e.touches[0].pageY;
          distance = current - start; // 拉动距离 负值舍弃
          if(distance > 0) {
            distance = (distance <= 50) ? distance : 50 ;
            scroll.style.top = distance + top + 'px';
          } else {
            // 如果不在考虑范围内 移除掉move和end事件
            scroll.removeEventListener('touchmove', move);
            scroll.removeEventListener('touchend', end);
          }
        };
        let end = (e) => {
          if(!isMove) return
          isMove = false;
          clearInterval(this.timer2);
          this.timer2 = setInterval(() => {
            if(distance <= 0) {
              clearInterval(this.timer2);
              distance = 0;
              scroll.style.top = top + 'px';
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              // console.log('获取数据')
              this.books = []; //先清空数据
              this.offset = 0;
              this.getData();
              return
            }            
            distance -= 1;
            scroll.style.top = distance + top + 'px';
          },1);
        };
        scroll.addEventListener('touchmove',move);
        scroll.addEventListener('touchend',end);
      },false);
    },
    created() {
      this.getData();
    },
    methods: {
      addCart(book){
            this.$store.commit(Types.ADD_CART,book);
          },
      more() {
        this.getData();
      },
      loadMore() {
        // 卷起的高度 可见区域高度    总高
        // 触发scroll事件 ，可将上次触发的定时器清除
        clearTimeout(this.timer1);  // 防抖
        this.timer1 = setTimeout(() => {
          let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
          if(scrollTop + clientHeight + 10 > scrollHeight) {
            this.getData();
            // console.log(1)
          }
        },50)
      },
      async getData() {
        if (this.hasMore&&!this.isLoading) {
          this.isloading = true;
          let {hasMore, books} = await pagination(this.offset);
          this.books = [...this.books, ...books]; // 获取的书放到books属性上
          this.hasMore = hasMore;
          this.isLoading = false;
          this.offset = this.books.length; 
        }
      },
      async remove(id) {
        await removeBook(id); // 删除某一项
        // 要删除前台数据
        this.books = this.books.filter(item => item.bookId !== id);
      }
    },
    components: {
      MHeader,
    }
  }
</script>

<style scoped lang = "less">
.content {
  ul {
    padding: 10px;
    li {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f1f1;
      img {
        width: 130px;
        height: 150px;
      }
    }
  }
  h4 {
    font-size: 20px;
    line-height: 35px;
  }
  p {
    color: #2a2a2a;
    line-height: 25px;
  }
  b {
    color: red;
  }
  button {
    display: block;
    width: 60px;
    height: 25px;
    background: orangered;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }
}
.more {
  padding: 10px;
  background: #2afedd;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
}
.btn-list {
  display: flex;
  justify-content: space-around;
}
</style>
