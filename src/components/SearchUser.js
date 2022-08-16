import { useEffect, useState } from "react";
import { useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import { useDispatch } from "react-redux";
import { addFavorite } from "../store/github/githubSlice";

const SearchUser = () => {
  const [search, setSearch] = useState('')
  const [clearInput, setClearInput] = useState(false)
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  });
  const dispatch = useDispatch()


  useEffect(() => {
    setClearInput(debounced.length > 2 && data?.length > 0)
  }, [debounced, data])


  return (
    <div className="flex flex-col items-center">
      { isError && <p className="text-center text-red-600">Error!!!</p> }

      <div>
        <input
            className="border rounded py-2 px-4"
            type="text"
            placeholder="Search GitHub User"
            value={search}
            onChange={e => setSearch(e.target.value)} />
      </div>

      { clearInput && <ul className="mt-5 list-none flex justify-center flex-wrap">
        { isLoading && <p className="text-center">Loading...</p> }
        { data?.map(user => (
          <li
            key={user.id}
            onClick={() => console.log(user.login)}
            className="relative py-2 px-4 shadow-xl m-2 rounded flex items-center flex-col">
              <button
                className="absolute right-1 top-1 w-5 rounded-full h-5 mb-2 text-white bg-green-500 flex justify-center items-center"
                onClick={() => dispatch(addFavorite(user))}>
                  +
              </button>
              <p className="text-center mt-4 mb-2 text-xl">id: {user.id}</p>
              <div className="w-32 h-32">
                <img
                  src={user.avatar_url}
                  alt={user.login} />
              </div>
              <h2 className="text-center mt-2 text-xl">{user.login}</h2>
          </li>
        )) }
      </ul>}
    </div>
  )
}

export default SearchUser;