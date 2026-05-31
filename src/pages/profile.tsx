import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Profile() {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    const getUser = async () => {

      const nik = localStorage.getItem('nik')

      if (!nik) return

      const { data, error } = await supabase
        .from('users1')
        .select('*')
        .eq('nik', nik)
        .single()

      if (error) {
        console.log(error)
        return
      }

      setUser(data)

    }

    getUser()

  }, [])

  if (!user) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-slate-700">
        Loading...
      </div>
    )
  }

  const status = user.status_IvaTest || 'belum'
  const tanggal = user.tanggal_IvaTest || '-'

  return (
    <div className="flex justify-center px-4 py-10">

      <div className="w-full max-w-3xl rounded-[35px] border border-white/40 bg-white/85 p-8 shadow-2xl backdrop-blur-2xl md:p-10">

        <h1 className="mb-10 text-center text-4xl font-extrabold text-pink-600 md:text-5xl">
          Profil Pengguna
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              Nama Lengkap
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-600">
              {user.nama}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              NIK
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-600">
              {user.nik}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              Email
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold text-cyan-600">
              {user.email}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              Nomor HP
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-600">
              {user.nohp}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              Status IVA Test
            </p>

            <h2
              className={`mt-2 text-2xl font-bold ${
                status.toLowerCase() === 'sudah'
                  ? 'text-green-600'
                  : 'text-yellow-500'
              }`}
            >
              {status.toLowerCase() === 'sudah'
                ? 'Sudah IVA Test'
                : 'Belum IVA Test'}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-slate-500">
              Tanggal melakukan IVA Test
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-600">
              {tanggal}
            </h2>
          </div>

        </div>

        {status.toLowerCase() === 'sudah' && (

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="text-2xl font-bold text-pink-600">
              Sertifikat IVA Test
            </h2>

            <p className="mt-3 text-slate-600">
              Selamat, Anda telah menyelesaikan pemeriksaan IVA Test.
              Sertifikat dapat diunduh melalui tombol berikut.
            </p>

            <a
              href="/sertifikat-iva.pdf"
              download
              className="
                mt-5
                inline-flex
                items-center
                rounded-xl
                bg-gradient-to-r
                from-pink-500
                to-fuchsia-500
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Download Sertifikat
            </a>

          </div>

        )}

      </div>

    </div>
  )
}

export default Profile