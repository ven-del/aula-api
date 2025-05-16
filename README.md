# Tutorial: Utilizando a API do IBGE

Este documento explica como foi desenvolvida uma aplicação web simples que consome a API do IBGE para listar estados e municípios do Brasil.

## Visão Geral do Projeto

O projeto consiste em uma página web que permite ao usuário selecionar um estado brasileiro e, em seguida, um município desse estado. As informações são obtidas em tempo real através da API pública do IBGE.

## Estrutura do Projeto

- `index.html`: Interface do usuário com elementos de seleção
- `app.js`: Código JavaScript que faz as requisições à API e manipula os dados
- `README.md`: Este arquivo de documentação

## Decisões de Implementação

### 1. Escolha da API

Optei por utilizar a API de Localidades do IBGE pelos seguintes motivos:

- **Oficial e confiável**: Dados mantidos por um órgão oficial do governo brasileiro
- **Gratuita e sem autenticação**: Não requer chave de API ou cadastro
- **Bem documentada**: Possui documentação clara e exemplos
- **Formato JSON**: Retorna dados em formato fácil de processar

### 2. Arquitetura da Aplicação

Decidi criar uma aplicação frontend pura (sem backend) porque:

- **Simplicidade**: Para este caso de uso, não é necessário um servidor intermediário
- **Performance**: As requisições são feitas diretamente do navegador para a API
- **Facilidade de implantação**: Basta um servidor web estático

### 3. Interface do Usuário

A interface foi projetada com os seguintes princípios:

- **Minimalista**: Apenas os elementos necessários para a funcionalidade
- **Intuitiva**: Fluxo natural de seleção (estado → município)
- **Responsiva**: Adaptável a diferentes tamanhos de tela
- **Feedback visual**: Exibição clara das informações selecionadas

## Como Funciona o Código

### Endpoints da API Utilizados

```
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
```

### Fluxo de Execução

1. **Carregamento inicial**:
   - Quando a página é carregada, a função `carregarEstados()` é executada
   - Esta função faz uma requisição à API do IBGE para obter todos os estados
   - Os estados são ordenados alfabeticamente e adicionados ao primeiro dropdown

2. **Seleção de estado**:
   - Quando o usuário seleciona um estado, o evento `change` é disparado
   - A função `carregarMunicipios(uf)` é chamada com a sigla do estado selecionado
   - Esta função faz uma requisição à API do IBGE para obter os municípios do estado
   - Os municípios são ordenados alfabeticamente e adicionados ao segundo dropdown

3. **Seleção de município**:
   - Quando o usuário seleciona um município, o evento `change` é disparado
   - A função `mostrarInformacoes()` é chamada para atualizar as informações exibidas

### Tratamento de Erros

O código inclui tratamento de erros para lidar com falhas nas requisições:

- Verificação do status da resposta (`response.ok`)
- Blocos `try/catch` para capturar exceções
- Feedback visual para o usuário em caso de erro
- Mensagens de erro no console para depuração

## Decisões Técnicas Específicas

### Uso de Async/Await

Optei por usar `async/await` em vez de Promises encadeadas porque:

- **Legibilidade**: Código mais limpo e fácil de entender
- **Tratamento de erros**: Simplifica o uso de try/catch
- **Sequência lógica**: O código flui de maneira mais natural

### Ordenação dos Dados

Decidi ordenar os estados e municípios alfabeticamente porque:

- **Usabilidade**: Facilita a localização de itens específicos
- **Consistência**: A API não garante uma ordem específica nas respostas
- **Expectativa do usuário**: Usuários esperam listas alfabéticas em dropdowns

### Exibição Condicional

O dropdown de municípios só é exibido após a seleção de um estado porque:

- **Simplificação**: Reduz a complexidade visual inicial
- **Prevenção de erros**: Evita que o usuário tente selecionar um município sem selecionar um estado
- **Fluxo guiado**: Conduz o usuário através do processo correto

## Como Expandir Este Projeto

Este projeto pode ser expandido de várias maneiras:

1. **Adicionar mais dados**: Incluir informações demográficas, econômicas ou geográficas
2. **Visualização em mapa**: Integrar com bibliotecas de mapas como Leaflet ou Google Maps
3. **Persistência**: Salvar seleções do usuário em localStorage
4. **Filtros adicionais**: Adicionar filtros por região, população, etc.

## Conclusão

Este projeto demonstra como consumir uma API pública de forma simples e eficiente, criando uma interface útil para seleção de localidades brasileiras. As decisões de implementação foram tomadas priorizando simplicidade, usabilidade e boas práticas de desenvolvimento web.