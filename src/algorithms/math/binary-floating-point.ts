
export interface BinaryFloatingPointData {
  sign: number;
  exponent: string;
  mantissa: string;
  binary: string;
}

export const floatToBinary = (floatStr: string): BinaryFloatingPointData => {
  const float = parseFloat(floatStr);
  if (isNaN(float)) {
      return {
          sign: 0,
          exponent: '00000000',
          mantissa: '00000000000000000000000',
          binary: '00000000000000000000000000000000'
      };
  }

  const buffer = new ArrayBuffer(4);
  const dataView = new DataView(buffer);
  dataView.setFloat32(0, float, false); // big-endian

  let binary = '';
  for (let i = 0; i < 4; i++) {
    const byte = dataView.getUint8(i);
    binary += byte.toString(2).padStart(8, '0');
  }

  const sign = parseInt(binary[0], 10);
  const exponent = binary.substring(1, 9);
  const mantissa = binary.substring(9);

  return {
    sign,
    exponent,
    mantissa,
    binary
  };
};

export const getExponentValue = (exponentBinary: string): number => {
    return parseInt(exponentBinary, 2) - 127;
}
