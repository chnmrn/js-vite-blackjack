import { crearDeck, pedirCarta, acumularPuntos, determinarGanador } from './usecases'

const miModulo = (() => {
    'use strict';

    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck( tipos, especiales );

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const mostrarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            alert( determinarGanador( puntosMinimos, puntosComputadora ) );
        }, 100 );

    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;
        const turno = puntosJugadores.length - 1;

        do {
            const carta = pedirCarta( deck );
            puntosComputadora = acumularPuntos( puntosJugadores, turno, carta );
            puntosHTML[ turno ].innerText = puntosComputadora;
            crearCarta( carta, turno );

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        mostrarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta( deck );
        const puntosJugador = acumularPuntos( puntosJugadores, 0, carta );
        puntosHTML[0].innerText = puntosJugador;

        crearCarta( carta, 0 );


        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();

    });


    return {
        nuevoJuego: inicializarJuego
    };

})();








