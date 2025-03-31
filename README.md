# 🚀 Projeto CredutPay | challenge-backend-credutpay

Este projeto é uma aplicação web construída com **Python e Django** no backend e **React** no frontend.

## 🌐 Informações sobre o Backend
1. Desenvolvido com **Python**, utilizando **Django** e **Django REST Framework**.  
2. Implementa autenticação **JWT**, exigindo o envio do token no formato **Bearer** nas requisições.  
3. Utiliza **PostgreSQL** como banco de dados, com **PgAdmin** para gerenciamento.  
4. Todas as APIs seguem os padrões **RESTful**.  
5. Inclui um script para **popular o banco de dados** com dados fictícios para demonstração.  
6. Contém **testes automatizados**, garantindo a estabilidade e segurança do sistema.  
7. Qualidade de código garantida através do uso de **Linters**, com **Flake8** para análise estática, **Black** para formatação automática e **Isort** para organização das importações, assegurando consistência e boas práticas no desenvolvimento.

## 🌐 Informações sobre o Frontend
1. **Interface do usuário** desenvolvida com **React**, utilizando **hooks** como `useState` e `useEffect` para gerenciar estados e realizar requisições assíncronas.
2. **Estilização** utilizando **CSS** e classes personalizadas, com uma estrutura modularizada para facilitar a manutenção e reutilização dos componentes.
3. **Componente de listagem de transferências**:
   - Exibe uma tabela com as transferências, incluindo informações como ID, remetente, destinatário, valor e data.
   - Permite filtrar as transferências por **data de início**, **data de fim** e **nome do remetente** (caso o usuário seja um superusuário).
4. **Filtros dinâmicos**:
   - Utiliza inputs de data para permitir ao usuário especificar um intervalo de tempo para a exibição das transferências.
   - Adiciona a funcionalidade de pesquisa pelo nome do remetente, visível apenas para superusuários.
5. **Integração com o back-end**:
   - Realiza requisições à API RESTful do back-end utilizando o **token JWT** para autenticação.
   - As transferências são recuperadas da API e exibidas dinamicamente na interface.
6. **Permissões**:
   - O usuário **Administrador** pode criar novos usuários, visualizar todas as transferências realizadas por qualquer usuário e filtrar as transferências por remetente, ou seja, pode pesquisar transferências feitas por um usuário específico.
   - O usuário **Cliente** não pode criar novos usuários, ele pode visualizar apenas as transferências realizadas por ele próprio e o filtro por remetente estará desativado, já que ele só pode visualizar suas próprias transferências.

---

## 🛠 Requisitos  

Antes de começar, certifique-se de ter os seguintes requisitos instalados:  

- [Python 3.9+](https://www.python.org/downloads/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [PgAdmin](https://www.pgadmin.org/download/)  
- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)  

Agora, clone o repositório:  

```bash
# Via SSH
git clone git@github.com:pedroiegler/challenge-backend-credutpay.git

# Via HTTPS
git clone https://github.com/pedroiegler/challenge-backend-credutpay.git
```

---

## ⚙️ Configuração do Backend (Python/Django)  

Acesse o diretório do backend e siga os passos abaixo:  

1️⃣ **Crie e ative um ambiente virtual:**  
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

2️⃣ **Instale as dependências:**  
```bash
pip install -r requirements.txt
```

3️⃣ **Configure as variáveis de ambiente:**  
```bash
cp .env.example .env
```
> **Edite o arquivo `.env` conforme necessário.**  

4️⃣ **Execute as migrações iniciais:**  
```bash
python manage.py migrate
```

5️⃣ **Popule o banco de dados com dados fictícios:**  
```bash
python manage.py shell < populate_db.py
```

### 📌 Dados populados  
O script cadastra **3 usuários** (1 admin e 2 clientes), já com carteiras e uma transação de exemplo.  

- **Usuário 1 (Admin)**  
  - `username: admin_demo`  
  - `senha: admin123`  
  - **Permissão:** pode gerenciar usuários.  

- **Usuário 2 (Cliente)**  
  - `username: cliente1`  
  - `senha: cliente123`  

- **Usuário 3 (Cliente)**  
  - `username: cliente2`  
  - `senha: cliente123`  

### ⛁ Modelo do Banco de Dados
- Completo:
<img src="backend/assets/full_model.png" alt="Modelo Completo" width="500">

- Simples:
<img src="backend/assets/simple_model.png" alt="Modelo Simples" width="500">

6️⃣ **Inicie o servidor Django:**  
```bash
python manage.py runserver
```

---

## 🔧 Scripts úteis  

### ✅ Executar testes automatizados  
```bash
pytest
```

### 🛠 Executar testes automatizados  
- **Flake8: Para verificar a conformidade do código com as regras de estilo e qualidade.**
  ```bash
  flake8 .
  ```

- **Black: Para formatação automática do código Python.**
  ```bash
  black .
  ```

- **Isort: Para organizar e classificar as importações de acordo com as convenções.**
  ```bash
  isort .
  ```

### 📌 Gerar diagrama do banco de dados  

Os diagramas já foram gerados e estão disponíveis no diretório `backend/db`.  

- **Diagrama Simples:**  
  ```bash
  python manage.py graph_models wallet -g -o models.png
  ```  
- **Diagrama Completo:**  
  ```bash
  python manage.py graph_models -a -o models.png
  ```

### 🛠 Gerenciar migrações  
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations
```

---

## ⚙️ Configuração do Frontend (React)  

Acesse o diretório do frontend e siga os passos abaixo:  

1️⃣ **Instale as dependências do projeto:**  
```bash
npm install
```

2️⃣ **Inicie o servidor de desenvolvimento do React:**  
```bash
npm start
```

---

## 🛠 Tecnologias utilizadas  

- **Backend:**  
  - Python  
  - Django  
  - Django REST Framework  
  - PostgreSQL  
  - PgAdmin  

- **Frontend:**  
  - React  
  - React Hooks (`useState`, `useEffect`, `useCallback`)  
  - CSS  
  - JWT (para autenticação no lado do cliente)  

---

## 📬 Contato  

Caso tenha dúvidas, entre em contato:  

📧 E-mail: [pedroiegler1601@outlook.com](mailto:pedroiegler1601@outlook.com)  