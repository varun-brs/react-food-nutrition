import { Route, Routes } from "react-router-dom";
import { Home } from "./modules/Home";
import { Layout } from "./core/layout";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
