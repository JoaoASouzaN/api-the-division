import React from 'react';
import { Card, CardTitle, CardInfo } from '../styles/CardStyles';

const ArmaCard = ({ arma }) => (
  <Card>
    <CardTitle>{arma.nome_arma}</CardTitle>
    <CardTitle><strong>Tipo:</strong> {arma.tipo_arma}</CardTitle>
    <CardTitle><strong>Dano:</strong> {arma.dano_arma}</CardTitle>
    <CardTitle><strong>Alcance:</strong> {arma.alcance_arma} metros</CardTitle>
  </Card>
);

export default ArmaCard;