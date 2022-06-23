import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { RiPlayListLine, RiSearchLine } from 'react-icons/ri';

import countries from '../constants/countries';
import { useDebounce, useStore } from '../hooks';

type SearchProps = {
  onChange: (payload: { term: string; country: string }) => any;
  initialValue?: { term: string; country: string } | null;
  showCountry?: boolean;
  placeholder: string;
};

const Search = ({ onChange, initialValue, placeholder, showCountry = false }: SearchProps) => {
  const router = useRouter();
  const { playerStore, collectionStore } = useStore();
  const [mounted, setMounted] = useState(false);
  const [term, setTerm] = useState(initialValue?.term || '');
  const [country, setCountry] = useState(initialValue?.country || '');

  const { playList, openPlayList } = playerStore;
  const { setListSearchTerm, setListSearchCountry } = collectionStore;

  const { term: termParam, country: countryParam } = router.query;

  const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const debouncedTerm = useDebounce(term, 1000);

  useEffect(() => {
    if (!mounted) return;
    onChange({ term, country });
    window.scrollTo(0, 0);

    const query = {} as { term?: string; country?: string };

    if (term?.length) query.term = term;
    if (country?.length) query.country = country;

    router.push(
      {
        pathname: '/search',
        query,
      },
      undefined,
      { shallow: true },
    );
  }, [debouncedTerm, country]);

  useEffect(() => {
    if (termParam) {
      setListSearchTerm(termParam as string);
      setTerm(termParam as string);
    }
    if (countryParam) {
      setListSearchCountry(countryParam as string);
      setCountry(countryParam as string);
    }
  }, [termParam, countryParam]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <Input value={term} onChange={handleTermChange} placeholder={placeholder} autoFocus />
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
