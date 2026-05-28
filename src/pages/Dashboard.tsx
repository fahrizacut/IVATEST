import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import StatusVaksin from './Statusvaksin'
import Profile from './profile'
import ChangePassword from './changepassword'

type DashboardProps = {
  onLogout: () => void
}

function Dashboard({ onLogout }: DashboardProps) {

  const [menu, setMenu] = useState('dashboard')

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200 text-slate-800">

      {/* BACKGROUND BLUR */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl"></div>

      <div className="relative z-10 flex">

        {/* SIDEBAR */}
        <Sidebar
          onLogout={onLogout}
          menu={menu}
          setMenu={setMenu}
        />

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-8">

          {/* DASHBOARD */}
          {menu === 'dashboard' && (

            <div className="animate-[fadeIn_0.6s_ease]">

              {/* TOPBAR */}
              <div className="mb-8 flex flex-col gap-5 rounded-[35px] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl md:flex-row md:items-center md:justify-between">

                <div>

                  <h1 className="text-4xl font-extrabold text-pink-600 md:text-5xl">
                    Dashboard
                  </h1>

                  <p className="mt-2 text-slate-500">
                    Sistem Cerdas Teknologi dan Informasi Komunikasi IVA
                  </p>

                </div>

                <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-lg">
                  Kecamatan Medan Petisah
                </div>

              </div>

              {/* CARD GRID */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {/* CARD 1 */}
                <div className="group rounded-[35px] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-pink-300">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-100 text-3xl shadow-lg">
                    💉
                  </div>

                  <h3 className="text-lg font-semibold text-slate-500">
                    Total Vaksin
                  </h3>

                  <h1 className="mt-4 text-5xl font-extrabold text-cyan-500 transition duration-300 group-hover:scale-105">
                    1,245
                  </h1>

                  <p className="mt-3 text-slate-500">
                    Data vaksin masyarakat aktif
                  </p>

                </div>

                {/* CARD 2 */}
                <div className="group rounded-[35px] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-pink-300">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-3xl shadow-lg">
                    🎀
                  </div>

                  <h3 className="text-lg font-semibold text-slate-500">
                    Total IVA Test
                  </h3>

                  <h1 className="mt-4 text-5xl font-extrabold text-pink-500 transition duration-300 group-hover:scale-105">
                    532
                  </h1>

                  <p className="mt-3 text-slate-500">
                    Pemeriksaan kesehatan wanita
                  </p>

                </div>

                {/* CARD 3 */}
                <div className="group rounded-[35px] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-pink-300">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-100 text-3xl shadow-lg">
                    📅
                  </div>

                  <h3 className="text-lg font-semibold text-slate-500">
                    Jadwal Aktif
                  </h3>

                  <h1 className="mt-4 text-5xl font-extrabold text-green-500 transition duration-300 group-hover:scale-105">
                    12
                  </h1>

                  <p className="mt-3 text-slate-500">
                    Jadwal pelayanan tersedia
                  </p>

                </div>

              </div>

              {/* INFO PANEL */}
              <div className="mt-8 rounded-[35px] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl">

                <h2 className="text-2xl font-bold text-pink-600">
                  Informasi SICANTIK
                </h2>

                <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
                  SICANTIK merupakan sistem digital pelayanan kesehatan modern
                  yang membantu masyarakat dalam mendapatkan informasi vaksin,
                  pemeriksaan IVA Test, jadwal pelayanan, serta akses kesehatan
                  wanita secara cepat, aman, dan mudah digunakan.
                </p>

              </div>

            </div>

          )}

          {/* STATUS VAKSIN */}
          {menu === 'status-vaksin' && (
            <StatusVaksin />
          )}

          {/* PROFILE */}
          {menu === 'profile' && (
            <Profile />
          )}

          {/* CHANGE PASSWORD */}
          {menu === 'change-password' && (
            <ChangePassword />
          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard