FROM node:16
RUN mkdir -p /app
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN ls
RUN npm run build
EXPOSE 8080
# RUN chmod +x start.sh

CMD [ "node", "./main.ts" ]