interface Possue {
    id_build: number;
    id_equipamento: number;
  }
  
  const possue: Possue[] = [
    { id_build: 1, id_equipamento: 1 },
    { id_build: 1, id_equipamento: 2 },
    // Adicione mais relacionamentos conforme necessário
  ];
  
  export { Possue, possue };  