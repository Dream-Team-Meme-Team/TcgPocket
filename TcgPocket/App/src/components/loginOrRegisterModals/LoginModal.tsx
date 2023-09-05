import { useState } from 'react';
import { TCGButton } from '../mantineComponentsStyling/TCGButton';
import { TCGInput } from '../mantineComponentsStyling/TCGInput';
import { TCGModal } from '../mantineComponentsStyling/TCGModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';

interface LoginModalProps {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function LoginModal({
  openModal,
  setOpenModal,
}: LoginModalProps): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();

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
      <TCGModal
        component={'div'}
        opened={openModal}
        onClose={handleClose}
        title="Login"
      >
        <div className={classes.bodyContainer}>
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

          <div className={classes.bottomBtns}>
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
