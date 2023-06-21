import express from 'express';
import { Game } from "./game.js";
// const io = new Server(server);
export const gameRout = express.Router();
export const games = [];

gameRout.get('/games', (req, res) => {
    res.send(games);
});

gameRout.get('/:id', (req, res) => {
    const game = games.find(game => game.id === req.params.id);
    if (!req.params.id || !game) {
        res.status(404).json({
            message: `game not found id ${id}`
        })
    } else {
        res.send(game);
    }
});

gameRout.post('/create', (req, res) => {
    const body = req.body;
    if (!body || !body.name || !body.username || !body.email) {
        res.status(400).json({error: 'body must contain valid game name, username and email'})
    } else {
        const game = new Game(body.name, {
            username: body.username,
            email:  body.email
        });
        games.push(game);
        
        res.send(game);
    }
});

gameRout.post('/join/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const game = games.find(game => game.id === req.params.id);
    if (body) {
        
    }
    if (!req.params.id || !game) {
        res.status(404).json({
            message: `game not found id ${id}`
        })
    } else {
        res.send(game.joinGame(body));
    }
});

