import express from 'express';
import { games } from '../game/game-rout.js';

const ticket = express.Router();

ticket.get('/:gameId/:userId', (req, res) => {
    const id = req.params.gameId;
    const userId = req.params.userId;
    if (id && userId) {
        const game = games.find((game) => game.id === id);
        if (game) {
            const ticket = game.join(userId);
            if (ticket) {
                res.send(ticket);
            } else {
                res.status(404).json({
                    message: `ticket with id ${userId} not found`
                });
            }
        } else {
            res.status(404).json({
                message: `game not found id ${id}`
            });
        }
    } else {
        res.status(400).json({
            message: `no gameId and ticketId in url`
        });
    }
  
});

export default ticket;