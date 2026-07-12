// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <a href="https://www.instagram.com/balogrenci/"
          target="_blank"
          rel="noopener noreferrer" className="inline-block hover:underline hover:text-gray-900 text-sm text-gray-700 font-semibold">
          © 2025 BAL ID - BAL Öğrenci Derneği
        </a>
        <div className="flex items-center justify-center gap-5 text-sm font-semibold text-gray-700">
          <a href="https://balogrenci.org" className="hover:text-gray-900 hover:underline">
            BALÖDER
          </a>
          <a href="https://balogrenci.org/asistan" className="hover:text-gray-900 hover:underline">
            BAL Asistan
          </a>
        </div>
      </div>
    </footer>
  );
}
