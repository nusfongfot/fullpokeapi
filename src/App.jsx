import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonInfoPage, SearchPage, Test } from "@atomic";

function App() {
  return (
    <BrowserRouter basename={'/fullpokeapi'}>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="pokemon" element={<PokemonInfoPage />}></Route>
          <Route path="test" element={<Test />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
