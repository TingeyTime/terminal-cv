// src/terminal/Shell.js
export class Shell {
  constructor(term, commands) {
    this.term = term;
    this.commands = commands;
    this.buffer = '';
    this.history = [];
    this.historyIndex = -1;

    this.prompt = () => {
      this.term.write('\r~ /:');
    };

    this.init();
  }

  init() {
    this.prompt();

    this.term.onData((key) => {
      switch (key) {
        case '\r': // ENTER
          this.term.write('\r\r\n');
          this.history.push(this.buffer);
          this.historyIndex = this.history.length;
          this.execute(this.buffer.trim());
          this.buffer = '';
          break;

        case '\u007F': // BACKSPACE
          if (this.buffer.length > 0) {
            this.buffer = this.buffer.slice(0, -1);
            this.term.write('\b \b');
          }
          break;

        case '\u001b[A': // Up Arrow
          if (this.historyIndex > 0) {
            this.historyIndex--;
            this.replaceBuffer(this.history[this.historyIndex]);
          }
          break;

        case '\u001b[B': // Down Arrow
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.replaceBuffer(this.history[this.historyIndex]);
          } else {
            this.historyIndex = this.history.length;
            this.replaceBuffer('');
          }
          break;

        default:
          this.buffer += key;
          this.term.write(key);
      }
    });
  }

  replaceBuffer(newBuffer) {
    // Erase current input
    this.term.write('\x1b[2K\r');
    this.prompt();
    this.buffer = newBuffer;
    this.term.write(this.buffer);
  }

  async execute(input) {
    const cmd = input.split(' ')[0];
    const handler = this.commands[cmd] || this.commands['*'];
    await handler(this.term, input);
    this.prompt();
  }
}
