import { useDispatch, useSelector } from 'react-redux';
import {
  clearHeaderToken,
  outTask,
} from '../../redux/registration/registrOperation';
import {
  Tabs,
  TabList,
  Button,
  Box,
  useTab,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { FiLogOut, FiBookOpen, FiUser } from 'react-icons/fi';
import React from 'react';

const { NavLink, Outlet } = require('react-router-dom');

const Navigation = () => {
  const user = useSelector(state => state.root.auth.token);
  const dispatch = useDispatch();

  const clickOut = () => {
    clearHeaderToken();
    dispatch(outTask());
  };

  const CustomTab = React.forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];
    const styles = useMultiStyleConfig('Tabs', tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box
          as="span"
          mr="2"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isSelected && <FiBookOpen />}
          {tabProps.children}
        </Box>
      </Button>
    );
  });
  const CustomTab2 = React.forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const styles = useMultiStyleConfig('Tabs', tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box
          as="span"
          mr="2"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <FiUser />
          {tabProps.children}
        </Box>
      </Button>
    );
  });

  return (
    <div>
      <div>
        {user ? (
          <Tabs>
            <TabList>
              <NavLink to="/contacts">
                <CustomTab>Contacts</CustomTab>
              </NavLink>
              <Box
                display="flex"
                alignItems="center"
                marginLeft="auto"
                marginRight="30px"
              >
                <Button
                  colorScheme="blue"
                  size="sm"
                  type="click"
                  onClick={clickOut}
                  leftIcon={<FiLogOut />}
                >
                  Log out
                </Button>
              </Box>
            </TabList>
          </Tabs>
        ) : (
          <Tabs>
            <TabList>
              <NavLink to="/login">
                <CustomTab2>Log in</CustomTab2>
              </NavLink>
              <NavLink to="/register">
                <CustomTab2>Sign up</CustomTab2>
              </NavLink>
            </TabList>
          </Tabs>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
