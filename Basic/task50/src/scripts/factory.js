import {Restaurant} from './restaurant.js'
import {Data} from './data.js'

var Factory = function() {}             //假装一个简单工厂类
Factory.create = function(string) {
    var obj = {}
    switch(string) {
        case 'Customer':
            obj = new Customer;
            break;
        case 'Menu':
            obj = Menu.getInstance();
            break;
    }
    return obj    
}



class Customer {        //顾客类
    constructor() {
        this.seatNumber = 0;
        this.status = '';
        this.eatList = [];          //存放点的菜，以及这些菜的状态（未上，已上，吃完）
    }
    order() {           //点单，并获取随机出的一个菜品列
        let list = Menu.getInstance().getRandom();
        let result = new Array();
        for(let i = 0 ; i < list.length ;i++) {
            let newDash = new Dash(list[i].name,list[i].cost,list[i].price,list[i].time);
            newDash.seat = this.seatNumber;
            newDash.status = '未被处理';
            result.push(newDash);
        }
        return result;
    }
    changeStatus(str,time) {
        var customer_status = document.querySelector('#customer-status');
        switch(str){
            case '入座':   customer_status.innerText = '入座';break;
            case '点单':   
                for(let i = 0 ; i < time ; i+=1000) {
                    setTimeout(function(){customer_status.innerText = '点单还需'+(time-i)/1000+'秒'},i);
                }
                break;
            case '点单完毕':   customer_status.innerText = '点单完毕';break;
        }
    }
    // eat(dash) {             //每道菜3个时间单位
        // var customer = document.querySelector('#customer-status');
        // var ds = document.querySelectorAll('#customer-dash-list li');
        // var d = {};
        // for(let i = 0;i< ds.length;i++) {
            // if(ds[i].innerText == dash.name) {
                // d = ds[i];
                // break;
            // }
        // }
        // d.innerText = dash.name + '已上';
        // customer.innerText = '开始用餐';
        // setTimeout(function(){d.innerText = dash.name+'已吃完';},3000)
    // }
    eat() {
        let needEat = [];
        if(this.status != "等待上菜") {return;}
        for(let i = 0; i < this.eatList.length ; i++) {
            if(this.eatList[i].status == "已上桌") {
                needEat.push(this.eatList[i]);
            }
        }
        if(needEat.length == 0) {return;}
        let toEat = needEat[parseInt(needEat.length*Math.random())];
        let runTime = 3 * Data.basicTime;
        let t =this;
        for(let i = 0 ; i<=runTime; i+= 1000) {
            if(i==runTime) {
                setTimeout(function(){ t.status = "等待上菜";toEat.status = "已吃完";},i,t);
            }else{
                setTimeout(function(){ t.status = "食用"+toEat.name+"，还剩"+(runTime-i)/1000+"秒";},i,t)
            }
            
        }
    }
}

class Dash {                //菜品类
    constructor(name,cost,price,time) {         //time时间单位（1-10）
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.time = time;
        this.status = '';       //状态: 0 未被处理 1 已有厨师处理 2 已做完 3 已上桌 4 已吃完
        this.seat = 0;          //几号座点的菜单
    }
}


class Menu {
    constructor(list) {
        this.list = [];
        if(list != null) {
            for(let i in list) {
                this.add(list[i].name,list[i].cost,list[i].price,list[i].time);
            }
        }
    }
    add(name,cost,price,time) {          //添加菜品
        this.list.push(new Dash(name,cost,price,time));
    }
    getRandom() {
        var times = Math.ceil(Math.random()*this.list.length);//获取次数
        //var times = 1;
        var order = [];     //存放点单
        for(let i = 0; i < times ; i++) {
            var index = Math.floor(Math.random()*this.list.length)
            if(order.indexOf(this.list[index]) == -1 ) {
                order.push(this.list[index]);
            }
        }
        return order;
    }
    static getInstance(arr) {               //单例接口
       if(!this.instance) {
        this.instance = new this(arr);
       }
        return this.instance;
    }
}


export {Factory}