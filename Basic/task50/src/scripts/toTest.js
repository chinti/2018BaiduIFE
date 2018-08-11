import {Restaurant} from './restaurant.js'
import {Cook} from './cook.js'
import {Waiter} from './waiter.js'
import {Factory} from './factory.js'
import {Data} from './data.js'

function randomCreate(str) {   //随机抽取一个名字和随机一个工资，靠id进行辨识      
    let d_name = ['Ben','Sam','Tony','Ann','Bella','Andy','Cora','Eve','Kelly','Joyce','Andrew','Alonso','Edith','Elvis','Abel'];
    let d_cash = ['10000','9000','12000','7000','8000'];
    if(str == 'name') {
        return d_name[parseInt(Math.random()*d_name.length)];
    }else if(str == 'cash') {
        return d_cash[parseInt(Math.random()*d_cash.length)];
    }
}


function toTest() {
    Data.showBasicTime();       //显示单位时间
    var start_button = document.querySelector('#open');
    let set;
    start_button.onclick = function() {           //用于开始营业
        if(start_button.value =='开始营业') {
            let start = setInterval(function() {Data.comeCustomer();},3*Data.basicTime);
            start_button.value = '停止营业';
            set = start; 
        } else if(start_button.value == '停止营业'){
            
            set = window.clearInterval(set);
            start_button.value = '开始营业';
            Data.customerQueue = [];
        }
    }
    var ifeRestaurant = Restaurant.getInstance({	//建立一个ife餐馆
		cash: 1000000,
		seats: 4,
		staff: []
	});
    Data.RestaurantData = ifeRestaurant;
    var cash = document.querySelector('#app #cash');
    cash.innerText = ifeRestaurant.cash;
    var ifeMenu = Factory.create('Menu');
    ifeMenu.add('糖醋排骨',20,40,5);
    ifeMenu.add('麻婆豆腐',10,20,4);
    ifeMenu.add('老鸭粉丝汤',13,26,4);
    ifeMenu.add('蒜枣大黄鱼',18,44,6);
    console.log(ifeMenu);
    
    var addCook_button = document.querySelector('#add_cook');
    addCook_button.onclick = function() {
        if(Data.nowCook.length >= 6) { return ;}
        let newCook = new Cook(randomCreate('name'),randomCreate('cash'));
        ifeRestaurant.hire(newCook);
        Data.updateStaff();
        //Data.updateStaff() ;
       // console.log(ifeRestaurant.staff)
    }
    var addWaiter_button = document.querySelector('#add_waiter');
    addWaiter_button.onclick = function() {
        if(Data.nowWaiter.length >= 6) { return ;}
        let newWaiter = new Waiter(randomCreate('name'),randomCreate('cash'));
        ifeRestaurant.hire(newWaiter);
        Data.updateStaff();
        //Data.updateStaff() ;
        //console.log(ifeRestaurant.staff)
    }
    
    //setInterval(function() {Data.comeCustomer();},3*Data.basicTime)
    setInterval(function() {Data.updateCustomer();Data.startFire()},500)
    setInterval(function() {Data.comeIntoSeat();},100)
    setInterval(function() {Data.startOrder();Data.startCook();Data.startServe();Data.startEat();},100)
    //setInterval(function() { console.log(Data.RestaurantData.staff)},1000)
}




export {toTest}