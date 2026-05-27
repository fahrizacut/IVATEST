import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function StatusVaksin() {

  const [status, setStatus] = useState('belum')
  const [tanggal, setTanggal] = useState('')

  useEffect(() => {

    const getStatus = async () => {

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

      // STATUS
      if (
        data.status_vaksin === 'sudah' ||
        data.status_vaksin === 'Sudah'
      ) {
        setStatus('sudah')
      } else {
        setStatus('belum')
      }

      // TANGGAL
      if (data.tanggal_vaksin) {
        setTanggal(data.tanggal_vaksin)
      }

    }

    getStatus()

  }, [])

  return (
    <div className="flex items-center justify-center py-10">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Status Vaksin
        </h1>

        {status === 'sudah' ? (

          <div className="rounded-3xl border border-green-400/20 bg-green-500/10 p-8 text-center">

            <h2 className="text-3xl font-bold text-green-300">
              ✅ Anda Sudah Vaksin
            </h2>

            <p className="mt-4 text-lg text-slate-200">
              Data vaksinasi Anda telah terdaftar
              pada sistem Kecamatan Medan Petisah.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">

              <p className="text-slate-300">
                Tanggal Vaksin
              </p>

              <h3 className="mt-2 text-2xl font-bold text-cyan-300">
                {tanggal || '-'}
              </h3>

            </div>

          </div>

        ) : (

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-8 text-center">

            <h2 className="text-3xl font-bold text-yellow-300">
              ⚠ Anda Belum Melakukan Vaksinasi
            </h2>

            <p className="mt-4 text-lg text-slate-200">
              Berdasarkan data sistem Kecamatan Medan Petisah,
              Anda belum terdaftar sebagai peserta vaksinasi.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default StatusVaksin