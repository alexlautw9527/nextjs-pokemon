import React from 'react';
import Link from 'next/link';
import axios from 'axios';

function Page({ data }) {
  return (
    <ul>
      {data.results.map((ele) => {
        const id = ele.url.match(/.*\/([^?]+)/)[1].replace('/', '');
        return (
          <li key={ele.name}>
            <Link href={`/demo/pokemon/${id}`}>{ele.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const apiResult = await axios.get('https://pokeapi.co/api/v2/pokemon/');
  const { data } = apiResult;
  console.log(data);
  return { props: { data } };
}

export default Page;
