import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./pages/main-screen/main-screen";
import NoScreen from "./pages/no-screen/no-screen";
import YesScreen from "./pages/yes-screen/yes-screen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="yes" element={<YesScreen />} />
        <Route path="no" element={<NoScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
