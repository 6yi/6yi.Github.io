---
title: Redis  sentinel 集群
date: 2020-04-28 09:52:00
categories: linux
urlname: 222
tags:
---
<!--markdown-->Redis  **sentinel** 集群基于主从模式,当主节点挂掉时,sentinel可以通过选举算法产生新的主节点,保证了一定的高可用性

也可以设置多个sentinel进行监控,各个sentinel之间也会互相监控

这里演示单sentinel模式



### 准备好三个redis节点,先让 6379端口成为主节点,6666和6667分别为从节点,我们只需要对从节点的配置进行修改

#### vim redis-6666.conf

```json
bind 0.0.0.0
port 6666
logfile "6666.log"
dbfilename "dump-6666.rdb"
daemonize yes //守护进程运行
rdbcompression yes
slaveof 127.0.0.1 6379 //初始主节点
masterauth xxxx //主节点密码
```

(也可以先启动redis,在手动用 SLAVEOF host prot指令进行设置)



### 配置完毕后,在主节点查看信息

#### info replication

```json
# Replication
role:master
connected_slaves:2
slave0:ip=127.0.0.1,port=6667,state=online,offset=16660,lag=1 //从节点信息
slave1:ip=127.0.0.1,port=6666,state=online,offset=16660,lag=1
master_replid:25fa189aed5d9840c1991976be9cce9fa3a677e7
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:16660
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:16660
```

配置成功,有两个从节点连接



### 配置sentinel.conf

#### vim sentinel.conf

```json
# 哨兵sentinel实例运行的端口 默认26379
port 26379
# 哨兵sentinel的工作目录
dir /tmp

# 哨兵sentinel监控的redis主节点的 ip port
# master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
# quorum 配置多少个sentinel哨兵统一认为master主节点失联 那么这时客观上认为主节点失联了
# sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 1

# 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供 密码
# 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
# sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster lzheng.1

# 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒
# sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 30000

# 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行
#同步这个数字越小，完成failover所需的时间就越长，但是如果这个数字越大，
#就意味着越多的slave因为replication而不可用。
#可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
# sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1

# 故障转移的超时时间 failover-timeout 可以用在以下这些方面： 
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那 里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。 
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间
#不过，即使过了这个超时， slaves依然会被正确配置为指向master
#但是就不按parallel-syncs所配置的规则来了 
# 默认三分钟 #
# sentinel failover-timeout <master-name> <milliseconds>

sentinel failover-timeout mymaster 180000

```

#### 启动sentinel,并且让主节点下线

redis-sentinel sentinel.conf

```cmd
22179:X 28 Apr 2020 17:45:48.724 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
22179:X 28 Apr 2020 17:45:48.724 # Redis version=5.0.8, bits=64, commit=00000000, modified=0, pid=22179, just started
22179:X 28 Apr 2020 17:45:48.724 # Configuration loaded
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 5.0.8 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 26379
 |    `-._   `._    /     _.-'    |     PID: 22179
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

22179:X 28 Apr 2020 17:45:48.725 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
22179:X 28 Apr 2020 17:45:48.726 # Sentinel ID is 9ab1a438ba5a8f2429d6e4328db01bd0a849110b
22179:X 28 Apr 2020 17:45:48.726 # +monitor master myredis 127.0.0.1 6379 quorum 1
22179:X 28 Apr 2020 17:45:48.726 * +slave slave 127.0.0.1:6667 127.0.0.1 6667 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:45:48.728 * +slave slave 127.0.0.1:6666 127.0.0.1 6666 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.936 # +sdown master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.936 # +odown master myredis 127.0.0.1 6379 #quorum 1/1
22179:X 28 Apr 2020 17:46:37.936 # +new-epoch 3
22179:X 28 Apr 2020 17:46:37.936 # +try-failover master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.939 # +vote-for-leader 9ab1a438ba5a8f2429d6e4328db01bd0a849110b 3
22179:X 28 Apr 2020 17:46:37.939 # +elected-leader master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.939 # +failover-state-select-slave master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.994 # +selected-slave slave 127.0.0.1:6666 127.0.0.1 6666 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:37.994 * +failover-state-send-slaveof-noone slave 127.0.0.1:6666 127.0.0.1 6666 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:38.046 * +failover-state-wait-promotion slave 127.0.0.1:6666 127.0.0.1 6666 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:38.050 # +promoted-slave slave 127.0.0.1:6666 127.0.0.1 6666 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:38.050 # +failover-state-reconf-slaves master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:38.108 * +slave-reconf-sent slave 127.0.0.1:6667 127.0.0.1 6667 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:39.057 * +slave-reconf-inprog slave 127.0.0.1:6667 127.0.0.1 6667 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:39.057 * +slave-reconf-done slave 127.0.0.1:6667 127.0.0.1 6667 @ myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:39.147 # +failover-end master myredis 127.0.0.1 6379
22179:X 28 Apr 2020 17:46:39.147 # +switch-master myredis 127.0.0.1 6379 127.0.0.1 6666
22179:X 28 Apr 2020 17:46:39.147 * +slave slave 127.0.0.1:6667 127.0.0.1 6667 @ myredis 127.0.0.1 6666
22179:X 28 Apr 2020 17:46:39.147 * +slave slave 127.0.0.1:6379 127.0.0.1 6379 @ myredis 127.0.0.1 6666
22179:X 28 Apr 2020 17:47:09.195 # +sdown slave 127.0.0.1:6379 127.0.0.1 6379 @ myredis 127.0.0.1 6666
```



进入从节点,并且输出信息

```json
127.0.0.1:6666> info replication
# Replication
role:master
connected_slaves:1
slave0:ip=127.0.0.1,port=6667,state=online,offset=19769,lag=0
master_replid:9c88068d44b11c644d6873230db424554993a215
master_replid2:25fa189aed5d9840c1991976be9cce9fa3a677e7
master_repl_offset:19769
second_repl_offset:18941
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:267
repl_backlog_histlen:19503
```

#### 该从节点已经被选举为主节点

让断线的6379从新上线,并查看信息

```json
127.0.0.1:6379> info replication
# Replication
role:slave
master_host:127.0.0.1
master_port:6666
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:33008
slave_priority:100
slave_read_only:1
connected_slaves:0
master_replid:9c88068d44b11c644d6873230db424554993a215
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:33008
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:30554
repl_backlog_histlen:2455
```

该节点已经是从节点

