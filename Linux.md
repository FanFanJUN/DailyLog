---
title: Linux
date: 2018-10-17 23:01:10
tags: Linux常用命令
---

# Linux常用命令

#### cd命令


```
cd /root/Docements # 切换到目录/root/Docements
cd ./path          # 切换到当前目录下的path目录中，“.”表示当前目录  
cd ../path         # 切换到上层目录中的path目录中，“..”表示上一层目录
```
#### ls命令（查看文件与目录）

```
ls -l #以长数据串的形式列出当前目录下的数据文件和目录
ls -lR #以长数据串的形式列出当前目录下的所有文件
```
#### rm命令


```
rm -i file # 删除文件file，在删除之前会询问是否进行该操作
rm -fr dir # 强制删除目录dir中的所有文件
```
#### vim命令(文本编辑)

####  pwd(显示当前目录)

#### sz(下载)

#### rz(上传)

#### linux下查看和修改文件时间

```
[root@web10 ~]# stat install.log
  File: “install.log”
  Size: 33386           Blocks: 80         IO Block: 4096   一般文件
Device: fd00h/64768d    Inode: 7692962     Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2012-07-13 16:02:34.000000000 +0800
Modify: 2011-11-29 16:03:06.000000000 +0800
Change: 2011-11-29 16:03:08.000000000 +0800
说明：Access访问时间。Modify修改时间。Change状态改变时间。可以stat *查看这个目录所有文件的状态。
```