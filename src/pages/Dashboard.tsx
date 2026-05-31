import { useState, useEffect } from 'react'
import { LogOut } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Status from './Status'
import Profile from './profile'
import ChangePassword from './changepassword'
import TempatLayanan from './tempatlayanan'
import { supabase } from '../lib/supabase'

type DashboardProps = {
  onLogout: () => void
  nama: string
}

function Dashboard({ onLogout, nama }: DashboardProps) {

  const [menu, setMenu] = useState('dashboard')
  const [statusIva, setStatusIva] = useState('belum')
  const [tanggalIva, setTanggalIva] = useState('-')
  
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

      setStatusIva(data?.status_IvaTest || 'belum')
      setTanggalIva(data?.tanggal_IvaTest || '-')
    }


    getUser()
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200 text-slate-800">

      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl"></div>


      <div className="relative z-10 flex flex-col md:flex-row">

        <Sidebar
          menu={menu}
          setMenu={setMenu}
          nama={nama}
        />

        <div className="flex-1 p-4 md:p-8">

          {menu === 'dashboard' && (

            <div>

              {/* HEADER */}
              <div className="mb-8 flex flex-col gap-5 rounded-[35px] border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl md:flex-row md:items-center md:justify-between">

                <div>

                  <h1 className="text-3xl font-extrabold text-pink-600 md:text-5xl">
                    SICANTIK IVA
                  </h1>

                  <p className="mt-2 text-sm font-medium text-slate-600 md:text-base">
                    Sistem Cerdas Teknologi dan Informasi Komunikasi IVA
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                    Kecamatan Medan Petisah
                  </div>

                  <button
                    onClick={onLogout}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-red-600
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:bg-red-600
                      hover:scale-105
                  "
              >
                <LogOut size={11} />
                Logout
              </button>

            </div>

          </div>


              {/* INFO CARD */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="rounded-[30px] bg-white/80 p-6 shadow-xl backdrop-blur-xl">

                  <p className="text-sm font-semibold text-slate-500">
                    Nama Pengguna
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-pink-600">
                    {nama}
                  </h3>

                </div>

                <div className="rounded-[30px] bg-white/80 p-6 shadow-xl backdrop-blur-xl">

                  <p className="text-sm font-semibold text-slate-500">
                    Status IVA Test
                  </p>

                  <h3 
                    className={`mt-3 text-2xl font-bold ${
                      statusIva.toLowerCase() === 'sudah'
                        ? 'text-green-600'
                        : 'text-yellow-500'
                    }`}
                  >
                    {statusIva.toLowerCase() === 'sudah'
                      ? 'Sudah IVA Test'
                      : 'Belum IVA Test'}
                  </h3>

                      
                  {statusIva.toLowerCase() === 'sudah' && (
                    <p className="mt-2 text-sm text-slate-500">
                      {tanggalIva}
                    </p>
                  )}

                </div>  
                <div className="rounded-[30px] bg-white/80 p-6 shadow-xl backdrop-blur-xl">

                  <p className="text-sm font-semibold text-slate-500">
                    Status Akun
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-green-600">
                    Aktif
                  </h3>

                </div>

              </div>

              {/* MENU CEPAT */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                <button
                  onClick={() => setMenu('status-IVATest')}
                  className="rounded-[30px] bg-gradient-to-r from-pink-500 to-fuchsia-500 p-6 text-left text-white shadow-xl transition hover:scale-[1.02]"
                >

                  <h3 className="text-xl font-bold">
                    Status IVA Test
                  </h3>

                  <p className="mt-2 text-sm">
                    Lihat status pemeriksaan IVA Test
                  </p>

                </button>

                <button
                  onClick={() => setMenu('profile')}
                  className="rounded-[30px] bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-left text-white shadow-xl transition hover:scale-[1.02]"
                >

                  <h3 className="text-xl font-bold">
                    Profil Saya
                  </h3>

                  <p className="mt-2 text-sm">
                    Kelola data pribadi pengguna
                  </p>

                </button>

                <button
                  onClick={() => setMenu('change-password')}
                  className="rounded-[30px] bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-left text-white shadow-xl transition hover:scale-[1.02]"
                >

                  <h3 className="text-xl font-bold">
                    Ganti Password
                  </h3>

                  <p className="mt-2 text-sm">
                    Ubah password akun Anda
                  </p>

                </button>

              </div>

              {/* FOTO */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <div className="overflow-hidden rounded-[35px] bg-white/80 shadow-2xl backdrop-blur-2xl">

                  <img
                    src="/Kegiatan 1 (1).jpeg"
                    alt="IVA Test"
                    className="h-[350px] w-full object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold text-pink-600">
                      Kegiatan IVA Test
                    </h2>

                    <p className="mt-3 text-slate-700">
                      Pelayanan pemeriksaan IVA Test bersama masyarakat
                      untuk meningkatkan kesehatan wanita di Kecamatan
                      Medan Petisah.
                    </p>

                  </div>

                </div>

                <div className="overflow-hidden rounded-[35px] bg-white/80 shadow-2xl backdrop-blur-2xl">

                  <img
                    src="/Pelayanan 1.jpeg"
                    alt="Pelayanan"
                    className="h-[350px] w-full object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold text-cyan-600">
                      Pelayanan Kesehatan
                    </h2>

                    <p className="mt-3 text-slate-700">
                      Kegiatan pelayanan kesehatan dan edukasi masyarakat
                      secara langsung kepada warga.
                    </p>

                  </div>

                </div>

              </div>

              {/* INFORMASI */}
              <div className="mt-8 rounded-[35px] bg-white/80 p-6 shadow-2xl backdrop-blur-2xl">

                <h2 className="text-2xl font-bold text-pink-600">
                  Informasi SICANTIK IVA
                </h2>

                <p className="mt-4 leading-relaxed text-slate-700">

                  SICANTIK IVA merupakan sistem digital pelayanan kesehatan
                  wanita yang membantu masyarakat memperoleh informasi,
                  status pemeriksaan IVA Test, hasil pemeriksaan, dan
                  layanan kesehatan secara cepat, aman, dan modern.

                </p>

              </div>

            </div>

          )}

          {menu === 'status-IVATest' && <Status />}

          {menu === 'profile' && <Profile />}

          {menu === 'change-password' && <ChangePassword />}

          {menu === 'tempat-layanan' && <TempatLayanan />}

        </div>

      </div>

    </div>
  )
}

export default Dashboard