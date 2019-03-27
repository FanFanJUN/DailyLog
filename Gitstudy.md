---
title: Git相关学习
date: 2018-09-17 21:01:35
tags:
- Git
categories: 
- 工具
---
# Git相关学习

![Git](http://www.runoob.com/wp-content/uploads/2015/02/f7246b600c338744a9591cd7530fd9f9d62aa0f8.png)

#### [推荐-梁雪峰Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
#### [官方文档](https://git-scm.com/docs)
### 安装
[官方Downloads](https://www.git-scm.com/download/)

安装后配置你的用户名、密码

- $ git config --global user.name "Your Name"
- $ git config --global user.email "email@example.com"

#### 工具（小乌龟）

[下载链接](https://tortoisegit.org/download/)

[Git客户端(TortoiseGit)基本使用详解](https://www.cnblogs.com/xuwenjin/p/8573603.html)

#### 创建版本库
创建空文件夹容器
- $ mkdir learngit
- $ cd learngit
- $ pwd

通过git init命令把这个目录变成Git可以管理的仓库

- $ git init

Mac上显示隐藏文件命令

- $ defaults write com.apple.finder AppleShowAllFiles TRUE
- $ killall Finder

or ==ls -ah==命令

在所创目录文件下创建文件添加文件到Git仓库，分两步：

- $ git add readme.txt
- $ git commit -m "wrote a readme file"
 
#### 版本回退

显示从最近到最远的提交日志(在Git中，用==HEAD==表示当前版本)

- $ git log --author = name

回退命令

- $ git reset --hard HEAD^

#### 远程仓库

创建SSH KEY

- $ ssh-keygen -t rsa -C "youremail@example.com"
- $ open ~/.ssh 命令直接打开

#### 把本地仓库的内容推送到GitHub仓库。

- $ git remote add origin git@github.com:michaelliao/learngit.git
- $ git push -u origin master 

git如何解决failed to push some refs to git
可以通过如下命令进行代码合并【注：pull=fetch+merge]
- git pull --rebase origin master

三步走：

- $ git add readme.txt
- $ git commit -m "wrote a readme file"
- $ git push origin master 

#### git如何上传所有的新文件

- $ git status 
- $ git add -A
- $ git commit -a -m"first commit"
- $ git push origin master 

git add上传本地项目所有变化的命令三种

- git add -A  提交所有变化
- git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
- git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

后续。。补充。。