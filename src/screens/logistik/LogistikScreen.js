import {SafeAreaView} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import {default as DefaultTabBar} from '../../components/DefaultTabBar';
import LogistikAktif from './logistikComponents/LogistikAktif';
import LogistikSelesai from './logistikComponents/LogistikSelesai';
import LogistikPending from './logistikComponents/LogistikPending';

const LogistikScreen = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <DefaultTabBar
        onIndexChange={val => {}}
        routes={[
          {key: 'item1', title: 'Diproses'},
          {
            key: 'item2',
            title: `Pending`,
          },
          {
            key: 'item3',
            title: `Selesai`,
          },
        ]}
        screen={[<LogistikAktif />, <LogistikPending />, <LogistikSelesai />]}
      />
    </SafeAreaView>
  );
};

export default LogistikScreen;
