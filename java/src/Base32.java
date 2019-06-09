import java.nio.charset.StandardCharsets;

public class Base32 {
	final static char[] base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".toCharArray();
	final static char[] base32Lookup = {
			0xFF, 0xFF, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
			0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
			0xFF, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
			0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E,
			0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
			0x17, 0x18, 0x19, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
			0xFF, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
			0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E,
			0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
			0x17, 0x18, 0x19, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
	};

	public static String encode(String input) {
		return encodeRaw(input.getBytes(StandardCharsets.UTF_8));
	}

	public static String encodeRaw(byte[] buffer) {
		StringBuilder result = new StringBuilder();

		for (int index = 0; index < buffer.length + 4; index += 5) {
			// Get 5 bytes, padded with 0
			int a = index >= buffer.length ? 0 : buffer[index];
			int b = index+1 >= buffer.length ? 0 : buffer[index + 1];
			int c = index+2 >= buffer.length ? 0 : buffer[index + 2];
			int d = index+3 >= buffer.length ? 0 : buffer[index + 3];
			int e = index+4 >= buffer.length ? 0 : buffer[index + 4];
			int ch;
			ch = (a & 0b11111000) >> 3;
			result.append((char) index < buffer.length ? base32Chars[ch] : 0);

			ch = ((a & 0b00000111) << 2) | ((b & 0b11000000)>>6);
			result.append((char) index < buffer.length ? base32Chars[ch] : 0);

			ch = (b & 0b00111110) >> 1;
			result.append((char) index + 1 < buffer.length ? base32Chars[ch] : 0);

			ch = ((b & 0b0000001) << 4) | ((c & 0b11110000)>>4);
			result.append((char) index + 1 < buffer.length ? base32Chars[ch] : 0);

			ch = ((c & 0b00001111) << 1) | ((d & 0b10000000)>>7);
			result.append((char) index + 2 < buffer.length ? base32Chars[ch] : 0);

			ch = (d & 0b01111100) >> 2;
			result.append((char) index + 3 < buffer.length ? base32Chars[ch] : 0);

			ch = ((d & 0b00000011) << 3) | ((e & 0b11100000)>>5);
			result.append((char) index + 3 < buffer.length ? base32Chars[ch] : 0);

			ch = e & 0b00011111;
			result.append((char) index + 4 < buffer.length ? base32Chars[ch] : 0);
		}
		return result.toString();
	}

	public static void main(String[] args) {
		System.out.println(encode("ABCDE"));
	}
}
