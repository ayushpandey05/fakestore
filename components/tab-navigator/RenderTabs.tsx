import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import useKeyboard from '../../hooks/useKeyboard';
import useUniqueId from '../../hooks/useUniqueId';
import {colors} from '../../theme/colors';

interface Props {
  setCurrentTab: (tabName: string) => void;
  currentTab: string;
  tab: any;
  tabKeys: string[];
}

const RenderTabs: React.FC<Props> = ({
  tabKeys,
  tab,
  currentTab,
  setCurrentTab,
}) => {
  const [visible, dismiss] = useKeyboard();
  const tabId = useUniqueId();
  if (visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      {tabKeys.map((singleTab, index) => {
        const {tab: {title, icon, activeIcon} = {}} = tab[singleTab];

        const onPress = () => {
          setCurrentTab(singleTab);
        };

        const isActive = currentTab === singleTab;

        const TabIcon = isActive ? activeIcon || icon : icon;


        const colorProp = {}
        if(isActive){
          colorProp.fill = colors.primary
        }else{
          colorProp.stroke = colors.gray
        }

        return (
          <TouchableOpacity
            key={`${tabId}-${index}`}
            activeOpacity={0.5}
            onPress={onPress}
            disabled={isActive}
            style={styles.tabContainer}>
            <View style={styles.icon}>
              {TabIcon ? (
                <TabIcon
                  width="100%"
                  height="100%"
                // {...colorProp}
                  // stroke={isActive ? colors.primary : colors.gray}
                  // fill={isActive ? colors.primary : colors.gray}
                />
              ) : (
                void 0
              )}
            </View>
            <Text
              style={[
                styles.title,
                isActive && styles.activeTitle,
              ]}>{`${title}`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(RenderTabs);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.background,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray,
  },
  activeTitle: {
    color: colors.primary,
  },
});
