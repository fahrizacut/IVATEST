import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {

    try {

      setLoading(true)

      const { error } =
        await supabase.auth.updateUser({
          password,
        })

      if (error) {
        alert(error.message)
        return
      }

      alert('Password berhasil diubah')

      window.location.href = '/'

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Password Baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          {loading ? 'Loading...' : 'Simpan Password'}
        </button>

      </div>

    </div>
  )
}