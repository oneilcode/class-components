import { useState } from 'react';
import './App.css';
import OpenModalBtn from './components/OpenModalBtn';
import Modal from './components/Modal';
import UncontrolledForm, {
  type IFormData,
} from './components/UncontrolledForm';
import ControlledForm from './components/ControlledForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

  const handleFormSubmit = (data: IFormData) => {
    console.log(data);
  };

  const handleOpenModal = (type: 'uncontrolled' | 'controlled') => {
    setIsOpen(true);
    setFormType(type);
  };

  return (
    <>
      <div className="btn-container">
        <OpenModalBtn
          onClick={() => handleOpenModal('uncontrolled')}
          title="Open uncontrolled form"
        />
        <OpenModalBtn
          onClick={() => handleOpenModal('controlled')}
          title="Open React Hook Form"
        />
      </div>
      <div id="modal-container">
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          modalTitle={
            formType === 'uncontrolled'
              ? 'Uncontrolled form'
              : 'Controlled form'
          }
        >
          {formType === 'uncontrolled' && (
            <UncontrolledForm
              onSubmit={handleFormSubmit}
              onClose={() => setIsOpen(false)}
            />
          )}
          {formType === 'controlled' && (
            <ControlledForm
              onSubmit={handleFormSubmit}
              onClose={() => setIsOpen(false)}
            />
          )}
        </Modal>
      </div>
    </>
  );
}

export default App;
