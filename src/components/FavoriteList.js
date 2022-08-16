import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/github/githubSlice";
import { useLazyGetUserReposQuery } from "../store/github/github.api";

import Repos from "./Repos";

const FavoriteList = () => {
  const { favorite } = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);


  const [fetchRepos, { isLoading: reposLoading, data: repos }] = useLazyGetUserReposQuery();

  const clickHandler = (username) => {
    fetchRepos(username)
    setToggle(!toggle)
  }

  return (
    <div>
      <h1 className="text-center mt-7 text-3xl">Favorites</h1>
      <div className="flex flex-wrap justify-center">
        { favorite?.map(user => (
           <div
            key={user.id}
            className="relative py-2 px-4 shadow-xl m-2 rounded flex items-center flex-col">
              <button
                className="absolute right-1 top-1 w-5 rounded-full h-5 mb-2 text-white bg-red-500 flex justify-center items-center"
                onClick={() => dispatch(removeFavorite(user.id))}>
                  -
              </button>
              <p className="text-center mt-4 mb-2 text-xl">{user.id}</p>
              <div className="w-32 h-32">
                <img
                  src={user.avatar_url}
                  alt={user.login} />
              </div>
              <h2 className="text-center mt-2 text-xl">{user.login}</h2>
              <button
                className="mt-3 py-1 px-2 rounded text-white bg-emerald-600"
                onClick={() => clickHandler(user.login)}>
                  Repos
              </button>

              <div className="mt-2">
                { reposLoading && <p className="text-center">Repos Loading...</p> }
                { toggle && <Repos repo={repos} /> }
              </div>
            </div>
        )) }
      </div>
    </div>
  )
}

export default FavoriteList;