import React from 'react'
import './ResultadoFinal.css'
import Button from '../Button/Button';

    const premios = [
        "$ 2.000",
        "$ 5.000",
        "$ 20.000",
        "$ 50.000",
        "$ 100.000",
        "$ 200.000",
        "$ 500.000",
        "$ 1.000.000",
        "$ 3.000.000",
        "$ 5.000.000"
    ];

export default function ResultadoFinal({ puntaje }) {
return (
    <div className="resultadoFinal">
        <div className="resultadoFinalContenido">
            <h2 style={{color: "rgba(146, 16, 221, 0.719)"}}>Final Result</h2>
            <p>Congratulations! You have reached the end of this game!</p>
            <h1>Score: {puntaje} / 10!</h1>
            <p>Prizes obtained:</p>
            <ul style={{margin:"15px", color: "yellow", listStyle: "none", paddingLeft: 0}}>
                {premios.slice(0, puntaje).map((premio, index) => (
                    <li key={index}>{premio}</li>
                ))}
                {(premios.length === 0) ? (
                        <li key="no-premios">You have not obtained any prizes</li>
                ) : (
                    <br />
                )}
            </ul>
            <p>Did you like the game? I hope so! If you want to play again, you can restart the game.</p>
            <p>Thank you for playing!</p>
            <Button children="Restart"
                onClick={() => window.location.reload()}
                style={{ margin: '10px', maxWidth: '200px' }}
            />
            <Button
                children="Back to Home"
                onClick={() => window.location.href = '/'}
                style={{ margin: '10px', maxWidth: '200px' }}
            />
        </div>
    </div>
)
}
