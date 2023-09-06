import { useState } from 'react';
import { PrimaryInput } from '../mantineComponentsStyling/PrimaryInput';
import { PrimaryModal } from '../mantineComponentsStyling/PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { Input, PasswordInput } from '@mantine/core';
import { PrimaryButton } from '../mantineComponentsStyling/PrimaryButton';
import { SecondaryButton } from '../mantineComponentsStyling/SecondaryButton';

interface RegisterModal {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function RegisterModal({
  openModal,
  setOpenModal,
}: RegisterModal): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
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
      <PrimaryModal
        component={'div'}
        opened={openModal}
        onClose={handleClose}
        title="Register"
      >
        <div className={classes.bodyContainer}>
          <Input.Label required> First Name </Input.Label>
          <PrimaryInput
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input.Label required> Last Name </Input.Label>
          <PrimaryInput
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input.Label required> Username </Input.Label>
          <PrimaryInput
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input.Label required> Password </Input.Label>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles={{ input: { backgroundColor: 'white' } }}
          />

          <Input.Label required> Confirm Password </Input.Label>
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            styles={{ input: { backgroundColor: 'white' } }}
          />

          <div className={classes.bottomBtns}>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={handleRegister}
              disabled={
                userName === '' ||
                password === '' ||
                confirmPassword === '' ||
                firstName === '' ||
                lastName === ''
              }
            >
              Register
            </PrimaryButton>
          </div>
        </div>
      </PrimaryModal>
    </>
  );
}
