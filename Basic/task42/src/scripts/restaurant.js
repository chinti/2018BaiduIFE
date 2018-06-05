import {extend} from './global.js'			//使用封装类实现继承

//这里开始应该是ES5的写法吧
function Restaurant(arr) {				//餐厅类
	this.cash = arr['cash']||0;
	this.seats = arr['seats']||0;
	this.staff = arr['staff']||[];
}

Restaurant.prototype.hire = function(obj) {	//餐厅类 招聘职员
	this.staff.push(obj);
}

Restaurant.prototype.fire = function(obj) {	//餐厅类 解雇职员
	var arr = [];							//直接使用splice删除，会使hire的结果也出问题
	for(let i in this.staff) {
		if(this.staff[i].id != obj.id) {
			arr.push(this.staff[i]);
		}
	}
	this.staff = arr;
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

function Waiter(name,salary) {				//服务员，继承自职员类
	Staff.call(this,name,salary);
}
extend(Waiter,Staff);
Waiter.prototype.work = function(order) {
	if(typeof order === 'array') {
		console.log('服务员'+this.name+'记录点菜');
	}else {
		console.log('服务员'+this.name+'上菜');
	}
	Waiter.prototype.finish();
}



function Cook(name,salary) {				//厨师类，继承自职员类
	Staff.call(this,name,salary);
}
extend(Cook,Staff);

Cook.prototype.work = function() {
	console.log('厨师'+this.name+'烹饪菜品');
	Cook.prototype.finish();
}

function Customer() {}						//顾客类
Customer.prototype.order = function() {
	console.log("顾客点菜");
}
Customer.prototype.eat = function() {
	console.log('顾客吃完');
}

function menu(name,cost,price) {
	this.name = name || "";
	this.cost = cost || 0;
	this.price = price || 0 ;
}


//这里开始用ES6的写法
//用class进行对象定义，但只是语法糖，与真正意义上的类不一样，使用extends 继承，super超类
//可以利用 =>进行函数定义,也可以省略:function，还可以用let、const取代var

class Restaurant2 {
	constructor(arr) {
		this.cash = arr['cash']||0;
		this.seats = arr['seats']||0;
		this.staff = arr['staff']||[];
	}
	
	hire(obj) {
		this.staff.push(obj);
	}
	fire(obj) {
		var arr = [];							//直接使用splice删除，会使hire的结果也出问题
		for(let i in this.staff) {
			if(this.staff[i].id != obj.id) {
				arr.push(this.staff[i]);
			}
		}
		this.staff = arr;		
	}
}
let id2 = 0;
class Staff2 {
	constructor(name,salary) {
		this.id = id2++;
		this.name = name || '';
		this.salary = salary || 0;
	}
	finish() {
		console.log('职员工作完毕');
	}
}
class Waiter2 extends Staff2 {
	constructor(name,salary) {
		super(name,salary);
	}
	work(order) {
		if(typeof order === 'array') {
			console.log('服务员'+this.name+'记录点菜');
		}else {
			console.log('服务员'+this.name+'上菜');
		}
		super.finish();
	}
}
class Cook2 extends Staff2 {
	constructor(name,salary) {
		super(name,salary);
	}
	work() {
		console.log('厨师'+this.name+'烹饪菜品');
		super.finish();
	}
}
class Customer2 {
	order() {
		console.log("顾客点菜");
	}
	eat() {
		console.log('顾客吃完');
	}
}					

class menu2 {
	constructor(name,cost,price) {
		this.name = name || "";
		this.cost = cost || 0;
		this.price = price || 0 ;
	}
}

//下面是测试
function toTest() {
	var ifeRestaurantES5 = new Restaurant({		//ES5测试
		cash: 1000000,
		seats: 20,
		staff: []
	});
	var newCook = new Cook("Tony", 10000);
	ifeRestaurantES5.hire(newCook);
	console.log(ifeRestaurantES5.staff);
	//newCook.work();
	ifeRestaurantES5.fire(newCook);
	console.log(ifeRestaurantES5.staff);
	
	let ifeRestaurantES6 = new Restaurant({			//ES6测试
		cash: 1000000,
		seats: 20,
		staff: []
	});
	var newCook2 = new Cook2("Tony", 10000);
	ifeRestaurantES6.hire(newCook2);
	console.log(ifeRestaurantES6.staff);
	//newCook.work();
	ifeRestaurantES6.fire(newCook2);
	console.log(ifeRestaurantES6.staff);
}

export {toTest}