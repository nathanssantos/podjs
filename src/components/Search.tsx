import { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Icon, Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { useDebounce } from '../hooks';
import countries from '../constants/countries';

type SearchProps = {
  onChange: (payload: { term: string; country: string }) => any;
  initialValue?: { term: string; country: string } | null;
  showCountry?: boolean;
  placeholder: string;
};

const Search = ({ onChange, initialValue, placeholder, showCountry = false }: SearchProps) => {
  const [term, setTerm] = useState(initialValue?.term || '');
  const [country, setCountry] = useState(initialValue?.country || '');

  const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const debouncedTerm = useDebounce(term, 1000);

  useEffect(() => {
    onChange({ term, country });
  }, [debouncedTerm, country]);

  return (
    <Flex alignSelf='flex-end' gap='2'>
      {showCountry && (
        <Flex maxW={32} flex={1}>
          <Select value={country} placeholder='Country' onChange={handleCountryChange}>
            {countries.map(({ name, code }) => (
              <option value={code.toLowerCase()} key={code}>
                {name}
              </option>
            ))}
          </Select>
        </Flex>
      )}
      <Flex maxW={64} flex={1}>
        <InputGroup>
          <InputRightElement pointerEvents='none'>
            <Icon as={RiSearchLine} />
          </InputRightElement>
          <Input value={term} onChange={handleTermChange} placeholder={placeholder} />
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default Search;
