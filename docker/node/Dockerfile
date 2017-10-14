FROM node:latest
MAINTAINER dan budris <dbudris@bu.edu>

RUN apt-get update -y
RUN apt-get install -y \ 
                       vim \
                       wget \
                       git

RUN cd /srv && git clone https://github.com/danbudris/governetworks.git

RUN cd /srv/governetworks/backend && npm -g install pg request pm2 init express vis

CMD pm2 start /srv/governetworks/backend/serve.js && tail -f /dev/null
