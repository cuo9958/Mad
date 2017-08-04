# 使用Node的时候遇到的问题记录

## express

### 服务器使用pm2来保证node服务不被挂掉

常用命令：

1.pm2 start [config.json] :启动pm2，可传入配置文件。文件例子见 pm2-example.json
2.pm2 reload serverName :重载进程，参数为服务的name。
3.pm2 restart all:重启服务
4.pm2 list :查看所有服务
5.pm2 kill [name|id] :杀掉进程


