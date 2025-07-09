import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <>
      <header className="bg-gray-50">
        <div className="container px-5 md:px-20 lg:px-20 mx-auto flex flex-row items-center justify-between py-5">
            <div className="text-xl font-bold">
                <Link href="/" className="flex items-center">
                    <Image src="/toolsbedahditital.svg" alt="Logo" width={120} height={120} className="inline-block mr-2" />
                </Link>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/cloaking-checker" className="hover:underline">Cek Cloaking</Link>
                    </li>
                    <li>
                        <Link href="https://bedahdigital.com/" className="hover:underline">Blog</Link>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
      <main className="container px-5 md:px-20 lg:px-20 mx-auto min-h-screen">{children}</main>
      <footer className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} BedahDigital Tools
      </footer>
    </>
  );
}
