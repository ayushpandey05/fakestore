import createStackNavigator from '../../components/stack-navigator';
import Authenticate from '../authenticate';
import Login from '../login';
import Maintabs from '../main-tabs';
import productList from '../product-list';

const MainStack = createStackNavigator(
  {
    authenticate: {
      screen: Authenticate,
    },
    login: {
      screen: Login,
    },
    main: {
      screen: Maintabs,
    },
    productList: {
      screen: productList
    }
  },
  'authenticate',
);

export default MainStack;
