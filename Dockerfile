FROM node:20

WORKDIR /app
USER node

COPY --chown=node:node package.json yarn.lock tsconfig.json .yarnrc /app/

RUN yarn install --non-interactive --no-progress --frozen-lockfile

COPY . /app
ENV NODE_ENV=production
RUN yarn build

CMD ["node", "./dist/src/index.js"]
