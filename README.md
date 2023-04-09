# 韵母字典
因为偶尔写写歌词，所以需要一个韵母字典用于找韵脚。zi_freq.json 来源于[一个中文流行歌词库](https://github.com/dengxiuqi/ChineseLyrics)，处理后存储了每句词最后一个字出现的频次。用法为：
```
yunmu.py ang
```
返回指定韵母的所有常用字，形式为 (字, 拼音, 出现频次)
