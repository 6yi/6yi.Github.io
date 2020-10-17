---
title: KMP算法初探
date: 2019-09-07 06:07:00
categories: 数据结构
urlname: 34
tags:
---
<!--markdown--> KMP和BM算法都是从字符母串中找子串的算法,个人以为KMP比BM要难多了,KMP的next数组那个求法不太好理解,所以记个笔记.

**KMP**
    kmp算法的关键就是求next数组,这个next数组就是子串中每个位置的最大相同前后缀数量

```java
# java
int[] getNext(char[] p){
    int p_len=p.length;
    int [] next=new int[p_len];
    int j=-1;
    int i=0;
    next[0]=-1;
    while ((p_len - 1) > i){
        if(j==-1||p[j]==p[i]){
            j++;
            i++;
            next[i]=j;
        }else {
            j = next[j];  //这一步是关键中的关键,是一个不断回溯过程,每次都不断回到前面一位的最大前后缀数量的下标位置
        }
    }
    return next;
}
```
这个 j=next[j]是最绕的,也是最难以理解的

完整的代码
```java
# java
public static int[] getNext(char[] p){
    int p_len=p.length;
    int [] next=new int[p_len];
    int j=-1;
    int i=0;
    next[0]=-1;
    while ((p_len - 1) > i){
        if(j==-1||p[j]==p[i]){
            j++;
            i++;
            next[i]=j;
        }else {
            j = next[j];
        }
    }
    return next;
}
public static void main(String[] args) {
    char[] l="BNVHABVCABDABDBDASDFACAAS".toCharArray();
    char[] p="ABDABDBD".toCharArray();
    int[] next=getNext(p);
    int l_len=l.length;
    int p_len=p.length;
    int i=0;
    int j=0;
    while (i<l_len&&j<p_len){
        if (j==-1||l[i]==p[j]){
            i++;
            j++;
        }else{
            j=next[j];
        }
        if (j==p_len){
            System.out.println("yes  "+(i-j));
        }
    }
}
```



