sudo docker stop ccgg-web-backend
sudo docker rm ccgg-web-backend
sudo docker rmi ccgg-web-backend
sudo docker build -t ccgg-web-backend .
sudo docker run -d -p 3000:3000 --name ccgg-web-backend ccgg-web-backend
