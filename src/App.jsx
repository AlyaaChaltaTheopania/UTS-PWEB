import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Surah from "./Surah";
import Tafsir from "./Tafsir";
import Hadits from "./Hadits";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Surah />} />
        <Route path="/tafsir" element={<Tafsir />} />
        <Route path="/hadits" element={<Hadits />} />
      </Routes>
    </Router>
  );
}

export default App;