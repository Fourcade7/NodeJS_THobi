              1.Install NodeJS  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
              
              sudo npm install -g pm2
              pm2 -v
              pm2 start server.js
              pm2 list
              pm2 stop all
              pm2 stop 0
