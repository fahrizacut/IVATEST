import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Status() {
  const [status, setStatus] = useState('belum')
  const [tanggal, setTanggal] = useState('-')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStatus = async () => {
      try {
        const nik = localStorage.getItem('nik')

        if (!nik) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('users1')
          .select('*')
          .eq('nik', nik)
          .single()

        if (error) {
          console.log(error)
          return
        }

        console.log(data)

        const statusDb = String(
          data?.status_IvaTest || 'belum'
        ).toLowerCase()

        setStatus(statusDb)

        if (data?.tanggal_IvaTest) {
          const tanggalBaru = new Date(data.tanggal_IvaTest)

          setTanggal(
            tanggalBaru.toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          )
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getStatus()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="rounded-3xl bg-white p-6 shadow-xl">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[35px] bg-white/90 p-8 shadow-2xl">

        <h1 className="mb-8 text-center text-4xl font-extrabold text-pink-600">
          Status IVA Test
        </h1>

        {status === 'sudah' ? (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-lg">

            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-green-100 px-6 py-3 text-lg font-bold text-green-700">
                ✅ Sudah IVA Test
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl bg-green-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Status Pemeriksaan
                </p>

                <h2 className="mt-2 text-xl font-bold text-green-700">
                  Sudah IVA Test
                </h2>
              </div>

              <div className="rounded-2xl bg-cyan-100 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Tanggal IVA Test
                </p>

                <h2 className="mt-2 text-xl font-bold text-cyan-700">
                  {tanggal}
                </h2>
              </div>

            </div>

          </div>
        ) : (
          <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-8 shadow-lg">

            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-yellow-100 px-6 py-3 text-lg font-bold text-yellow-700">
                ⚠ Belum IVA Test
              </span>
            </div>

            <p className="text-center text-lg text-slate-700">
              Anda belum terdaftar sebagai peserta IVA Test.
            </p>

          </div>
        )}

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          <p className="text-center text-slate-600">
            Informasi status IVA Test akan diperbarui oleh petugas kesehatan
            setelah proses pemeriksaan dilakukan.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Status