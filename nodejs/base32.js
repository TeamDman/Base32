const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const base32Lookup =
    [0xFF, 0xFF, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
        0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E,
        0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
        0x17, 0x18, 0x19, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
        0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E,
        0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
        0x17, 0x18, 0x19, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
    ];

function encode(input) {
    return encodeRaw(Buffer.from(input, 'utf8'));


}

function encodeRaw(buffer) {
    let result = '';
    for (let index = 0; index < buffer.length + 4; index += 5) {
        // Get 5 bytes, padded with 0
        let a = buffer[index] || 0;
        let b = buffer[index + 1] || 0;
        let c = buffer[index + 2] || 0;
        let d = buffer[index + 3] || 0;
        let e = buffer[index + 4] || 0;
        let char;
        char = (a & 0b11111000) >> 3;
        result += buffer[index] !== undefined ? base32Chars[char] : '\x00';

        char = ((a & 0b00000111) << 2) | ((b & 0b11000000)>>6);
        result += buffer[index] !== undefined ? base32Chars[char] : '\x00';

        char = (b & 0b00111110) >> 1;
        result += buffer[index + 1] !== undefined ? base32Chars[char] : '\x00';

        char = ((b & 0b0000001) << 4) | ((c & 0b11110000)>>4);
        result += buffer[index + 1] !== undefined ? base32Chars[char] : '\x00';

        char = ((c & 0b00001111) << 1) | ((d & 0b10000000)>>7);
        result += buffer[index + 2] !== undefined ? base32Chars[char] : '\x00';

        char = (d & 0b01111100) >> 2;
        result += buffer[index + 3] !== undefined ? base32Chars[char] : '\x00';

        char = ((d & 0b00000011) << 3) | ((e & 0b11100000)>>5);
        result += buffer[index + 3] !== undefined ? base32Chars[char] : '\x00';

        char = e & 0b00011111;
        result += buffer[index + 4] !== undefined ? base32Chars[char] : '\x00';
    }
    return result;
}

function decode(input) {

}

function encode2(input) {
    console.log(
        ([...input+'\x00\x00\x00\x00\x00']
            .map(c => c.charCodeAt())
            .map(c => ('00000000'+c.toString(2)).slice(-8))
            .join('')
            .replace(/([0|1]{5})/g, (match, cap) =>  base32Chars[parseInt(cap, 2)])
            .substr(0, Math.ceil(input.length * 8 / 5))
            +'=======').slice(0,Math.ceil(Math.ceil(input.length * 8 / 5)/8)*8)
    );
}

module.exports = {
    base32Chars,
    base32Lookup,
    encode,
    encodeRaw,
    decode
};

// console.log(encode('ABCDE'));
encode2('A');
encode2('AB');
encode2('ABC');
encode2('ABCD');
encode2('ABCDE');
//http://www.herongyang.com/Encoding/Base32-Encoding-Algorithm.html