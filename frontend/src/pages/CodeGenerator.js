import React, { useState } from 'react';
import CodeDisplay from '../components/CodeDisplay';

function CodeGenerator() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Barcode and QR Code Generator</h1>
      <div className="mb-6">
        <label htmlFor="text" className="block text-gray-700 mb-2">Enter Text to Generate Codes</label>
        <input
          id="text"
          type="text"
          className="w-full max-w-md border border-gray-300 p-2 rounded"
          value={text}
          onChange={handleChange}
          placeholder="Enter text here"
        />
      </div>
      {text && <CodeDisplay text={text} />}
    </div>
  );
}

export default CodeGenerator;
