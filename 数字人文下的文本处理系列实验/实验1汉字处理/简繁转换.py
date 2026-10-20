import zhconv

簡轉繁=zhconv.convert('你好苏大', 'zh-hant')
繁轉簡=zhconv.convert(' 養天地正氣，法古今完人', 'zh-hans')#我用的是搜狗五筆，快捷鍵是ctrl+shift+F，直接切換的輸入法
print(簡轉繁)
print(繁轉簡)
