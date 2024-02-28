
### Subindo os containers
```bash
docker compose -f Docker-compose.dev.yml up --build -d
```

### Rodando as migrações
```bash
npm run exec:migration
```

### Acessando o container da Aplicação
```bash
docker attach diary_web-server
```

### Rodando a aplicação em modo de desenvolvimento no container
```bash
npm run start:dev
```

