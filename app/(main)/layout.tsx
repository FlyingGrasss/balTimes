// app/(main)/layout.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}