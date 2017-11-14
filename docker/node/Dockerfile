FROM node:latest
MAINTAINER dan budris <dbudris@bu.edu>

RUN apt-get update -y
RUN apt-get install -y \ 
                       vim \
                       wget \
                       git

RUN cd /srv && git clone https://github.com/danbudris/governetworks.git

RUN cd /srv/governetworks/backend && npm install pg request init express vis && npm install -g pm2

CMD pm2 start /srv/governetworks/backend/serve.js && tail -f /dev/null
