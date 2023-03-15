
ARG NODE_VERSION=16
ARG ALPINE_VERSION=3.17

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
RUN apk add --no-cache rsync openssl

WORKDIR /workspace-install

COPY yarn.lock ./

# Specific to monerepo's as docker COPY command is pretty limited
# we use buidkit to prepare all files that are necessary for install
# and that will be used to invalidate docker cache.
RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
    --exclude='node_modules' \
    --exclude='scripts' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='*/' --exclude='apps/*' \
    --include='packages/components/*' \
    /docker-context/ /workspace-install/;

RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn install --immutable --inline-builds

# Create CMS Runner target

FROM node:${NODE_VERSION}-slim AS cms-runner
ENV NODE_ENV production
ENV NEXTJS_IGNORE_ESLINT 1
ENV NEXTJS_IGNORE_TYPECHECK 0

ARG PORT=3000
ARG APP_NAME=sjm

WORKDIR /repo

COPY --from=deps /workspace-install ./

WORKDIR /repo/apps/cms

RUN apt-get update && apt-get install -y openssl libssl-dev curl

RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn install --immutable --inline-builds --ignore-scripts

EXPOSE $PORT

CMD yarn keystone postinstall --fix --app $APP_NAME && \
    yarn build --app $APP_NAME && \
    yarn start --app $APP_NAME

# Create API target

FROM node:18-slim AS api
ARG PORT=8000
ARG ENV=ci

ENV NODE_ENV $ENV

WORKDIR /repo/apps/api

COPY ./apps/api ./

EXPOSE $PORT

RUN yarn && yarn build

CMD yarn start

# 
FROM node:16 AS qa-image

ARG PORT=8081
ARG APP
WORKDIR /repo

COPY --from=deps /workspace-install ./

WORKDIR /repo/apps/${APP}

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY ./apps/${APP} ./

ENV PORT ${PORT}
ENV APP ${APP}
ENV GRAPHQL_APP ${APP}
ENV NODE_ENV production
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

EXPOSE $PORT

CMD wait && \
    yarn install --immutable --inline-builds --ignore-scripts && \
    yarn build && \
    yarn start