---
title: 批量音乐文件数据转Json
date: 2019-05-21 05:05:00
categories: java
urlname: 13
tags:
---
<!--markdown-->昨天想把音乐文件信息转成Json的时候写了个方法，感觉还是蛮实用的，记录一下。

```java
//需要引入的jar包，jadiotagger，请下载2.2版本。

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.audio.mp3.MP3AudioHeader;
import org.jaudiotagger.audio.mp3.MP3File;
import org.jaudiotagger.tag.TagException;
import org.jaudiotagger.tag.id3.AbstractID3v2Tag;
import org.jaudiotagger.tag.id3.ID3v1Tag;


private static void jsonList() {
        try{
            //读取文件夹的所有音乐文件信息
            File diskfile=new File("D:\\Program Files\\ClouMusic\\zjl");
            File[] fs=diskfile.listFiles();
            
            //准备好数组保存
            List<Music> musics=new ArrayList<>();
            for (File files:fs){
                //准备Map，方便使用javaBean
                Map<String,String> map=new HashMap<>();
                //把音乐转成MP3File对象
                MP3File file = new MP3File(files);
                
                //获得ID3v1Tag标签对象，我们要从标签内用key找value
                ID3v1Tag tag = file.getID3v1Tag();
				//获得MP3的音乐头文件信息，可以用来获取时间秒值
                MP3AudioHeader audioHeader = (MP3AudioHeader) file.getAudioHeader();
                
                //获得秒，并且进行00:00格式化处理
                int len=audioHeader.getTrackLength();
                int min=len/60;
                int sec=len%60;
                String time=null;
                if (sec<10){
                    time="0"+min+":0"+sec;
                }else {
                    time="0"+min+":"+sec;
                }
                
                //获得音乐名字
                String name = file.getID3v2Tag().frameMap.get("TIT2").toString();
                //获得专辑名字
                String album=file.getID3v2Tag().frameMap.get("TALB").toString();
                //获得歌手名字
                String artist = file.getID3v2Tag().frameMap.get("TPE1").toString();
                
                /*
                注：获得的String都是“text：xxxx”这种格式，我会在下面进行处理一下
                */
                //对String进行处理，并且保存到Map中
                map.put("singer",reg(artist));
                map.put("name",reg(name));
                map.put("album",reg(album));
                map.put("time",time);
                //使用额外的方法处理文件转成bean，并且添加到list中
                musics.add(toBean.to(map));
            }

            //使用Jsonlib来对list对象转成json文件
            JSONArray json = JSONArray.fromObject(musics);
            File file=new File("D:\\musiclist.txt");
            //使用Writer，我一开始使用的是PrintWriter，不能完成全部数据的写入，原因未知。。。。
            Writer write = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
            write.write(json.toString());
            write.flush();
            write.close();

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

 private static String reg(String input) {
        return input.substring(input.indexOf('"') + 1, input.lastIndexOf('"'));
    }

//因为我对数据有一点要求，所以进行了特殊处理
class toBean {

    public static Music to(Map<String,String> map){
        Music music=CommonUtils.toBean(map,Music.class);
        music.setLink_url("./source/"+map.get("name")+".mp3");
        return music;
    }

}
```