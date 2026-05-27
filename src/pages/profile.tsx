import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Profile() {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    const getUser = async () => {

      const nik = localStorage.getItem('nik')

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
      <div className="p-10 text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex justify-center py-10">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">

        <h1 className="mb-10 text-center text-4xl font-bold text-white">
          Profil Pengguna
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">Nama Lengkap</p>
            <h2 className="mt-2 text-2xl font-bold text-cyan-300">
              {user.nama}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">NIK</p>
            <h2 className="mt-2 text-2xl font-bold text-cyan-300">
              {user.nik}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">Email</p>
            <h2 className="mt-2 text-2xl font-bold text-cyan-300">
              {user.email}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">Nomor HP</p>
            <h2 className="mt-2 text-2xl font-bold text-cyan-300">
              {user.nohp}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">Status Vaksin</p>

            <h2
              className={`mt-2 text-2xl font-bold ${
                (user.status_vaksin || 'belum') === 'sudah'
                  ? 'text-green-300'
                  : 'text-yellow-300'
              }`}
            >
              {user.status_vaksin || 'belum'}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-slate-300">Tanggal Vaksin</p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-300">
              {user.tanggal_vaksin || '-'}
            </h2>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile