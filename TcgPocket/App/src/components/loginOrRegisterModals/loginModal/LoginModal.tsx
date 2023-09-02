import { useState } from 'react';
import { TCGButton } from '../../mantineComponentsStyling/TCGButton';
import { TCGInput } from '../../mantineComponentsStyling/TCGInput';
import { TCGModal } from '../../mantineComponentsStyling/TCGModal';
import './loginModal.css';

export function LoginModal(): React.ReactElement {
  const [openModal, setOpenModal] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const resetInputs = () => {
    setUserName('');
    setPassword('');
  };

  const handleClose = () => {
    resetInputs();
    setOpenModal(false);
  };

  const handleLogin = () => {
    console.log('logged in');
    handleClose();
  };

  return (
    <>
      <TCGButton onClick={() => setOpenModal(true)}>Login</TCGButton>

      <TCGModal
        component={'div'}
        opened={openModal}
        onClose={handleClose}
        title="Login"
      >
        <div className="loginModalBodyContainer">
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

          <div className="loginModalBottomBtnContainer">
            <TCGButton onClick={handleClose}>Cancel</TCGButton>
            <TCGButton
              onClick={handleLogin}
              disabled={userName === '' || password === ''}
            >
              Login
            </TCGButton>
          </div>
        </div>
      </TCGModal>
    </>
  );
}
