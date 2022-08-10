import React from "react";

import { useSelector } from "react-redux";

const Repos = () => {
  const { repos } = useSelector(state => state.repos);
  return (
    <div className="mt-2">
      { repos && repos.map(repo => (
        <div key={repo.id} className="text-center">{repo.name}</div>
      )) }
    </div>
  )
}

export default Repos;