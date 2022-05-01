import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import useFetch from "./UseFetch";
import Animes from "./Animes";

export default function App() {
  const { data, setData } = useFetch();
  const { search } = window.location;
  return (
    <div>
      <form >
        <input
          type="search"
          placeholder="Search..."
          value={data.slug}
          onChange={(e) => setData({ ...data, slug: e.target.value.toLowerCase() })}
        />
        {/* <button type="submit" onClick={}> Search </button> */}
      </form>
      <br />
      {Object.keys(data.results).length > 0 ? <Animes anime={data.results} /> : null}
    </div>
  );
}