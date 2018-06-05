//这里开始应该是ES5的写法吧
function Restaurant(arr) {				//餐厅类
	this.cash = arr['cash'];
	this.seats = arr['seats'];
	this.staff = arr['staff'];
}

Restaurant.prototype.hire = function(obj) {	//餐厅类 招聘职员
	this.staff.push(obj);
}

Restaurant.prototype.fire = function(obj) {	//餐厅类 解雇职员
	for(let i in this.staff) {
		if(this.staff[i] == obj) {
			this.staff.splice(i,1);
		}
	}
}

function Staff(name,salary) {		//职员类，我在思考ID是自动生成还是怎么搞，先不放了
	this.name = name;
	this.salary = salary;
}

Staff.prototype.finish = function() {		//职员类，完成工作
	console.log('工作已完成');
}

function Cook(name,salary) {				//厨师类，继承自职员类
	Staff.call(this,name,salary);
}

//下面是测试
function toTest() {
	var ifeRestaurant = new Restaurant({
		cash: 1000000,
		seats: 20,
		staff: []
	});
	var newCook = new Cook("Tony", 10000);
	ifeRestaurant.hire(newCook);
	console.log(ifeRestaurant.staff);
	
	ifeRestaurant.fire(newCook);
	console.log(ifeRestaurant.staff);
}

export {toTest}