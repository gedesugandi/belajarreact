import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Tools Website Gratis | BedahDigital</title>
        <meta name="description" content="Gunakan berbagai tools gratis untuk menganalisis website Anda, seperti cek cloaking, SEO checker, dan lainnya." />
      </Head>

      <div className='py-10'>
        <h1 className="text-2xl font-semibold mb-4">Selamat datang 🔥</h1>
        <p className="mb-4">Halo, ini adalah tools gratis untuk membantu Anda menganalisis website. Saat ini tersedia:</p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white p-4 rounded shadow'>
            <h3 className="text-lg font-semibold mb-2">🔍 Cek Cloaking</h3>
            <Link href="/cloaking-checker" className="text-blue-600 hover:underline">
              Cek Cloaking Website
            </Link>
            <p className="text-sm text-gray-600 mt-2">Periksa apakah website Anda menampilkan konten berbeda untuk Googlebot dan pengguna biasa.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
