import React, { useState } from 'react';
import Image from 'next/image';

import axios from 'axios';

function Blog({ pokemonData }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleToggleImageClick = () => {
    setIsImageOpen((prev) => !prev);
  };

  return (
    <div>
      <p>{pokemonData.name}</p>
      <p>{pokemonData.weight}</p>

      {isImageOpen && (
        <Image
          src={pokemonData.img}
          alt={pokemonData.name}
          width={80}
          height={80}
        />
      )}

      <button type="button" onClick={() => handleToggleImageClick()}>
        click to toggle
      </button>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id: pokemonId } = params;
  const apiResult = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const pokemonDataSet = apiResult?.data;

  const { id, name, weight, sprites } = pokemonDataSet;
  const pokemonData = {
    id,
    name,
    weight,
    img: sprites.front_default,
  };

  return {
    props: {
      pokemonData,
    },
    revalidate: 60, // In seconds
  };
}

export async function getStaticPaths() {
  const apiResult = await axios.get('https://pokeapi.co/api/v2/pokemon/');
  const data = apiResult?.data?.results;
  const idPathList = data.map((ele) => {
    const id = ele.url.match(/.*\/([^?]+)/)[1].replace('/', '');
    return { params: { id } };
  });

  return { paths: idPathList, fallback: 'blocking' };
}

export default Blog;
