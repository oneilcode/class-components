import { useState } from 'react';
import './App.css';
import OpenModalBtn from './components/OpenModalBtn';
import Modal from './components/Modal';
import UncontrolledForm, {
  type IFormData,
} from './components/UncontrolledForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (data: IFormData) => {
    console.log(data);
  };

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
          <UncontrolledForm
            onSubmit={handleFormSubmit}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    </>
  );
}

export default App;
