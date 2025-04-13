import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBookQuran,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Tafsir() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [tafsir, setTafsir] = useState(null);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  const handleSelectSurah = (number) => {
    fetch(`https://equran.id/api/v2/tafsir/${number}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSurah({ nomor: number, namaLatin: data.data.namaLatin });
        setTafsir(data.data.tafsir);
      });
  };

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

      <div className="pt-24 px-4 flex gap-4 max-h-screen overflow-hidden">
        {/* Sidebar Daftar Surah */}
        <div className="w-1/4 overflow-y-auto max-h-[80vh] bg-white bg-opacity-80 rounded-xl p-3 shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Daftar Surah</h2>
          <ul className="space-y-1">
            {surahs.map((surah) => (
              <li
                key={surah.nomor}
                onClick={() => handleSelectSurah(surah.nomor)}
                className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition ${
                  selectedSurah?.nomor === surah.nomor
                    ? "bg-[#B7B1F2] text-black"
                    : "bg-[#3E5879] text-white hover:bg-[#F5EFE7] hover:text-black"
                }`}
              >
                {surah.nomor}. {surah.namaLatin}
              </li>
            ))}
          </ul>
        </div>

        {/* Konten Tafsir */}
        <div className="w-3/4 overflow-y-auto max-h-[80vh] bg-white bg-opacity-80 rounded-xl p-5 shadow">
          {selectedSurah && tafsir ? (
            <div>
              <h2 className="text-2xl font-bold mb-3">
                Tafsir {selectedSurah.namaLatin}
              </h2>
              <div className="space-y-4">
                {tafsir.map((ayat, idx) => (
                  <div key={idx} className="p-4 bg-[#F5EFE7] rounded shadow">
                    <p className="font-semibold text-[#213555] mb-2">
                      Ayat {ayat.ayat}
                    </p>
                    <p className="text-gray-900 text-justify">{ayat.teks}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-lg text-center">
              Silakan pilih surah untuk melihat tafsir.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}