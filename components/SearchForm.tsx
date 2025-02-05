import React from "react";
import Form from "next/form";
import { IoIosSearch } from "react-icons/io";
const SearchForm = () => {
  return (
    <div>
      <Form action={"/"} scroll={false} className="search-form relative">
        <input
          type="text"
          name="query"
          defaultValue={""}
          className="search-input"
          placeholder="Search Project"
        />

        <div className="flex gap-2">
          {true && <div>reset</div>}

          <button type="submit" className="search-btn text-white">
            <IoIosSearch className="size-9" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
