import {Restaurant} from './restaurant.js'
import {Cook} from './cook.js'
import {Waiter} from './waiter.js'
import {Factory} from './factory.js'

function toTest() {
    var ifeRestaurant = Restaurant.getInstance({	//建立一个ife餐馆
		cash: 1000000,
		seats: 1,
		staff: []
	});
    var cash = document.querySelector('#app #cash');
    cash.innerText = ifeRestaurant.cash;
    var newCook = Cook.getInstance('Tony',10000);
    var newWaiter = Waiter.getInstance('Ben',9000);
    var ifeMenu = Factory.create('Menu');
    ifeMenu.add('糖醋排骨',20,40,3);
    ifeMenu.add('麻婆豆腐',10,20,2);
    ifeMenu.add('老鸭粉丝汤',13,26,2);
    ifeMenu.add('蒜枣大黄鱼',18,44,4);
    console.log(ifeMenu);
    ifeRestaurant.hire(newCook);
    ifeRestaurant.hire(newWaiter); 
    var basicTime = 1000;
    var button = document.querySelector('#app #open');
    button.onclick = function() {
        if(queue.length < 18) {
            queue.push(Factory.create('Customer'));
        } else {
            alert('队伍太长啦，客人请等等再来排队吧')
        }
        updateQueue();
    }
    function startRestaurant() {
        if(document.querySelector('#customer-status').innerText != '无') {return;}
        if(queue.length == 0) { return; }
        var customer = queue.pop();
        updateQueue();
        new Promise(function(resovle,reject){
            customer.changeStatus('入座');
        }).then(newWaiter.changeStatus('点单'))
        .then(customer.changeStatus('点单',3*basicTime))
        .then(setTimeout(function() {
            customer.eatList = customer.order();
            updateCustomerList(customer.eatList);
            customer.changeStatus('点单完毕');
            newCook.preList = customer.eatList;
            newWaiter.changeStatus('下单');
            newWaiter.customer = customer;
            },3*basicTime))
        .then(setTimeout(function(){
            newCook.updateCookList();
            newCook.changeStatus('开始');
            },3.5*basicTime))
            
        var next = setInterval(function(customer){nextCustomer(customer)},100,customer);
    }
    function nextCustomer(customer) {
        var eatList = document.querySelectorAll('#app #customer-dash-list li');
        var cash = document.querySelector('#app #cash');
        var customer_status = document.querySelector('#customer-status');
        if(customer_status.innerText == '就餐完毕') {  return;}
        if(eatList.length == 0){return;}
        for(let i = 0;i<eatList.length;i++) {
            if(eatList[i].innerText.indexOf('已吃完') == -1) {
                return;
            }
        }
        var money = Number(cash.innerText);
        for(let i = 0 ; i<customer.eatList.length; i++){
           money += Number(customer.eatList[i].price-customer.eatList[i].cost); 
        }
        cash.innerText = money;
        ifeRestaurant.cash = money;
        
        customer_status.innerText = '就餐完毕';
        setTimeout(function(){customer_status.innerText = '无';eatList[0].parentNode.innerHTML = '';},1000)
    }
    var start = setInterval(startRestaurant,100);
    
    //console.log(Restaurant.getInstance());
    //console.log(newWaiter);
    // new Promise(function(resolve,reject){
        // resolve()
    // }).then(function(){ setTimeout('console.log("promise test")',2000)})
}

var queue = [];             //建立一个数组，用于存放顾客队列
function updateQueue() {    //更新页面上的顾客队列
    var list = document.querySelector('#app #customer-list');
    var result = '';
    for(let i = 0 ; i<queue.length ; i++) {
        result += '<div class = "customer"></div>';
    }
    list.innerHTML = result;
}
function updateCustomerList(order) {             //更新点单列表
    var list = document.querySelector('#app #customer-dash-list');
    var result = '';
    for(let i = 0; i< order.length;i++) {
        result += '<li>'+order[i].name+'</li>';
    }
    list.innerHTML = result;
}



export {toTest}