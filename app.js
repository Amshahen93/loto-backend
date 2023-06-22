import { app, io, server  } from './server.js'
import ticket from './ticket/ticket-router.js';
import { gameRout, games } from './game/game-rout.js';
import { networkInterfaces } from 'os';

const withIp = process.argv.slice(2)[0]
let ip;

app.use('/ticket', ticket);
app.use('/game', gameRout);
io.on('connect', (socket) => {
    const id = socket.request._query.gameId;
    const game = games.find(game => game.id === id);
    game?.setSocket(socket);
    
});

function ip4() {
    let ipObj
    const net = networkInterfaces()
    Object.keys(net).find((key) => {
        ipObj = net[key].find((ipObj) => {
          return ipObj.family === 'IPv4' && !ipObj.internal
        });
        return !!ipObj
    });
    return  ipObj.address
}

if (withIp) {
    ip = ip4()
}

server.listen(8080, ip || undefined);
console.log(`\x1b[32mhttp://${ ip || 'localhost'}:8080`)