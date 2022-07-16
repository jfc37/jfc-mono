# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.231.6/containers/typescript-node/.devcontainer/base.Dockerfile
ARG VARIANT="16"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

WORKDIR /workspace

# Install global npm packages
RUN su node -c "npm install -g @angular/cli nx"

# Copy just package.json and lock file so npm install only reruns if dependencies have changed
COPY package.json .
COPY package-lock.json .
COPY decorate-angular-cli.js .

# Install package dependencies
RUN npm install

# Finally, copy everything over
COPY . .