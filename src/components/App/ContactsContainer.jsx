import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Heading } from '@chakra-ui/react';

const ContactsContainer = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Heading as="h1" size="xl" noOfLines={1} style={{ marginTop: '15px' }}>
          Phonebook
        </Heading>
        <ContactForm />
        {/* <div></div> */}
        <Filter />
      </div>
      <Heading
        as="h2"
        size="lg"
        style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}
      >
        Contacts
      </Heading>
      <ContactList />
    </div>
  );
};

export default ContactsContainer;
