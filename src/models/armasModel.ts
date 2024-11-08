interface Arma {
    id: number;
    nome: string;
    dano: number;
    tipo: string;
    danoCritico: number;
    taxaDisparo: number;
    alcance: number;
  }
  
  const armas: Arma[] = [
    { id: 1, nome: 'Rifle de precisão', dano: 90, tipo: 'Sniper', danoCritico: 150, taxaDisparo: 0.5, alcance: 1000 },
    { id: 2, nome: 'Pistola', dano: 25, tipo: 'Curta distância', danoCritico: 50, taxaDisparo: 2.0, alcance: 50 },
    // Adicione mais armas conforme necessário
  ];
  
  export { Arma, armas };  