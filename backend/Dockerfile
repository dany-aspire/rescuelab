FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
RUN npm ci --omit=dev --workspace=backend --include-workspace-root=false
COPY backend/src ./backend/src
COPY backend/healthcheck.js ./backend/healthcheck.js
WORKDIR /app/backend
USER node
EXPOSE 3000
CMD ["npm", "start"]
