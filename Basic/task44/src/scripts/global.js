function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function extend(Sub,Sup) {
    //Sub表示子类，Sup表示超类
    // 首先定义一个空函数
    var F = function(){};

    // 设置空函数的原型为超类的原型
    F.prototype = Sup.prototype; 

// 实例化空函数，并把超类原型引用传递给子类
    Sub.prototype = new F();
            
    // 重置子类原型的构造器为子类自身
    Sub.prototype.constructor = Sub;
            
    // 在子类中保存超类的原型,避免子类与超类耦合
    Sub.sup = Sup.prototype;

    if(Sup.prototype.constructor === Object.prototype.constructor) {
        // 检测超类原型的构造器是否为原型自身
        Sup.prototype.constructor = Sup;
    }

}

export {addLoadEvent,extend}

