import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/registration/registrOperation';
import { Navigate } from 'react-router-dom';
import {
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispath = useDispatch();

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispath(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  const token = useSelector(state => state.root.auth.token);

  return token ? (
    <Navigate to="/contacts" />
  ) : (
    <Tabs>
      <TabPanels>
        <TabPanel>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div>
              <Stack spacing={3} width="600px">
                <label>
                  Email
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Password
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </label>
              </Stack>
              <Button type="submit" marginTop="12px" leftIcon={<FiLogIn />}>
                Log in
              </Button>
            </div>
          </form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LogIn;
