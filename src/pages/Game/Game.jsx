import React, { useEffect, useRef } from 'react'
import './Game.css'
import Comodin from '../../Components/Comodin/Comodin'
import Button from '../../Components/Button/Button'
import musica1 from '../../assets/fondoJuego.mp3'
import musica2 from '../../assets/fondoJuego2.mp3'
import correcto from '../../assets/Correcto.mp3'
import incorrecto from '../../assets/Incorrecto.mp3'
import bomb from '../../assets/Bomb.mp3'
import InfoVentana from '../../Components/InfoVentana/InfoVentana.jsx'
import Carrera from '../../Components/Carrera/Carrera.jsx'
import confetti from 'canvas-confetti';
import ResultadoFinal from '../../Components/ResultadoFinal/ResultadoFinal.jsx'
import PublicoVentana from '../../Components/PublicoVentana/PublicoVentana.jsx'
import LlamadaVentana from '../../Components/llamadaVentana/LlamadaVentana.jsx'
import useGetQuiz from "../../services/Quiz/useGetQuiz.js";









export default function Game() {
    const { quiz, loading, error } = useGetQuiz();
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
    const [estadoLlamada, setEstadoLlamada] = React.useState(true)
    const [estado50_50, setEstado50_50] = React.useState(true)
    const [estadoPublico, setEstadoPublico] = React.useState(true)
    const [estadoCambio, setEstadoCambio] = React.useState(true)
    const [bloquearRespuestas, setBloquearRespuestas] = React.useState(false);
    const [musicaMuteada, setMusicaMuteada] = React.useState(false);
    const [respuestasOcultas, setRespuestasOcultas] = React.useState([]);
    const [verPublico, setVerPublico] = React.useState(false);
    const [verLlamada, setVerLlamada] = React.useState(false);
    const [indiceRespuesta, setIndiceRespuesta] = React.useState(null);
    const [respuestasMezcladas, setRespuestasMezcladas] = React.useState([]);





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
            setPuntaje(prev => prev + 1);
            const nuevoIndice = preguntaActual + 1;
            setPreguntaActual(nuevoIndice);
            console.log("pregunta actual", nuevoIndice);

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

            setTimeout(() => {
                setCarreraAbierta(true);
            }, 7000);

            setTimeout(() => {
                setRespuestasOcultas([]);
                partida();
                setBloquearRespuestas(false);
                setIndiceCorrecto(null);
                setCarreraAbierta(false);
                setPreguntaSeleccionada(quiz[nuevoIndice]);
                if (fondoRef.current) {
                    fondoRef.current.muted = musicaMuteada;
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
        console.log("pregunta actual", nuevoIndice);
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

    const usarLlamada = () => {
        setEstadoLlamada(false);
        setVerLlamada(true);
    }

    function decodeHTML(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }









    if (loading) return <div>loading...</div>;
    if (error) return <div>Error, please press f5: {error.message}</div>;


    return (
        <div className='game-container'>
            <audio ref={correctoRef} src={correcto} />
            <audio ref={incorrectoRef} src={incorrecto} />
            <audio ref={BombRef} src={bomb} />
            <audio ref={fondoRef} src={musicaActual} autoPlay loop></audio>
            <header>
                <Comodin tipo="llamada" onClick={usarLlamada} estadoComodin={estadoLlamada} />
                <Comodin tipo="50/50" onClick={usar50_50} estadoComodin={estado50_50} />
                <Comodin tipo="publico" onClick={usarPublico} estadoComodin={estadoPublico} />
                <Comodin tipo="cambio" onClick={cambioPregunta} estadoComodin={estadoCambio} />
            </header>
            {ventanaInfoAbierta && <InfoVentana />}
            {carreraAbierta && <Carrera puntaje={puntaje} cerrarVentana={cerrarVentanaCarrera} />}
            {resultadoFInal && <ResultadoFinal puntaje={puntaje} />}
            {verPublico && <PublicoVentana indiceRespuesta={indiceRespuesta} />}
            {verLlamada && <LlamadaVentana />}
            <div className='pregunta'>
                <h1 className={mostrarPregunta ? "fade-in" : "fade-out"}>
                    {mostrarPregunta && decodeHTML(preguntaSeleccionada?.question)}
                </h1>
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
            {mostrarInicio && <div className="inicio" />}
        </div>
    )
}