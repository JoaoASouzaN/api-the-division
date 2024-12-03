# **API The Division**  

Opa! Bem-vindo à API The Division! Esta API foi desenvolvida com Node.js, TypeScript e MySQL, utilizando o Knex como query builder, express para configuração de variaveis do sistema, o winston para criar o arquivo para log dos erros. Essa API foi desenvolvida para um trabalho da faculdade de Analise e Desenvolvimento de Sistemas oferece endpoints para buscar, criar, atualizar e deletar armas, builds e equipamentos.

---

## **Documentação da API** 📄

A documentação completa da API, incluindo exemplos de requisições e respostas, está disponível no Postman.  
Acesse a documentação no Postman aqui: **[[Link da Documentação do Postman](https://apipostmanads-24-02.postman.co/workspace/ApiPostmanAds-24-02~be1f82af-f92e-45d4-8c0d-9cb77ef969de/overview)]**.

### Collections: ###
   - **[Armas:](https://documenter.getpostman.com/view/38011165/2sAYBPnaMe)**
   - **[Builds:](https://documenter.getpostman.com/view/38011165/2sAYBPnaMc)**
   - **[Equipamentos:](https://documenter.getpostman.com/view/38011165/2sAYBPnaMd)**

---

## **Instalação** ⚙️

Para instalar a API, você vai precisar de uma IDE, recomendo o **[VSCode](https://visualstudio.microsoft.com/pt-br/downloads/)** ele é muito versatil, o **[Git](https://git-scm.com/downloads)**, o **[Node.js](https://nodejs.org/en/download/package-manager)** e o **[MySql](https://dev.mysql.com/downloads/windows/installer/8.0.html)** e seguir os seguintes passos...

1. Clone o repositório:

Abra a sua IDE e cole o seguinte codigo no terminal

   ```bash
   git clone https://github.com/JoaoASouzaN/api-the-division
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as suas variáveis de ambiente, por exemplo:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx knex migrate:latest
   ```

5. Popule o banco de dados (opcional):
   ```bash
   npx knex seed:run
   ```

---

## **Execução** 🚀

- **Modo de desenvolvimento:**
  ```bash
  npm run dev
  ```

- **Modo de produção:**
  ```bash
  npm run build
  npm start
  ```

---

## **Uso da API** 📡

http://localhost:3000/

### **Endpoints Principais**

**Armas:**
- **[/armas](http://localhost:3000/armas/)** - Lista todas as armas (com paginação).
- **[/armas/2](http://localhost:3000/armas/2)** - Busca uma arma específica por ID.
- **[/armas](http://localhost:3000/armas)** - Cria uma nova arma.
- **[/armas/1](http://localhost:3000/2)** - Atualiza uma arma de ID=2 existente.
- **[/armas/2](http://localhost:3000/2)** - Atualiza campos específicos de uma arma que possue o ID 2.
- **[/armas/1](http://localhost:3000/1)** - Deleta uma arma de ID 1.

**Equipamentos e Builds:**  
Endpoints semelhantes estão disponíveis para manipulação de equipamentos e builds. Consulte a documentação no Postman para detalhes completos e exemplos de requisições.

---

## **Contribuições** 🤝

Contribuições são extremamente bem-vindas! Se você encontrar algum bug ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou pull request. Mais para frente pretendo corrigir os erros e adicionar dados condizentes com o vivenciado durante a jogatina, ainda não faço a menor ideia de como conseguir esses dados e ficarei muito feliz caso você possa me dar alguma dica de como fazer isso.

---