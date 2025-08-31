import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Estimator from './pages/Estimator';
import BasicPages from './pages/BasicPages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/estimator" element={<Estimator />} />
        <Route path="/:page" element={<BasicPages />} />
      </Routes>
    </Router>
  );
}
export default App;
