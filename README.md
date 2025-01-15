# Sixchains ToDo

Este é um aplicativo de lista de tarefas desenvolvido com Nuxt.js, Vuetify, Pinia e Firebase.

## Requisitos

- Node.js (versão 22.13.0)
- npm ou yarn

## Configuração do Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/marcelochaves92/sixchains-todo.git
    cd sixchains-todo
    ```

2. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Configure o Firebase:
    - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
    - Adicione um aplicativo web ao projeto e copie as configurações do Firebase.
    - Substitua as configurações do Firebase no arquivo `plugins/firebase.client.js` com as suas configurações.

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Estrutura do Projeto

- `components/`: Componentes Vue reutilizáveis.
- `pages/`: Páginas do aplicativo.
- `plugins/`: Plugins do Nuxt.js.
- `stores/`: Stores do Pinia para gerenciamento de estado.
- `nuxt.config.ts`: Configurações do Nuxt.js.

## Funcionalidades

### Adicionar Tarefa

Adiciona uma nova tarefa ao Firestore e atualiza a lista de tarefas.

### Editar Tarefa

Edita uma tarefa existente no Firestore e atualiza a lista de tarefas.

### Deletar Tarefa

Deleta uma tarefa existente no Firestore e atualiza a lista de tarefas.

### Carregar Tarefas

Carrega todas as tarefas do Firestore e atualiza a lista de tarefas.

## Componentes

### TodoItem.vue

Componente que representa um item de tarefa. Inclui botões para editar e deletar a tarefa.

### Index.vue

Página principal do aplicativo. Inclui a lista de tarefas e formulários para adicionar e editar tarefas.

## Stores

### todo.js

Store do Pinia para gerenciamento de tarefas. Inclui ações para adicionar, editar, deletar e carregar tarefas.

## Plugins

### firebase.client.js

Plugin para inicializar o Firebase e fornecer o Firestore para o aplicativo.

## Configurações do Nuxt.js

### nuxt.config.ts

Configurações do Nuxt.js, incluindo módulos e plugins utilizados no projeto.

## Licença

Este projeto está licenciado sob a licença MIT.