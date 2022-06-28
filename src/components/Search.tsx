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
  onChange?: (payload: { term: string; country: string }) => any;
  initialValue?: { term: string; country: string } | null;
  showCountry?: boolean;
  placeholder: string;
  redirectOnSearch?: boolean;
};

const Search = ({
  onChange,
  initialValue,
  placeholder,
  showCountry = false,
  redirectOnSearch = true,
}: SearchProps) => {
  const router = useRouter();
  const { playerStore, collectionStore } = useStore();
  const [mounted, setMounted] = useState(false);
  const [term, setTerm] = useState(initialValue?.term || '');
  const [country, setCountry] = useState(initialValue?.country || '');
  const debouncedTerm = useDebounce(term, 1000);

  const { term: termParam, country: countryParam } = router.query;

  const { playList, openPlayList } = playerStore;
  const { setListSearchTerm, setListSearchCountry } = collectionStore;

  const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    if (!mounted) return;

    window.scrollTo(0, 0);

    if (redirectOnSearch) {
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
    }

    if (onChange) onChange({ term: term, country });
  }, [debouncedTerm, country]);

  useEffect(() => {
    if (termParam?.length) {
      setTerm(termParam as string);
      setListSearchTerm(termParam as string);
    }
    if (countryParam?.length) {
      setCountry(countryParam as string);
      setListSearchCountry(countryParam as string);
    }

    setMounted(true);
  }, [termParam, countryParam]);

  return (
    <Flex alignSelf={{ md: 'flex-end' }} gap={4} flex={{ base: 1, md: 'initial' }}>
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
      <Flex maxW={{ md: 64 }} flex={1}>
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
        <Icon as={RiPlayListLine} fontSize='20px' />
      </IconButton>
    </Flex>
  );
};

export default observer(Search);
