import { v4 as uuidv4 } from 'uuid';
import Ticket from '../ticket/ticket.js';
import { games, sockets } from './game-rout.js'


export class Game {
    #interval;
    constructor (name, creator) {
        this.id = uuidv4();
        this.name = name;
        this.creator = creator;
        this.tickets = [];
        this.socket_connection_id = uuidv4();
        sockets[this.id] = [];
    }

    setSocket(socket) {
        sockets[this.id].push(socket);
    }

    joinGame(user = {}) {
        if (this.started) {
            return false;
        }
        user.id = uuidv4();
        user.socket_connection_id = this.socket_connection_id
        const ticket = {
            user: user,
            id: uuidv4(),
            ticket: new Ticket(), 
        }
        this.tickets.push(ticket);
        if (this.tickets.length === 1) {
            this.startGame();
        }
        return ticket;
    }

    startGame(listener) {
        this.#createNumbers();
        this.#interval = setInterval(() => {
            const number = this.numbers.splice(
                Math.random() * this.numbers.length, 1
            )[0];
            let data;
            if (!this.numbers.length) {
                stopGame();
                data = {
                    number: number,
                    end: true
                }
            } else {
                data = {
                    number: number,
                    end: true
                }
            }
            if (listener) {
                listener(data);
            }
            sockets[this.id].forEach((socket) => {
                socket.emit('game-listener', JSON.stringify(data));
            });
        }, 8 * 1000)
    }

    stopGame(id) {
        this.numbers = [];
        if (this.#interval) {
            clearInterval(this.#interval);
        }
        if (id === this.creator.id) {
            deleteGame(this.id);
        }
    }

    #createNumbers() {
        this.numbers = [];
        for (let i = 1; i <= 90; i++) {
            this.numbers.push(i)
        }
    }
    
    deleteGame() {
        clearInterval(this.interval);
        delete sockets[this.id];
    }
}



function deleteGame(gameId) {
    const index = 0;
    games.deleteGame();
    games.splice(index, 0);
}