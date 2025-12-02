#-*- coding: utf8 -*-
import json
import os
import sys

yunmus_match = {
    "a": {},
    "o": { "ex": ["ao"] },
    "e": { "ex": ["ie", "üe", "ue"] },
    "i": { "ex": ["ai", "ei", "ui", "zi", "ci", "si", "ri", "zhi", "chi", "shi"] },
    "i2": { "match": ["zi", "ci", "si", "ri", "zhi", "chi", "shi"] },
    "u": { "ex": ["ou", "iu", "ju", "qu", "xu", "yu"] },
    "ü": { "match": ["ü", "ju", "qu", "xu", "yu"], "ex": ["ou", "iu"] },
    "ai": {},
    "ei": {},
    "ui": {},
    "ao": {},
    "ou": {},
    "iu": {},
    "ie": {},
    "üe": { "match": ["üe", "jue", "que", "xue", "yue"] },
    "er": {},
    "an": { "ex": ["ian", "juan", "quan", "xuan", "yan", "yuan"] },
    "ian": { "match": ["ian", "juan", "quan", "xuan", "yan", "yuan"]},
    "en": {},
    "in": {},
    "un": { "ex": ["jun", "qun", "xun", "yun"] },
    "ün": { "match": ["jun", "qun", "xun", "yun"] },
    "ang": {},
    "eng": {},
    "ing": {},
    "ong": {}
}

zi_pinyins = []

def list_zis_by_yunmu(yunmu):
    global zi_pinyins
    global yunmus_match

    zis = []
    if not yunmu in yunmus_match:
        return zis
    
    match_rule = yunmus_match[yunmu]
    match_ends = []
    exclude_ends = []
    if "match" in match_rule:
        match_ends = match_rule["match"]
    else:
        match_ends = [yunmu]

    if "ex" in match_rule:
        exclude_ends = match_rule["ex"]

    result = []
    for [zi, pinyin] in zi_pinyins:
        has_match = False
        
        plain_pinyin = pinyin\
            .replace("ā", "a").replace("á", "a").replace("ǎ", "a").replace("à", "a")\
            .replace("ō", "o").replace("ó", "o").replace("ǒ", "o").replace("ò", "o")\
            .replace("ē", "e").replace("é", "e").replace("ě", "e").replace("è", "e")\
            .replace("ī", "i").replace("í", "i").replace("ǐ", "i").replace("ì", "i")\
            .replace("ū", "u").replace("ú", "u").replace("ǔ", "u").replace("ù", "u")\
            .replace("ǖ", "ü").replace("ǘ", "ü").replace("ǚ", "ü").replace("ǜ", "ü")

        for match_end in match_ends:
            if plain_pinyin.endswith(match_end):
                has_match = True
                break
        
        if not has_match:
            continue

        if not exclude_ends:
            result.append((zi, pinyin))
            continue

        should_exclude = False
        for exclude_end in exclude_ends:
            if plain_pinyin.endswith(exclude_end):
                should_exclude = True
                break
        
        if not should_exclude:
            result.append((zi, pinyin))

    return result

def print_by_yunmu(yunmu):
    global zi_pinyins
    zi_freq_obj = {}
    cur_path = os.path.split(os.path.realpath(__file__))[0]
    with open(cur_path + "\\zi_freq.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_freq_obj = json.loads(content)

    with open(cur_path + "\\zi_pinyin.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_pinyins = json.loads(content)

    result = list_zis_by_yunmu(yunmu)
    zi_pinyin_freq_array = []
    for (zi, pinyin) in result:
        freq = zi_freq_obj[zi] if zi in zi_freq_obj else 0
        zi_pinyin_freq_array.append((zi, pinyin, freq))
    
    zi_pinyin_freq_array.sort(key=lambda x:(x[2], x[1]), reverse=True)
    for item in zi_pinyin_freq_array:
        print(item)
        
def print_by_last_zi(zi):
    cur_path = os.path.split(os.path.realpath(__file__))[0]
    with open(cur_path + "\\zi_ci_min.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_ci_obj = json.loads(content)
        if not zi in zi_ci_obj:
            print("找不到词语！")
            sys.exit(1)
            
        for ci in zi_ci_obj[zi]:
            print(ci)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("请指定一个韵母！")
        sys.exit(1)

    key = sys.argv[1]
    if key in yunmus_match:
        print_by_yunmu(key)
    else:
        print_by_last_zi(key)

    




