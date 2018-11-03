import {soccerField} from "./soccerfield"
import {Footballer} from "./footballer"

let Factory = function() {}

Factory.create = function(str1,node) {          //第一存放要创建的东西，第二个存放在哪个容器或哪个球场里创建
        let obj = {};
        switch(str1)  {
            case 'soccerfield' :
                obj = new soccerField();
                if(node&&node.nodeType == 1) {
                    obj.container = node;
                    obj.drawFieldBySVGIn(node);
                }
                return obj;
                break;
            case 'footballer':
                obj = new Footballer();
                obj.randomVNum();
                if(node&&node.classname == 'soccerField') {
                    node.sporterList.push(obj);
                    obj.container = node;
                    //node.drawBySVGIn(node.container)
                }
                return obj;
                break;
        }
}

export {Factory}