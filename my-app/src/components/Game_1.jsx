import { useState, useRef, useEffect } from 'react'
import React from 'react'

import { useNavigate, Link } from "react-router-dom";
import song2 from './LOSTSVUND - liquor and pills_.mp3'
import song from './MYLIFe.mp3'
import song3 from './Сплин.mp3'
function Game_1() {
  
  const array = [
    {
      id: 1,
      name: "Bon Jovi - It's My Life",
      src: song,
      artist: "Bon Jovi",
      
    }
    ,
    {
      id: 2,
      name: "LOSTSVUND - liquor and pills_",
      src: song2,
      artist: "LOSTSVUND",
    }
    ,
    {
      id: 3,
      name: "Сплин - Выхода нет",
      src: song3,
      artist: "Сплин",
    }
  ];
  const [music, setMusic] = useState(array);
  const [counter, setCounter] = useState(0);
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
   
    
    if (counter>array.length-1) {
      setCounter(0)
      
      
    }
  
    if (counter < 0) {
      setCounter(array.length - 1)
    }
    setIsPlaying(false)
    setPercentage(0)
    const audio = audioRef.current
    audio.volume = 0.1
      setIsPlaying(true)
      audio.play()
      setIsPlaying(true)
        
    
        
        
      }, [counter])
  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
    
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }


  const [position, setPosition] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const rangeRef = useRef()
  const thumbRef = useRef()

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width
    const thumbWidth = thumbRef.current.getBoundingClientRect().width
    const centerThumb = (thumbWidth / 100) * percentage * -1
    const centerProgressBar =
      thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
    setPosition(percentage)
    setMarginLeft(centerThumb)
    setProgressBarWidth(centerProgressBar)
    if(percentage===100){
      setCounter(counter+1)
    }
  }, [percentage])




  function secondsToHms(seconds) {
    if (!seconds) return '00m 00s'

    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
      sec = `0${sec}`
    }
    if (min < 10) {
      min = `0${min}`
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    } else if (min == 0) {
      return `00m ${sec}s`
    } else {
      return `${min}m ${sec}s`
    }
  }


  return (
    
    <div className='app-container'>





    
      <div className='slider-container'>
      <div
        className='progress-bar-cover'
        style={{
          width: `${progressBarWidth}px`
        }}
      ></div>
     <p className='center'>  {
      music[counter]?.name
    }
    </p>
      <div
        className='thumb'
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`
        }}
      ></div>
      <input
        type='range'
        value={position}
        ref={rangeRef}
        step='0.01'
        className='range'
        onChange={onChange}
      />
    </div>
   
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))
        }}
        src={music[counter]?.src}
      ></audio>
      <div className='control-panel'>
      <div className='timer'>{secondsToHms(currentTime)}</div>
      
      <div className='btn-container'>
        
      <button className='arrows' onClick={()=>{
    setCounter(counter-1)
    

    
  }}>{"🡸"}</button>
      <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
      <button  className='arrows' onClick={()=>{
      setCounter(counter=>counter+1)
    }}>{
      '🡺'
    }</button>
  
    </div>
      <div className='timer'>{secondsToHms(duration)}</div>
    </div>
    </div>
  )
}

export default Game_1
