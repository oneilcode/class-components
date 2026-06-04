import { useState } from 'react';
import './App.css';
import OpenModalBtn from './components/OpenModalBtn';
import Modal from './components/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="btn-container">
        <OpenModalBtn
          onClick={() => setIsOpen(true)}
          title="Open uncontrolled form"
        />
        <OpenModalBtn
          onClick={() => setIsOpen(true)}
          title="Open React Hook Form"
        />
      </div>
      <div id="modal-container">
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>Modal</p>
        </Modal>
      </div>
    </>
  );
}

export default App;
