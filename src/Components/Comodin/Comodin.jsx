import React, { useEffect } from 'react'
import { useState } from 'react';
import './Comodin.css'
import llamada from '../../assets/phone.svg'
import cincuentaCincuenta from '../../assets/50_50.svg'
import publico from '../../assets/publico.svg'
import cambio from '../../assets/cambio.svg'


export default function Comodin({ tipo, onClick, estadoComodin }) {
    const [src, setSrc] = useState('');

    useEffect(() => {
        if (tipo === 'llamada') {
            setSrc(llamada);
            console.log(llamada);
        } else if (tipo === '50/50') {
            setSrc(cincuentaCincuenta);
        } else if (tipo === 'publico') {
            setSrc(publico);
        } else if (tipo === 'cambio') {
            setSrc(cambio);
        }
    }, [tipo]); 

const tipoTraducido = tipo === 'llamada' ? 'phone'
                    : tipo === '50/50' ? 'fifty-fifty'
                    : tipo === 'publico' ? 'audience'
                    : tipo === 'cambio' ? 'switch'
                    : tipo;

    return (
        <div className='espacio-comodin' onClick={estadoComodin ? onClick : null}>
            <div className={estadoComodin ? "comodin-activo" : "comodin-inactivo"}>
                <img src={src} alt={tipo} style={{ width: '50%', height: '50%' }} />
            </div>
            <p>{tipoTraducido}</p>
        </div>
    )
}
