import React, { useEffect, useRef } from 'react'
import './Game.css'
import Comodin from '../../Components/Comodin/Comodin'
import Button from '../../Components/Button/Button'
import musica1 from '../../assets/fondoJuego.mp3'
import musica2 from '../../assets/fondoJuego2.mp3'
import correcto from '../../assets/Correcto.mp3'
import incorrecto from '../../assets/Incorrecto.mp3'
import bomb from '../../assets/Bomb.mp3'
import back from "../../assets/Back.svg"
import InfoVentana from '../../Components/InfoVentana/InfoVentana.jsx'
import Carrera from '../../Components/Carrera/Carrera.jsx'
import confetti from 'canvas-confetti';
import ResultadoFinal from '../../Components/ResultadoFinal/ResultadoFinal.jsx'
import PublicoVentana from '../../Components/PublicoVentana/PublicoVentana.jsx'
import useGetQuiz from "../../services/Quiz/useGetQuiz.js";
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreBox from '../../Components/ScoreBox/ScoreBox.jsx'








export default function Game() {
    const location = useLocation();
    const categoria = location.state?.categoria;
    const dificultad = location.state?.dificultad;
    const infinito = location.state?.infinito;
    let cantidad = 0;
    if (infinito) { cantidad = 50 } else { cantidad = 11 }
    const navigate = useNavigate()


    const { quiz, loading, error } = useGetQuiz(categoria, dificultad, cantidad);
    const [preguntas, setPreguntas] = React.useState(quiz || []);
    const [preguntaActual, setPreguntaActual] = React.useState(0);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = React.useState({});
    const [activo, setActivo] = React.useState(null);
    const [indiceCorrecto, setIndiceCorrecto] = React.useState(null);
    const [musicaActual, setMusicaActual] = React.useState(musica1);
    const [mostrarInicio, setMostrarInicio] = React.useState(true);
    const [mostrarPregunta, setMostrarPregunta] = React.useState(false);
    const [mostrarRespuesta1, setMostrarRespuesta1] = React.useState(false);
    const [mostrarRespuesta2, setMostrarRespuesta2] = React.useState(false);
    const [mostrarRespuesta3, setMostrarRespuesta3] = React.useState(false);
    const [mostrarRespuesta4, setMostrarRespuesta4] = React.useState(false);
    const [ventanaInfoAbierta, setVentanaInfoAbierta] = React.useState(false);
    const [carreraAbierta, setCarreraAbierta] = React.useState(false);
    const [resultadoFInal, setResultadoFInal] = React.useState(false);
    const [puntaje, setPuntaje] = React.useState(0);
    const [estadoBusqueda, setEstadoBusqueda] = React.useState(true)
    const [estado50_50, setEstado50_50] = React.useState(true)
    const [estadoPublico, setEstadoPublico] = React.useState(true)
    const [estadoCambio, setEstadoCambio] = React.useState(true)
    const [bloquearRespuestas, setBloquearRespuestas] = React.useState(false);
    const [musicaMuteada, setMusicaMuteada] = React.useState(false);
    const [respuestasOcultas, setRespuestasOcultas] = React.useState([]);
    const [verPublico, setVerPublico] = React.useState(false);
    const [indiceRespuesta, setIndiceRespuesta] = React.useState(null);
    const [respuestasMezcladas, setRespuestasMezcladas] = React.useState([]);
    const [modoInfinito, setModoInfinito] = React.useState(infinito);
    const [record, setRecord] = React.useState(localStorage.getItem('record') || 0);
    const [mostrarPuntaje, setMostrarPuntaje] = React.useState(false);





    const correctoRef = useRef(null);
    const incorrectoRef = useRef(null);
    const fondoRef = useRef(null);
    const BombRef = useRef(null);




    // Función para obtener una pregunta aleatoria
    const partida = () => {
        setRespuestasOcultas([]);//limpiar respuestas ocultas

        // Oculta ambos al cambiar de pregunta
        setMostrarPregunta(false);
        setMostrarRespuesta1(false);
        setMostrarRespuesta2(false);
        setMostrarRespuesta3(false);
        setMostrarRespuesta4(false);

        setTimeout(() => setMostrarPregunta(true), 3000);
        setTimeout(() => setMostrarRespuesta1(true), 5000);
        setTimeout(() => setMostrarRespuesta2(true), 6000);
        setTimeout(() => setMostrarRespuesta3(true), 7000);
        setTimeout(() => setMostrarRespuesta4(true), 8000);
    };



    // Llamar a partida al cargar el componente
    useEffect(() => {
        if (quiz.length > 0) {
            setPreguntas(quiz);
            setPreguntaSeleccionada(quiz[preguntaActual]);
            partida();
            const timer = setTimeout(() => setMostrarInicio(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [quiz]);

    useEffect(() => {
        if (preguntaSeleccionada && preguntaSeleccionada.question) {
            const respuestas = [
                ...preguntaSeleccionada.incorrect_answers.map(r => ({ texto: r, solucion: false })),
                { texto: preguntaSeleccionada.correct_answer, solucion: true }
            ];
            setRespuestasMezcladas(respuestas.sort(() => Math.random() - 0.5));
        }
    }, [preguntaSeleccionada]);

    //Comandos
    useEffect(() => {
        const handleKeyDown = (event) => {


            // mutear musica
            if (event.key === 'm') {
                if (fondoRef.current) {
                    fondoRef.current.muted = !fondoRef.current.muted;
                    setMusicaMuteada(fondoRef.current.muted); // Actualiza el estado según el valor real
                }
            }

            // cambiar musica
            if (event.key === 'c') {
                if (musicaActual === musica1) {
                    setMusicaActual(musica2);
                } else {
                    setMusicaActual(musica1);
                }
            }

            // bajar y subir volumen
            if (event.key === '-') {
                fondoRef.current.volume = Math.max(0, fondoRef.current.volume - 0.1);
            }
            if (event.key === '+') {
                fondoRef.current.volume = Math.min(1, fondoRef.current.volume + 0.1);
            }

            // abrir y cerrar ventanas de información y carrera
            if (event.key === 'i') {
                setVentanaInfoAbierta(prev => {
                    if (!prev) setCarreraAbierta(false);
                    return !prev;
                });
            }
            if (event.key === 'u') {
                setCarreraAbierta(prev => {
                    if (!prev) setVentanaInfoAbierta(false);
                    return !prev;
                });
            }
            if (event.key === 'Escape') {
                navigate("/")
            }

        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [musicaActual])

    const cerrarVentanaCarrera = () => {
        setCarreraAbierta(false);
    }

    //Confetti
    const confetiIzq = () => {
        confetti({
            particleCount: 150,
            angle: 80,
            startVelocity: 90,
            spread: 90,
            ticks: 250,
            shapes: ['circle'],
            colors: ['#FF0', '#F00'], //amarillo y rojo
            origin: { x: 0.3, y: 0.9 },
        });
    };

    const confetiDer = () => {
        confetti({
            particleCount: 150,
            angle: 100,
            startVelocity: 90,
            spread: 90,
            ticks: 250,
            shapes: ['circle'],
            colors: ['#8A2BE2', '#00BFFF'], //Violeta y azul
            origin: { x: 0.7, y: 0.9 },
        });
    };

    const confetiFinal = () => {
        confetti({
            particleCount: 200,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }


    const verificarRespuesta = (respuesta, indice) => {
        if (bloquearRespuestas) return;
        setBloquearRespuestas(true);
        if (fondoRef.current) {
            setMusicaMuteada(fondoRef.current.muted);
            fondoRef.current.muted = true;
        }
        if (respuesta) {
            const puntajeActual = puntaje;
            const nuevoIndice = preguntaActual + 1;
            setPreguntaActual(nuevoIndice);

            if (BombRef.current) {
                BombRef.current.play();
            }
            setTimeout(() => {
                if (correctoRef.current) {
                    correctoRef.current.play();
                }


                setIndiceCorrecto(indice);
                confetiIzq();
                setTimeout(confetiDer, 1000);
                setActivo(null);
            }, 5000);

            if (!infinito) {
                setTimeout(() => {
                    setCarreraAbierta(true);
                    setPuntaje(puntajeActual + 1);
                }, 7000);
            } else {
                setTimeout(() => {
                    setMostrarPuntaje(true)
                    setPuntaje(puntajeActual + 1);
                }, 7000);
            }

            setTimeout(() => {
                setRespuestasOcultas([]);
                setBloquearRespuestas(false);
                setIndiceCorrecto(null);
                setCarreraAbierta(false);
                setMostrarPuntaje(false)
                setPreguntaSeleccionada(quiz[nuevoIndice]);
                if (fondoRef.current) {
                    fondoRef.current.muted = musicaMuteada;
                }
                if (puntajeActual + 1 === 10 && !infinito) {
                    setResultadoFInal(true);
                } else {
                    partida()
                }
            }, 10000);
        } else {
            if (BombRef.current) {
                BombRef.current.play();
            }
            setTimeout(() => {
                if (incorrectoRef.current) {
                    incorrectoRef.current.play();
                }
                setActivo(null);
                setResultadoFInal(true);
                for (let i = 0; i < 15; i++) {
                    setTimeout(confetiFinal, 500 + i * 500); // 500ms inicial + 150ms entre cada confeti
                }
            }, 5000);

        }


    }



    function getEstadoRespuesta(i) {
        if (respuestasOcultas.includes(i)) return "button-descartado";
        if (indiceCorrecto === i) return "button-correcto";
        if (activo === i) return "button-activo";
        return "button-inactivo";
    }

    const cambioPregunta = () => {
        const nuevoIndice = preguntaActual + 1;
        setPreguntaActual(nuevoIndice);
        setPreguntaSeleccionada(quiz[nuevoIndice]);
        partida();
        setEstadoCambio(false);
    }

    const usarPublico = () => {
        if (!respuestasMezcladas || respuestasMezcladas.length === 0) return;

        respuestasMezcladas.forEach((respuesta, i) => {
            if (respuesta.solucion) {
                setIndiceRespuesta(i);
            }
        });
        setEstadoPublico(false);
        setVerPublico(true);
        setTimeout(() => {
            setVerPublico(false);
        }, 8000);
    }

    const usar50_50 = () => {
        setEstado50_50(false);

        let incorrectas = [];
        let seleccionadas = [];

        respuestasMezcladas.forEach((respuesta, i) => {
            if (!respuesta.solucion) {
                incorrectas.push(i);
            }
        });

        while (seleccionadas.length < 2 && incorrectas.length > 0) {
            const indiceRandom = Math.floor(Math.random() * incorrectas.length);
            const indiceReal = incorrectas[indiceRandom];
            if (!seleccionadas.includes(indiceReal)) {
                seleccionadas.push(indiceReal);
            }
        }

        setRespuestasOcultas(seleccionadas);
    }

    const usarBusqueda = () => {
        window.open("https://www.google.com/search?q=" + decodeHTML(preguntaSeleccionada?.question))
        setEstadoBusqueda(false)
    }

    function decodeHTML(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const cerrarVentana = () => {
        setVentanaInfoAbierta(false);
    }









    if (loading) return <img className='loading' src="https://i.gifer.com/ZNeT.gif" alt="Loading" />;
    if (error) return <div className='loading' >Error, please press f5 😞</div>;


    return (
        <div className='game-container'>
            <audio ref={correctoRef} src={correcto} />
            <audio ref={incorrectoRef} src={incorrecto} />
            <audio ref={BombRef} src={bomb} />
            <audio ref={fondoRef} src={musicaActual} autoPlay loop></audio>
            <header>
                <Comodin tipo="busqueda" onClick={usarBusqueda} estadoComodin={estadoBusqueda} />
                <Comodin tipo="50/50" onClick={usar50_50} estadoComodin={estado50_50} />
                <Comodin tipo="publico" onClick={usarPublico} estadoComodin={estadoPublico} />
                <Comodin tipo="cambio" onClick={cambioPregunta} estadoComodin={estadoCambio} />
                <div className="Hscore-box">High Score: {record}</div>
                {!mostrarPuntaje && <div className="score-box">Score: {puntaje}</div>}
            </header>
            {ventanaInfoAbierta && <InfoVentana cerrarVentana={cerrarVentana} />}
            {carreraAbierta && <Carrera puntaje={puntaje} cerrarVentana={cerrarVentanaCarrera} />}
            {resultadoFInal && <ResultadoFinal puntaje={puntaje} infinito={infinito} />}
            {verPublico && <PublicoVentana indiceRespuesta={indiceRespuesta} />}
            {mostrarInicio && <div className="inicio" />}
            {mostrarPuntaje && <ScoreBox score={puntaje} />}
            <div className={mostrarPregunta ? "fade-in pregunta" : "fade-out pregunta"}>
                {mostrarPregunta && decodeHTML(preguntaSeleccionada?.question)}

            </div>
            <div className='respuesta'>
                {respuestasMezcladas.map((respuesta, i) =>
                    [mostrarRespuesta1, mostrarRespuesta2, mostrarRespuesta3, mostrarRespuesta4][i] && (
                        <Button
                            key={i}
                            estadoActual={getEstadoRespuesta(i)}
                            children={String.fromCharCode(65 + i) + ") " + decodeHTML(respuesta.texto)}
                            style={{ margin: '15px', fontSize: 'large' }}
                            onClick={() => {
                                if (activo === i) {
                                    verificarRespuesta(respuesta.solucion, i);
                                } else {
                                    setActivo(i);
                                }
                            }}
                        />
                    )
                )}
            </div>
        </div>
    )
}