import {SafeAreaView} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import {default as DefaultTabBar} from '../../components/DefaultTabBar';
import {default as TugasAktif} from './tugasComponents/TugasAktif';
import {default as TugasSelesai} from './tugasComponents/TugasSelesai';
import TugasPending from './tugasComponents/TugasPending';

const TugasScreen = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <DefaultTabBar
        onIndexChange={val => {}}
        routes={[
          {key: 'item1', title: 'Aktif'},
          {key: 'item2', title: 'Pending'},
          {
            key: 'item3',
            title: `Selesai`,
          },
        ]}
        screen={[<TugasAktif />, <TugasPending />, <TugasSelesai />]}
      />
    </SafeAreaView>
  );
};

export default TugasScreen;
