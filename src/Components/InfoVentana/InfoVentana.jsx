import React from 'react'
import './InfoVentana.css'
import busqueda from '../../assets/globe.svg'
import cincuentaCincuenta from '../../assets/50_50.svg'
import publico from '../../assets/publico.svg'
import cambio from '../../assets/cambio.svg'
import Button from '../Button/Button'

export default function InfoVentana({cerrarVentana}) {
    return (
        <div className='infoVentana'>
            <div className='infoVentanaContenido'>

                <h2>Game Information</h2>
                <h3>Commands</h3>
                <div>
                    <p><strong style={{color: "yellow"}}>M </strong> = Mute/unmute background music</p>
                    <p><strong style={{color: "yellow"}}>C </strong> = Change background music</p>
                    <p><strong style={{color: "yellow"}}>- </strong> = Decrease volume</p>
                    <p><strong style={{color: "yellow"}}>+ </strong> = Increase volume</p>
                    <p><strong style={{color: "yellow"}}>I </strong> = Show/hide game information</p>
                    <p><strong style={{color: "yellow"}}>U </strong> = View Ladder</p>
                    <p><strong style={{color: "yellow"}}>Esc </strong> = Go back to main menu</p>
                </div>

                <div>
                    <h3>Lifelines</h3>
                    <p><img src={busqueda} alt="search" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = search the question in the web</p>
                    <p><img src={cincuentaCincuenta} alt="50/50" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Remove two incorrect answers</p>
                    <p><img src={publico} alt="audience" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Ask the audience for their opinion</p>
                    <p><img src={cambio} alt="switch" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Switch the current question</p>
                </div>
                <Button estadoActual='button-inactivo' children="Exit" style={{width: "50%"}} onClick={cerrarVentana}></Button>

            </div>
        </div>
    )
}
