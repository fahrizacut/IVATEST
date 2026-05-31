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

  const [userNama, setUserNama] = useState('')

  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  // AUTO LOGIN
  useEffect(() => {

    const savedNik = localStorage.getItem('nik')
    const savedNama = localStorage.getItem('nama')

    if (savedNik && savedNama) {

      setUserNama(savedNama)
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

  if (nik.length !== 16) {
    alert('NIK harus 16 digit')
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
      return
    }

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
      })

      console.log('AUTH DATA:', authData)
      console.log('AUTH ERROR:', authError)

    if (authError) {
      alert(authError.message)
      return
    }

    const authId = authData.user?.id

    const { error } = await supabase
      .from('users1')
      .insert([
        {
          auth_id: authId,
          nama,
          nik,
          email,
          nohp,
          status_IVATest: 'belum',
        },
      ])

    if (error) {
      console.log(error)
      alert('Gagal daftar')
      return
    }

    alert('Pendaftaran berhasil')

    setNama('')
    setNik('')
    setEmail('')
    setNohp('')
    setPassword('')
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

    const { data: userData, error: userError } =
      await supabase
        .from('users1')
       .select('*')
       .eq('nik', loginNik)
       .single()

    console.log('USER DATA:', userData)
    console.log('USER ERROR:', userError)

    if (userError || !userData) {
      alert('NIK tidak ditemukan')
      return
    }

    const { error } = 
    await supabase.auth.signInWithPassword({
      email: userData.email,
      password: loginPassword,
    })

    console.log('EMAIL:', userData.email)
    console.log('PASSWORD:', loginPassword)
    console.log('LOGIN ERROR:', error)

    if (error) {
      alert(error.message)
      return
    }
      

        localStorage.setItem('nik', userData.nik)
        localStorage.setItem('nama', userData.nama)

        setUserNama(userData.nama)

        setIsLogin(true)


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
    localStorage.removeItem('nama')

    setIsLogin(false)

  }

  // DASHBOARD
  if (isLogin) {

    return (
      <Dashboard
        onLogout={handleLogout}
        nama={userNama}
      />
    )

  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-200 text-slate-800">

      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl"></div>

      {/* CONTAINER */}
      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 items-center gap-10 px-4 py-6 lg:grid-cols-2 lg:px-10">

        {/* LEFT */}
        <div className="relative flex flex-col justify-center">

          <div className="space-y-6">

            <div>

              <h1 className="text-5xl font-extrabold leading-tight text-pink-500 sm:text-6xl md:text-7xl">
                SICANTIK IVA
              </h1>

              <span className="mt-2 block max-w-2xl text-2xl font-bold leading-tight text-fuchsia-500 sm:text-3xl md:text-5xl">
                Sistem Cerdas Teknologi dan Informasi Komunikasi IVA
              </span>

            </div>

            <h2 className="text-xl font-bold text-pink-500 md:text-2xl">
              Kecamatan Medan Petisah
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">

              Tes IVA hadir sebagai solusi pemeriksaan dini kanker serviks
              yang cepat, aman, efektif, dan modern untuk kesehatan wanita.

            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-[35px] border border-white/40 bg-white/70 p-5 shadow-2xl backdrop-blur-2xl sm:p-8">

            {/* HEADER */}
            <div className="mb-8 text-center">

              <h2 className="text-3xl font-extrabold text-pink-600">
                Portal SICANTIK IVA
              </h2>

              <p className="mt-2 text-slate-600">
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
                  autoComplete="new-password"
                  inputMode="numeric"
                  placeholder="Masukkan NIK"
                  value={loginNik}
                  onChange={(e) => setLoginNik(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Masukkan Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin()
                    }
                  }}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Masuk'}
                </button>

                {/* LUPA PASSWORD */}
                <button
                  onClick={async () => {

                    if (!loginNik.trim()) {
                      alert('Masukkan NIK terlebih dahulu')
                      return
                    }

                    try {

                      const { data, error } = await supabase
                        .from('users1')
                        .select('email')
                        .eq('nik', loginNik)
                        .single()

                      if (error || !data) {
                        alert('NIK tidak ditemukan')
                        return
                      }

                      const { error: resetError } =
                        await supabase.auth.resetPasswordForEmail(
                          data.email,
                          {
                            redirectTo: 'http://localhost:5173/reset-password',
                          }
                        )

                      if (resetError) {
                        console.log(resetError)
                        alert('Gagal mengirim email reset password')
                        return
                      }

                      alert('Link reset password berhasil dikirim ke email')

                    } catch (err) {

                      console.log(err)
                      alert('Terjadi kesalahan')

                    }

                  }}
                  className="w-full text-center text-sm font-semibold text-cyan-600 transition duration-300 hover:text-cyan-800 hover:underline"
                >
                  Lupa Password?
                </button>

              </div>

            </div>

            {/* REGISTER */}
            <div>

              <h3 className="mb-5 text-xl font-bold text-pink-600">
                Daftar Akun
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan Nomor HP"
                  value={nohp}
                  onChange={(e) => setNohp(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="password"
                  placeholder="Buat Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-slate-800 outline-none transition duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
                />

                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] disabled:opacity-50"
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