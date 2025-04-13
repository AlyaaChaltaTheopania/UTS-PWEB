import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBookQuran,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-[#213555] bg-opacity-90 text-white px-6 py-4 shadow-md flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="Logos.png" alt="logo" className="w-5 h-5" />
          <h1 className="text-xl font-bold">My Qur'an</h1>
        </div>
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-[#B7B1F2] flex items-center gap-1">
            <FontAwesomeIcon icon={faHouseUser} />
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#B7B1F2] flex items-center gap-1">
            <FontAwesomeIcon icon={faBookQuran} />
            <Link to="/surah">Surah</Link>
          </li>
          <li className="hover:text-[#B7B1F2] flex items-center gap-1">
            <FontAwesomeIcon icon={faFile} />
            <Link to="/tafsir">Tafsir</Link>
          </li>
          <li className="hover:text-[#B7B1F2] flex items-center gap-1">
            <FontAwesomeIcon icon={faFolder} />
            <Link to="/hadits">Hadits</Link>
          </li>
        </ul>
      </nav>

      <div className="pt-15">
        <section className="bg-[#3E5879] bg-opacity-90 text-white py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">My Qur'an</h2>
            <p className="text-lg leading-relaxed text-justify">
              Al-Qur’an adalah kitab suci umat Islam yang diturunkan oleh Allah
              SWT kepada Nabi Muhammad SAW sebagai petunjuk hidup bagi seluruh
              umat manusia. Al-Qur’an diturunkan dalam bahasa Arab secara
              bertahap selama kurang lebih 23 tahun, melalui perantara malaikat
              Jibril.
            </p>
            <p className="text-lg leading-relaxed text-justify mt-4">
              Website ini memberikan kemudahan dalam membaca, memahami, serta
              memberikan berbagai wawasan baru bagi pengguna.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="night.jpeg"
              alt="Al-Qur'an"
              className="w-100 ml-25 rounded-xl shadow-lg"
            />
          </div>
        </section>
        <section className="py-12 px-6 grid gap-6 md:grid-cols-3">
          <Link
            to="/surah"
            className="bg-[#F5EFE7] backdrop-blur-sm border rounded-2xl shadow-md p-6 hover:shadow-xl transition block"
          >
            <h3 className="text-xl font-semibold mb-2">Baca Surah</h3>
            <p className="text-gray-700">
              Telusuri 114 surah lengkap dengan teks Arab, terjemahan, dan audio.
            </p>
          </Link>

          <Link
            to="/tafsir"
            className="bg-[#F5EFE7] backdrop-blur-sm border rounded-2xl shadow-md p-6 hover:shadow-xl transition block"
          >
            <h3 className="text-xl font-semibold mb-2">Tafsir Ayat</h3>
            <p className="text-gray-700">
              Pahami makna mendalam ayat-ayat suci dengan tafsir dari para ulama.
            </p>
          </Link>

          <Link
            to="/hadits"
            className="bg-[#F5EFE7] backdrop-blur-sm border rounded-2xl shadow-md p-6 hover:shadow-xl transition block"
          >
            <h3 className="text-xl font-semibold mb-2">Hadits Pilihan</h3>
            <p className="text-gray-700">
              Kumpulan hadits-hadits pilihan sunnah Nabi.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}