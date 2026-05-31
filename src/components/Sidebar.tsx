import {
  LayoutDashboard,
  ShieldCheck,
  User,
  KeyRound,
} from 'lucide-react'

type SidebarProps = {

  menu: string
  setMenu: (menu: string) => void
  nama: string
}

function Sidebar({
  menu,
  setMenu,
  nama
}: SidebarProps) {

  const menus = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard size={26} />
    },
    {
      id: 'status-IVATest',
      title: 'Status IVATest',
      icon: <ShieldCheck size={26} />
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <User size={26} />
    },
    {
      id: 'tempat-layanan',
      title: 'Tempat Layanan',
      icon: <User size={26} />
    },
    {
      id: 'change-password',
      title: 'Ganti Password',
      icon: <KeyRound size={26} />
    }
  ]

  return (
    <div className="relative w-full border-r border-white/30 bg-white/50 p-5 shadow-2xl backdrop-blur-3xl md:min-h-screen md:w-[340px]">


      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-center text-5xl font-black tracking-wide text-cyan-500 drop-shadow-md md:text-7xl">
          
        </h1>

      </div>

      {/* USER CARD */}
      <div className="mb-10 rounded-[35px] border border-white/40 bg-white/90 p-5 shadow-xl">

        <div className="flex items-center gap-4">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400 text-5xl font-black text-black shadow-lg">
            {nama?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-3xl font-extrabold text-black">
              {nama}
            </h2>

            <p className="text-xl font-semibold text-slate-800">
              Pengguna
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-5">

        {menus.map((item) => (

          <button
            key={item.id}
            onClick={() => setMenu(item.id)}
            className={`flex items-center gap-5 rounded-[30px] px-8 py-7 text-2xl font-bold transition duration-300

              ${menu === item.id
                ? 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white shadow-2xl'
                : 'bg-white/90 text-slate-900 hover:bg-white hover:scale-[1.01]'}
            `}
          >

            {item.icon}

            {item.title}

          </button>

        ))}

      </div>

    </div>
  )
}

export default Sidebar