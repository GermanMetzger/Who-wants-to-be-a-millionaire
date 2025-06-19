import React from 'react'
import './Carrera.css'
import Button from '../Button/Button';

export default function Carrera({ puntaje, cerrarVentana }) {


    const premios = [
        "$ 5.000",
        "$ 10.000",
        "$ 20.000",
        "$ 50.000",
        "$ 100.000",
        "$ 400.000",
        "$ 800.000",
        "$ 1.500.000",
        "$ 3.000.000",
        "$ 5.000.000"
    ];

    return (
        <div className='carrera'>
            <div className='carreraContenido'>
                <h2>Run information</h2>
                <div className='carreraTexto'>
                    {premios.map((premio, i) => (
                        <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className='numero'>{i + 1} = </div>
                            <div className='premio'>{(puntaje > i) ? premio : "???"}</div>
                        </div>
                    ))}
                </div>
                <Button estadoActual='button-inactivo salir' children="Exit" onClick={cerrarVentana}></Button>
            </div>
        </div>
    )
}
