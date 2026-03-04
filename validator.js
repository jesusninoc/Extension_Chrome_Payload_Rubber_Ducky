// Mapeo optimizado [Código de Tecla, Modificador]
const ES_MAP = {
  "0": [0x27, 0x00], "1": [0x1e, 0x00], "2": [0x1f, 0x00], "3": [0x20, 0x00], "4": [0x21, 0x00], "5": [0x22, 0x00], "6": [0x23, 0x00], "7": [0x24, 0x00], "8": [0x25, 0x00], "9": [0x26, 0x00],
  "a": [0x04, 0x00], "b": [0x05, 0x00], "c": [0x06, 0x00], "d": [0x07, 0x00], "e": [0x08, 0x00], "f": [0x09, 0x00], "g": [0x0a, 0x00], "h": [0x0b, 0x00], "i": [0x0c, 0x00], "j": [0x0d, 0x00], "k": [0x0e, 0x00], "l": [0x0f, 0x00], "m": [0x10, 0x00], "n": [0x11, 0x00], "o": [0x12, 0x00], "p": [0x13, 0x00], "q": [0x14, 0x00], "r": [0x15, 0x00], "s": [0x16, 0x00], "t": [0x17, 0x00], "u": [0x18, 0x00], "v": [0x19, 0x00], "w": [0x1a, 0x00], "x": [0x1b, 0x00], "y": [0x1c, 0x00], "z": [0x1d, 0x00],
  "A": [0x04, 0x02], "B": [0x05, 0x02], "C": [0x06, 0x02], "D": [0x07, 0x02], "E": [0x08, 0x02], "F": [0x09, 0x02], "G": [0x0a, 0x02], "H": [0x0b, 0x02], "I": [0x0c, 0x02], "J": [0x0d, 0x02], "K": [0x0e, 0x02], "L": [0x0f, 0x02], "M": [0x10, 0x02], "N": [0x11, 0x02], "O": [0x12, 0x02], "P": [0x13, 0x02], "Q": [0x14, 0x02], "R": [0x15, 0x02], "S": [0x16, 0x02], "T": [0x17, 0x02], "U": [0x18, 0x02], "V": [0x19, 0x02], "W": [0x1a, 0x02], "X": [0x1b, 0x02], "Y": [0x1c, 0x02], "Z": [0x1d, 0x02],
  " ": [0x2c, 0x00], ".": [0x37, 0x00], ",": [0x36, 0x00], ":": [0x37, 0x02], ";": [0x36, 0x02], "-": [0x38, 0x00], "_": [0x38, 0x02],
  "/": [0x24, 0x02], "\\": [0x35, 0x40], "(": [0x25, 0x02], ")": [0x26, 0x02], "$": [0x21, 0x02], "=": [0x27, 0x02],
  "\"": [0x1f, 0x02], "'": [0x2d, 0x00], "ENTER": [0x28, 0x00], "GUI": [0x00, 0x08]
};

async function compile() {
    const input = document.getElementById('code').value;
    const lines = input.split('\n');
    let bytes = [];

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('REM')) continue;

        const parts = line.split(/\s+/);
        const command = parts[0].toUpperCase();
        const args = parts.slice(1).join(' ');

        if (command === 'STRING') {
            for (let char of args) {
                const data = ES_MAP[char];
                if (data) bytes.push(data[0], data[1]); // Escribe sin pausas
            }
        } else if (command === 'DELAY') {
            let ms = parseInt(args) || 50;
            while (ms > 0) {
                let d = Math.min(ms, 255);
                bytes.push(0x00, d); // Comando de espera real
                ms -= d;
            }
        } else if (command === 'GUI' || command === 'WINDOWS') {
            const key = parts[1] ? parts[1].toLowerCase() : null;
            if (key && ES_MAP[key]) {
                bytes.push(ES_MAP[key][0], 0x08); // Windows + Tecla
            } else {
                bytes.push(0x00, 0x08); // Solo tecla Windows
            }
        } else if (command === 'ENTER') {
            bytes.push(0x28, 0x00);
        } else if (ES_MAP[command]) {
            bytes.push(ES_MAP[command][0], ES_MAP[command][1]);
        }
    }

    const uint8 = new Uint8Array(bytes);
    const blob = new Blob([uint8], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({ url: url, filename: 'inject.bin' });
}

document.getElementById('compileBtn').addEventListener('click', compile);