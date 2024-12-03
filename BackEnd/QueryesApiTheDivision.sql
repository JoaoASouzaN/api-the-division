create database apithedivision ;

use apithedivision;

CREATE TABLE Armas (
  id_arma INT PRIMARY KEY AUTO_INCREMENT,
  nome_arma VARCHAR(255) NOT NULL,
  dano_arma INT NOT NULL,
  tipo_arma VARCHAR(255) NOT NULL,
  danoCritico_arma INT NOT NULL,
  taxaDisparo_arma FLOAT NOT NULL,
  alcance_arma INT NOT NULL
);

CREATE TABLE Build (
  id_build INT PRIMARY KEY AUTO_INCREMENT,
  nome_build VARCHAR(255) NOT NULL,
  descricao_build TEXT,
  data_criacao DATE NOT NULL
);

CREATE TABLE Equipamentos (
  id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
  nome_equipamento VARCHAR(255) NOT NULL,
  categoria_equipamento VARCHAR(255) NOT NULL,
  atributoPrim_equipamento VARCHAR(255) NOT NULL,
  valorAtri_equipamento INT NOT NULL
);

CREATE TABLE Compoem (
  id_build INT NOT NULL,
  id_arma INT NOT NULL,
  PRIMARY KEY (id_build, id_arma),
  FOREIGN KEY (id_build) REFERENCES Build(id_build),
  FOREIGN KEY (id_arma) REFERENCES Armas(id_arma)
);

CREATE TABLE Possue (
  id_build INT NOT NULL,
  id_equipamento INT NOT NULL,
  PRIMARY KEY (id_build, id_equipamento),
  FOREIGN KEY (id_build) REFERENCES Build(id_build),
  FOREIGN KEY (id_equipamento) REFERENCES Equipamentos(id_equipamento)
);

-- Inserir Armas de Assalto
INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
VALUES ('Rifle de Assalto Alpha', 45, 'Assalto', 90, 0.8, 300),
       ('Rifle de Assalto Bravo', 50, 'Assalto', 100, 0.75, 320),
       ('Rifle de Assalto Charlie', 48, 'Assalto', 95, 0.78, 310),
       ('Rifle de Assalto Alpha', 45, 'Assalto', 90, 0.8, 300),
       ('Rifle de Assalto Bravo', 50, 'Assalto', 100, 0.75, 320),
       ('Rifle de Assalto Charlie', 48, 'Assalto', 95, 0.78, 310),
       ('Rifle de Assalto Delta', 52, 'Assalto', 105, 0.72, 330),
       ('Rifle de Assalto Echo', 55, 'Assalto', 110, 0.7, 340),
       ('Rifle de Assalto Foxtrot', 50, 'Assalto', 100, 0.75, 320),
       ('Carabina de Assalto', 48, 'Assalto', 95, 0.78, 310),
       ('Fuzil de Assalto', 58, 'Assalto', 115, 0.65, 350);

-- Inserir Armas de Sniper
INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
VALUES ('Sniper Delta', 90, 'Sniper', 180, 0.5, 800),
       ('Sniper Echo', 95, 'Sniper', 190, 0.45, 850),
       ('Sniper Foxtrot', 92, 'Sniper', 185, 0.48, 820),
       ('Sniper Delta', 90, 'Sniper', 180, 0.5, 800),
       ('Sniper Echo', 95, 'Sniper', 190, 0.45, 850),
       ('Sniper Foxtrot', 92, 'Sniper', 185, 0.48, 820),
       ('Sniper Golf', 100, 'Sniper', 200, 0.4, 900),
       ('Sniper Hotel', 105, 'Sniper', 210, 0.35, 950),
       ('Sniper India', 102, 'Sniper', 205, 0.38, 920),
       ('Sniper Juliet', 108, 'Sniper', 215, 0.32, 980),
       ('Sniper Kilo', 110, 'Sniper', 220, 0.3, 1000);

-- Inserir Armas de Submetralhadora
INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
VALUES ('SMG Golf', 30, 'Submetralhadora', 60, 1.2, 200),
       ('SMG Hotel', 32, 'Submetralhadora', 64, 1.15, 210),
       ('SMG India', 31, 'Submetralhadora', 62, 1.18, 205),
       ('SMG Golf', 30, 'Submetralhadora', 60, 1.2, 200),
       ('SMG Hotel', 32, 'Submetralhadora', 64, 1.15, 210),
       ('SMG India', 31, 'Submetralhadora', 62, 1.18, 205),
       ('SMG Lima', 35, 'Submetralhadora', 70, 1.1, 220),
       ('SMG Mike', 38, 'Submetralhadora', 75, 1.05, 230),
       ('SMG November', 36, 'Submetralhadora', 72, 1.08, 225),
       ('SMG Oscar', 40, 'Submetralhadora', 80, 1.0, 240),
       ('SMG Papa', 42, 'Submetralhadora', 85, 0.95, 250);

