import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {heigth} from '../../../Helper';
import {useSelector} from 'react-redux';

export default function YoutubeVideo({online}) {
  const [playing, setPlaying] = useState(false);
  const {videoId} = useSelector(state => state.homeReducer);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <>
      <View
        style={{
          borderRadius: 5,
          overflow: 'hidden',
        }}>
        {online && videoId && (
          <YoutubePlayer
            height={heigth / 4.1}
            allowWebViewZoom
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        )}
      </View>
    </>
  );
}
