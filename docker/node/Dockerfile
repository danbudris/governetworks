FROM node:latest
MAINTAINER dan budris <dbudris@bu.edu>

RUN apt-get update -y
RUN apt-get install -y \ 
                       vim \
                       wget \
                       git

RUN npm -g install mongodb request pm2

RUN cd /srv && git clone https://github.com/danbudris/governetworks.git

CMD pm2 start /srv/governetworks/backend/hello.js && tail -f /dev/null
