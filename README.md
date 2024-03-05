
### Starting the containers
```bash
docker fasdf -f Docker-compose.dev.yml up --build -d
```

### Accessing the Application container
```bash
docker attach diary_web-server
```

### Accessing the Application container
```bash
docker attach diary_web-server
```

### Install 
```bash
npm install
```

### Running the migrations
```bash
npm run exec:migration
```

### Running the application in development mode in the container
```bash
npm run start:dev
```

