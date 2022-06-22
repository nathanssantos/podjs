import { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import { RiPlayListLine, RiSearchLine } from 'react-icons/ri';
import { useDebounce, useStore } from '../hooks';
import countries from '../constants/countries';

type SearchProps = {
  onChange: (payload: { term: string; country: string }) => any;
  initialValue?: { term: string; country: string } | null;
  showCountry?: boolean;
  placeholder: string;
};

const Search = ({ onChange, initialValue, placeholder, showCountry = false }: SearchProps) => {
  const { playerStore } = useStore();
  const [term, setTerm] = useState(initialValue?.term || '');
  const [country, setCountry] = useState(initialValue?.country || '');

  const { playList, openPlayList } = playerStore;
  const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const debouncedTerm = useDebounce(term, 1000);

  useEffect(() => {
    onChange({ term, country });
    window.scrollTo(0, 0);
  }, [debouncedTerm, country]);

  return (
    <Flex alignSelf='flex-end' gap='3'>
      {showCountry && (
        <Flex maxW={32} flex={1}>
          <Select
            value={country}
            placeholder='Country'
            onChange={handleCountryChange}
            size='sm'
          >
            {countries.map(({ name, code }) => (
              <option value={code.toLowerCase()} key={code}>
                {name}
              </option>
            ))}
          </Select>
        </Flex>
      )}
      <Flex maxW={64} flex={1}>
        <InputGroup size='sm'>
          <InputRightElement pointerEvents='none'>
            <Icon as={RiSearchLine} />
          </InputRightElement>
          <Input value={term} onChange={handleTermChange} placeholder={placeholder} />
        </InputGroup>
      </Flex>
      <IconButton
        aria-label='Playlist'
        onClick={openPlayList}
        backdropFilter='blur(10px)'
        color={playList?.length ? 'teal.300' : 'var(--chakra-colors-chakra-body-text)'}
        size='sm'
      >
        <Icon as={RiPlayListLine} fontSize={20} />
      </IconButton>
    </Flex>
  );
};

export default observer(Search);
