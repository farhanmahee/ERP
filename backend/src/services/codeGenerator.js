const QRCode = require('qrcode');
const bwipjs = require('bwip-js');

const CodeGenerator = {
  generateQRCode: async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      throw new Error('QR code generation failed');
    }
  },

  generateBarcode: async (text) => {
    try {
      return await new Promise((resolve, reject) => {
        bwipjs.toBuffer({
          bcid: 'code128',       // Barcode type
          text: text,            // Text to encode
          scale: 3,              // 3x scaling factor
          height: 10,            // Bar height, in millimeters
          includetext: true,     // Show human-readable text
          textxalign: 'center',  // Always good to set this
        }, (err, png) => {
          if (err) {
            reject(err);
          } else {
            const base64 = png.toString('base64');
            resolve(`data:image/png;base64,${base64}`);
          }
        });
      });
    } catch (err) {
      throw new Error('Barcode generation failed');
    }
  },
};

module.exports = CodeGenerator;
