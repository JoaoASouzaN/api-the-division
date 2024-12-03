import React from 'react';
import { Card, CardTitle, CardInfo } from '../styles/CardStyles'

const BuildCard = ({ build }) => (
  <Card>
    <CardTitle>{build.nome_build}</CardTitle>
    <CardTitle><strong>Descrição:</strong> {build.descricao_build}</CardTitle>
    <CardTitle><strong>Data de Criação:</strong> {new Date(build.data_criacao).toLocaleDateString()}</CardTitle>
  </Card>
);

export default BuildCard;