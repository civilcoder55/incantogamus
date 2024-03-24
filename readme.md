<p align="center">
  <h3 align="center">(Incantogamus) Video Games API</h3>
</p>

## Usage with docker

1. Clone the repo

   ```sh
   git clone `https://github.com/civilcoder55/incantogamus.git`
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

## Deploy to kubernetes (miniKube)

1. Clone the repo

   ```sh
   git clone `https://github.com/civilcoder55/incantogamus.git`
   ```

2. Change directory

   ```sh
   cd incantogamus
   ```

3. build the image

   ```sh
   eval $(minikube docker-env) # to use local docker image in minikube
   docker-compose build
   ```

4. update the k8s/secrets.yaml file with proper values

5. ensure run.sh is executable

   ```sh
   chmod +x run.sh
   ```

6. Create k8s resources

   ```sh
   kubectl apply -f k8s
   ```

7. get the minikube node ip

   ```sh
   minikube ip
   ```

8. Add the ip to your hosts file

   ```sh
   echo "$(minikube ip) incantogamus.com" | sudo tee -a /etc/hosts
   ```

9. Access API at

   ```sh
   http://incantogamus.com/health
   ```
