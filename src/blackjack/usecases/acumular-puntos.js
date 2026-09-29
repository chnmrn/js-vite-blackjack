import { valorCarta } from './valor-carta.js';

/**
 * Suma el valor de una carta a los puntos del turno indicado
 * @param {Array<Number>} puntosJugadores arreglo de puntos por jugador
 * @param {Number} turno indice del jugador (0 = jugador, último = computadora)
 * @param {String} carta carta a acumular, ej. '5C', 'AS'
 * @returns {Number} puntos acumulados del turno
 */

export const acumularPuntos = ( puntosJugadores, turno, carta ) => {

    if ( !puntosJugadores ) throw new Error('puntosJugadores es obligatorio');

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    return puntosJugadores[turno];
}

export default acumularPuntos;
