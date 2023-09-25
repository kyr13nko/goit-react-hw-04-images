import { useState } from 'react';

import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { ReactComponent as Logo } from './search.svg';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      return toast.warning('Please enter something');
    }

    onSubmit(searchValue);
    setSearchValue('');
  };

  const handleInput = e => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Label />
          <Logo />
        </Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleInput}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;
