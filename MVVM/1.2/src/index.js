import san from 'san'
import './styles/index.css'

import { router } from 'san-router';
import Hello from './app/hello';



router.add({rule: '/', Component: Hello, target: '#app'});
// var MyApp = san.defineComponent({
    // template: '<p>Hello {{name}}!</p>',

    // initData: function () {
        // return {
            // name: 'San'
        // };
    // }
// });


// var myApp = new MyApp();
// myApp.attach(document.body);



router.start()