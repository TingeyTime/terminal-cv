// filepath: /home/nate/projects/terminal-cv/src/index.js
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

const term = new Terminal();
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');