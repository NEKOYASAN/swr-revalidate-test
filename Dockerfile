# BASE
FROM node:18-slim AS build

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn/ ./.yarn/
RUN --mount=type=cache,target=/app/.yarn/cache yarn install --immutable --inline-builds

COPY . .
RUN yarn build


# Production Run
FROM gcr.io/distroless/nodejs:18
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --chown=nonroot:nonroot --from=build /app/next.config.js ./
COPY --chown=nonroot:nonroot --from=build /app/public ./public
COPY --chown=nonroot:nonroot --from=build /app/package.json ./package.json

COPY --chown=nonroot:nonroot --from=build /app/.next/standalone ./
COPY --chown=nonroot:nonroot --from=build /app/.next/static ./.next/static

USER nonroot

EXPOSE ${PORT}

CMD ["server.js"]