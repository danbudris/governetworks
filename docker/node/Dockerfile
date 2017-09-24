FROM node:latest
MAINTAINER dan budris <dbudris@bu.edu>

RUN apt-get update -y
RUN apt-get install -y \ 
                       vim \
                       wget \
                       git

RUN npm install mongodb request pm2

RUN cd /srv && git clone https://github.com/danbudris/governetworks.git

CMD /srv/governetworks/backend/hello.js
