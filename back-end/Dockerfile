FROM node:18
WORKDIR /app
COPY package.json tsconfig.json ./
COPY . .
RUN yarn
# for now start in dev mode
CMD ["yarn", "dev"]