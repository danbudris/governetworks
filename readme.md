### PURPOSE
The purpose of governetwork will be to provide an appealing, mimimalist front-end for visualizing data about political organizations and their members.

The first iteration of Governetwork will be a local, browser-based application which will visualize the 115th Senate of the United States, allowing visualization and filtering along the vectors of committ
ee, party, and campaign contributions.

### Installation
This version of Governetwork is a local application which relies on Docker.  To install Governetwork:
1. install Docker Community Edition
2. Copy the governetwork repo to your local machine
3. Execute the following docker compose command in the directory ./docker
        1. docker-compose up -d --build
4. Connect to Governetwork home page in a browser:
        1. http://127.0.0.1:8888/workspace
