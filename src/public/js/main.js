import render from './render.js';
import construct from './construct.js';
import event from './event.js';
import listen from './listen.js';
import drop from './drop.js';

const socket = io();

render();
construct();
event(socket);
listen(socket);
drop();
