# Linux服务上遇到的问题

## 简单命令

1.cd  /etc/... :跳转到对应的目录 
2.rm -rf /home/... :删除对应的文件
3.alias name "cd /root/..." :设置别名，可以写在profile中保证下次不用输入
4.cat /home/... :打印文件内容
5.tail -f /home/... :监控文件内容
6.vim /etc/... :打开对应的文件，不存在则创建
7.ps -ef |grep name :查看进程并查询带name的进程
8.source /etc/profile :使用新的环境变量
9.ll ls :查看当前目录文件，-la 查看所有文件
10.top :查看cpu、内存的情况
11.man [ls]:查看命令的帮助
12.diff dir1 dir2 :比较文件的不同
13.cp -rp /home/d001　/home/Documents :复制目录，-r 遍历目录，-p 保留属性


### vim简单快捷键

1.:q  退出
2.:x  :wq 保存并退出
3.i 插入
4.Esc 退出编辑模式