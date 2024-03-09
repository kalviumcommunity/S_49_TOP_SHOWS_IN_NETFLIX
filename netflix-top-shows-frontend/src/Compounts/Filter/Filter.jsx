'use client';

import { Dropdown } from 'flowbite-react';

function Filter() {
  return (
    <Dropdown label="Dropdown User" dismissOnClick={false}>
      <Dropdown.Item>Vidhvath</Dropdown.Item>
      <Dropdown.Item>Prabhas</Dropdown.Item>
      <Dropdown.Item>Raniya</Dropdown.Item>
      <Dropdown.Item>Pawan</Dropdown.Item>
    </Dropdown>
  );
}

export default Filter;