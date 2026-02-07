# Service Monitors API

A lightweight API for monitoring server system resources (CPU and Memory), built with Node.js (ES Modules) and Express.js.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file and configure the port (optional):
   ```env
   PORT=3000
   ```

3. Start the application:
   ```bash
   node index.js
   ```

## API Endpoints

- `GET /` : Health check - verify if the API is online.
- `GET /api/resources` : Retrieve system usage statistics (CPU Usage, Memory, and OS information).

## Project Structure
- `index.js`: Application entry point.
- `src/routes/`: API route definitions.
- `src/modules/`: Logic for fetching and calculating system resources.