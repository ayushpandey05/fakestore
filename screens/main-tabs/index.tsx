import {
  BagActiveSVG,
  BagInactiveSVG,
  FavouritesActiveSVG,
  FavouritesInactiveSVG,
  HomeActiveSVG,
  HomeInactiveSVG,
  ProfileActiveSVG,
  ProfileInactiveSVG,
  ShopActiveSVG,
  ShopInactiveSVG,
} from '../../assets/svgs';
import createTabNavigator from '../../components/tab-navigator';
import Bag from '../bag';
import Favourites from '../favourites';
import Home from '../home';
import Profile from '../profile';
import Shop from '../shop';

const Maintabs = createTabNavigator(
  {
    home: {
      screen: Home,
      tab: {
        title: 'Home',
        icon: HomeInactiveSVG,
        activeIcon: HomeActiveSVG,
      },
    },
    shop: {
      screen: Shop,
      tab: {
        title: 'Shop',
        icon: ShopInactiveSVG,
        activeIcon: ShopActiveSVG,
      },
    },
    bag: {
      screen: Bag,
      tab: {
        title: 'Bag',
        icon: BagInactiveSVG,
        activeIcon: BagActiveSVG,
      },
    },
    favourites: {
      screen: Favourites,
      tab: {
        title: 'Favourites',
        icon: FavouritesInactiveSVG,
        activeIcon: FavouritesActiveSVG,
      },
    },
    profile: {
      screen: Profile,
      tab: {
        title: 'Profile',
        icon: ProfileInactiveSVG,
        activeIcon: ProfileActiveSVG,
      },
    },
  },
  'home',
);

export default Maintabs;
