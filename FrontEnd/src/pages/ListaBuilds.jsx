import React, { useState, useEffect } from 'react';
import api from '../services/api';
import BuildCard from '../components/BuildCard';
import Spinner from '../components/Spinner';

const ListaBuilds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await api.get('/builds');
        setBuilds(response.data);
      } catch (error) {
        console.error('Erro ao buscar builds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Lista de Builds</h2>
      {builds.map((build) => (
        <BuildCard key={build.id_build} build={build} />
      ))}
    </div>
  );
};

export default ListaBuilds;