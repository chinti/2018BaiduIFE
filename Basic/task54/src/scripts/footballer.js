class Footballer {
    constructor() {     //球场长为100m，宽为64m
        this.VNum = null;   //1-99，1为3m/s，99为12m/s
        this.container = null;
        //场上位置
        this.fieldLeft = 0;     
        this.fieldTop = 0;
    }
    //用于随机出一个1-99范围的整数，以及初始位置
    randomVNum() {
        this.VNum = Math.ceil(Math.random()*99);
        this.fieldLeft = Math.floor(Math.random()*100);
        this.fieldTop = Math.floor(Math.random()*64);
    }
    
    //获取最高速度
    getVMax() {
        let VMax = 3+(this.VNum-1)*(9/98);
        return VMax;
    }
    //奔跑，暂定3s进入最高速度
    runto(num1,num2) {
        let newBeizier = new UnitBezier(0.39,0.575,0.561,1);
        let speed = [];
        for(let t = 0; t<=1;t = t+0.1) {
            
        }
    }
    // runto(num1,num2,t) {              
        // let x1 = 0; //上一个的时间百分比
        // let x2 = 0; //下一个的时间百分比
        // let y1 = 0; //上一刻的速度百分比
        // let y2 = 0; //下一刻的速度百分比
        // if(t==null) {t = 0.01; }//参数t（0，1）
        
        // let newBezier = new UnitBezier(0.39,0.575,0.565,1);
    
            // let len = Math.sqrt(Math.pow((num1-this.fieldLeft),2)+Math.pow((num2-this.fieldTop),2));
            // if(y2 < 1 && y1 < 1 && t<1) {
                // y1 = y2;
                // y2 = newBezier.sampleCurveY(t);
                // x1 = x2;
                // x2 = newBezier.sampleCurveX(t);
                // let go = 3*(x2-x1)*this.getVMax()*(y2+y1)/2;
                ////console.log(go)
                // if(go <= len) {
                    // let goLeft,goTop;
                    // if(this.fieldLeft > num1) {
                        // goLeft = this.fieldLeft - go/len*(this.fieldLeft - num1);
                    // }else {
                        // goLeft = this.fieldLeft + go/len*(num1 - this.fieldLeft);
                    // }
                    // if(this.fieldTop > num2) {
                        
                        
                        
                        // goTop = this.fieldTop - go/len*(this.fieldTop - num2);
                    // }else {
                        // goTop = this.fieldTop + go/len*(num2 - this.fieldTop);
                    // }
                    // let temp = this;
                    // let time = 1000*(x2-x1);
                    // let rest = 0;
                    // let gl,gt;
                    // for(let i = 0 ; i <= time ; i = i + 10) {
                        // if(goLeft > num1) {
                                // gl = this.fieldLeft - i/time *(this.fieldLeft - goLeft);
                        // }else {
                            // gl = this.fieldLeft + i/time*(goLeft - this.fieldLeft);
                        // }
                        // if(goTop > num2) {
                            // gt = this.fieldTop - i/time*(this.fieldTop - goTop);
                        // }else {
                            // gt = this.fieldTop + i/time*(goTop - this.fieldTop);
                        // }
                        
                        // setTimeout(function(){ temp.fieldLeft = gl;temp.fieldTop = gt;temp.container.drawItemOnField();},i,gl,gt,temp,i);
                        
                    // }
                    // setTimeout(function(){ temp.fieldLeft = goLeft;temp.fieldTop = goTop;temp.container.drawItemOnField();temp.runto(num1,num2,t);},time,goLeft,goTop);
                // }
            // } else if(y2 == 1 && y1 == 1) {
            // }
            // if(t<1){t=t+0.0001;}
    // }
}



function UnitBezier(p1x,p1y,p2x,p2y) {
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx -this.bx;    
    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
}
UnitBezier.prototype = {
    sampleCurveX : function(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY : function(t) {  
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }
}

export {Footballer}
