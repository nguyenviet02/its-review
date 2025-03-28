import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Filter = () => {
  return (
    <div className="flex gap-2">
      {/* Search Input */}
      <div className="flex gap-2 rounded border border-gray-700 p-1">
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
        />
        <input
          name="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="col-start-1 row-start-1 block size-full bg-white text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
        />
      </div>

      {/* Select */}
      <FormControl size="small" className="w-40">
        <InputLabel id="period-select-label">Kỳ đánh giá</InputLabel>
        <Select
          name="period"
          labelId="period-select-label"
          id="period"
          label="Kỳ đánh giá"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
