interface Equipamento {
    id: number;
    nome: string;
    categoria: string;
    atributoPrim: string;
    valorAtri: number;
  }
  
  const equipamentos: Equipamento[] = [
    { id: 1, nome: 'Colete balístico', categoria: 'Defesa', atributoPrim: 'Resistência', valorAtri: 50 },
    { id: 2, nome: 'Luvas reforçadas', categoria: 'Defesa', atributoPrim: 'Agilidade', valorAtri: 20 },
  ];
  
  export { Equipamento, equipamentos };  