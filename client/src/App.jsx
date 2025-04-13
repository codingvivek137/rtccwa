import { Toaster } from "react-hot-toast";
import EditorPage from "./component/EditorPage.jsx";
import Home from "./component/Home.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster position="top-center"></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  );
}

export default App;
