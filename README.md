##韵母字典
因为偶尔写写歌词，所以需要一个韵母字典用于找韵脚。在网上找了一个javascript版的字库，删减后做成了一个4000多字的常用字库。

用法：
在html页面中包含两个js文件：
```javascript
<script src="dict-common.js">
</script>
<script src="yunmu.js">
</script>
<script>
    var ziObjArray = yunmuDict.match("ei");
    for (var i = 0; i < ziObjectArray.length; i++) {
        var ziObj = ziObjectArray[i];
        console.log(ziObj.zi + "(" + ziObj.pinyin + ")");
    }
</script>
```
