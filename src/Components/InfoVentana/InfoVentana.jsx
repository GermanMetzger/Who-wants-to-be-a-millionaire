import React from 'react'
import './InfoVentana.css'
import llamada from '../../assets/phone.svg'
import cincuentaCincuenta from '../../assets/50_50.svg'
import publico from '../../assets/publico.svg'
import cambio from '../../assets/cambio.svg'

export default function InfoVentana() {
    return (
        <div className='infoVentana'>
            <div className='infoVentanaContenido'>

                <h2>Game Information</h2>
                <h3>Commands</h3>
                <div>
                    <p><strong>M </strong> = Mute/unmute background music</p>
                    <p><strong>C </strong> = Change background music</p>
                    <p><strong>- </strong> = Decrease volume</p>
                    <p><strong>+ </strong> = Increase volume</p>
                    <p><strong>I </strong> = Show/hide game information</p>
                    <p><strong>U </strong> = View Ladder</p>
                </div>

                <div>
                    <h3>Lifelines</h3>
                    <p><img src={llamada} alt="phone" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = You have 45 seconds to call someone for help with the question</p>
                    <p><img src={cincuentaCincuenta} alt="50/50" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Remove two incorrect answers</p>
                    <p><img src={publico} alt="audience" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Ask the audience for their opinion</p>
                    <p><img src={cambio} alt="switch" style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}/> = Switch the current question</p>
                </div>

            </div>
        </div>
    )
}
