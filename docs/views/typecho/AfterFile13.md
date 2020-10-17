---
title: HashMap简单笔记
date: 2020-06-09 06:32:00
categories: java
urlname: 238
tags:
---
<!--markdown-->


### 		hashmap是一种很常用的类,JDK1.7和1.8两个的实现有较大的不同.



## JDK1.7

### 构造函数	

jdk1.7的hashmap使用的是数组+链表的结构,我们先来看看他的一个有参构造函数

```java
  /**
     * Constructs an empty <tt>HashMap</tt> with the specified initial
     * capacity and load factor.
     *
     * @param  initialCapacity the initial capacity
     * @param  loadFactor      the load factor
     * @throws IllegalArgumentException if the initial capacity is negative
     *         or the load factor is nonpositive
     */
    public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);

        this.loadFactor = loadFactor;
        threshold = initialCapacity;
        init();
    }
```

initialCapacity是初始化大小,如果不填的话默认是16 ,  loadFactor是负载因子,这个负载因子的作用是当hashmap数组长度达到  size* loadFactor的时候便会进行扩容.



注:调用构造函数是不会进行初始化的,只有在第一次put的时候才会进行初始化,void init是一个空的函数



### PUT

前面说过,第一次PUT的时候会进行初始化,那么整个初始化过程还是要看一下滴

```java
 public V put(K key, V value) {
        if (table == EMPTY_TABLE) { 
            // 当数组是空的时候,进行初始化
            inflateTable(threshold);
        }
        if (key == null)
            return putForNullKey(value);
        int hash = hash(key);
        int i = indexFor(hash, table.length);
        for (Entry<K,V> e = table[i]; e != null; e = e.next) {
            Object k;
            if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
                V oldValue = e.value;
                e.value = value;
                e.recordAccess(this);
                return oldValue;
            }
        }
        modCount++;
        addEntry(hash, key, value, i);
        return null;
    }
```

初始化函数就比较简单.那就随便看一下

```java
  private void inflateTable(int toSize) {
        // Find a power of 2 >= toSize
      	// 将大小转为高位的二的n次方,例如 15,他介于2^3于2^4之间,那么我们就初始化2^4大小
        int capacity = roundUpToPowerOf2(toSize);

        threshold = (int) Math.min(capacity * loadFactor, MAXIMUM_CAPACITY + 1);
        table = new Entry[capacity];
        initHashSeedAsNeeded(capacity);
    }

```



### 为什么初始化为2的n次方呢,这个有讲究的,我们在看看put函数的下面部分



学过哈希表的应该都知道,我们需要一种hash算法,得出一个在数组里的位置,一个hash算法的好坏可以直接影响这个哈希表的效率



JDK的哈希算法是这样的

```java
   final int hash(Object k) {
        int h = hashSeed;
        if (0 != h && k instanceof String) {
            //如果对象是字符串类型,则使用特殊的哈希
            return sun.misc.Hashing.stringHash32((String) k);
        }
		//首先异或一下,默认hashSeed是0
        h ^= k.hashCode();
        h ^= (h >>> 20) ^ (h >>> 12);
        return h ^ (h >>> 7) ^ (h >>> 4);
    }

```

主要是最后面这两行,是做啥的呢,这个其实是涉及到后面位置计算,我就先解释一下这两行做什么的,**主要是为了让高位和低位的数一起进行了运算,做一个平均hash**,这句话得等会回过头来理解,我们就这里就暂时知道了,会返回来一个进行过特殊运算的hash值

我觉得JDK比较牛逼的一个地方就是这个位置的求法,前面的铺垫都是为了这个,来,看看

```java
 static int indexFor(int h, int length) {
        // assert Integer.bitCount(length) == 1 : "length must be a non-zero power of 2";
        return h & (length-1);
}
```

我们平常是怎么求位置的?? 我不怕丢人,我直说了,我就是直接用 hashcode%数组长度,嘻嘻.

这里为什么我觉得牛逼呢?     **使用了位运算** 

前面说过hashmap的长度一直都是2^n,  答案就在这里,因为index的求法使用了位运算,他是把你的hashcode和 长度-1 按位与了一下,我据个例子你就懂了

假设我的长度是2^4,也就是16 ,那么他的二进制表示就是   **0000 0000 0001 0000** , 

?														16-1=15,15的二进制是  **0000 0000 0000 1111**

那我用hashcode的跟15按位与一下, 得到的数自然就只有0-15之间了,速度还非常快





### 位置算出来了,下一步就是把元素添加进去

```java
    void addEntry(int hash, K key, V value, int bucketIndex) {
        if ((size >= threshold) && (null != table[bucketIndex])) {
            //达到扩容条件,那么就进行扩容,大小是扩容前*2,为了保证大小始终是2^n
            resize(2 * table.length);
            hash = (null != key) ? hash(key) : 0;
            bucketIndex = indexFor(hash, table.length);
        }

        createEntry(hash, key, value, bucketIndex);
    }
```



