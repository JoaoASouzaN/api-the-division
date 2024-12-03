import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const ArmaForm = () => {
  const [formData, setFormData] = useState({
    nome_arma: '',
    dano_arma: '',
    tipo_arma: '',
    danoCritico_arma: '',
    taxaDisparo_arma: '',
    alcance_arma: '',
  });

  const { id } = useParams(); // Para edição
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Busca arma para edição
      api.get(`/armas/${id}`).then((response) => {
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

    // Validação básica
    if (!formData.nome_arma || !formData.dano_arma || !formData.tipo_arma) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    if (formData.dano_arma <= 0 || formData.taxaDisparo_arma <= 0) {
        alert('Os valores de dano e taxa de disparo devem ser positivos.');
        return;
    }

    try {
      if (id) {
        await api.put(`/armas/${id}`, formData);
      } else {
        await api.post('/armas', formData);
      }
      navigate('/armas');
    } catch (error) {
      console.error('Erro ao salvar arma:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Editar Arma' : 'Nova Arma'}</h2>
      <input name="nome_arma" placeholder="Nome" value={formData.nome_arma} onChange={handleChange} required />
      <input name="dano_arma" placeholder="Dano" value={formData.dano_arma} onChange={handleChange} required />
      <input name="tipo_arma" placeholder="Tipo" value={formData.tipo_arma} onChange={handleChange} required />
      <input name="danoCritico_arma" placeholder="Dano Crítico" value={formData.danoCritico_arma} onChange={handleChange} required />
      <input name="taxaDisparo_arma" placeholder="Taxa de Disparo" value={formData.taxaDisparo_arma} onChange={handleChange} required />
      <input name="alcance_arma" placeholder="Alcance" value={formData.alcance_arma} onChange={handleChange} required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ArmaForm;