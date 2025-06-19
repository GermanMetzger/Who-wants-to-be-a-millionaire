import React from 'react'
import './LlamadaVentana.css'
import Button from '../Button/Button';

export default function LlamadaVentana() {

    const [tiempo, setTiempo] = React.useState(45);
    const [className, setClassName] = React.useState('llamadaVentana');

    React.useEffect(() => {
        if (tiempo <= 0) return;
        const interval = setInterval(() => {
            setTiempo(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [tiempo]);

    const cerrarVentana = () => {
        setClassName('cerrar');
    }

    return (
        <div className={className}>
            <div className='llamada-ventana-contenido'>
                {tiempo}
                <Button onClick={cerrarVentana} children="Close" estadoActual="boton-chiquito"></Button>
            </div>
        </div>
    )
}
