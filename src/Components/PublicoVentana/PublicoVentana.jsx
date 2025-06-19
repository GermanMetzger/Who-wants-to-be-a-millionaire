import React from 'react'
import './PublicoVentana.css'

export default function PublicoVentana({indiceRespuesta}) {
    const [preguntando, setPreguntando] = React.useState(true);
    const [resultado, setResultado] = React.useState(null);



    React.useEffect(() => {
        if(indiceRespuesta === 0) {
            setResultado("A");
        } else if(indiceRespuesta === 1) {
            setResultado("B");
        } else if(indiceRespuesta === 2) {
            setResultado("C");
        } else {
            setResultado("D");
        }
        setTimeout(() => {
            setPreguntando(false);
        }, 3000);
    }, []);

    if (preguntando) {
        return (
            <div className="publico-ventana">
                <div className="publico-ventana-contenido">
                    <h1>Asking the audience</h1>
                </div>
            </div>
        )
    }



    return (
        <div className="publico-ventana">
            <div className="publico-ventana-contenido">
                <h1>Audience Result</h1>
                <div>
                    <p>The audience thinks the answer is: </p>
                    <span className='respuestaPublico'>{resultado}</span>
                </div>
            </div>
        </div>
    )
}
