FROM node:16 AS builder

# ENV NODE_ENV production
# Create app directory
WORKDIR /usr/src/repo

RUN mkdir -p ./apps/cms
RUN mkdir -p ./packages/components

COPY package.json .
COPY yarn.lock .
COPY babel.config.js .
COPY apps/cms ./apps/cms
COPY packages/components ./packages/components

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/repo/apps/cms

COPY ./apps/cms/package.json .
COPY ./apps/cms/yarn.lock .

RUN yarn install --pure-lockfile --non-interactive

# //////////////////

FROM node:16 AS runner

ARG PORT=3000
ARG APP_NAME=sjm

WORKDIR /usr/src/repo

COPY --from=builder /usr/src/repo/ .

WORKDIR /usr/src/repo/apps/cms
EXPOSE $PORT

CMD yarn keystone postinstall --fix --app $APP_NAME && \
    yarn build --app $APP_NAME && \
    yarn start --app $APP_NAME