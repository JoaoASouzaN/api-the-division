import { useState, useEffect } from 'react';
import api from '../services/api';

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchData;