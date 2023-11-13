# Find A Friend

## Regras da aplicação

- [x] Deve ser possível cadastrar um pet
  - name
  - type ('cachorro', 'gato', 'outro')
  - about ('300 char')
  - age ('filhote , 'adulto', 'idoso')
  - size ('pequeno', 'médio', 'grande')
  - energy ('muito baixa', 'baixa', 'média', 'alta', 'muito alta')
  - independent ('baixo', 'médio', 'alto')
  - environment ('pequeno', 'médio', 'grande', ')
  - photos String[]
  - city ('SP,São Paulo')
  - requirements String[]
  - org_id `Esse ID tem que vir dos cookies depois quando fizer o login`
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
  - email
  - password_hash
  - person_responsible
  - cep
  - address
  - latitude
  - longitude
  - whatsapp
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
