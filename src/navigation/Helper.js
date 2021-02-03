
import {Colors,Scale,} from '../CommonConfig';
export const headerLeftStyle = () => {
  return {    
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: Colors.WHITE,
    },
  };
};

export const navigationOption = ({navigation}) => {
  return {
    title: navigation.title,
    drawerLabel: navigation.title,
    headerTintColor: Colors.WHITE,
    headerBackTitle: null,
    ...headerLeftStyle(),
  };
};
