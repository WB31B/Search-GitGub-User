import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { getUser } from "../features/user/userSlice";
import { addFavotite } from "../features/favorites/favoritesSlice";
import { getRepos } from "../features/repos/reposSlice";
import Repos from "./Repos";


const SearchUser = () => {
  const [userValue, setUserValue] = useState('');
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const { value } = useSelector(state => state.user);

  const searchHandler = (e) => {
    setUserValue(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getUser(userValue));
    setUserValue('');
  }

  const addHandler = (value) => {
    dispatch(addFavotite(value))
  }

  const reposHandler = (name) => {
    dispatch(getRepos(name))
    setToggle(!toggle)
  }

  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          value={userValue}
          onChange={searchHandler}
          className="border px-4 py-1 rounded"
          placeholder="Search GitHub User" />

        <button
          onClick={submitHandler}
          className="border px-4 ml-3 py-1 rounded" >
            Search
        </button>
      </div>

      { value && (
        <div className="relative w-60 p-3 pt-5 m-3 flex m-auto mt-3 items-center flex-col shadow-xl">
          <div className="flex items-center flex-col">
            <p className="mb-1">id: {value.id}</p>
            <img
              className="w-32 h-32"
              src={value.avatar_url}
              alt={value.login} />
            <h1 className="mt-1 text-xl">{value.login}</h1>
          </div>
          <button
            className="absolute top-1 right-1 w-5 h-5 border rounded flex items-center justify-center text-white bg-lime-500"
            onClick={() => addHandler(value)}>
              +
          </button>
          <button
            className="border rounded px-3 mt-2 bg-cyan-600 text-white"
            onClick={() => reposHandler(value.login)}>Repos</button>

            { toggle && <Repos /> }
        </div>
      ) }

    </div>
  )
}

export default SearchUser;