import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBookQuran,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Surah() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [arabicText, setArabicText] = useState(null);
  const [translationText, setTranslationText] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/quran/id.indonesian")
      .then((res) => res.json())
      .then((data) => setTranslationText(data.data.surahs));

    fetch("http://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((res) => res.json())
      .then((data) => setArabicText(data.data.surahs));

    fetch("http://api.alquran.cloud/v1/quran/ar.alafasy")
      .then((res) => res.json())
      .then((data) => setAudio(data.data.surahs));
  }, []);

  useEffect(() => {
    if (translationText && arabicText && audio) {
      const combined = translationText.map((s, i) => ({
        number: s.number,
        name: s.englishName,
        ayahs: s.ayahs.map((a, j) => ({
          text: a.text,
          arab: arabicText[i].ayahs[j].text,
          audio: audio[i].ayahs[j].audio,
          number: j + 1,
        })),
      }));
      setSurahs(combined);
    }
  }, [translationText, arabicText, audio]);

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
        <div className="w-1/4 overflow-y-auto max-h-[80vh] bg-white bg-opacity-80 rounded-xl p-3 shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Daftar Surah</h2>
          <ul className="space-y-1">
            {surahs.map((surah) => (
              <li
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
                className="text-white cursor-pointer px-3 py-2 rounded-lg bg-[#3E5879] hover:bg-[#F5EFE7] hover:text-black transition-colors duration-300 hover:shadow-lg"
              >
                {surah.name} ({surah.ayahs.length} Ayat)
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 overflow-y-auto max-h-[80vh] bg-white bg-opacity-80 rounded-xl p-5 shadow">
          {selectedSurah ? (
            <div>
              <h2 className="text-2xl font-bold mb-3 font-serif">
                {selectedSurah.name}
              </h2>
              <div className="space-y-4">
                {selectedSurah.ayahs.map((a, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg shadow">
                    <p className="text-right text-2xl font-lateef leading-loose mb-2">
                      {a.arab}
                    </p>
                    <p className="text-gray-800 italic">{a.text}</p>
                    <audio controls className="mt-2 w-full">
                      <source src={a.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-sm text-gray-500 mt-1">Ayat {a.number}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-lg text-center">
                Silakan pilih surah dari daftar. 
              </p>
          )}
        </div>
      </div>
    </div>
  );
}