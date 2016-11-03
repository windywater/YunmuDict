
var yunmuDict = {
    _pinyinCharArray: ["a", "ā", "á", "ǎ", "à", "b", "c", "d", "e", "ē", "é", "ě", "è", "f", "g", "h",
                       "i", "ī", "í", "ǐ", "ì", "j", "k", "l", "m", "n", "o", "ō", "ó", "ǒ", "ò", "p",
                       "q", "r", "s", "t", "u", "ū", "ú", "ǔ", "ù", "ü", "ǖ", "ǘ", "ǚ", "ǜ", "w", "x",
                       "y", "z"],
    
    /*
        列出所有韵母
        数组中，前5个元素是此韵母的轻、一、二、三、四声，第6个元素是一个数组，指定压这个韵的拼音有哪些。
        若带括号，说明要替换成五种声调去匹配，如b(a)，则匹配ba, bā, bá, bǎ, bà五个拼音。
        若不带括号，则只匹配这一种拼音，参考"üe"韵。
        之所以设计这么复杂，是因为我发现仅从拼音规则较复杂，不容易看出什么韵，比如“倔(juè)”是压üe韵，
        “会(huì)”其实压ei韵，所以干脆做一张表，暴力统计每个韵母在哪些拼音里。由于含有带音调的特殊字符，
        展示上很正规，但不如hui2这样灵活检索。
    */
    _yunmus : {
        "a": ["a", "ā", "á", "ǎ", "à",
              ["b(a)", "p(a)", "m(a)", "f(a)", "d(a)", "t(a)", "n(a)", "l(a)", "g(a)", "k(a)",
               "h(a)", "ji(a)", "qi(a)", "xi(a)", "zh(a)", "ch(a)", "sh(a)", "z(a)", "c(a)", "s(a)",
               "y(a)", "w(a)", "gu(a)", "ku(a)", "hu(a)", "zhu(a)", "shu(a)"] ],
        "o": ["o", "ō", "ó", "ǒ", "ò",
              ["b(o)", "p(o)", "m(o)", "f(o)", "d(uo)", "t(uo)", "n(uo)", "l(uo)", "g(uo)",
               "k(uo)", "h(uo)", "zh(uo)", "ch(uo)", "sh(uo)", "r(uo)", "z(uo)", "c(uo)",
               "s(uo)", "w(o)"] ],
        "e": ["e", "ē", "é", "ě", "è",
              ["d(e)", "t(e)", "n(e)", "l(e)", "g(e)", "k(e)", "h(e)", "zh(e)", "ch(e)", "sh(e)",
               "r(e)", "z(e)", "c(e)", "s(e)"] ],
        "i": ["i", "ī", "í", "ǐ", "ì",
              ["b(i)", "p(i)", "m(i)", "d(i)", "t(i)", "n(i)", "l(i)", "j(i)", "q(i)", "x(i)",
               "zh(i)", "ch(i)", "sh(i)", "r(i)", "z(i)", "c(i)", "s(i)", "y(i)"] ],
        "u": ["u", "ū", "ú", "ǔ", "ù",
              ["b(u)", "p(u)", "m(u)", "f(u)", "d(u)", "t(u)", "n(u)", "l(u)", "g(u)", "k(u)",
               "h(u)", "zh(u)", "ch(u)", "sh(u)", "r(u)", "z(u)", "c(u)", "s(u)", "w(u)"] ],
        "ü": ["ü", "ǖ", "ǘ", "ǚ", "ǜ",
              ["n(ü)", "l(ü)", "j(u)", "q(u)", "x(u)", "y(u)"] ],
        "ai": ["ai", "āi", "ái", "ǎi", "ài",
               ["b(ai)", "p(ai)", "m(ai)", "d(ai)", "t(ai)", "n(ai)", "l(ai)", "g(ai)", "k(ai)",
                "h(ai)", "zh(ai)", "ch(ai)", "sh(ai)", "c(ai)", "s(ai)", "w(ai)", "gu(ai)", "ku(ai)", 
                "hu(ai)", "zhu(ai)", "chu(ai)", "shu(ai)"] ],
        "ei": ["ei", "ēi", "éi", "ěi", "èi",
               ["b(ei)", "p(ei)", "m(ei)", "f(ei)", "n(ei)", "l(ei)", "g(ei)", "h(ei)", "w(ei)"] ],
        "ui": ["ui", "uī", "uí", "uǐ", "uì", 
               ["d(ui)", "g(ui)", "k(ui)", "h(ui)", "zh(ui)", "ch(ui)", "sh(ui)", "r(ui)", 
                "z(ui)", "c(ui)", "s(ui)"] ],
        "ao": ["ao", "āo", "áo", "ǎo", "ào",
               ["b(ao)", "p(ao)", "m(ao)", "d(ao)", "t(ao)", "n(ao)", "l(ao)", "g(ao)", "k(ao)",
                "h(ao)", "zh(ao)", "ch(ao)", "sh(ao)", "r(ao)", "z(ao)", "c(ao)", "s(ao)", "y(ao)", 
                "bi(ao)", "pi(ao)", "mi(ao)", "di(ao)", "ti(ao)", "ni(ao)", "li(ao)"] ],
        "ou": ["ou", "ōu", "óu", "ǒu", "òu",
               ["m(ou)", "f(ou)", "d(ou)", "t(ou)", "l(ou)", "g(ou)", "k(ou)", "h(ou)", "zh(ou)", 
                "ch(ou)", "sh(ou)", "r(ou)", "z(ou)", "c(ou)", "s(ou)", "y(ou)"] ],
        "uo": ["uo", "uō", "uó", "uǒ", "uò",
               ["b(o)", "p(o)", "m(o)", "f(o)", "d(uo)", "t(uo)", "n(uo)", "l(uo)", "g(uo)",
                "k(uo)", "h(uo)", "zh(uo)", "ch(uo)", "sh(uo)", "r(uo)", "z(uo)", "c(uo)",
                "s(uo)", "w(o)"] ],
        "iu": ["iu", "iū", "iú", "iǔ", "iù",
               [ "m(iu)", "d(iu)", "n(iu)", "l(iu)", "j(iu)", "q(iu)", "x(iu)"] ],
        "ie": ["ie", "iē", "ié", "iě", "iè",
               ["b(ie)", "p(ie)", "m(ie)", "t(ie)", "n(ie)", "l(ie)", "j(ie)", "q(ie)", "x(ie)", "y(e)"] ],
        "üe": ["üe", "üē", "üé", "üě", "üè",
               ["n(üe)", "l(üe)", "juē", "jué", "juè", "quē", "qué", "què", "xuē", "xué", "xuě", "xuè"] ],
        "er": ["er", "ēr", "ér", "ěr", "èr",
               ["(er)"] ],
        "an": ["an", "ān", "án", "ǎn", "àn",
               ["b(an)", "p(an)", "m(an)", "f(an)", "d(an)", "t(an)", "n(an)", "l(an)", "g(an)", "k(an)",
                "h(an)", "zh(an)", "ch(an)", "sh(an)", "r(an)", "z(an)", "c(an)", "s(an)", "y(an)",
                "w(an)", "bi(an)", "pi(an)", "mi(an)", "di(an)", "ti(an)", "ni(an)", "li(an)", "ji(an)",
                "qi(an)", "xi(an)", "ju(an)", "qu(an)", "yu(an)"] ],
        "en": ["en", "ēn", "én", "ěn", "èn",
               ["b(en)", "p(en)", "m(en)", "f(en)", "d(en)", "t(en)", "n(en)", "l(en)", "g(en)", "k(en)",
                "h(en)", "zh(en)", "ch(en)", "sh(en)", "r(en)", "z(en)", "c(en)", "s(en)", "w(en)"] ],
        "in": ["in", "īn", "ín", "ǐn", "ìn",
               ["b(in)", "p(in)", "m(in)", "d(in)", "t(in)", "n(in)", "l(in)", "j(in)", "q(in)", "x(in)",
                "y(in)"] ],
        "un": ["un", "ūn", "ún", "ǔn", "ùn",
               ["d(un)", "t(un)", "l(un)", "g(un)", "k(un)", "h(un)", "zh(un)", "ch(un)", "sh(un)", 
                "r(un)", "z(un)", "c(un)", "s(un)"] ],
        "ün": ["ün", "ǖn", "ǘn", "ǚn", "ǜn",
               ["j(un)", "q(un)", "x(un)", "y(un)"] ],
        "ang": ["ang", "āng", "áng", "ǎng", "àng",
                ["b(ang)", "p(ang)", "m(ang)", "f(ang)", "d(ang)", "t(ang)", "n(ang)", "l(ang)", 
                 "g(ang)", "k(ang)", "h(ang)", "ji(ang)", "qi(ang)", "xi(ang)", "zh(ang)", "ch(ang)", 
                 "sh(ang)", "r(ang)", "z(ang)", "c(ang)", "s(ang)", "y(ang)", "w(ang)", "gu(ang)", 
                 "ku(ang)", "hu(ang)", "zhu(ang)", "chu(ang)", "shu(ang)"] ],
        "eng": ["eng", "ēng", "éng", "ěng", "èng",
                ["b(eng)", "p(eng)", "m(eng)", "f(eng)", "d(eng)", "t(eng)", "n(eng)", "l(eng)", 
                 "g(eng)", "k(eng)", "h(eng)", "zh(eng)", "ch(eng)", "sh(eng)", "z(eng)", "c(eng)",
                 "s(eng)", "w(eng)"] ],
        "ing": ["ing", "īng", "íng", "ǐng", "ìng",
                ["b(ing)", "p(ing)", "m(ing)", "d(ing)", "t(ing)", "n(ing)", "l(ing)", "j(ing)", 
                 "q(ing)", "x(ing)", "y(ing)"] ],
        "ong": ["ong", "ōng", "óng", "ǒng", "òng",
                ["d(ong)", "t(ong)", "n(ong)", "l(ong)", "g(ong)", "k(ong)", "h(ong)", "ji(ong)", 
                 "qi(ong)", "xi(ong)", "zh(ong)", "ch(ong)", "r(ong)", "z(ong)", "c(ong)", 
                 "s(ong)", "y(ong)"] ]
    },
    
    // 得到所有韵母
    yunmus: function() {
        var results = [];
        for (var yunmu in this._yunmus) {
            results.push(yunmu);
        }
        return results;
    },

    // 得到含有此韵母的所有常用字及其拼音
    match: function(yunmu) {
        if (!(yunmu in this._yunmus))   // 韵母不正确
            return [];
            
        var matchPinyinHash = {};   // 韵母所匹配的拼音，用对象而不用数组是为了快速匹配
        var matchPatterns = this._yunmus[yunmu][5];
        for (var i = 0; i < matchPatterns.length; i++) {
            var pattern = matchPatterns[i];
            var lb = pattern.indexOf("(");
            if (lb == -1) {     // 没有括号，直接匹配
                matchPinyinHash[pattern] = "";
            } else {    // 有括号，扩展成5种声调的拼音
                var rb = pattern.indexOf(")");
                var head = pattern.substr(0, lb);
                var match = pattern.substring(lb+1, rb);
                var tail = pattern.substr(rb+1);
                
                for (var j = 0; j < 5; j++) {
                    matchPinyinHash[head+this._yunmus[match][j]+tail] = "";
                }
            }
        }
        
        var results = [];
        for (var unicode in dict) {
            var pinyinArray = dict[unicode].split(",");     // 可能是多音字
            for (var i = 0; i < pinyinArray.length; i++) {
                var pinyin = pinyinArray[i];
                
                if (pinyin in matchPinyinHash) {    // 字典中匹配到了拼音
                    var ziObj = {};
                    ziObj["zi"] = String.fromCharCode(unicode);
                    ziObj["pinyin"] = pinyin;
                    results.push(ziObj);    // 包装成含有zi和pinyin属性的对象
                }
            }
        }
        
        var self = this;
        results.sort(function(a, b) {   // 按拼音排序
            var minLen = Math.min(a.pinyin.length, b.pinyin.length);
            for (var i = 0; i < minLen; i++) {
                var aChar = a.pinyin.charAt(i);
                var bChar = b.pinyin.charAt(i);
                if (aChar != bChar) {   // 需要用到此对象里的_pinyinCharArray，因此把this变成self放在函数可见作用域
                    return self._pinyinCharArray.indexOf(aChar) - self._pinyinCharArray.indexOf(bChar);
                }
            }
            
            return a.pinyin.length - b.pinyin.length;
        });
        
        return results;
    }
};