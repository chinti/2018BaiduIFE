import {Staff,Restaurant} from './restaurant.js'

class Waiter extends Staff {
    constructor(name,salary) {
        super(name,salary);
        this.customer = {};
    }
    startWork() {
        console.log(this.name+'烹饪菜品')
    }
    finishWork() {
        console.log(this.name+'烹饪完')
    }
    changeStatus(str,dash) {
        var pos = document.querySelector('#waiter-wrapper');
        var status = pos.querySelector('#waiter-status');
        switch(str) {
            case '点单':
                status.innerText = '点单';
                pos.style.top = '225px';
                pos.style.left = '550px';
                break;
            case '下单':
                status.innerText = '下单';
                pos.style.top = '10px';
                pos.style.left = '320px';
                setTimeout(function(status){status.innerText = '空闲';},500,status);
                break;
            case '上菜':
                status.innerText = '上菜';
                pos.style.top = '225px';
                pos.style.left = '550px';
                setTimeout(function(pos){
                    pos.style.top = '10px';
                    pos.style.left = '320px';
                },500,pos);
                setTimeout(function(status){
                    status.innerText = '空闲';
                },1000,status);
                //console.log(dashName);
                
                this.customer.eat(dash);
                break;
        }
        
    }
}

export {Waiter}