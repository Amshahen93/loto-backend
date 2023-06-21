import { app, io, server  } from './server.js'
import ticket from './ticket/ticket-router.js';
import { gameRout, games } from './game/game-rout.js';



app.use('/ticket', ticket);
app.use('/game', gameRout);
io.on('connect', (socket) => {
    const id = socket.request._query.gameId;
    const game = games.find(game => game.id === id);
    game?.setSocket(socket);
    
});
server.listen(8080);