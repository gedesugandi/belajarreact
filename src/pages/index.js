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
        <h1 className="text-2xl font-semibold mb-4">Selamat datang di Tools Website</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/cloaking-checker" className="text-blue-600 hover:underline">
              🔍 Cek Cloaking Website
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}
