'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  const redireccionar = () => {
    router.push('/inicio_sesion') //redirec
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {redireccionar()}
    </main>
  )
}
