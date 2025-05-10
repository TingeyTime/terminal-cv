// src/terminal/commands.js
export const commands = {
  help: async (term) => {
    const cmds = Object.keys(commands).filter(c => c !== '*').join('\r\n - ');
    await typeOut(term, `Available commands:\r\n - ${cmds}\r\n`);
  },
  status: async (term) => {
    await typeOut(term, 'Status: Online\r\n');
  },
  clear: (term) => {
    term.clear();
  },
  '*': async (term, input) => {
    await typeOut(term, `Unknown command: ${input}\r\n`);
  }
};

async function typeOut(term, text, delay = 20) {
  for (let ch of text) {
    await new Promise(res => setTimeout(res, delay));
    term.write(ch);
  }
}
