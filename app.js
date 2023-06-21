import { app, io, server  } from './server.js'
import ticket from './ticket/ticket-router.js';
import { gameRout } from './game/game-rout.js';



app.use('/ticket', ticket);
app.use('/game', gameRout);
server.listen(8080);