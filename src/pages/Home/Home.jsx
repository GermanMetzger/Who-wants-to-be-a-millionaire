import React, { useRef, useState, useEffect } from 'react'
import './Home.css'
import titulo from '../../assets/titulo.png'
import musica from '../../assets/menuA.mp3'
import mute from '../../assets/Mute.svg'
import info from '../../assets/info.svg'
import sonido from '../../assets/Sonido.svg'
import Button from '../../Components/Button/Button'
import InfoVentana from '../../Components/InfoVentana/InfoVentana'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [dificultad, setDificultad] = useState('Easy')
  const [categoria, setCategoria] = useState("Any Category")
  const [infinito, setInfinito] = useState(false)
  const [mostrarInfoVentana, setMostrarInfoVentana] = useState(false)
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


  const cerrarVentana = () => {
  setMostrarInfoVentana(false);
  }

const toggleMute = () => {
  setMuted(prev => {
    const nuevoMuted = !prev;
    if (audioRef.current) {
      audioRef.current.muted = nuevoMuted;
      if (!nuevoMuted && audioRef.current.paused) {
        audioRef.current.play();
      }
    }
    return nuevoMuted;
  });
};

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "i") { 
      setMostrarInfoVentana(prev => !prev); 
    }
    if (e.key === "m") { 
      toggleMute(); 
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

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


  const mostrarInfo = () => {
    if(mostrarInfoVentana) {
      setMostrarInfoVentana(false);
    } else {
      setMostrarInfoVentana(true);
    }
  }

  const changeMode = () =>{
    if(infinito){
      setInfinito(false)
    }else{
      setInfinito(true)
    }
  }

  return (
    <>
      {mostrarInfoVentana && <InfoVentana cerrarVentana={cerrarVentana} />}
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
                dificultad,
                infinito
              }
            });
          }}
        />
        <Button children={"Dificult: " + dificultad} onClick={() => { changeDificult() }} />
        <Button children={"Category: " + (categoria === "Any Category" ? "Any Category" : categorias[categoria])} onClick={() => { changeCategory() }} />
        <Button children={"Mode: " + (infinito ? "Infinite" : "Normal")} onClick={() => { changeMode() }} />
      </div>
      <div className='botones-configuracion'>
        <button onClick={toggleMute} className='boton-sonido'>
          <img
            src={muted ? mute : sonido}
            alt={muted ? "Sin sonido" : "Con sonido"}
            style={{ width: 50, height: 50, marginTop: -2, marginLeft: -2 }}
            draggable={false}
          />
        </button>
        <button onClick={mostrarInfo} className='boton-info'>
          <img src={info} alt="Info" />
        </button>
      </div>
    </div>
    </>
  )
}
