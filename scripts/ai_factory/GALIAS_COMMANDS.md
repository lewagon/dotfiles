# AI Factory - Docker Compose Commands (Galias)

This file contains all the key commands for managing the AI Factory Docker Compose local deployment.

## 🚀 **Docker Compose Management Commands**

### **Basic Operations**
```bash
# Start all services (build and run in background)
./bin/dl up

# Stop all services
./bin/dl down

# Start existing services
./bin/dl start

# Stop running services (keep containers)
./bin/dl stop
```

### **Monitoring & Debugging**
```bash
# Check service status
./bin/dl ps

# View live logs (follow mode)
./bin/dl logs

# View last 100 lines of logs
./bin/dl tail 100

# View last N lines of logs
./bin/dl tail [N]

# View logs for specific service
./bin/dl logs web
./bin/dl logs worker
./bin/dl logs db
./bin/dl logs redis
```

### **Service Management**
```bash
# Execute commands in containers
./bin/dl exec web ./bin/rails console
./bin/dl exec web ./bin/rails db:migrate
./bin/dl exec web ./bin/rails db:seed

# Scale worker services
./bin/dl scale 3

# Rebuild all images (no cache)
./bin/dl rebuild
```

## 🌐 **Application Access**

### **Web Application**
- **Main App**: https://localhost
- **Health Check**: https://localhost/up
- **Google OAuth**: https://localhost/users/auth/google_oauth2

### **Database Access**
- **PostgreSQL**: localhost:5432
- **Database**: aifactory_development
- **Username**: postgres
- **Password**: postgres

### **Redis Access**
- **Redis**: localhost:6379
- **Database**: 1

## 👤 **Authentication**

### **Admin Account**
- **Email**: admin@example.com
- **Password**: changeme123

### **Test Client Accounts** (password: `password`)
- **Client 1**: client1_member1@example.com, client1_member2@example.com, client1_member3@example.com
- **Client 2**: client2_member1@example.com, client2_member2@example.com, client2_member3@example.com, client2_member4@example.com, client2_member5@example.com, client2_member6@example.com

### **Google OAuth**
- Works with your Google account
- Redirect URI: https://localhost/users/auth/google_oauth2/callback

## 🔧 **Development Commands**

### **Database Operations**
```bash
# Run migrations
./bin/dl exec web ./bin/rails db:migrate

# Seed database
./bin/dl exec web ./bin/rails db:seed

# Open Rails console
./bin/dl exec web ./bin/rails console

# Reset database
./bin/dl exec web ./bin/rails db:reset
```

### **Asset Management**
```bash
# Precompile assets
./bin/dl exec web ./bin/rails assets:precompile

# Clear asset cache
./bin/dl exec web ./bin/rails assets:clobber
```

### **Background Jobs**
```bash
# Check Sidekiq status
./bin/dl exec web ./bin/rails runner "puts Sidekiq::Stats.new.inspect"

# Clear all jobs
./bin/dl exec web ./bin/rails runner "Sidekiq::Queue.new.clear"
```

## 🐳 **Docker Commands**

### **Container Management**
```bash
# List all containers
docker ps -a

# Restart specific container
docker restart aifactory-web-1

# View container logs
docker logs aifactory-web-1

# Execute shell in container
docker exec -it aifactory-web-1 /bin/bash
```

### **Image Management**
```bash
# List images
docker images

# Remove unused images
docker image prune

# Remove all images
docker rmi $(docker images -q)
```

## 📁 **File Locations**

### **Configuration Files**
- **Environment**: `.env.local`
- **Docker Compose**: `docker-compose.yml`
- **Override**: `docker-compose.override.yml`
- **Script**: `bin/dl`

### **Logs**
- **Application**: `./bin/dl logs web`
- **Worker**: `./bin/dl logs worker`
- **Database**: `./bin/dl logs db`
- **Redis**: `./bin/dl logs redis`

## 🚨 **Troubleshooting**

### **Common Issues**
```bash
# Service not starting
./bin/dl ps
./bin/dl logs [service]

# Port conflicts
./bin/dl down
docker system prune -f
./bin/dl up

# Environment variables not loading
./bin/dl exec web env | grep GOOGLE

# Database connection issues
./bin/dl exec web ./bin/rails db:migrate
```

### **Reset Everything**
```bash
# Stop and remove all containers
./bin/dl down

# Remove all containers and networks
docker compose down --volumes --remove-orphans

# Remove all images
docker rmi $(docker images -q)

# Start fresh
./bin/dl up
```

## 📚 **Additional Resources**

- **Main README**: [README.md](README.md)
- **Local Deployment**: [DEPLOY_LOCALLY.md](DEPLOY_LOCALLY.md)
- **Docker Compose Deploy**: [DOCKER_COMPOSE_DEPLOY.md](DOCKER_COMPOSE_DEPLOY.md)
- **Testing Guide**: [TESTING_README.md](TESTING_README.md)
- **Pipeline Graph Editor**: [PIPELINE_GRAPH_EDITOR_README.md](PIPELINE_GRAPH_EDITOR_README.md)
- **Nodes Documentation**: [NODES_README.md](NODES_README.md)
- **Controllers & Models**: [CONTROLLERS_MODELS_README.md](CONTROLLERS_MODELS_README.md)
- **LLM Management**: [LLM_MANAGEMENT_README.md](LLM_MANAGEMENT_README.md)
- **Policies**: [POLICIES_README.md](POLICIES_README.md)
- **UI/UX Design Guide**: [UI_UX_DESIGN_GUIDE.md](UI_UX_DESIGN_GUIDE.md)
