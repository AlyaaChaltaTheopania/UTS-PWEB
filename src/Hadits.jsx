import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBookQuran,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Hadits() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [hadiths, setHadiths] = useState([]);
  const [range, setRange] = useState({ start: 1, end: 10 });
  const hadithRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    fetch("https://api.hadith.gading.dev/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.data))
      .catch((err) => console.error("Gagal memuat kitab:", err));
  }, []);

  const handleSelectBook = (bookId) => {
    setSelectedBook(bookId);
    setFadeIn(false);
    fetchHadiths(bookId, range.start, range.end);
    if (hadithRef.current) {
      hadithRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRangeChange = (e) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  const handleFetchHadiths = () => {
    if (selectedBook) {
      fetchHadiths(selectedBook, range.start, range.end);
    }
  };

  const fetchHadiths = (bookId, start, end) => {
    fetch(`https://api.hadith.gading.dev/books/${bookId}?range=${start}-${end}`)
      .then((res) => res.json())
      .then((data) => {
        setHadiths(data.data.hadiths);
        setTimeout(() => setFadeIn(true), 100);
      })
      .catch((err) => console.error("Gagal memuat hadits:", err));
  };

  return (
    <div>
      {/* Navbar */}
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
     <div className="pt-24 px-4 grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        <div className="col-span-1 bg-white bg-opacity-80 rounded-xl shadow h-[80vh] overflow-hidden">
          <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-center p-3">
              Daftar Kitab
            </h3>
            <ul className="space-y-1 px-3 overflow-y-auto flex-1">
              {books.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleSelectBook(book.id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                    selectedBook === book.id
                      ? "bg-[#B7B1F2] text-black"
                      : "bg-[#3E5879] text-white hover:bg-[#F5EFE7] hover:text-black"
                  }`}
                >
                  {book.name} ({book.available})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 bg-white bg-opacity-80 rounded-xl shadow h-[80vh] overflow-hidden">
          {selectedBook ? (
            <div
              ref={hadithRef}
              className={`h-full flex flex-col transition-opacity duration-500 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold mb-3 text-center p-3">
                Kitab: {selectedBook.toUpperCase()}
              </h3>
              <div className="flex gap-2 px-5">
                <input
                  type="number"
                  name="start"
                  value={range.start}
                  onChange={handleRangeChange}
                  className="border p-2 rounded w-20"
                  min="1"
                />
                <span className="self-center">sampai</span>
                <input
                  type="number"
                  name="end"
                  value={range.end}
                  onChange={handleRangeChange}
                  className="border p-2 rounded w-20"
                  min={range.start}
                />
                <button
                  onClick={handleFetchHadiths}
                  className="cursor-pointer bg-[#213555] text-white px-4 py-2 rounded hover:bg-[#B7B1F2] hover:text-black transition-colors duration-300 hover:shadow-lg"
                >
                  Tampilkan
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 mt-4 space-y-4 pb-4">
                {hadiths.length > 0 ? (
                  hadiths.map((hadith, idx) => (
                    <div key={idx} className="p-4 bg-white rounded shadow">
                      <p className="font-semibold text-[#213555] mb-2">
                        Hadits No. {hadith.number}
                      </p>
                      <p className="text-right text-xl mb-2 font-lateef">{hadith.arab}</p>
                      <p className="text-gray-700 text-justify">{hadith.id}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Tidak ada hadits ditampilkan.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex justify-center pt-5">
              <p className="text-gray-600 text-lg">
                Silakan pilih kitab untuk melihat hadits.
              </p>
            </div>
          )}
        </div>
      </div>
  </div>
  );
}