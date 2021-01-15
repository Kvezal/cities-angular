# Cities API


### Description
Backend of the demo project


### Get starting
2) install environments
- npm packages
- docker
- docker-compose
3) execute command to start fake backend:
```bash
docker-compose up -d
```
4) start dev project
```bash
npm start
```


### Stop project
```bash
docker-compose -f docker-compose.dev.yaml down
```


### Docker images
Docker images can public only maintainer of this project.
```bash
./scripts/publish.sh
```
