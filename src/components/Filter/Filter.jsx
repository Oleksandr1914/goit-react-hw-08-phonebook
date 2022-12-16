import { useDispatch, useSelector } from 'react-redux';
// import { FilterInput } from './FilterList';
import { filterTask } from '../../redux/filterSlice';
import { Heading, Input, Stack } from '@chakra-ui/react';

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filter);

  return (
    <>
      <Heading as="h3" size="md">
        Find contcts by name
      </Heading>
      <Stack spacing={3} width="300px">
        <Input
          size="sm"
          type="text"
          name="filter"
          value={filters}
          onChange={e => dispatch(filterTask(e.target.value))}
        />
      </Stack>
    </>
  );
};

export default Filter;
