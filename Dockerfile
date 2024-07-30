FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Run
CMD npm run prisma:generate-migrations && npm run prisma:apply-migrations && npm run start
