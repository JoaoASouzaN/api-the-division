import React from 'react';
import { Card, CardTitle, CardInfo } from '../styles/CardStyles';

const EquipamentoCard = ({ equipamento }) => (
  <Card>
    <CardTitle>{equipamento.nome_equipamento}</CardTitle>
    <CardInfo><strong>Categoria:</strong> {equipamento.categoria_equipamento}</CardInfo>
    <CardInfo><strong>Atributo Principal:</strong> {equipamento.atributoPrim_equipamento}</CardInfo>
    <CardInfo><strong>Valor do Atributo:</strong> {equipamento.valorAtri_equipamento}</CardInfo>
  </Card>
);

export default EquipamentoCard;