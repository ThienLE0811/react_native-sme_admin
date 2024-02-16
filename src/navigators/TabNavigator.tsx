import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';

import PostsNavigator from './PostsNavigator';
import BannerNavigator from './BannerNavigator';
import CustomerNavigator from './CustomerNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constansts/appColors';
import {Home2, Profile, Profile2User, Slider} from 'iconsax-react-native';
import {TextComponent} from '../components';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appColors.primary,
          height: 68,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
          paddingBottom: 12,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.white : appColors.gray2;
          size = focused ? 25 : 23;
          switch (route.name) {
            case 'Bài viết':
              icon = <Home2 size={size} color={color} />;
              break;

            case 'Profile':
              icon = <Profile size={size} color={color} />;
              break;
            case 'Khách hàng':
              icon = <Profile2User size={size} color={color} />;
              break;

            case 'Banner':
              icon = <Slider size={size} color={color} />;
              break;
          }

          return icon;
        },

        tabBarLabelStyle: {
          color: appColors.gray2,
        },
        tabBarLabel: ({focused, color}) => {
          color = focused ? appColors.white : appColors.gray2;

          return <TextComponent text={route.name} flex={0} color={color} />;
        },
      })}>
      <Tab.Screen name="Bài viết" component={PostsNavigator} />
      <Tab.Screen name="Banner" component={BannerNavigator} />
      <Tab.Screen name="Khách hàng" component={CustomerNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
