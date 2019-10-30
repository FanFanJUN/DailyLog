# Git常用命令


![image](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014061202.jpg)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库

#### git remote

```
查看所有远程主机名
$ git remote 
查看远程主机地址
$ git remote -v 
查看主机相关信息
$ git remote show <主机名>   
```
#### git clone

```
克隆远程主机下的分支
$ git clone -b <主机地址> <分支名>
```
#### git pull

```
取回远程主机某个分支的更新
$ git pull <主机名> <分支名>
```
#### git push

```
将本地分支的更新，推送到远程主机
$ git push <主机名> <分支名>
```
#### git merge

```
在本地分支上合并远程分支
$ git merge <主机名>/<分支名>
```

#### git删除分支
```
删除本地分支： git branch -d branch
删除远程分支：git push origin --delete branch
```
#### git 合并其他分支的部分提交代码到本分支

```
git cherry-pick commitID

代码开发的时候，有时需要把某分支（比如develop分支）的某一次提交合并到另一分支（比如master分支），这就需要用到git cherry-pick命令。

首先，切换到develop分支，敲 git log 命令，查找需要合并的commit记录，比如commitID：7fcb3defff；

然后，切换到master分支，使用 git cherry-pick 7fcb3defff  命令，就把该条commit记录合并到了master分支，这只是在本地合并到了master分支；

最后，git push 提交到master远程，至此，就把develop分支的这条commit所涉及的更改合并到了master分支。
```
#### GIT撤销MERGING状态

```
git reset --hard head
```
#### 切换分支

```
git branch -a  --查看所有分支
git branch -r  --查看远程分支
git branch --查看本地分支

git checkout + 分支branch
```

