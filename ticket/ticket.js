export default class Ticket extends Array {
  
    constructor() {
        super();
        this.#makeTicket()
    }

    #makeTicket() {
        this.push([]);
        this.push([]);
        this.push([]);
        this.#makeNumbers();
        this.#makeEmptyItems();
    }

    #makeNumbers() {
        for (let i = 0; i < 9; i++) {
            const from = i * 10;
            const to = from + 9;
            TicketItem.startAgain(from || 1, to);
            const one = new TicketItem(false);
            const two = new TicketItem(false);
            const tree = new TicketItem(false);
            this[0].push(one);
            this[1].push(two);
            this[2].push(tree);
        }
    }

    #makeEmptyItems() {
        let array = [];
        for (const line of this) {
            for (let i = 0; i < 4; i++) {
                if (!array.length) {
                    this.#fillArray(array);
                }
                const emptyIndex = array.splice(
                    Math.floor(Math.random() * array.length), 1
                )[0];
                line[emptyIndex].empty = true;
                delete line[emptyIndex].value;
            }
        }

    }

    #fillArray(array) {
        for (let i = 0; i < 9; i++) {
            array.push(i);
        }
    }

}

class TicketItem {
    static numbers = [];
    constructor(empty) {
        this.empty = empty;
        this.value = this.#getNumber();
        this.checked = false
    }

    #getNumber() {
        if (!TicketItem.numbers.length) {
            TicketItem.startAgain(1, 9);
        }
        return TicketItem.numbers.splice(
            Math.floor(Math.random() * TicketItem.numbers.length), 1
        )[0];
    }

    static startAgain(from, to) {
        TicketItem.numbers = [];
        for(let i = from; i <= to; i++) {
            TicketItem.numbers.push(i);
        }
    }
}