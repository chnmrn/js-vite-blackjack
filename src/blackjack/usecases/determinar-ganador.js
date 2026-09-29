/**
 * Determina el resultado de la partida según los puntos finales
 * @param {Number} puntosMinimos puntos del jugador
 * @param {Number} puntosComputadora puntos de la computadora
 * @returns {String} mensaje con el resultado
 */

export const determinarGanador = ( puntosMinimos, puntosComputadora ) => {

    if ( puntosComputadora === puntosMinimos ) {
        return 'Nadie gana :(';
    } else if ( puntosMinimos > 21 ) {
        return 'Computadora gana';
    } else if ( puntosComputadora > 21 ) {
        return 'Jugador Gana';
    } else {
        return 'Computadora Gana';
    }
}

export default determinarGanador;
