FROM node

ARG PORT=3000


#ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_6
ENV CLIENT_FILENAME instantclient-basiclite-linuxx64.zip

WORKDIR    /opt/oracle
RUN ["chmod", "+x", "/opt/oracle"]
RUN        apt-get update && apt-get install -y libaio1 wget unzip \
            && wget https://download.oracle.com/otn_software/linux/instantclient/${CLIENT_FILENAME} \
            && unzip ${CLIENT_FILENAME} \
            && rm -f ${CLIENT_FILENAME} \
            && cd /opt/oracle/instantclient* \
            && rm -f *jdbc* *occi* *mysql* *README *jar uidrvci genezi adrci \
            && echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf \
            && ldconfig

# Install Node express API
WORKDIR /api

# Set node environment to production
ENV NODE_ENV production

# Update the system - used with alpine images
#RUN apk --no-cache -U upgrade

# Update npm first
RUN npm install -g npm

# Install PM2: Advanced process manager for production Node.js applications. Load balancer, logs facility, startup script, micro service management, at a glance.
RUN npm i -g pm2

# Copy package.json, package-lock.json and process.yml
COPY package*.json process.yml ./

# Prepare destination directory and ensure user node owns it
RUN chown -R node:node /api

# Switch to node user
USER node

# Install libraries as user node
RUN npm i --only=production
# COPY ./src /api
# Copy the rest of the code
COPY . .  

# Open desired port
EXPOSE ${PORT}

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"] 
# Use js files to run the application
#ENTRYPOINT ["node", "./src/index.js"]
#CMD ["npm", "start"]