import { useState } from 'react';
import { PrimaryInput } from '../mantineComponentsStyling/PrimaryInput';
import { PrimaryModal } from '../mantineComponentsStyling/PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../mantineComponentsStyling/PrimaryButton';
import { PasswordInput } from '@mantine/core';

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
      <PrimaryModal
        component={'div'}
        opened={openModal}
        onClose={handleClose}
        title="Login"
      >
        <div className={classes.bodyContainer}>
          <PrimaryInput
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={classes.bottomBtns}>
            <PrimaryButton onClick={handleClose}>Cancel</PrimaryButton>
            <PrimaryButton
              onClick={handleLogin}
              disabled={userName === '' || password === ''}
            >
              Login
            </PrimaryButton>
          </div>
        </div>
      </PrimaryModal>
    </>
  );
}
