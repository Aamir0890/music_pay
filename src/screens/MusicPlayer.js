import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useAudioContext } from '../../Global/Context';
import { useNavigation } from '@react-navigation/native';
require('dotenv').config();
function MusicPlayer({route}) {
  const names=async()=>{
    const inputString =route.params?.id
    // console.log(inputString.id)
     await playActive(inputString.id)
  }
  const playActive=async(index)=>{
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    // console.log(trackIndex,'hsa')
    if(trackIndex!==index){
      await TrackPlayer.skip(index)
    let trackObject = await TrackPlayer.getTrack(index);
    console.log(trackObject)
    if (trackObject !== null && trackObject !== undefined) {
      setTrackIndex(index);
      setTrackTitle(trackObject.title);
      setTrackArtist(trackObject.artist);
      setTrackArtwork(trackObject.artwork);
    }
  }
  }
  let musicData
  const {setTrackIndex,trackTitle,setTrackTitle,trackArtist,setTrackArtist,
  trackArtwork,setTrackArtwork
  }=useAudioContext()
  
  const playBackState = usePlaybackState();
  const progress = useProgress();
  
  const setupPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ],compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
      });
      let response = await axios.get(`${process.env.LINK}/songs`)
       musicData = response.data
      
      // Prepare the tracks array
      let tracks = musicData.map(item => ({
        id: item.id, // Replace with actual id field
        url: 'https://geetglow.com/'+item.demo_url, // Replace with actual url field
        title: item.song_name, // Replace with actual title field
        artist: item.artist_name, // Replace with actual artist field
        artwork: 'https://geetglow.com/'+item.cover // Replace with actual artwork field
      }));
      await TrackPlayer.add(tracks);
      await gettrackdata();
      await TrackPlayer.play();
    } catch (error) { console.log(error); }
  };
    
    
  const gettrackdata = async (index) => {
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    // console.log(trackIndex,0)
    if (trackIndex !== null && trackIndex !== undefined&&trackIndex!==index) {
      let trackObject = await TrackPlayer.getTrack(trackIndex);
      // console.log(trackObject)
      if (trackObject !== null && trackObject !== undefined) {
        setTrackIndex(trackIndex);
        setTrackTitle(trackObject.title);
        setTrackArtist(trackObject.artist);
        setTrackArtwork(trackObject.artwork);
      }
    }
  };
   
  const togglePlayBack = async playBackState => {
    // console.log(playBackState.state)
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack !== null) {
      if ((playBackState.state === State.Paused)) {
        await TrackPlayer.play();
        }else if((playBackState.state === State.Ready)){
          await TrackPlayer.play();
        } 
        else {
          await TrackPlayer.pause();
        }
      }
    };
    
  const nexttrack = async () => {
    let trackIndex1 = await TrackPlayer.getActiveTrackIndex();
    // console.log(trackIndex1)
    let response = await axios.get(`${process.env.LINK}/songs`)
    musicData = response.data
    // console.log(musicData.length)
    try {
      if (trackIndex1 < musicData.length-1) {
        await TrackPlayer.skipToNext();
        
        gettrackdata();
      };
    } catch (error) {
      console.log(error)
    }
  };
    
  const previoustrack = async () => {
    try {
      let trackIndex1 = await TrackPlayer.getActiveTrackIndex();
    
      if (trackIndex1 > 0) {
        await TrackPlayer.skipToPrevious();
        gettrackdata();
      };
    } catch (error) {
      console.log(error)
    }
  };
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === "playback-track-changed" && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      // console.log(event.nextTrack);
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });
   
  useEffect(() => {
     
    setupPlayer();
    names()
    
  }, []);
  const navigation=useNavigation()
  const backing=()=>{
    navigation.navigate('Root',{screen:'Home'})
  }
   
  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.mainContainer}>
        <View style={{marginRight:'70%',marginBottom:'5%'}}>
          <TouchableOpacity onPress={backing}>
      <Ionicons name='arrow-back-outline' color='white' size={30}/>

          </TouchableOpacity>
         
        </View>
        <View style={styles.mainWrapper}>
          {trackArtwork!==null?
          <Image source={{uri:trackArtwork}} style={styles.imageWrapper} />:null
          }
          
        </View>
        <View style={styles.songText}>
          <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{trackTitle}</Text>
          <Text style={[styles.songContent, styles.songArtist]} numberOfLines={2}>{trackArtist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => await TrackPlayer.seekTo(value) }
          />
          <View style={styles.progressLevelDuraiton}>
            <Text style={styles.progressLabelText}>
              {new Date(progress.position * 1000)
                .toISOString()
                .substring(14,19)}
            </Text>
            <Text style={styles.progressLabelText}>
              {new Date((progress.duration) * 1000)
                .toISOString()
                .substring(14,19)}
            </Text>
          </View>
        </View>
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons 
              name="play-skip-back-outline" 
              size={35} 
              color="#FFD369" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState) }>
            <Ionicons
              name={
                playBackState.state === State.Playing
                  ? 'pause-outline'
                 
                  : 'play-outline'
              }
              size={45}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default MusicPlayer;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignSelf: "center",
    width: '90%',
    height: '90%',
    borderRadius: 15,
  },
  songText: {
    marginTop:2,
    height: 70
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 40,
    marginLeft:5,
    marginRight:5
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
    marginHorizontal:'5%'
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '60%',
  },
});