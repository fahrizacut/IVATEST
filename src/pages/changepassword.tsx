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
    <div className="flex justify-center py-10">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Ganti Password
        </h1>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Masukkan Password Lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          <input
            type="password"
            placeholder="Masukkan Password Baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password Baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-slate-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
          />

          <button
            onClick={handleChangePassword}
            className="w-full rounded-2xl bg-cyan-500 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-cyan-600"
          >
            Simpan Password
          </button>

          <div className="pt-4 text-center">

            <button
              className="text-cyan-300 transition hover:text-cyan-200"
              onClick={() =>
                alert(
                  'Silakan hubungi petugas Kecamatan Medan Petisah untuk reset password.'
                )
              }
            >
              Lupa Password?
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ChangePassword