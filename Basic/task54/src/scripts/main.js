import {Factory} from './factory'

function main() {
    let container = document.getElementById('container');
    let newfield = Factory.create('soccerfield',container);
    //newfield.drawFieldBySVGIn(container);
    let newfootballer = Factory.create('footballer',newfield);
    //newfootballer.VNum = 99;
    newfield.drawItemOnField();
    newfootballer.runto(100,0)
}

export {main}