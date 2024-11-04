interface Build {
    id: number;
    nome: string;
    equipamentos: string[];
    armas: string[];
    modificacoes: string[];
  }
  
  const builds: Build[] = [
    { id: 1, nome: 'Build Sniper', equipamentos: ['Colete balístico', 'Luvas reforçadas'], armas: ['Rifle de precisão', 'Pistola'], modificacoes: ['Mira telescópica', 'Estabilizador de recuo'] },
    { id: 2, nome: 'Build Assalto', equipamentos: ['Colete tático', 'Capacete reforçado'], armas: ['Fuzil de assalto', 'Escopeta'], modificacoes: ['Mira holográfica', 'Carregador estendido'] },
    { id: 3, nome: 'Build Tank', equipamentos: ['Escudo balístico', 'Colete à prova de balas'], armas: ['Escopeta', 'SMG'], modificacoes: ['Blindagem reforçada', 'Redução de recuo'] }
  ];
  
  export { Build, builds };  