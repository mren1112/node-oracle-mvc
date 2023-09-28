# FROM keymetrics/pm2:latest-alpine
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN npm install --production --silent && mv node_modules ../
# RUN npm install --production
RUN npm install -g npm@10.1.0

COPY . .
RUN ls -lh
RUN mv instantclient /usr/lib/instantclient
RUN apk --no-cache add libaio libnsl libc6-compat curl && \
    cd /tmp && \ 
   #  mv instantclient*/ /usr/lib/instantclient && \ 
    ln -s /usr/lib/instantclient/libclntsh.so /usr/lib/libclntsh.so && \
    # ln -s /usr/lib/instantclient/libclntsh.so.19.1 /usr/lib/libclntsh.so && \
    ln -s /usr/lib/instantclient/libocci.so.19.1 /usr/lib/libocci.so && \
    ln -s /usr/lib/instantclient/libociicus.so /usr/lib/libociicus.so && \
    ln -s /usr/lib/instantclient/libnnz19.so /usr/lib/libnnz19.so && \
    ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
    ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
    ln -s /lib64/ld-linux-x86-64.so.2 /usr/lib/ld-linux-x86-64.so.2 

RUN mkdir -p /usr/lib/instantclient/lib \
    cp /usr/instantclient/libclntsh.so /usr/lib/instantclient/lib/libclntsh.so  

RUN export LD_LIBRARY_PATH=/usr/lib/instantclient:$LD_LIBRARY_PATH
# RUN ldconfig
 
RUN apk add nano
RUN apk add --no-cache tzdata
RUN apk add openntpd

ENV LD_LIBRARY_PATH /usr/lib/instantclient 
ENV ORACLE_BASE /usr/lib/instantclient
ENV TNS_ADMIN /usr/lib/instantclient/network/admin
ENV ORACLE_HOME /usr/lib/instantclient
RUN chown -R node /usr/src/app
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
USER node
EXPOSE 3555
# RUN pm2 install pm2-logrotate
CMD ["npm", "start"]
# CMD ["pm2-runtime", "start", "system_prod.config.js", "--env", "production"]