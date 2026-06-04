import './App.css';
import OpenModalBtn from './components/OpenModalBtn';

function App() {
  return (
    <div className="btn-container">
      <OpenModalBtn title="Open uncontrolled form" />
      <OpenModalBtn title="Open React Hook Form" />
    </div>
  );
}

export default App;
