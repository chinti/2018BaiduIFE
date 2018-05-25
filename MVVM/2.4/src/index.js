import san from 'san'
//import './styles/index.css'

import { router } from 'san-router';
import	Data from './app/event';



router.add({rule: '/', Component: Data, target: '#app'});

router.start()