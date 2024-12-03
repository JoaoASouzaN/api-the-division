import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const BuildForm = () => {
  const [formData, setFormData] = useState({
    nome_build: '',
    descricao_build: '',
  });

  const { id } = useParams(); // Para edição
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/builds/${id}`).then((response) => {
        setFormData(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/builds/${id}`, formData);
      } else {
        await api.post('/builds', formData);
      }
      navigate('/builds');
    } catch (error) {
      console.error('Erro ao salvar build:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Editar Build' : 'Nova Build'}</h2>
      <input name="nome_build" placeholder="Nome" value={formData.nome_build} onChange={handleChange} required />
      <textarea name="descricao_build" placeholder="Descrição" value={formData.descricao_build} onChange={handleChange} required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default BuildForm;