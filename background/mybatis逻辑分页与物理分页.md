#### mybatis逻辑分页与物理分页
##### 逻辑分页

```
mybatis自带分页RowBounds:   //逻辑分页
把所有的数据都查询出来,然后通过RowBounds进行在内存分页.通过源码查看,也是通过ResuleSet结果集进行分页;
```
##### 物理分页
```
mybatis自写sql或者通过分页插件PageHelper:  //物理分页
通过PageHelper进行识别是何数据库拼接分页语句,若是mysql,自动通过limit分页,若是oracle自动通过rownum进行分页,另一个会自动拼接Mapper下不存在的ID为findStudent_COUNT,查询的总数;可以通过打印的日志进行跟踪;

PageHelper.startPage(pageNum,pageSize);//pageNum 页数  pageSize 数量
 List<Student> stu=studentDao.findStudent(); 
  PageInfo<Student> page = new PageInfo<Student>(stu); //自动封装总数count以及分页,数据返回页面
    return page;//返回分页之后的数据
直接通过SQL进行在数据库中直接分页,得到的数据就是我们想要分页之后的数据,就是物理分页;
```
##### 优缺点

```
1：逻辑分页 内存开销比较大,在数据量比较小的情况下效率比物理分页高;在数据量很大的情况下,内存开销过大,容易内存溢出,不建议使用

2：物理分页 内存开销比较小,在数据量比较小的情况下效率比逻辑分页还是低,在数据量很大的情况下,建议使用物理分页
```
##### [如何使用分页插件](https://pagehelper.github.io/docs/howtouse/)
##### [这是一个集成了Mybatis分页插件和通用Mapper的示例项目](https://github.com/abel533/Mybatis-Spring)