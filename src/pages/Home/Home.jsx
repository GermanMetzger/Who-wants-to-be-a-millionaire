import React, { useRef, useState } from 'react'
import './Home.css'
import titulo from '../../assets/titulo.png'
import musica from '../../assets/menuA.mp3'
import mute from '../../assets/Mute.png'
import sonido from '../../assets/Sonido.png'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const navigate = useNavigate()

  const toggleMute = () => {
    setMuted(prev => !prev)
    if (audioRef.current) {
      audioRef.current.muted = !muted
    }
  }

  return (
    <div className='menu'>
      <img src={titulo} alt="titulo" className='titulo' />

      <audio ref={audioRef} src={musica} autoPlay loop></audio>
      <div className='botones'>
        <Button children="Play" onClick={() => {navigate('/game')}} />
      </div>
      <button onClick={toggleMute} className='boton-sonido'>
        <img
          src={muted ? mute : sonido}
          alt={muted ? "Sin sonido" : "Con sonido"}
          style={{ width: 50, height: 50, marginTop: -2, marginLeft: -2 }}
          draggable={false}
        />
      </button>
    </div>
  )
}
  