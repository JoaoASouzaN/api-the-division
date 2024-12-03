import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EquipamentoForm = () => {
  const [formData, setFormData] = useState({
    nome_equipamento: '',
    categoria_equipamento: '',
    atributoPrim_equipamento: '',
    valorAtri_equipamento: '',
  });

  const { id } = useParams(); // Para edição
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/equipamentos/${id}`).then((response) => {
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
        await api.put(`/equipamentos/${id}`, formData);
      } else {
        await api.post('/equipamentos', formData);
      }
      navigate('/equipamentos');
    } catch (error) {
      console.error('Erro ao salvar equipamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Editar Equipamento' : 'Novo Equipamento'}</h2>
      <input name="nome_equipamento" placeholder="Nome" value={formData.nome_equipamento} onChange={handleChange} required />
      <input name="categoria_equipamento" placeholder="Categoria" value={formData.categoria_equipamento} onChange={handleChange} required />
      <input name="atributoPrim_equipamento" placeholder="Atributo Principal" value={formData.atributoPrim_equipamento} onChange={handleChange} required />
      <input name="valorAtri_equipamento" placeholder="Valor do Atributo" value={formData.valorAtri_equipamento} onChange={handleChange} required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default EquipamentoForm;