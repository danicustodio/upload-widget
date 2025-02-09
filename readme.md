# Upload Widget Server

This is a file upload application build with  Node.js, using Cloudflare for file storage.

## Features
- Upload files: allows uploading files to Cloudflare R2.
- Upload listing: Allow listing uploaded files, with support for pagination.
- Upload export to CSV: Allow exporting the list of uploaded files to a CSV file.

## Tech Stack
- **Node.js**: Javascript runtime for the server.
- **Typescript**: Javascript superset for static typing.
- **Fastify**: Web framework for Node.js, used for route creation.
- **Cloudflare R2**: Object storage service.
- **Postgres**: Relational database used in the project.
- **Drizzle**: ORM for database interaction.
- **Docker**: Containerization tool used for deployment.
- **Zod**: Schema validation library.
- **Biome**: Code linter and formatter.
- **Vitest**: Testing framework for the project.
- **Swagger**: API documentation tool.

## Getting Started
To get started with the project, follow the steps below:

### Prerequisites
- Node.js installed on your machine.
- Docker installed on your machine.
- pnpm installed on your machine.
- Cloudflare R2 account.

### Installation
1. Clone the repository to your local machine.
2. Run `pnpm install` to install the project dependencies.
3. Create a `.env` file in the root of the project and add the following environment variables:
    - `DATABASE_URL`: Postgres database URL.
    - `CLOUDFLARE_ACCOUNT_ID`: cloudflare account ID.    
    - `CLOUDFLARE_ACCESS_KEY_ID`: API access key for Cloudflare.
    - `CLOUDFLARE_SECRET_ACCESS_KEY`: API secret key for Cloudflare.
    - `CLOUDFLARE_BUCKET`: name of the Cloudflare bucket.
    - `CLOUDFLARE_PUBLIC_URL`: public URL for the Cloudflare bucket.
4. Run `npm run dev` to start the development server.


### Usage
- The server will be running on `http://localhost:3333` for default or the PORT of your choosing.
- You can access the API documentation on `http://localhost:3333/docs`.

