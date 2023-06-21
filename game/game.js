import { v4 as uuidv4 } from 'uuid';
import Ticket from '../ticket/ticket.js';
import { io } from '../server.js'
import { games } from './game-rout.js'


export class Game {
    constructor (name, creator) {
        this.id = uuidv4();
        this.name = name;
        this.creator = creator;
        this.tickets = [];
        this.socket_connection_id = uuidv4();
        this.#startSocket();
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
        console.log(this.tickets.length);
        if (this.tickets.length === 1) {
            this.startGame();
        }
        return ticket;
    }

    startGame(listener) {
        console.log('start game');
        this.#createNumbers();
        this.interval = setInterval(() => {
            console.log('interval');
            const number = this.numbers.splice(
                Math.random() * this.numbers.length, 1
            );
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
            io.emit(`game-listener/${this.socket_connection_id}`, JSON.stringify(data));
        }, 8 * 1000)
    }

    stopGame(id) {
        this.numbers = [];
        if (this.interval) {
            clearInterval(this.interval);
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

    #startSocket() {
        io.on(`game-listener/${this.socket_connection_id}`, (socket) => {
            if (this.started) {
                console.log(socket);
            }
        });
    }
    
    deleteGame() {
        clearInterval(this.interval);
        io.off(`game-listener/${this.socket_connection_id}`);
    }
}



function deleteGame(gameId) {
    const index = 0;
    games.deleteGame();
    games.splice(index, 0);
}