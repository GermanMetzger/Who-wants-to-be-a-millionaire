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
  const [dificultad, setDificultad] = useState('Easy')
  const [categoria, setCategoria] = useState("Any Category")
  const navigate = useNavigate()

  const categorias = {
    9: "General Knowledge",
    10: "Entertainment: Books",
    11: "Entertainment: Film",
    12: "Entertainment: Music",
    13: "Entertainment: Musicals & Theatres",
    14: "Entertainment: Television",
    15: "Entertainment: Video Games",
    16: "Entertainment: Board Games",
    17: "Science & Nature",
    18: "Science: Computers",
    19: "Science: Mathematics",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
    29: "Entertainment: Comics",
    30: "Science: Gadgets",
    31: "Entertainment: Japanese Anime & Manga",
    32: "Entertainment: Cartoon & Animations"
  }

  const toggleMute = () => {
    setMuted(prev => !prev)
    if (audioRef.current) {
      audioRef.current.muted = !muted
    }
  }

  const changeDificult = () => {
    if (dificultad === 'Easy') {
      setDificultad('Medium')
    } else if (dificultad === 'Medium') {
      setDificultad('Hard')
    } else {
      setDificultad('Easy')
    }
  }

const changeCategory = () => {
  const keys = Object.keys(categorias);
  if (categoria === "Any Category") {
    setCategoria(keys[0]);
    return;
  }
  const idx = keys.indexOf(categoria.toString());
  const nextIdx = (idx + 1) % keys.length;
  setCategoria(keys[nextIdx]);
};

  return (
    <div className='menu'>
      <img src={titulo} alt="titulo" className='titulo' />

      <audio ref={audioRef} src={musica} autoPlay loop></audio>
      <div className='botones'>
        <Button
          children="Play"
          onClick={() => {
            navigate('/game', {
              state: {
                categoria,
                dificultad
              }
            });
          }}
        />
        <Button children={"Dificult: " + dificultad} onClick={() => { changeDificult() }} />
        <Button children={"Category: " + (categoria === "Any Category" ? "Any Category" : categorias[categoria])} onClick={() => { changeCategory() }} />
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
