import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProblemSetPage from './pages/ProblemSetPage/ProblemSetPage';
import ProblemEditorPage from './pages/ProblemEditorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProblemSetPage />} />
          <Route path="/problemset/all/" element={<ProblemSetPage />}/>
          <Route path="/problems/:problemSlug/" element={<ProblemEditorPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
