import { ChangeEvent, useEffect, useState } from 'react';
import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { useDebounce } from '../hooks';

type SearchProps = {
  onChange: (term: string) => any;
  initialValue?: string | null;
};

const Search = ({ onChange, initialValue }: SearchProps) => {
  const [term, setTerm] = useState(initialValue || '');

  const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const debouncedTerm = useDebounce(term, 1000);

  useEffect(() => {
    onChange(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <InputGroup>
      <InputRightElement pointerEvents='none'>
        <Icon as={RiSearchLine} />
      </InputRightElement>
      <Input value={term} onChange={handleTermChange} placeholder='Search' />
    </InputGroup>
  );
};

export default Search;
