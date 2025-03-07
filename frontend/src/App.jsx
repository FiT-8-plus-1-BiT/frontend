import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/pages/home";
import Streaming from "~/pages/streaming";
import Layout from "~/components/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/streaming" element={<Streaming />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
