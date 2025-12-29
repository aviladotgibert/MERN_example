# MERN_example
A repository with a project for testing a MERN server


Para la ejecución del backend:
Ahora iniciamos el proyecto con PM2
pm2 start server.js --name "backend-api"
pm2 save
pm2 startup  # Seguir instrucciones para autoarranque
Para verificar el estado puedes:
pm2 status
pm2 logs backend-api  # Ver logs
curl http://localhost:3000/api/health  # Endpoint de prueba

# Debe responder:
# {"status":"OK","timestamp":"...","database":"connected"}
