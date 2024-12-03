import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EquipamentoCard from '../components/EquipamentoCard';
import Spinner from '../components/Spinner';

const ListaEquipamentos = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        const response = await api.get('/equipamentos');
        setEquipamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipamentos();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Lista de Equipamentos</h2>
      {equipamentos.map((equipamento) => (
        <EquipamentoCard key={equipamento.id_equipamento} equipamento={equipamento} />
      ))}
    </div>
  );
};

export default ListaEquipamentos;