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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 text-white">

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar
          onLogout={onLogout}
          menu={menu}
          setMenu={setMenu}
        />

        {/* CONTENT */}
        <div className="flex-1 p-6">

          {/* DASHBOARD */}
          {menu === 'dashboard' && (

            <div>

              {/* TOPBAR */}
              <div className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                <div>
                  <h2 className="text-3xl font-bold">
                    Dashboard
                  </h2>

                  <p className="mt-1 text-slate-200">
                    Sistem Informasi Vaksin & IVA Test
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-500/20 px-4 py-2">
                  Kecamatan Medan Petisah
                </div>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition hover:scale-[1.02]">

                  <h3 className="text-lg text-slate-200">
                    Total Vaksin
                  </h3>

                  <h1 className="mt-4 text-5xl font-bold text-cyan-300">
                    1,245
                  </h1>

                  <p className="mt-2 text-slate-300">
                    Data vaksin masyarakat
                  </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition hover:scale-[1.02]">

                  <h3 className="text-lg text-slate-200">
                    Total IVA Test
                  </h3>

                  <h1 className="mt-4 text-5xl font-bold text-pink-300">
                    532
                  </h1>

                  <p className="mt-2 text-slate-300">
                    Pemeriksaan kesehatan wanita
                  </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition hover:scale-[1.02]">

                  <h3 className="text-lg text-slate-200">
                    Jadwal Aktif
                  </h3>

                  <h1 className="mt-4 text-5xl font-bold text-green-300">
                    12
                  </h1>

                  <p className="mt-2 text-slate-300">
                    Jadwal pelayanan aktif
                  </p>

                </div>

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