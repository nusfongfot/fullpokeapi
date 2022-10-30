import { HashRouter, Routes, Route } from "react-router-dom";
import { PokemonInfoPage, SearchPage, Test } from "@atomic";

function App() {
  return (
    <HashRouter basename={'/fullpokeapi'}>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="pokemon" element={<PokemonInfoPage />}></Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
