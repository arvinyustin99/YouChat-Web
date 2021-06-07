import UserProvider, {UserContext} from './providers/UserProviders';
import App from './App';

const AppWrapper = () => {

  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWrapper;