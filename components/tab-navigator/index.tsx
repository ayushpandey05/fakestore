import React, {useState} from 'react';
import {View} from 'react-native';
import useBackButton from '../../hooks/useBackButton';
import useMultiState from '../../hooks/useMultiState';
import useUniqueId from '../../hooks/useUniqueId';
import RenderTabs from './RenderTabs';

interface TabProps {
  tab: any;
  initialRoute: string;
  tabKeys: string[];
}

const TabNavigator: React.FC<TabProps> = ({
  tab,
  tabKeys,
  initialRoute,
  ...restProps
}) => {
  // const [availableTabs, setAvailableTabs]
  const tabNavigatorId = useUniqueId();

  const [tabData, setTabData] = useMultiState({
    currentTab: initialRoute,
    availableTabs: [initialRoute],
  });

  const {currentTab, availableTabs} = tabData;
  //   const [currentTab, setCurrentTab] = useState(initialRoute);

  //   const {screen: Screen} = tab[currentTab];

  const setCurrentTab = (tabName: string) => {
    if (availableTabs.includes(tabName)) {
      setTabData({currentTab: tabName});
    } else {
      const newAvailableTabs = [...availableTabs, tabName];
      setTabData({currentTab: tabName, availableTabs: newAvailableTabs});
    }
  };

  const onBack = ()=>{
    if(currentTab !== tabKeys[0]){
      setCurrentTab(tabKeys[0])
      return true
    }
    return false
  }

  useBackButton(onBack)

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {availableTabs.map((singleTab: string, tabIndex: number) => {
          const {screen: Screen} = tab[singleTab];
          const isActive = currentTab === singleTab;
          return (
            <View
              key={`${tabNavigatorId}-${tabIndex}`}
              style={{flex: 1, display: isActive ? 'flex' : 'none'}}>
              <Screen {...restProps} />
            </View>
          );
        })}
      </View>
      <RenderTabs
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        tab={tab}
        tabKeys={tabKeys}
      />
    </View>
  );
};

const createTabNavigator = (tab: any, initialRoute: string) => {
  const tabKeys = Object.keys(tab);
  return React.memo(
    (props: JSX.IntrinsicAttributes & {children?: React.ReactNode}) => (
      <TabNavigator
        {...props}
        tab={tab}
        tabKeys={tabKeys}
        initialRoute={initialRoute || tabKeys[0]}
      />
    ),
  );
};

export default createTabNavigator;
