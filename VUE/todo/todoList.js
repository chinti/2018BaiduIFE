const vm = new Vue({
    el: '#app',
    data:   {
        todos:  [
            {
                isSelected:    false,
                title:  '睡觉'
            },
            {
                isSelected:    false,
                title:  '吃饭'
            },
        ],
        title:  '',
        cur:    '',
        hash:   '',
    },
    created()    {   //ajax获取 初始化数据
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        
        //监控hash值
        this.hash = (window.location.hash).slice(2) || 'all';
        window.addEventListener('hashchange',()=>{
            this.hash = window.location.hash.slice(2) || 'all';
        },false);
    },
    methods:    {
        add() {
            this.todos.push({
                    isSelected: false,
                    title:  this.title,
            });
            this.title = '';
        },
        remove(todo){
            this.todos = this.todos.filter((item) => item !== todo);
        },
        remember(todo) {
            this.cur = todo;
            //console.log(this.cur)
        },
        cancel() {
            this.cur = '';
        }
    },
    computed:   {
        count() {
            return this.todos.filter((item) => !item.isSelected).length
        },
        needTodos() {
            switch(this.hash) {
                case 'all':
                    return this.todos;
                    break;
                case 'unfinish':
                    return this.todos.filter((item) => !item.isSelected);
                    break;
                case 'finish':
                    return this.todos.filter((item) => item.isSelected);
            }
            return this.todos;
        }
    },
    directives: {
        focus_a(el,bindings) {
            if(bindings.value) {
                el.focus(); 
            }
        }
    },
    watch:  {
        todos: {
            handler() { //默认写成函数，相当于默认写了个handler
                localStorage.setItem('data',JSON.stringify(this.todos));
            },
            deep:   true,
        }
    },
    
    
})

//功能实现：
//1.数据显示
//2.回车添加新数据
//3.删除
//4.计算当前未被选中个数