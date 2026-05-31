import { useState } from 'react'
import { supabase } from '../lib/supabase'

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Semua field wajib diisi')
      return
    }

    if (newPassword.length < 6) {
      alert('Password baru minimal 6 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok')
      return
    }

    const nik = localStorage.getItem('nik')

    const { data, error } = await supabase
      .from('users1')
      .select('*')
      .eq('nik', nik)
      .single()

    if (error) {
      alert('Terjadi error')
      console.log(error)
      return
    }

    if (data.password !== oldPassword) {
      alert('Password lama salah')
      return
    }

    const { error: updateError } = await supabase
      .from('users1')
      .update({
        password: newPassword,
      })
      .eq('nik', nik)

    if (updateError) {
      alert('Gagal mengganti password')
      console.log(updateError)
      return
    }

    alert('Password berhasil diganti')

    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')

  }

  return (
    <div className="flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl rounded-[35px] border border-white/40 bg-white/85 p-6 shadow-2xl backdrop-blur-2xl md:p-10">

        {/* TITLE */}
        <h1 className="mb-10 text-center text-3xl font-extrabold text-pink-600 md:text-5xl">
          Ganti Password
        </h1>

        {/* FORM */}
        <div className="space-y-5">

          {/* PASSWORD LAMA */}
          <input
            type="password"
            placeholder="Masukkan Password Lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-4 text-lg font-medium text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          {/* PASSWORD BARU */}
          <input
            type="password"
            placeholder="Masukkan Password Baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-4 text-lg font-medium text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          {/* KONFIRMASI PASSWORD */}
          <input
            type="password"
            placeholder="Konfirmasi Password Baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-4 text-lg font-medium text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          {/* BUTTON */}
          <button
            onClick={handleChangePassword}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 py-4 text-lg font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-sky-600"
          >
            Simpan Password
          </button>

        </div>

      </div>

    </div>
  )
}

export default ChangePassword