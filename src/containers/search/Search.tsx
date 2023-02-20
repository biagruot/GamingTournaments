import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchTournaments } from '../../actions/tournaments.actions';
import Input, { Label } from '../../components/Input';
import { AppDispatch } from '../../store';
import { isValidName } from '../../utils/isValidName';
import { useDebounce } from './hooks/useDebounce';

export const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(fetchTournaments(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setSearchQuery((prevState) => {
      if (prevState !== query && isValidName(query)) {
        return query;
      } else {
        alert(
          'Invalid search query, please enter only Latin letters, numbers, and spaces.'
        );
        return prevState;
      }
    });
  };

  return (
    <Wrapper>
      <Label htmlFor="searchInput">Search tournaments:</Label>
      <Input
        id="searchInput"
        name="search"
        aria-label="Search Tournaments"
        placeholder="Search tournament ..."
        value={searchQuery}
        onChange={onChangeHandler}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
