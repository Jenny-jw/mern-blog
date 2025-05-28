// Main component of the app
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import NewPost from "./pages/NewPost.jsx";
import "./App.css";
import AboutMe from "./pages/AboutMe.jsx";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-lightAccent text-lightText dark:bg-darkBg dark:text-darkText">
      <div className="w-screen">
        <Navbar />
      </div>

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/new" element={<NewPost />} />
        </Routes>
      </main>

      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default App;
