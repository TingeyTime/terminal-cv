import './styles.css';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';
import '@xterm/xterm/css/xterm.css';

import { Shell } from './terminal/shell.js';
import { commands } from './terminal/commands.js';

const term = new Terminal({
    theme: {
        background: '#00000000',
        foreground: '#ffffff',
        cursor: '#ffffff',
    },
    fontFamily: 'Fira Code, Menlo, monospace',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0.5,
    cursorBlink: true,
});
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById('terminal'));

fitAddon.fit();
window.addEventListener('resize', () => {fitAddon.fit();});

const viewport = document.querySelector('.xterm-viewport');
if (viewport) viewport.style.overflow = 'hidden';

(async () => {
    await typeOut(term, 'Welcome to the terminal!\r\n');
})

new Shell(term, commands);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}