# Build the infrastructure for running the app locally
### Infrastructure Components
Nginx: reverse proxy listening for connections locally on 8888; forwards /test to the node app

Node: node.js server running the backend logic for the application, including parsing and managing the member data

Mongo: document store for holding the base data and, in the future, user configurations and views

### Docker Compose
To run the application locally, follow the below steps:
0. Download and install docker community edition
1. Run the Docker Compose to spin up the application environment.  Run this in the directory with the docker-compose file.
	1. docker-compose up -d --build
2. Connect to the sever
	1. http://127.0.0.1:8888/test
