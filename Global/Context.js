import { View, Text } from 'react-native'
import React,{createContext,useContext,useState} from 'react'

const AudioContext = createContext();

export const useAudioContext = () => {
  return useContext(AudioContext);
};


const Context = ({children}) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState('noice');
    const [trackArtist, setTrackArtist] = useState('hello');
    const [trackArtwork, setTrackArtwork] = useState('https://geetglow.com/assets/music/img/covers/Aishwarya_Pt.jpg');
    const [songList,setSongList]=useState()
    const [sounds, setSounds] = useState(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [play, setPlay] = useState(0);
    const [selectedSong, setSelectedSong] = useState(null);
    const [user,setUser]=useState()
    const [songId,setSongId]=useState()
    const [modalVisible,setModalVisible]=useState(false)
  return (
    <AudioContext.Provider
      value={{
        trackIndex,
        setTrackIndex,
        trackTitle,
        setTrackTitle,
        trackArtist,
        setTrackArtist,
        trackArtwork,
        setTrackArtwork,
        songList,
        setSongList,
        sounds,
        setSounds,
        duration,
        setDuration,
        position,
        setPosition,
        play,
        setPlay,
        selectedSong,
        setSelectedSong,
        user,
        setUser,
        songId,
        setSongId,
        modalVisible,
        setModalVisible
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export default Context