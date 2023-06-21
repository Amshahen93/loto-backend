import express from 'express';
import { games } from '../game/game-rout.js';

const ticket = express.Router();

ticket.get('/:gameId', (req, res) => {
    const id = req.params.id;
    if (id) {
        const game = games.find((game) => ticket.id === id);
        if (game) {
            const ticket = game.join();
            if (ticket) {
                res.send(ticket);
            } else {
                res.status(403).json({
                    message: `game with id ${id} already started`
                })
            }
        } else {
            res.status(404).json({
                message: `game not found id ${id}`
            });
        }
    } else {
        res.status(400).json({
            message: `no id in url`
        });
    }
  
});

export default ticket;