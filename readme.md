<p align="center">
  <h3 align="center">(Incantogamus) Video Games API</h3>
</p>

## Usage with docker

1. Clone the repo

   ```sh
   git clone ``
   ```

   or

   ```sh
   git clone ``
   ```

2. Change directory

   ```sh
   cd incantogamus
   ```

3. update the env file with proper
   Leave it if you want, default values should work

   ```sh
   cp .env.example .env
   ```

4. ensure run.sh is executable

   ```sh
   chmod +x run.sh
   ```

5. Build images and run containers

   ```sh
   docker-compose up -d
   ```

6. Create and Sync database (already run with container up)

   ```sh
   docker exec -it incantogamus-node npm run db:sync
   ```

7. Access API at

   ```sh
   http://localhost:3000/v1/docs
   ```

8. Access docker logs

   ```sh
   docker logs -f incantogamus-node
   ```

9. To run test
   ```sh
   docker exec -it incantogamus-node npm run test
   ```