### 这个扩容有很大的问题在里面,线程不安全也是源于此,我们得看看

```java
  void resize(int newCapacity) {
        Entry[] oldTable = table;
        int oldCapacity = oldTable.length;
        if (oldCapacity == MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return;
        }

        Entry[] newTable = new Entry[newCapacity];
        transfer(newTable, initHashSeedAsNeeded(newCapacity));
        table = newTable;
        threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
    }
```



这里是创建了新的Entry,然后把旧的转成新的通过 transfer函数

```java
   void transfer(Entry[] newTable, boolean rehash) {
        int newCapacity = newTable.length;
        for (Entry<K,V> e : table) {
            while(null != e) {
                Entry<K,V> next = e.next;
                if (rehash) {
                    e.hash = null == e.key ? 0 : hash(e.key);
                }
                int i = indexFor(e.hash, newCapacity);
                e.next = newTable[i];
                newTable[i] = e;
                e = next;
            }
        }
    }
```

transfer采用的是头插法,因此每次扩容后,链表里的元素位置都会被反转一次,这就会导致什么问题呢,当并发量大的时候,有可能会变成一种循环插入的状态 ,十分耗费CPU资源,因此他是线程不安全的





## JDK1.8

?	jdk1.8的hashmap主要改进的地方是把数组+链表换成了数组+链表/红黑树,并且使用了尾插法,不再是头插法

?	(1.7中是**先扩容后插入**新值的，1.8中是**先插值再扩容**)

### PUT

```java
 final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
     	//第一次put初始化map
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
     
     	//tab[i = (n - 1) & hash])这个位置刚好没有元素,直接封装成Node放进去
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            
            Node<K,V> e; K k;
            
            //如果刚好value相同,那就覆盖
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            
            //看看是否是红黑树
            else if (p instanceof TreeNode)
               	//是红黑树,用红黑树的插入方法
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                
                //不是红黑树,则遍历链表,尾插法,和1.7的头插法不同
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        //如果长度大于TREEIFY_THRESHOLD - 1,转换成红黑树,默认为 8
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
     	//操作数+1
        ++modCount;
     
     //判断阈值，决定是否扩容
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
```





### Rehash

JDK1.7和1.8的rehash发送了一些改变,1.7的rehash是先判断是否需要rehash,因为扩容是*2,而旧的索引是通过于预算得出的,我们只需要判断一下hashcode对应的那个位上是0还是1就就知道他要不要重新计算hash了,JDK1.7判断完后再进行一次rehash,而1.8是直接重新与运算一下,结果无非就只有两个,一个是原地不动,.一个是移动2次幂

#### 1.7

```java
    void transfer(Entry[] newTable, boolean rehash) {
        int newCapacity = newTable.length;
        for (Entry<K,V> e : table) {
            while(null != e) {
                Entry<K,V> next = e.next;
                //判断是否需要rehash
                if (rehash) { 
                    e.hash = null == e.key ? 0 : hash(e.key);
                }
                int i = indexFor(e.hash, newCapacity);
                e.next = newTable[i];
                newTable[i] = e;
                e = next;
            }
        }
    }
```

##### 1.8太长了就不贴出来了,和1.7基本上差不多



**(引用) 对HashMap做下总结**：
HashMap基于哈希散列表实现 ，可以实现对数据的读写。**将键值对传递给put方法时，它调用键对象的hashCode()方法来计算hashCode，然后找到相应的bucket位置（即数组）来储存值对象。当获取对象时，通过键对象的equals()方法找到正确的键值对，然后返回值对象**。HashMap使用链表来解决hash冲突问题，当发生冲突了，对象将会储存在链表的头节点中。HashMap在每个链表节点中储存键值对对象，当两个不同的键对象的hashCode相同时，它们会储存在同一个bucket位置的链表中，如果链表大小超过阈值（TREEIFY_THRESHOLD,8），链表就会被改造为树形结构。



**简单列下HashMap在1.7和1.8之间的变化：**

- 1.7中采用数组+链表，1.8采用的是数组+链表/红黑树，即在1.7中链表长度超过一定长度后就改成红黑树存储。
- 1.7扩容时需要重新计算哈希值和索引位置，1.8并不重新计算哈希值，巧妙地采用和扩容后容量进行&操作来计算新的索引位置。(1.7并不是一定重新计算hash)
- 1.7是采用表头插入法插入链表，1.8采用的是尾部插入法。
- 在1.7中采用表头插入法，在扩容时会改变链表中元素原本的顺序，以至于在并发场景下导致链表成环的问题；在1.8中采用尾部插入法，在扩容时会保持链表元素原本的顺序，就不会出现链表成环的问题了。



