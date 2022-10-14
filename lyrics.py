#-*- coding: utf8 -*-
import re
import sys
import io
import json
import os

def load_lyric(file):
    with open(file, mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()

    return json.loads(content)

def str_contains_latin(s):
    pattern = "[a-zA-Z]"
    re_obj = re.search(pattern, s)
    return re_obj is not None

all_zi_count = {}

def count_last_zi(lyric_line_array):
    line_set = set()
    for line in lyric_line_array:
        new_line = line.replace(",", "").replace(".", "")\
            .replace("，", "").replace("。", "").replace("…", "").replace(" ", "")
        if new_line == "":
            continue

        if new_line in line_set:
            continue

        last_zi = new_line[-1]
        if last_zi < u'\u4e00' or last_zi > u'\u9fff':
            continue
        
        line_set.add(new_line)
        if last_zi in all_zi_count:
            all_zi_count[last_zi] += 1
        else:
            all_zi_count[last_zi] = 1

def count_lyrics_last_zis():
    lyric_files = [
            r"E:\git_code\ChineseLyrics\lyrics1.json",
            r"E:\git_code\ChineseLyrics\lyrics2.json",
            r"E:\git_code\ChineseLyrics\lyrics3.json",
            r"E:\git_code\ChineseLyrics\lyrics4.json",
            r"E:\git_code\ChineseLyrics\lyrics5.json",
        ]

    for lyric_file in lyric_files:
        lyric_json = load_lyric(lyric_file)
        for lyric_obj in lyric_json:
            singer = lyric_obj["singer"]
            name = lyric_obj["name"]

            if str_contains_latin(name):
                continue

            print(singer, name)
            count_last_zi(lyric_obj["lyric"])

    print(all_zi_count, len(all_zi_count))

yunmus_match = {
    "a": {},
    "o": { "ex": ["ao"] },
    "e": { "ex": ["ie", "üe", "ue"] },
    "i": { "ex": ["ai", "ei", "ui"] },
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
            .replace("ō", "o").replace("ō", "o").replace("ō", "o").replace("ō", "o")\
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
    
def load_zi_pinyins():
    with open(os.path.split(os.path.realpath(__file__))[0] + "\\zi_pinyin.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_pinyins = json.loads(content)


if __name__ == '__main__':
    zi_freq_obj = {}
    with open(os.path.split(os.path.realpath(__file__))[0] + "\\zi_freq.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_freq_obj = json.loads(content)

    with open(os.path.split(os.path.realpath(__file__))[0] + "\\zi_pinyin.json", mode='r', encoding='utf-8') as file_obj:
        content = file_obj.read()
        zi_pinyins = json.loads(content)

    result = list_zis_by_yunmu("ing")
    zi_pinyin_freq_array = []
    for (zi, pinyin) in result:
        freq = zi_freq_obj[zi] if zi in zi_freq_obj else 0
        zi_pinyin_freq_array.append((zi, pinyin, freq))
        line = "{}({})\t{}".format(zi, pinyin, freq)
        #print(line)
    
    zi_pinyin_freq_array.sort(key=lambda x:(x[2], x[1]), reverse=True)
    for item in zi_pinyin_freq_array:
        print(item)




