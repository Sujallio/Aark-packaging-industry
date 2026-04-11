import { useState } from 'react'
import Tesseract from 'tesseract.js'
import { invoiceService } from '../services/supabaseService'

export default function InvoiceOCR({ onClose })
{
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [ocrResult, setOcrResult] = useState(null)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setProcessing(true)
    setError('')

    try {
      // Read file as data URL for preview
      const reader = new FileReader()
      reader.onload = async () => {
        const result = await Tesseract.recognize(reader.result, 'eng')
        setOcrResult({
          text: result.data.text,
          confidence: result.data.confidence,
          timestamp: new Date().toISOString(),
        })
        setProcessing(false)
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      setError(`OCR Error: ${error.message}`)
      setProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice OCR</h2>
        <button onClick={onClose} className="text-gray-600 text-2xl">✕</button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>}

      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={processing}
          className="w-full"
        />
        {processing && <p className="text-blue-600 mt-2">Processing image...</p>}
      </div>

      {ocrResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Extracted Text</label>
              <textarea
                value={ocrResult.text}
                readOnly
                className="w-full h-40 p-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-2xl font-bold text-blue-600">{ocrResult.confidence}%</p>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <p className="text-sm text-gray-600">Processed</p>
                <p className="text-sm text-green-600">{new Date(ocrResult.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
            Auto-fill Invoice
          </button>
        </div>
      )}
    </div>
  )
}
