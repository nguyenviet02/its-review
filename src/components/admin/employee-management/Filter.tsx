import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

const Filter = () => {
  return (
    <div className="flex h-10 flex-1 gap-2">
      {/* Search Input */}
      <div className="flex h-full w-full max-w-[300px] items-center gap-2 rounded border border-gray-700 p-1">
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
        />
        <input
          name="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="block size-full bg-white text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
        />
      </div>

      <Button className="rounded border border-black p-2">Search</Button>
    </div>
  );
};

export default Filter;
