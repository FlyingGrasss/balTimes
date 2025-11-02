// components/Navbar.tsx
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {

  const pathname = usePathname()
  const isStudioPage = pathname.startsWith('/studio')


  if (isStudioPage) return 

  return (
    <nav
      className={`top-0 mx-20 max-sm:mx-0 left-0 right-0 z-50 bg-white border-b border-black transition-transform max-sm:shadow-sm max-sm:border-none duration-500`}
    >
      <div className=" mx-auto px-6 py-4 max-sm:mx-0 max-sm:px-4 flex justify-center max-sm:border-none border-b border-black mb-1 items-center">
          <Link href="/" className="w-fit">
            <Image
              src="/bornovaAnadoluTimes.png"
              alt="BAL"
              width={900}
              height={40}
              className="h-16 w-auto max-sm:h-[26px]"
            />
          </Link>
      </div>
    </nav>
  )
}