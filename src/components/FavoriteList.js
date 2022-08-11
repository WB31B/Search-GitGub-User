import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favorites/favoritesSlice";

const FavoriteList = () => {
  const { favorites } = useSelector(state => state.favorites);

  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-3xl text-center mt-7">Favorite</h1>
      <div className="flex flex-wrap justify-center">
        { favorites.map(user => (
          <div key={user.id} className="p-3 m-3 flex items-center flex-col shadow-xl">
            <div className="flex items-center flex-col">
              <p className="mb-1">id: {user.id}</p>
              <img
                className="w-24 h-24"
                src={user.avatar_url}
                alt={user.login} />
              <h1 className="mt-1 text-xl">{user.login}</h1>
            </div>
            <button
              onClick={() => dispatch(removeFavorite(user.id))}
              className="text-xs mt-2 px-2 py-1 border rounded bg-red-600 text-white flex items-center justify-center" >
                Remove
            </button>
          </div>
        )) }
      </div>
    </div>
  )
}

export default FavoriteList;