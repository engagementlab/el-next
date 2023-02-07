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
RUN yarn export

# //////////////////

FROM node:16 AS runner
WORKDIR /usr/src/repo/apps/cms

COPY --from=builder /usr/src/repo/apps/cms/.keystone/ ./
COPY --from=builder /usr/src/repo/apps/cms/export/lib/start.js ./

EXPOSE 3000

# RUN yarn global add pm2
# RUN pm2 list
RUN node start.js --app sjm