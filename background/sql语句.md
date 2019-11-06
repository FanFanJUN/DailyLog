## SQL语句
#####  Oracle 如何获取记录数大于1的所有记录

```
select t.id from tab t group by t.id having coung(*) >1;
```
##### 
[oracle数据库将多条记录合并到一条中显示, 将查询结果的多行数据，按照分号分隔成一条数据](https://blog.csdn.net/qq_36743920/article/details/80291166)

```
select name, listagg(account_name, ',') within group(order by name) from user_account group by name;
```
##### [SQL中的case when then else end用法](https://www.cnblogs.com/prefect/p/5746624.html)
##### nvl函数

```
nvl(x,value)将一个NULL转换为另外一个值，如果x为NULL,则返回value,否则返回x值本身
nvl2(x,value1,value2),如果x不为NULL，返回value1，否则，返回value2
```
##### [oracle常用函数及示例](https://www.cnblogs.com/chuangege/p/6258658.html)

```
对分组行使用聚集函数
对分组后的行使用聚集函数，聚集函数会统计每组中的值，对于每组分别统计后返回一个值。

　　示例

--按照职位分组，求出每个职位的最高和最低工资
select job ,max(sal),min(sal) from emp 
group by job 
order by job;
　　注意：1.分组时select子句后边的列名必须与group by子句后的列名一致，除非是聚合函数

select deptno,avg(sal) from EMP;--错误，因为deptno不是聚集函数，也不是group by后面跟的列名
　　　　   2.不能使用聚集函数作为WHERE子句的筛选条件

select deptno from emp where avg(sal)>1000;--错误
　　　　　3.分组后，需要使用条件进行筛选，则使用having过滤分组后的行，不能使用where，where只能放在group by前面。

select deptno, avg(sal) from emp where deptno<>10 
group by deptno  
having avg(sal) > 900;
```
##### 查出存储过程和函数

```
select object_name,created,status from user_objects
where lower(object_type) in ('procedure','function');
```

```
查看建了哪些函数，注意，引号内大写
select object_name from user_objects where object_type='FUNCTION';
查看函数内容，引号内为你要查询的函数名，也要大写
select text from user_source where name='函数名';
```
