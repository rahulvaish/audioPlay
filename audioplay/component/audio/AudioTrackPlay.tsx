import { Pressable, StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';


const MusicTrackPlay = (props: any) => {

  const {track, trackDesc, trackAudioSrc, trackImgSrc} = props.route.params;

  const audioFiles = [
    { title: `${trackDesc}`, uri: `${trackAudioSrc}`, src: `${trackImgSrc}` },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const sound = useRef(new Audio.Sound());
  const navigation = useNavigation();

  useEffect(() => {
    const loadAudio = async () => {
      try {
        if (sound.current._loaded) {
          await sound.current.unloadAsync();
        }
        await sound.current.loadAsync({ uri: audioFiles[currentTrackIndex].uri });
        setIsPlaying(false);

        const status = await sound.current.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis);
        } else {
          console.error('Audio is not loaded properly');
        }
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
  }, [currentTrackIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (sound.current._loaded) {
        sound.current.stopAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const updateSliderPosition = async () => {
      try {
        const status = await sound.current.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      } catch (error) {
        console.error('Error updating slider position:', error);
      }
    };

    const intervalId = setInterval(updateSliderPosition, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const playAudio = async () => {
    try {
      if (!isPlaying) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        await sound.current.playAsync();
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        await sound.current.pauseAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const onSliderValueChange = (value: any) => {
    setPosition(value);
    sound.current.setPositionAsync(value);
  };
  // const onSliderValueChange = async (value: number) => {
  //   try {
  //     if (value >= 0 && value <= duration) {
  //       setPosition(value);
  //       await sound.current.setPositionAsync(value);
  //     }
  //     setPosition(value);
  //     sound.current.setPositionAsync(value);
  //   } catch (error) {
  //     console.error('Error setting slider position:', error);
  //   }
  // };


  return (
    <View style={styles.container}>
      <View style={styles.album}>
        <Text style={styles.albumTitle}>{track}</Text>
      </View>

      <Image
        source={{ uri: `${audioFiles[currentTrackIndex].src}` }}
        style={styles.albumImgPreview} />

      <Text style={styles.albumDesc}>{audioFiles[currentTrackIndex].title}</Text>

      <View>
        <View style={styles.borderView}>
        <View style={styles.audioControl}>
          <Pressable onPress={playAudio} >
            {
              isPlaying ? <AntDesign name="pausecircle" size={50} color="#6D2AAB" /> : <AntDesign name="play" size={50} color="#6D2AAB" />
            }
          </Pressable>

          <Slider
          style={{ width: '70%', padding: 5, marginLeft:5,}}
          value={position}

          maximumValue={duration}
          onValueChange={onSliderValueChange}/>
        </View>
        </View>
      </View>
    </View>
  )
}

export default MusicTrackPlay

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020925',
    height: '100%'
  },
  album: {
    position: 'absolute',
    top: 50,
  },
  albumTitle:{
    color:'white',
    textTransform:'capitalize',
    fontSize:15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImgPreview: {
    height: 300,
    width: 300,
    borderRadius: 20,
    marginBottom:80
  },
  albumDesc:{
    color:'white',
    fontSize:15,
    fontWeight:'500',
    paddingTop:10,
    width:300,
    bottom:80,
  },
  sliderComp: {
    width: 300,
    marginBottom:20,
    marginLeft:20,
  },
  audioControl: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
  },
  play:{
    position:'absolute',
    top:10,
    height:30,
    width:30
  },
  borderView: {
    width: 300,
    height: 80,
    borderWidth: 0.2,        
    borderColor: 'grey',  
    borderRadius: 200,
  },
})