import { LoginModal } from '../../loginOrRegisterModals/loginModal/LoginModal';
import { RegisterModal } from '../../loginOrRegisterModals/registerModal/RegisterModal';

export function HomePage(): React.ReactElement {
  return (
    <>
      Home Page
      <LoginModal />
      <RegisterModal />
    </>
  );
}
