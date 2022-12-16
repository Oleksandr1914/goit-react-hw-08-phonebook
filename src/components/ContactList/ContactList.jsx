import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactSlice';
import { useEffect } from 'react';
import { fetchStart } from '../../redux/registration/registrOperation';
import {
  Button,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const ContactsList = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.root.auth.token);
  const { items, error, isLoading } = useSelector(state => state.root.contacts);
  const filter = useSelector(state => state.root.filters);

  useEffect(() => {
    if (token) {
      dispatch(fetchStart());
    }
  }, [dispatch, token]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
    >
      {items
        .filter(el => el.name.toLowerCase().includes(filter))
        .map(el => (
          <Card key={el.id}>
            <CardHeader>
              <Heading size="md">{el.name}: </Heading>
            </CardHeader>
            <CardHeader>
              <Heading size="md">{el.number}</Heading>
            </CardHeader>

            <Button
              type="click"
              name={el.id}
              onClick={() => dispatch(deleteContact(el.id))}
              leftIcon={<FiTrash2 />}
            >
              Delete
            </Button>
          </Card>
        ))}
      {isLoading && <h2>Loading</h2>}
      {error && <h2>Error: {error}</h2>}
    </SimpleGrid>
  );
};

export default ContactsList;
