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
git checkout -b branchName origin/branchName 
```
#### git查看某一人的提交记录

```
git log --author="提交人"
```
#### git 查看提交文件改变内容

```
git show commitid
```
#### git 查看某一文件的变化
```
git diff 文件名
```
#### Git-命令行-使用 git stash 暂存代码

```
git stash save <message>
git checkout <feture_branch> //切换刚才功能开发的分支
git stash list //查看暂存区的所有暂存修改记录
git stash pop //取出最近一次暂存并删除记录列表中对应记录
git stash apply stash@{X} //取出相应的暂存
git stash drop stash@{X} //将记录列表中取出的对应暂存记录删除
```
#### git根据已有远程分支在本地创建分支并推送到远程

```
创建branchName并切到此分支

git checkout -b 本地分支名  origin/远程分支名

git push -u origin 本地分支名
```
#### git提交到本地仓库还原

```
git reset HEAD@{1}
```
#### [Git 删除具体某个提交commit的方法
](https://blog.csdn.net/Nathan1987_/article/details/81605531)

```
比如我的提交历史如下，我现在想删除commit_B，但是不影响commit_B之后的提交历史

commit_C 

commit_B

commit_A

操作方法如下：

假如要删除备注为add c.txt commit为0fb295fe0e0276f0c81df61c4fd853b7a000bb5c的这次提交

首先找到commit_B提交之前的一次提交的commit_A

执行如下命令

1 git rebase -i  commit_A

2 将commit_B这一行前面的pick改为drop，然后按照提示保存退出

至此已经删除了指定的commit，可以使用git log查看下

3 git push origin HEAD –force

然后推送到远程仓库
此时 commit_B 就被干掉了，没有影响后面的提交
```
#### [如何撤销 Git 操作？](http://www.ruanyifeng.com/blog/2019/12/git-undo.html)
#### [How to undo (almost) anything with Git](https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/)
#### git clone 克隆远程仓库使用账号密码

```
git clone -b branchName(分支名) http://username:password@gitlab.300.cn/package1/myProject.git
```
#### [不使用fast-forward方式合并，保留分支的commit历史,merge形成一个新的id](https://segmentfault.com/q/1010000002477106)

```
git merge --no-ff branch
```

#### [revert一个merge操作](https://www.cnblogs.com/520yang/articles/6732687.html)

```
Commit 1c3268d4b69dc6ca9dd89e92b513f5edb194978c is a merge but no -m option was given
解决如下：
git revert -m 1 <commit-hash> 
git commit -m "Reverting the last commit."
git push
```
```
当你使用 git revert 撤销一个 merge commit 时，如果除了 commit 号而不加任何其他参数，git 将会提示错误：

$ git revert 83281a8e9aa1ede58d51a6dd78d5414dd9bc8548 //本人实际git信息，这里对应git演进图中的 g
error: Commit g is a merge but no -m option was given.
fatal: revert failed

在你合并两个分支并试图撤销时，Git 并不知道你到底需要保留哪一个分支上所做的修改。从 Git 的角度来看，master 分支和 dev 在地位上是完全平等的，只是在 workflow 中，master 被人为约定成了「主分支」。

于是 Git 需要你通过 m 或 mainline 参数来指定「主线」。merge commit 的 parents 一定是在两个不同的线索上，因此可以通过 parent 来表示「主线」。m 参数的值可以是 1 或者 2，对应着 parent 在 merge commit 信息中的顺序。

以上面那张图为例，我们查看 commit g 的内容：

$ git show 83281a8e9aa1ede58d51a6dd78d5414dd9bc8548 //本人实际git信息，这里对应git演进图中的 g

commit 83281a8e9aa1ede58d51a6dd78d5414dd9bc8548

Merge: 312a518 fa87415 //312a518和fa87415 可以在git log中找到对应的提交信息（只是commit一长串字符的头部分）

......

那么，$ git revert -m 1 g 将会保留 master 分支上的修改，撤销 dev 分支上的修改。//(1就是1，表示312a518对应的父来源，2表示fa87415对应的父来源)撤销成功之后，Git 将会生成一个新的 Commit
```
#### [使用 git log 查看提交的日志](https://blog.csdn.net/weixin_44653603/article/details/87652166)


- 日志列表 

```
git log --oneline
```

- 控制输出的行数

```
git log --oneline -3
```
- 指定作者

```
git log --oneline --author='iYeacle'  --oneline
```

- 日期之前

```
git log --oneline --before='2019-2-18'
```
- 日期之后

```
git log --oneline --after='1 week'
git log --oneline --after='2021-05-31' --author="1981824361@qq.com"
```