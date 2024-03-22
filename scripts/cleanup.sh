# Prune build cache
docker buildx prune --filter=until=48h -f
docker builder prune -a -f
docker system prune -a -f

# Remove exited containers
docker ps -a -q -f status=exited | xargs --no-run-if-empty docker rm -v

# Remove dangling images
docker images -f "dangling=true" -q | xargs --no-run-if-empty docker rmi

# Remove unused images
# docker images | awk '/ago/  { print $3}' | xargs --no-run-if-empty docker rmi

# Remove dangling volumes
docker volume ls -qf dangling=true | xargs --no-run-if-empty docker volume rm