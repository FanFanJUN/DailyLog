#### [Github远程仓库和本地文件的关联](https://www.jianshu.com/p/e13360495b07)
- Git全局配置

```
git config --global user.name "mistdon"
git config --global user.email "xxxx@gmail.com"
```
- 远程仓库已创建，拉取远程仓库增加内容并提交

```
git clone https://gitlab.com/Dongshen/Today.git
cd Today
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

```
- Existing folder本地已存在与远程仓库关联

```
cd existing_folder
git init
git remote add origin https://gitlab.com/Dongshen/Today.git
git add .
git commit -m "Initial commit"
git push -u origin master

```
[注意](https://www.cnblogs.com/wei325/p/5278922.html)

