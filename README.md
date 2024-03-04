
### Starting the containers
```bash
docker compose -f Docker-compose.dev.yml up --build -d
```

### Running the migrations
```bash
npm run exec:migration
```

### Accessing the Application container
```bash
docker attach diary_web-server
```

### Running the application in development mode in the container
```bash
npm run start:dev
```

