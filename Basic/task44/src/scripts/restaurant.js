import {extend} from './global.js'			//使用封装类实现继承

//还是先用ES5写一遍吧
function Restaurant(arr) {				//餐厅类
	this.cash = arr['cash']||0;
	this.seats = arr['seats']||0;
	this.staff = arr['staff']||[];
}

Restaurant.prototype.hire = function(obj) {	//餐厅类 招聘职员
    for(let i in this.staff) {
        if(this.staff[i].id == obj.id) {
            
            obj = null ;
        }
    }
    if(obj != null) {
        this.staff.push(obj);
        console.log('雇佣了'+obj.name)
        if(this.staff.length == 2) {
            for(let i in this.staff) {
                if(this.staff[i].constructor.name == 'Cook') {var nowCook = this.staff[i];}
                else if(this.staff[i].constructor.name == 'Waiter') {var nowWaiter = this.staff[i];}
            }
        }   
    }
}

Restaurant.prototype.fire = function(obj) {	//餐厅类 解雇职员
	var arr = [];							//直接使用splice删除，会使hire的结果也出问题
	for(let i in this.staff) {
		if(this.staff[i].id != obj.id) {
			arr.push(this.staff[i]);
		}
	}
    console.log('解雇了'+obj.name)
	this.staff = arr
    if(this.staff.constructor.name == 'Cook') {singleCook.destroy();}
    else if(this.staff[i].constructor.name == 'Waiter') {singleWaiter.destroy();}
}
var id = 1;							//id

function Staff(name,salary) {		//职员类
	this.id = id++;
	this.name = name || '';
	this.salary = salary || 0;
}

Staff.prototype.finish = function() {		//职员类，完成工作
	console.log('职员工作完毕');
}

//下面开始写单例模式的厨师和服务员

var singleWaiter = (function(){                  //服务员单例，继承自职员类
    var instance = null;
    function Waiter(name,salary) {
        Staff.call(this,name,salary);
    }
    extend(Waiter,Staff);
    Waiter.prototype.work = function(order) {
        
        if(typeof order === 'object') {
            console.log('服务员'+this.name+'记录菜品'+order.name);
            var newCook = new singleCook.create();
            newCook.work(order);
        }else {
            console.log('服务员'+this.name+'上菜');
            queue[0].eat();
        }
       // Waiter.prototype.finish();
    }
    return {                        //返回方法
        create:     function(name,salary) {         //用来创建单例
            if(instance === null) {
                instance = new Waiter(name,salary);
            }
            return instance;
        },
        destroy:    function() {                //用来销毁单例
            instance = null;
        }
    }
})();

var singleCook = (function(){               //厨师类单例，继承自职员类
    var instance = null;
    function Cook(name,salary) {
        Staff.call(this,name,salary);
    }
    extend(Cook,Staff);             //继承
    Cook.prototype.work = function(order) {
        if(instance != null) {
            console.log('厨师'+this.name+'烹饪菜品'+order.name);
            var newWaiter = new singleWaiter.create;
            console.log('=======烹饪中======')
            //delay(500);
            console.log('厨师'+this.name+'烹饪完成');
            newWaiter.work();
            
        //    Cook.prototype.finish();
        }
    }
    return {                        //返回方法
        create:     function(name,salary) {         //用来创建单例
            if(instance === null) {
                instance = new Cook(name,salary);
            }
            return instance;
        },
        destroy:    function() {                //用来销毁单例
            instance = null;
        }
    }
    
})();


var queue = []  ;               //顾客队列，push入队，shift出队

function Customer() {}                  //顾客类
Customer.prototype.order = function(obj) {
    //var order = this.getRandom(obj);
	console.log("顾客点了"+obj.name+",价格为"+obj.price+'元');
    var newWaiter = new singleWaiter.create();
    newWaiter.work(obj);
}
Customer.prototype.eat = function() {
    console.log('=======吃饭中======')
    //delay(500);
	console.log('顾客吃完离开');
}

function Dash(name,cost,price) {        //这里是菜品类
	this.name = name || "";
	this.cost = cost || 0;
	this.price = price || 0 ;
}
function Menu(list) {               //菜单类
    this.list = [];
    if(list != null) {
        for(let i in list) {
            this.add(list[i].name,list[i].cost,list[i].price);
        }
    }
}
Menu.prototype.add = function(name,cost,price) {           //添加菜品
    this.list.push(new Dash(name,cost,price));
}
Menu.prototype.getRandom = function() {             //获取随机菜品
    var index = Math.floor(Math.random()*this.list.length);
    return(this.list[index]);
}

//下面是测试
function toTest() {
	var ifeRestaurant = new Restaurant({	//建立一个ife餐馆
		cash: 1000000,
		seats: 1,
		staff: []
	});
    var ifeMenu = new Menu([                //添加菜单，暂且算4个好了
            {name:   '糖醋排骨',cost:   20,price:  40},
            {name:   '麻婆豆腐',cost:   10,price:  20},
            {name:   '老鸭粉丝汤',cost:   13,price:  26},
            {name:   '蒜枣大黄鱼',cost:   18,price:  44}
    ]);
    var newCook = singleCook.create('Tony','10000');        //添加厨师单例
    var newWaiter = singleWaiter.create('Ben','9000');       //添加服务员单例
    for(let i = 0 ; i < 5 ; i++ ){                    //往队列里塞满排排坐的客人     
        queue.push(new Customer());
    }
    ifeRestaurant.hire(newCook);
    ifeRestaurant.hire(newWaiter);
    console.log('假定队伍里有'+queue.length+"个客人");
    var button = document.querySelector('#app input');
    //console.log(button)
    button.onclick = function() {
        console.log('餐馆开张啦！');
        //delay(500);
        while(queue.length) {                           //客人依次就餐，每次只能点一个菜
            var customer = queue[0];
            ifeRestaurant.seats -= 1;
            customer.order(ifeMenu.getRandom());
            ifeRestaurant.seats += 1;
            queue.shift();
            //delay(200);
        } 
        console.log('客人没啦');
    }

}

function delay(time) {
    var now = new Date();
    var exit = now.getTime()+time;
    var flag = true;
    //console.log(exit)
    while(flag) {
        now = new Date();
        if(now.getTime()>exit) {
            flag = false;
        }
    }
}


export {toTest}