import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'

export default function CloakingChecker() {
  const [url, setUrl] = useState('')
  const [formData, setFormData] = useState({ url: 'https://ptm.fkip.uns.ac.id/' })
  const [error, setError] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
        ...prev,
        [name] : value
    }));

    if(error[name]){
        setError(prev => ({
            ...prev,
            [name] : ''
        }))
    }
  }

  const validateForm = () => {
    const newError = {};

    if(!formData.url){
        newError.url = 'URL tidak boleh kosong';
    }

    return newError;

    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = validateForm();
    if(Object.keys(newError).length > 0){
        setError(newError);
        return;
    }

    setLoading(true)
    const res = await fetch('/api/check-cloaking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <Layout>
        <Head>
            <title>Cek Cloaking Website | BedahDigital Tools</title>
            <meta name="description" content="Periksa apakah website Anda menampilkan konten berbeda untuk Googlebot dan pengguna biasa (cloaking). Gratis dan cepat!" />
        </Head>
        <div className='py-10'>
        <h1 className="text-xl font-semibold mb-4">Cek Cloaking Website</h1>
        <p className='mb-4'>
            Masukkan URL website yang ingin Anda periksa. Alat ini akan membandingkan konten yang ditampilkan untuk pengguna biasa dan Googlebot. Jika ada perbedaan, berarti website Anda menggunakan teknik cloaking.
        </p>
        <form className="mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name='url'
                value={formData.url}
                onChange={handleChange}
                placeholder="https://contoh.com"
                className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {error.url &&
                <p className='text-red-700 text-sm'>{error.url}</p>
            }
            <button
                className="bg-blue-600 text-white px-4 mt-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Memeriksa...' : 'Cek Sekarang'}
            </button>
        </form>

        {result && (
            <div className="mt-6 bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-5">Hasil:</h2>
                <div class='mb-4 grid grid-cols-6'>
                    <div className='col-span-2'>
                        <h3 class='text-xl font-semibold mb-1'>Judul Halaman (Title)</h3>
                    </div>
                    <div className='col-span-4'>
                        <p class='$color font-medium mb-2'>{result.isDifferent ? '❌ Berbeda' : '✅ Sama'}</p>
                        <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <h4 class='font-semibold mb-1'>Normal Browser</h4>
                                <div class='p-3 border rounded bg-gray-100 text-sm break-words'>{result.titleBrowser}</div>
                            </div>
                            <div>
                                <h4 class='font-semibold mb-1'>Googlebot</h4>
                                <div class='p-3 border rounded bg-gray-100 text-sm break-words'>{result.titleBot}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='mb-4 grid grid-cols-6'>
                    <div className='col-span-2'>
                        <h3 class='text-xl font-semibold mb-1'>Meta Description</h3>
                    </div>
                    <div className='col-span-4'>
                        <p class='$color font-medium mb-2'>{result.isDifferent ? '❌ Berbeda' : '✅ Sama'}</p>
                        <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <h4 class='font-semibold mb-1'>Normal Browser</h4>
                                <div class='p-3 border rounded bg-gray-100 text-sm break-words'>{result.descBrowser}</div>
                            </div>
                            <div>
                                <h4 class='font-semibold mb-1'>Googlebot</h4>
                                <div class='p-3 border rounded bg-gray-100 text-sm break-words'>{result.descBot}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h2 class="text-2xl font-semibold mb-4">🧪 Perbandingan HTML Lengkap</h2>
                    {result.isDifferent && (
                        <div>
                            <p class="text-red-600 font-medium mb-4">⚠️ Konten HTML antara Googlebot dan browser biasa berbeda!</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="font-semibold mb-1">HTML (Googlebot)</h4>
                                    <textarea readonly class="w-full h-64 p-3 text-sm border rounded bg-gray-100">{result.htmlGooglebot}</textarea>
                                </div>
                                <div>
                                    <h4 class="font-semibold mb-1">HTML (Normal Browser)</h4>
                                    <textarea readonly class="w-full h-64 p-3 text-sm border rounded bg-gray-100">{result.htmlBrowser}</textarea>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    {!result.isDifferent && (
                        <p class="text-green-600 font-medium">✅ Tidak ditemukan perbedaan signifikan pada HTML.</p>
                    )}
                </div>
                <pre className="text-sm overflow-x-auto mt-10 hidden">{JSON.stringify(result, null, 2)}</pre>
            </div>
        )}
        </div>
    </Layout>
  )
}
