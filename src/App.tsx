import { useState } from 'react'
import { supabase } from './lib/supabase'
import Dashboard from './pages/Dashboard'

function App() {

  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [email, setEmail] = useState('')
  const [nohp, setNohp] = useState('')
  const [password, setPassword] = useState('')

  const [loginNik, setLoginNik] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [isLogin, setIsLogin] = useState(false)

  // REGISTER
  const handleRegister = async () => {

    const { error } = await supabase
      .from('users1')
      .insert([
        {
          nama,
          nik,
          email,
          nohp,
          password,
          status_vaksin: 'belum',
        },
      ])

    if (error) {
      alert('Gagal daftar')
      console.log(error)
    } else {
      alert('Pendaftaran berhasil')
    }
  }

  // LOGIN
  const handleLogin = async () => {

    const { data, error } = await supabase
      .from('users1')
      .select('*')
      .eq('nik', loginNik)
      .eq('password', loginPassword)

    if (error) {
      alert('Terjadi error')
      console.log(error)
      return
    }

    if (data.length > 0) {

      localStorage.setItem('nik', data[0].nik)

      setIsLogin(true)

    } else {
      alert('NIK atau Password salah')
    }
  }

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem('nik')

    setIsLogin(false)
  }

  // DASHBOARD
  if (isLogin) {
    return (
      <Dashboard onLogout={handleLogout} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-cyan-200 text-slate-800">

      <div className="container mx-auto grid min-h-screen grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2">

        {/* LEFT */}
        <div className="space-y-100">

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <img
              src="/logo_pemko.png"
              alt="Logo Pemko"
              className="h-30 w-auto object-contain"
            />

            <img
              src="/logo_pkk.png"
              alt="Logo PKK"
              className="h-29 w-auto object-contain"
            />

          </div>

          <div className="space-y-5">

            <div className="inline-flex rounded-full border border-cyan-300 bg-white/40 px-4 py-2 backdrop-blur-md">
              <span className="text-sm font-medium text-cyan-700">
                Layanan Digital Kesehatan
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-pink-400 md:text-6xl">
              SICANTIK
              <span className="block text-cyan-600">
                 iva test
              </span>
            </h1>

            <h2 className="text-2xl font-semibold text-sky-700">
              Kecamatan Medan Petisah
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Platform pelayanan kesehatan masyarakat untuk pendataan vaksin
              dan pemeriksaan IVA Test secara modern, cepat, aman, dan mudah
              digunakan oleh masyarakat Kecamatan Medan Petisah.
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 text-slate-800 shadow-2xl backdrop-blur-xl">

            <div className="mb-8 text-center">

              <h2 className="text-3xl font-bold text-slate-800">
                Portal Layanan
              </h2>

              <p className="mt-2 text-slate-500">
                Silakan login atau daftar akun
              </p>

            </div>

            {/* LOGIN */}
            <div className="mb-10">

              <h3 className="mb-5 text-xl font-semibold text-cyan-700">
                Login
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Masukkan NIK"
                  value={loginNik}
                  onChange={(e) => setLoginNik(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
                />

                <input
                  type="password"
                  placeholder="Masukkan Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
                />

                <button
                  onClick={handleLogin}
                  className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-cyan-600"
                >
                  Masuk
                </button>

              </div>

            </div>

            {/* REGISTER */}
            <div>

              <h3 className="mb-5 text-xl font-semibold text-blue-700">
                Daftar
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />

                <input
                  type="text"
                  placeholder="Masukkan NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />

                <input
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />

                <input
                  type="text"
                  placeholder="Masukkan Nomor HP"
                  value={nohp}
                  onChange={(e) => setNohp(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />

                <input
                  type="password"
                  placeholder="Buat Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />

                <button
                  onClick={handleRegister}
                  className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-blue-700"
                >
                  Daftar
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App