<h1 align="center">Balance API</h1>

O objetivo dessa api é expor endpoints simples (`/balance`, `/event` e `/reset`) usando um repositório em memória, sem qualquer mecanismo de persistência.

## Tecnologias

- [NestJS 11](https://nestjs.com) + TypeScript
- `class-validator` + `class-transformer` para validação de DTOs

## Como executar

```bash
npm install
npm run start:dev
```

O servidor sobe em `http://localhost:3000`.

## Endpoints

### `POST /reset`
Zera todas as contas em memória. Resposta: `200 OK` com corpo `OK`.

### `GET /balance?account_id=<id>`
- Conta inexistente → `404` com corpo `0`
- Conta existente → `200` com o saldo como texto (`"20"`)

### `POST /event`
Recebe um JSON com `type` (`deposit` | `withdraw` | `transfer`) e os campos necessários:

| Tipo      | Campos obrigatórios                  | Resposta (201)                                   |
|-----------|---------------------------------------|--------------------------------------------------|
| deposit   | `destination`, `amount`              | `{"destination":{"id":"<id>","balance":<value>}}`|
| withdraw  | `origin`, `amount`                   | `{"origin":{"id":"<id>","balance":<value>}}`     |
| transfer  | `origin`, `destination`, `amount`    | `{"origin":{...},"destination":{...}}`           |


Os retornos esperados são exatamente os listados no enunciado do desafio.

---
