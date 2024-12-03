import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ArmaCard from '../components/ArmaCard';
import Spinner from '../components/Spinner';

const ListaArmas = () => {
  const [armas, setArmas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArmas();
  }, []);

  const fetchArmas = async () => {
    try {
      const response = await api.get('/armas');
      setArmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar armas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta arma?')) {
      try {
        await api.delete(`/armas/${id}`);
        fetchArmas(); // Recarregar a lista
      } catch (error) {
        console.error('Erro ao excluir arma:', error);
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Lista de Armas</h2>
      <Link to="/armas/novo"><button>Adicionar Nova Arma</button></Link>
      {armas.map((arma) => (
        <div key={arma.id_armaT}>
          <ArmaCard arma={arma} />
          <Link to={`/armas/editar/${arma.id_armaT}`}><button>Editar</button></Link>
          <button onClick={() => handleDelete(arma.id_armaT)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default ListaArmas;