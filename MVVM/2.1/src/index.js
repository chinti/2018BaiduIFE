import san from 'san'
//import './styles/index.css'

import { router } from 'san-router';
import	Data from './app/data';



router.add({rule: '/', Component: Data, target: '#app'});

router.start()