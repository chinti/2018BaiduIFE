class Restaurant {
    constructor(arr) {
        this.cash = arr['cash']||0;
        this.seats = arr['seats']||0;
        this.staff = arr['staff']||[];
        this.worldTime = 1000;
    }
    hire(obj) {             //雇佣
        for(let i in this.staff) {
            if(this.staff[i].id == obj.id) { obj = null;}
        }
        if(obj != null) {
        this.staff.push(obj);
        console.log('雇佣了'+obj.name)
        }
    }
    getTime() {
        return this.worldTime;
    }
    setTime(num) {
        if(Number(num)){
            this.worldTime = Number(num)
        }
        return this.worldTime
    }
    static getInstance(arr) {               //单例接口
       if(!this.instance) {
        this.instance = new this(arr);
       }
        return this.instance;
    }
}

var id = 0;
class Staff {           //用来被cook和waiter继承
    constructor(name,salary) {
        this.id = ++id;
        this.name = name||'';
        this.salary = salary||0;
    }
    finish() {
        console.log(this.name+'工作完毕');
    }

    //取消单例
    // static getInstance(arr) {               //单例接口
       // if(!this.instance) {
        // this.instance = new this(arr);
       // }
        // return this.instance;
    // }
}


export {Restaurant,Staff}