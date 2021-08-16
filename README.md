
<br />
<p align="center">
  <h2 align="center">Gamefy (nome provisório)</h2>

  <p align="center">
    Voltado para engajamento de times ou grupos, a aplicação busca trazer interatividade e diversão para alcançar determinadas metas definidas pelo lider do grupo contando com elementos de gamificação.
    <br />
  </p>
</p>

<br />

## Funcionalidades
WIP

<br />

### Instalando
A aplicação pode ser executado dentro de um container da seguinte forma:
```bash
docker-compose up # inicia os container da base de dados e da aplicação
docker exec -it gamefy_app_1 yarn typeorm migration:run # executa as migrations necessárias
```

### Executando os testes
Os testes, feitos utilizando Jest, podem ser executados através do comando:
```bash
docker exec -it gamefy_app_1 yarn test
```