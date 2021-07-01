# CrudCar

![Capa do Projeto](https://redegil.com.br/wp-content/uploads/2019/05/checkup.jpg)

# Sobre o Projeto

 Um sistema Web com funções de CRUD visando compra e venda de carros, onde foi utilizado para se ter uma interface responsiva o Bootstrap, e maior usabilidade, além de estética Font Awesome, adicionando ícones aos botões. Para armazenar dados um banco de dados (SQL), de modo a se ter organização, e por fim, para a comunicação entre ambos foi criado uma API em node.js com suas devidas dependências necessárias para tal, sendo elas: express, body-parser, cors, mysql e nodemon.


# Índice/Sumário

* [Sobre](#sobre-o-projeto)
* [Sumário](#índice/sumário)
* [Requisitos Funcionais](#requisitos-funcionais)
* [Tecnologias Usadas](#tecnologias-usadas)
* [Como Usar](#como-usar)
* [Autores](#autores)
* [Referências](#referências)


# Requisitos Funcionais 

- [x] **Crud completo de um carro e sua venda:** Cadastrar, vizualizar, editar e remover
- [x] **Filtro para exibição de carros (Vendidos e disponíveis)**
- [x] **Exibir valores totais:** Compra, venda, lucro e comissões
- [x] **API para a comunicação da aplicação com o banco de dados**
- [x] **Armazenar dados em um banco SQL**
- [x] **Reorganização de dados no banco**
- [ ] Validação de campos
- [ ] Detalhes de usabilidade a serem acrescentados

# Tecnologias Usadas

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [XAMPP](https://www.apachefriends.org)

# Como Usar

* *É nescessário que se tenha o node.js e o npm instalados ([Clique aqui para baixar e instalar](https://nodejs.org/en/download/)), além de um servido SQL, de preferência o XAMPP, o qual foi utilizado.*

**Preparar o setup do projeto**

- Crie um projeto node com o comando **"npm init"**.
- Baixe e extraia os arquivos dentro da pasta raiz do projeto criado.
- Na pasta do projeto, instale as dependências para a API com o camando: **"npm install express mysql body-parser cors"**
- Instale também o nodemon com o camando: **"npm install --save--dev nodemon"**

**Preparar o banco de dados**

- Com o XAMPP instalado, inicie os servidores de Apashe e SQL, e clique em "Admin" no serivor SQL.
- Crie uma tabela com o nome **"crudcar_bd"**, e na aba SQL execute o script do projeto ("CrudCarBD").

*No script do banco contém alguns dados para testes*

**Executando o Projeto**

- Com o servidor SQL ligado, na pasta do projeto utilize o comando **"node app"**, se tudo der certo irá aparece a mensagem: **"Executando na porta: 5000"**.
Após isso basta abrir o arquivo **index.html** no seu navegador e utilizar o sistema.

# Autores

[Marcos Alves Ramos](https://github.com/SoulSocram)

# Licença

Este projeto está licenciado sob a Licença MIT,  consulte o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

# Referências

[RaddyTheBrand](https://www.youtube.com/watch?v=f5kye3ESXE8&t=2380s)
