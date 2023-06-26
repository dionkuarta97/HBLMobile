import {SafeAreaView} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import SurveyAktif from './surverComponents/SurveyAktif';
import SurveySelesai from './surverComponents/SurveySelesai';
import DefaultTabBar from '../../components/DefaultTabBar';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet} from '../../Helper';
import {getListSurvey} from '../../states/survey/surveyAction';
import SurveyPending from './surverComponents/SurveyPending';

const SurveyScreen = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const {user} = useSelector(state => state.authReducer);
  const {listSurvey, surveyOffline} = useSelector(state => state.surveyReducer);
  useFocusEffect(
    useCallback(() => {
      checkInternet().then(data => {
        if (data) {
          dispatch(getListSurvey(user.role, user.id))
            .then(() => {})
            .catch(() => {});
        }
      });
    }, [tab]),
  );

  const handleTab = useCallback(val => {
    setTab(val);
  });

  console.log(JSON.stringify(listSurvey, null, 2));

  return (
    <SafeAreaView style={globalStyles.container}>
      <DefaultTabBar
        onIndexChange={val => {
          handleTab(val);
        }}
        routes={[
          {key: 'item1', title: 'Survey Aktif'},

          {
            key: 'item2',
            title: `Pending`,
          },
          {
            key: 'item3',
            title: `Selesai`,
          },
        ]}
        screen={[
          <SurveyAktif
            data={
              user.role === 1
                ? listSurvey?.survey.filter(
                    el =>
                      ![
                        ...listSurvey?.surveyStatus,
                        ...surveyOffline.filter(
                          el => Number(el.id_pengisi) === Number(user.id),
                        ),
                      ].find(({id_survey}) => el.id === id_survey) && el,
                  )
                : listSurvey?.survey
            }
          />,
          <SurveyPending data={surveyOffline} id_user={user.id} />,
          <SurveySelesai
            total={
              listSurvey?.total_status ? listSurvey?.total_status : undefined
            }
            data={listSurvey?.surveyStatus}
          />,
        ]}
      />
    </SafeAreaView>
  );
};

export default SurveyScreen;
