import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/homes/HomeScreen';
import BeritaScreen from '../screens/homes/BeritaScreen';
import DetailBerita from '../screens/homes/DetailBerita';
import SurveyScreen from '../screens/homes/SurveyScreen';
import SurveyDetailScreen from '../screens/homes/SurveyDetailScreen';
import PengaduanScreen from '../screens/pengaduan/PengaduanScreen';
import InputPengaduanScreen from '../screens/pengaduan/InputPengaduanScreen';
import SurveyKhususScreen from '../screens/survey/SurveyKhususScreen';
import SurveyProvScreen from '../screens/survey/SurveyProvScreen';
import SurveyKabScreen from '../screens/survey/SurveyKabScreen';
import JumlahPemilihScreen from '../screens/homes/JumlahPemilihScreen';
import TugasScreen from '../screens/tugas/TugasScreen';
import KirimTugasScreen from '../screens/tugas/KirimTugasScreen';
import RingkasanTugasScreen from '../screens/tugas/RingkasanTugasScreen';
import LogistikScreen from '../screens/logistik/LogistikScreen';
import KirimLogistikScreen from '../screens/logistik/KirimLogistikScreen';
import RingkasanLogistikScreen from '../screens/logistik/RingkasanLogistikScreen';
import CanvasingScreen from '../screens/canvasing/CanvasingScreen';
import QuickCountScreen from '../screens/quickcount/QuickCountScreen';
import FomulirScreen from '../screens/quickcount/FomulirScreen';
import UploadFotoScreen from '../screens/quickcount/UploadFotoScreen';

const HomeStack = createStackNavigator();

const homes = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'BeritaScreen',
    component: BeritaScreen,
    options: {
      title: 'Berita dari Franko',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'DetailBerita',
    component: DetailBerita,
    options: {
      title: 'Berita',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'SurveyScreen',
    component: SurveyScreen,
    options: {
      title: 'Survey',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'SurveyDetailScreen',
    component: SurveyDetailScreen,
    options: {
      title: 'Survey',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'PengaduanScreen',
    component: PengaduanScreen,
    options: {
      title: 'Pengaduan',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'InputPengaduanScreen',
    component: InputPengaduanScreen,
    options: {
      title: 'Pengaduan',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'SurveyKhususScreen',
    component: SurveyKhususScreen,
    options: {
      title: 'Survey Khusus',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'SurveyProvScreen',
    component: SurveyProvScreen,
    options: {
      title: 'Survey Khusus',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'SurveyKabScreen',
    component: SurveyKabScreen,
    options: {
      title: 'Survey Khusus',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'JumlahPemilihScreen',
    component: JumlahPemilihScreen,
    options: {
      title: 'Jumlah Pemilih Tersambung',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'TugasScreen',
    component: TugasScreen,
    options: {
      title: 'Tugas',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'KirimTugasScreen',
    component: KirimTugasScreen,
    options: {
      title: 'Detail Tugas',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'RingkasanTugasScreen',
    component: RingkasanTugasScreen,
    options: {
      title: 'Detail Tugas',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'LogistikScreen',
    component: LogistikScreen,
    options: {
      title: 'Logistik',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'KirimLogistikScreen',
    component: KirimLogistikScreen,
    options: {
      title: 'Logistik',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'RingkasanLogistikScreen',
    component: RingkasanLogistikScreen,
    options: {
      title: 'Logistik',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'CanvasingScreen',
    component: CanvasingScreen,
    options: {
      title: 'Canvasing',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'QuickCountScreen',
    component: QuickCountScreen,
    options: {
      title: 'Quick Count',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'FomulirScreen',
    component: FomulirScreen,
    options: {
      title: 'Fomulir',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'UploadFotoScreen',
    component: UploadFotoScreen,
    options: {
      title: 'Upload Foto',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
];

const HomeRouter = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {homes.map(el => (
        <HomeStack.Screen key={el.name} {...el} />
      ))}
    </HomeStack.Navigator>
  );
};

export default HomeRouter;
