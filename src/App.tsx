import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(false)

  // AUTO LOGIN
  useEffect(() => {
    const savedNik = localStorage.getItem('nik')

    if (savedNik) {
      setIsLogin(true)
    }
  }, [])

  // REGISTER
  const handleRegister = async () => {

    if (
      !nama.trim() ||
      !nik.trim() ||
      !email.trim() ||
      !nohp.trim() ||
      !password.trim()
    ) {
      alert('Semua data wajib diisi')
      return
    }

    if (nama.trim().length < 3) {
      alert('Nama terlalu pendek')
      return
    }

    if (!/^\d+$/.test(nik)) {
      alert('NIK hanya boleh angka')
      return
    }

    if (nik.length !== 16) {
      alert('NIK harus 16 digit')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Format email tidak valid')
      return
    }

    if (!/^\d+$/.test(nohp)) {
      alert('Nomor HP hanya boleh angka')
      return
    }

    if (nohp.length < 10) {
      alert('Nomor HP tidak valid')
      return
    }

    if (password.trim().length < 6) {
      alert('Password minimal 6 karakter')
      return
    }

    try {

      setLoading(true)

      const { data: cekNik } = await supabase
        .from('users1')
        .select('nik')
        .eq('nik', nik)

      if (cekNik && cekNik.length > 0) {
        alert('NIK sudah terdaftar')
        setLoading(false)
        return
      }

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

        setNama('')
        setNik('')
        setEmail('')
        setNohp('')
        setPassword('')
      }

    } catch (error) {

      console.log(error)
      alert('Terjadi kesalahan')

    } finally {

      setLoading(false)
    }
  }

  // LOGIN
  const handleLogin = async () => {

    if (
      !loginNik.trim() ||
      !loginPassword.trim()
    ) {
      alert('NIK dan Password wajib diisi')
      return
    }

    try {

      setLoading(true)

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

      if (data && data.length > 0) {

        localStorage.setItem('nik', data[0].nik)

        setIsLogin(true)

      } else {

        alert('NIK atau Password salah')
      }

    } catch (error) {

      console.log(error)
      alert('Terjadi kesalahan')

    } finally {

      setLoading(false)
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200 text-slate-800">

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes floating {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes slideText {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fadeUp {
            animation: fadeUp 1s ease;
          }

          .animate-floating {
            animation: floating 3s ease-in-out infinite;
          }

          .animate-slideText {
            animation: slideText 1.2s ease;
          }
        `}
      </style>

      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl"></div>

      {/* CONTAINER */}
      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 items-center gap-10 px-4 py-6 lg:grid-cols-2 lg:px-10">

        {/* LEFT */}
        <div className="relative flex flex-col justify-center">

          {/* TOP AREA */}
          <div className="mb-10 flex flex-col gap-6 animate-fadeUp">

            {/* LOGO */}
            <div className="flex items-center gap-4">

              <img
                src="/logo_pemko.png"
                alt="Logo Pemko"
                className="h-16 w-auto object-contain drop-shadow-xl md:h-20 animate-floating"
              />

              <img
                src="/logo_pkk.png"
                alt="Logo PKK"
                className="h-16 w-auto object-contain drop-shadow-xl md:h-20 animate-floating"
              />

            </div>

            {/* BADGE */}
            <div className="inline-flex w-fit rounded-full border border-pink-300 bg-white/70 px-5 py-2 shadow-md backdrop-blur-md">

              <span className="text-sm font-semibold text-pink-700">
                Pelayanan Kesehatan Digital
              </span>

            </div>

          </div>

          {/* TEXT */}
          <div className="space-y-6 animate-slideText">

            <div>

              <h1 className="text-5xl font-extrabold leading-tight text-pink-500 sm:text-6xl md:text-7xl">
                SICANTIK
              </h1>

              <span className="mt-2 block max-w-2xl text-2xl font-bold leading-tight text-fuchsia-500 sm:text-3xl md:text-5xl">
                Sistem Cerdas Teknologi dan Informasi Komunikasi IVA
              </span>

            </div>

            <h2 className="text-xl font-bold text-pink-500 md:text-2xl">
              Kecamatan Medan Petisah
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg animate-fadeUp">

              Tes IVA (Inspeksi Visual dengan Asam Asetat) hadir sebagai solusi pemeriksaan dini 
              kanker serviks yang cepat, aman, dan efektif. Dengan proses sederhana serta biaya 
              yang terjangkau, layanan ini membantu meningkatkan kesadaran dan perlindungan
              kesehatan wanita secara lebih mudah dan modern.

            </p>

            {/* CARD INFO */}
            <div className="mt-8 grid max-w-md grid-cols-2 gap-4 animate-fadeUp">

              <div className="rounded-2xl bg-white/60 p-4 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-2">

                <h3 className="text-2xl font-bold text-pink-600">
                  24 Jam
                </h3>

                <p className="text-sm text-slate-600">
                  Akses Pelayanan
                </p>

              </div>

              <div className="rounded-2xl bg-white/60 p-4 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-2">

                <h3 className="text-2xl font-bold text-fuchsia-600">
                  Online
                </h3>

                <p className="text-sm text-slate-600">
                  Sistem Digital
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center animate-fadeUp">

          <div className="w-full max-w-md rounded-[35px] border border-white/40 bg-white/70 p-5 shadow-2xl backdrop-blur-2xl transition duration-500 hover:scale-[1.01] sm:p-8">

            {/* HEADER */}
            <div className="mb-8 text-center">

              <div className="mx-auto mb-5 flex items-center justify-center">

                <img
                  src="/iva.png"
                  alt="Ribbon IVA"
                  className="h-24 w-24 object-contain drop-shadow-xl md:h-28 md:w-28 animate-floating"
                />

              </div>

              <h2 className="text-3xl font-extrabold text-pink-600">
                Portal SICANTIK
              </h2>

              <p className="mt-2 text-slate-500">
                Login atau daftar akun terlebih dahulu
              </p>

            </div>

            {/* LOGIN */}
            <div className="mb-10">

              <h3 className="mb-5 text-xl font-bold text-fuchsia-600">
                Login
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan NIK"
                  value={loginNik}
                  onChange={(e) => setLoginNik(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="password"
                  placeholder="Masukkan Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin()
                    }
                  }}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Masuk'}
                </button>

              </div>

            </div>

            {/* REGISTER */}
            <div className="animate-fadeUp">

              <h3 className="mb-5 text-xl font-bold text-pink-600">
                Daftar Akun
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan Nomor HP"
                  value={nohp}
                  onChange={(e) => setNohp(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="password"
                  placeholder="Buat Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-pink-300 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Daftar Sekarang'}
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