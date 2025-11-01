// components/Footer.tsx

"use client"

export default function Footer() {
  const isStudioPage =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/studio')

  if (isStudioPage) return <></>  
  return (
    <footer className="border-t border-gray-200 py-4 bg-gray-50">
      <div className="text-center">
        <p className="text-sm text-gray-700 font-semibold">
          © 2025 BAL Times - Bornova Anadolu Lisesi
        </p>
        
      </div>
    </footer>
  )
}