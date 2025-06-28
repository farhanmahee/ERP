import React, { useEffect, useState } from 'react';

function CodeDisplay({ text }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [barcodeUrl, setBarcodeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!text) return;

    const fetchCodes = async () => {
      try {
        const qrRes = await fetch(`/api/codes/qrcode?text=${encodeURIComponent(text)}`);
        const qrData = await qrRes.json();
        const barcodeRes = await fetch(`/api/codes/barcode?text=${encodeURIComponent(text)}`);
        const barcodeData = await barcodeRes.json();

        if (qrRes.ok) setQrCodeUrl(qrData.dataUrl);
        else setError(qrData.message || 'Failed to fetch QR code');

        if (barcodeRes.ok) setBarcodeUrl(barcodeData.dataUrl);
        else setError(barcodeData.message || 'Failed to fetch barcode');
      } catch (err) {
        setError('Server error');
      }
    };

    fetchCodes();
  }, [text]);

  if (!text) return null;

  return (
    <div className="flex space-x-8 items-center">
      {error && <p className="text-red-500">{error}</p>}
      {qrCodeUrl && (
        <div>
          <h3 className="text-lg font-semibold mb-2">QR Code</h3>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
      {barcodeUrl && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Barcode</h3>
          <img src={barcodeUrl} alt="Barcode" />
        </div>
      )}
    </div>
  );
}

export default CodeDisplay;
