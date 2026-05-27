import { useState } from 'react'

type SidebarProps = {
  onLogout: () => void
  menu: string
  setMenu: (menu: string) => void
}

function Sidebar({
  onLogout,
  menu,
  setMenu,
}: SidebarProps) {

  const [open, setOpen] = useState(false)

  return (
    <div className="hidden min-h-screen w-72 border-r border-white/10 bg-white/10 p-6 backdrop-blur-xl lg:block">

      {/* LOGO */}
      <h1 className="mb-8 text-5xl font-bold tracking-wide text-cyan-300">
        IVATEST
      </h1>

      {/* PROFILE */}
      <div className="relative mb-10">

        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/20"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-xl font-bold text-slate-900">
              P
            </div>

            <div className="text-left">
              <h2 className="font-semibold text-white">
                Pengguna
              </h2>

              <p className="text-sm text-slate-300">
                Sistem Kesehatan
              </p>
            </div>

          </div>

          <span className="text-white">
            ▼
          </span>

        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl">

            <button
              onClick={() => {
                setMenu('profile')
                setOpen(false)
              }}
              className="mb-2 w-full rounded-2xl px-4 py-3 text-left text-white transition hover:bg-white/10"
            >
              Profil Pengguna
            </button>

            <button
              onClick={() => {
                setMenu('change-password')
                setOpen(false)
              }}
              className="mb-2 w-full rounded-2xl px-4 py-3 text-left text-white transition hover:bg-white/10"
            >
              Ganti Password
            </button>

            <button
              onClick={onLogout}
              className="w-full rounded-2xl bg-red-500/20 px-4 py-3 text-left text-red-200 transition hover:bg-red-500/30"
            >
              Logout
            </button>

          </div>
        )}

      </div>

      {/* MENU */}
      <div className="space-y-4">

        {/* DASHBOARD */}
        <button
          onClick={() => setMenu('dashboard')}
          className={`w-full rounded-2xl px-4 py-3 text-left text-white transition ${
            menu === 'dashboard'
              ? 'bg-cyan-500/20'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Dashboard
        </button>

        {/* STATUS VAKSIN */}
        <button
          onClick={() => setMenu('status-vaksin')}
          className={`w-full rounded-2xl px-4 py-3 text-left text-white transition ${
            menu === 'status-vaksin'
              ? 'bg-cyan-500/20'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Status Vaksin
        </button>

        {/* IVA TEST */}
        <button className="w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/10">
          IVA Test
        </button>

        {/* JADWAL */}
        <button className="w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/10">
          Jadwal
        </button>

      </div>

    </div>
  )
}

export default Sidebar