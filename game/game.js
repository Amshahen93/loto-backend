import { v4 as uuidv4 } from 'uuid';
import Ticket from '../ticket/ticket.js';
import { games, sockets } from './game-rout.js'


export class Game {
    #interval;
    #currentNumber;
    started = false;
    constructor (name, creator) {
        this.id = uuidv4();
        this.name = name;
        this.creator = creator;
        this.tickets = [];
        sockets[this.id] = [];
        this.counter = 0;
    }

    setSocket(socket) {
        sockets[this.id].push(socket);
    }

    setAsTouched(ticketId, number) {
        if (this.started && number === this.#currentNumber) {
            const ticket = this.tickets.find(ticket => ticket.id === ticketId);
            for (const number of ticket.ticket) {
                if (number.number === number) {
                    number.checked = true;
                    return ticket;
                }
            }
        }
        return false;
        
    }

    joinGame(user = {}) {
        let ticket;
        if (user.id) {
            ticket = this.tickets.find(ticket => ticket.user?.id === user.id)
        }
        if (!ticket) {
            if (!user.id) {
                user.id = uuidv4();
            }
            ticket = {
                user: user,
                id: uuidv4(),
                ticket: new Ticket(),
            }
            this.tickets.push(ticket);
            if (this.tickets.length === 2) {
                this.startGame();
            }
        }
        return ticket;
    }

    startGame(listener) {
        this.#createNumbers();
        this.started = true;
        this.#interval = setInterval(() => {
            this.#currentNumber = this.numbers.splice(
                Math.random() * this.numbers.length, 1
            )[0];
            if (!this.numbers.length && this.counter < 2) {
                this.counter++;
                this.#createNumbers();
            }
            let data;
            if (!this.numbers.length) {
                stopGame();
                data = {
                    number: this.#currentNumber,
                    end: true
                }
            } else {
                data = {
                    number: this.#currentNumber,
                    end: false
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