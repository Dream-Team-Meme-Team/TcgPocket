import { useState } from 'react';
import { TCGButton } from '../../mantineComponentsStyling/TCGButton';
import { TCGInput } from '../../mantineComponentsStyling/TCGInput';
import { TCGModal } from '../../mantineComponentsStyling/TCGModal';
import './registerModal.css';

export function RegisterModal(): React.ReactElement {
  const [openModal, setOpenModal] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setUserName('');
    setPassword('');
  };

  const handleClose = () => {
    resetInputs();
    setOpenModal(false);
  };

  const handleRegister = () => {
    console.log('registered');
    handleClose();
  };

  return (
    <>
      <TCGButton onClick={() => setOpenModal(true)}>Register</TCGButton>

      <TCGModal
        component={'div'}
        opened={openModal}
        onClose={handleClose}
        title="Register"
      >
        <div className="registerModalBodyContainer">
          <TCGInput
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TCGInput
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TCGInput
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TCGInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="registerModalBottomBtnContainer">
            <TCGButton onClick={handleClose}>Cancel</TCGButton>
            <TCGButton
              onClick={handleRegister}
              disabled={
                userName === '' ||
                password === '' ||
                firstName === '' ||
                lastName === ''
              }
            >
              Register
            </TCGButton>
          </div>
        </div>
      </TCGModal>
    </>
  );
}
