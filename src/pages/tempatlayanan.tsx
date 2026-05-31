function TempatLayanan() {

  const nomorAdmin = '082366676236'

  const daftarIva = (puskesmas: string) => {

    const nama = localStorage.getItem('nama') || ''
    const nik = localStorage.getItem('nik') || ''

    const pesan = `
Halo Admin SICANTIK IVA

Nama : ${nama}
NIK : ${nik}

Saya ingin mendaftar IVA Test di ${puskesmas}.
`

    window.open(
      `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`,
      '_blank'
    )
  }

  return (
    <div className="rounded-[35px] bg-white/80 p-8 shadow-2xl">

      <h1 className="text-4xl font-bold text-pink-600">
        Tempat Layanan IVA Test
      </h1>

      <p className="mt-3 text-slate-600">
        Daftar lokasi pelayanan IVA Test yang tersedia di Kecamatan Medan Petisah.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* DARUSSALAM */}
        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-bold text-pink-600">
            Puskesmas Darussalam
          </h2>

          <p className="mt-3 text-slate-700">
            Jl. Darussalam No.40, Sei Sikambing D, Kec. Medan Petisah,
            Kota Medan, Sumatera Utara 20153
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p><b>Jadwal:</b> Jumat</p>
            <p><b>Jam:</b> 09:00 - 12:00 WIB</p>
          </div>

          <button
            onClick={() => daftarIva('Puskesmas Darussalam')}
            className="
              mt-5
              w-full
              rounded-xl
              bg-gradient-to-r
              from-pink-500
              to-fuchsia-500
              py-3
              font-semibold
              text-white
              transition
              hover:scale-105
            "
          >
            Daftar IVA Test
          </button>
        </div>

        {/* RANTANG */}
        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-bold text-cyan-600">
            Puskesmas Rantang
          </h2>

          <p className="mt-3 text-slate-700">
            Jl. Rantang No.37, Sei Putih Tengah, Kec. Medan Petisah,
            Kota Medan, Sumatera Utara 20118
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p><b>Jadwal:</b> Jumat</p>
            <p><b>Jam:</b> 09:00 - 12:00 WIB</p>
          </div>

          <button
            onClick={() => daftarIva('Puskesmas Rantang')}
            className="
              mt-5
              w-full
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              py-3
              font-semibold
              text-white
              transition
              hover:scale-105
            "
          >
            Daftar IVA Test
          </button>
        </div>

        {/* BESTARI */}
        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-bold text-blue-600">
            Puskesmas Bestari
          </h2>

          <p className="mt-3 text-slate-700">
            Jl. Rotan No.1, Petisah Tengah, Kec. Medan Petisah,
            Kota Medan, Sumatera Utara 20111
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p><b>Jadwal:</b> Jumat</p>
            <p><b>Jam:</b> 09:00 - 12:00 WIB</p>
          </div>

          <button
            onClick={() => daftarIva('Puskesmas Bestari')}
            className="
              mt-5
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              py-3
              font-semibold
              text-white
              transition
              hover:scale-105
            "
          >
            Daftar IVA Test
          </button>
        </div>

      </div>

    </div>
  )
}

export default TempatLayanan