-- Inserir Equipamentos de Defesa
INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
VALUES ('Colete Tatico', 'Defesa', 'Resistencia', 50),
       ('Capacete Balistico', 'Defesa', 'Resistencia', 40),
       ('Luvas de Combate', 'Defesa', 'Resistencia', 30),
       ('Colete Tatico Avancado', 'Defesa', 'Resistencia', 60),
       ('Capacete Balistico Avancado', 'Defesa', 'Resistencia', 55),
       ('Luvas de Combate Avancadas', 'Defesa', 'Resistencia', 45),
       ('Botas de Combate', 'Defesa', 'Resistencia', 40),
       ('Cinto de Seguranca', 'Defesa', 'Resistencia', 35);

-- Inserir Equipamentos de Ataque
INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
VALUES ('Luvas de Ataque', 'Ataque', 'Forca', 20),
       ('Botas de Assalto', 'Ataque', 'Forca', 25),
       ('Cinto de Municao', 'Ataque', 'Forca', 15),
       ('Luvas de Ataque Avancadas', 'Ataque', 'Forca', 25),
       ('Botas de Assalto Avancadas', 'Ataque', 'Forca', 30),
       ('Cinto de Municao Avancado', 'Ataque', 'Forca', 20),
       ('Fivelas de Combate', 'Ataque', 'Forca', 15),
       ('Punho de Combate', 'Ataque', 'Forca', 10);

-- Inserir Equipamentos de Suporte
INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
VALUES ('Kit Medico', 'Suporte', 'Cura', 30),
       ('Mochila de Suprimentos', 'Suporte', 'Cura', 25),
       ('Drone de Suporte', 'Suporte', 'Cura', 35),
       ('Kit Medico Avancado', 'Suporte', 'Cura', 40),
       ('Mochila de Suprimentos Avancada', 'Suporte', 'Cura', 35),
       ('Drone de Suporte Avancado', 'Suporte', 'Cura', 45),
       ('Sistema de Recarga', 'Suporte', 'Cura', 30),
       ('Equipamento de Primeiros Socorros', 'Suporte', 'Cura', 25);

INSERT INTO Build (nome_build, descricao_build, data_criacao)
VALUES
('Build de Assalto', 'Build para jogadores que preferem o estilo de jogo agressivo', '2022-01-01'),
('Build de Suporte', 'Build para jogadores que preferem ajudar a equipe', '2022-01-15'),
('Build de Sniper', 'Build para jogadores que preferem o estilo de jogo de longa distância', '2022-02-01'),
('Build de Tank', 'Build para jogadores que preferem absorver dano', '2022-02-15'),
('Build de Invasão', 'Build para jogadores que preferem o estilo de jogo rápido e agressivo', '2022-03-01'),
('Build de Sobrevivência', 'Build para jogadores que preferem o estilo de jogo defensivo', '2022-03-15'),
('Build de Equipe', 'Build para jogadores que preferem jogar em equipe', '2022-04-01'),
('Build de Furtividade', 'Build para jogadores que preferem o estilo de jogo furtivo', '2022-04-15'),
('Build de Dano Crítico', 'Build para jogadores que preferem causar dano crítico', '2022-05-01'),
('Build de Controle', 'Build para jogadores que preferem controlar o campo de batalha', '2022-05-15');


-- Inserir composição de Builds e Armas
INSERT INTO Compoem (id_build, id_arma)
VALUES
(1, 1), -- Build de Assalto com Rifle de Assalto Alpha
(1, 3), -- Build de Assalto com Rifle de Assalto Charlie
(2, 5), -- Build de Suporte com SMG Golf
(2, 8), -- Build de Suporte com SMG Oscar
(3, 10), -- Build de Sniper com Sniper Delta
(3, 12), -- Build de Sniper com Sniper Foxtrot
(4, 2), -- Build de Tank com Rifle de Assalto Bravo
(4, 6), -- Build de Tank com Carabina de Assalto
(5, 4), -- Build de Invasão com SMG Hotel
(5, 9), -- Build de Invasão com SMG Papa
(6, 11), -- Build de Sobrevivência com Sniper Echo
(6, 13), -- Build de Sobrevivência com Sniper Juliet
(7, 7), -- Build de Equipe com Rifle de Assalto Echo
(7, 14), -- Build de Equipe com Fuzil de Assalto
(8, 15), -- Build de Furtividade com SMG Lima
(8, 16), -- Build de Furtividade com SMG Mike
(9, 17), -- Build de Dano Crítico com Sniper Golf
(9, 18), -- Build de Dano Crítico com Sniper Hotel
(10, 19), -- Build de Controle com Rifle de Assalto Delta
(10, 20); -- Build de Controle com Carabina de Assalto Avancada

INSERT INTO Possue (id_build, id_equipamento)
VALUES
(1, 1),
(1, 5),
(1, 10),
(2, 2),
(2, 6),
(2, 12),
(3, 3),
(3, 7),
(3, 14),
(4, 4),
(4, 8),
(4, 16),
(5, 9),
(5, 11),
(5, 18),
(6, 1),
(6, 13),
(6, 20),
(7, 15),
(7, 19),
(7, 22),
(8, 5),
(8, 10),
(8, 24),
(9, 6),
(9, 12),
(9, 21),

(10, 3),
(10, 9),
(10, 23);

SELECT * FROM Armas