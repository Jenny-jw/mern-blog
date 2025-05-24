// Main component of the app
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-lightAccent text-lightText dark:bg-darkBg dark:text-darkText">
        <main className="max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>
        {/* <Other components /> */}
      </div>
    </Router>
  );
};

export default App;
