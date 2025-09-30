---
tags: [font]
---

# typst.app 在线应用上预置了哪些字体？

## 方法一：使用自动补全

输入`#text(font: …)`弹出下拉菜单，可搜索字体名称并补全，如下图。

<img width="460" height="458" alt="Image" src="https://github.com/user-attachments/assets/d2f20eaf-c651-486d-a83f-40b5a90c73cb" />

::: tip
单击编辑器左上角的 Ag 按钮还可查看字体预览并直接插入代码；不过这里字体不全，特别是缺少中文需要的 Noto CJK 系列。
:::

## 方法二：查看内部接口

在线应用的字体列表有内部接口，位于[`font-index.mpk`](https://typst.app/assets/font-derived/font-index.mpk)，格式为 [MessagePack](https://msgpack.org/)，可用 [fq](https://github.com/wader/fq) 转成 JSON 查看：

```shell
curl -LO https://typst.app/assets/font-derived/font-index.mpk
fq '[.elements.[] | { file: .elements[0].value, name: .elements[1].elements[0].value, style: .elements[1].elements[1].elements[0].value, weight: .elements[1].elements[1].elements[1].value, stretch: .elements[1].elements[1].elements[2].value }]' font-index.mpk --decode msgpack --value-output --compact-output > font-index.json
jq .[].name font-index.json --raw-output | sort | uniq 
```

目前字体列表如下。（2025年9月30日）

```
Allura
Atkinson Hyperlegible
Atkinson Hyperlegible Mono
Atkinson Hyperlegible Next
Atma
Barlow
Buenard
Cantarell
Cascadia Code
Cascadia Mono
Charter
Clicker Script
Comic Neue
Comic Neue Angular
Crimson Pro
DejaVu Math TeX Gyre
DejaVu Sans
DejaVu Sans Mono
DejaVu Serif
DM Mono
DM Sans
DM Serif Display
DM Serif Text
EB Garamond
Exo 2
Fantasque Sans Mono
Fira Code
Fira Math
Fira Mono
Fira Sans
GFS Neohellenic
GFS Neohellenic Math
Harano Aji Gothic
Harano Aji Mincho
HK Grotesk
IBM Plex Math
IBM Plex Mono
IBM Plex Sans
IBM Plex Sans Arabic
IBM Plex Sans Devanagari
IBM Plex Sans Hebrew
IBM Plex Sans KR
IBM Plex Sans Thai
IBM Plex Sans Thai Looped
IBM Plex Serif
Inconsolata
Infini
Infini Picto
Inria Sans
Inria Serif
Inter
Lato
Lete Sans Math
Liberation Mono
Liberation Sans
Liberation Serif
Libertinus Keyboard
Libertinus Math
Libertinus Mono
Libertinus Sans
Libertinus Serif
Libertinus Serif Display
Libertinus Serif Initials
Libre Barcode 128
Libre Barcode 128 Text
Libre Baskerville
Linux Biolinum
Linux Biolinum Keyboard
Linux Libertine
Linux Libertine Display
Linux Libertine Initials
Linux Libertine Mono
Lora
Luciole
Luciole Math
Manrope
Merriweather
Merriweather Sans
MOESongUN
New Computer Modern
New Computer Modern Math
New Computer Modern Mono
New Computer Modern Sans
New Computer Modern Sans Math
New Computer Modern Uncial
Noto Color Emoji
Noto Emoji
Noto Kufi Arabic
Noto Looped Lao
Noto Looped Thai
Noto Music
Noto Naskh Arabic
Noto Nastaliq Urdu
Noto Rashi Hebrew
Noto Sans
Noto Sans Adlam
Noto Sans Adlam Unjoined
Noto Sans AnatoHiero
Noto Sans Arabic
Noto Sans Armenian
Noto Sans Avestan
Noto Sans Balinese
Noto Sans Bamum
Noto Sans Bassa Vah
Noto Sans Batak
Noto Sans Bengali
Noto Sans Bhaiksuki
Noto Sans Brahmi
Noto Sans Buginese
Noto Sans Buhid
Noto Sans CanAborig
Noto Sans Carian
Noto Sans CaucAlban
Noto Sans Chakma
Noto Sans Cham
Noto Sans Cherokee
Noto Sans Chorasmian
Noto Sans CJK HK
Noto Sans CJK JP
Noto Sans CJK KR
Noto Sans CJK SC
Noto Sans CJK TC
Noto Sans Coptic
Noto Sans Cuneiform
Noto Sans Cypriot
Noto Sans Cypro Minoan
Noto Sans Deseret
Noto Sans Devanagari
Noto Sans Display
Noto Sans Duployan
Noto Sans EgyptHiero
Noto Sans Elbasan
Noto Sans Elymaic
Noto Sans Ethiopic
Noto Sans Georgian
Noto Sans Glagolitic
Noto Sans Gothic
Noto Sans Grantha
Noto Sans Gujarati
Noto Sans Gunjala Gondi
Noto Sans Gurmukhi
Noto Sans Hanifi Rohingya
Noto Sans Hanunoo
Noto Sans Hatran
Noto Sans Hebrew
Noto Sans Hebrew Droid
Noto Sans Hebrew New
Noto Sans ImpAramaic
Noto Sans Indic Siyaq Numbers
Noto Sans InsPahlavi
Noto Sans InsParthi
Noto Sans Javanese
Noto Sans Kaithi
Noto Sans Kannada
Noto Sans Kayah Li
Noto Sans Kharoshthi
Noto Sans Khmer
Noto Sans Khojki
Noto Sans Khudawadi
Noto Sans Lao
Noto Sans Lepcha
Noto Sans Limbu
Noto Sans Linear A
Noto Sans Linear B
Noto Sans Lisu
Noto Sans Lycian
Noto Sans Lydian
Noto Sans Mahajani
Noto Sans Malayalam
Noto Sans Mandaic
Noto Sans Manichaean
Noto Sans Marchen
Noto Sans Masaram Gondi
Noto Sans Math
Noto Sans Mayan Numerals
Noto Sans Medefaidrin
Noto Sans MeeteiMayek
Noto Sans Mende Kikakui
Noto Sans Meroitic
Noto Sans Miao
Noto Sans Modi
Noto Sans Mongolian
Noto Sans Mono
Noto Sans Mono CJK HK
Noto Sans Mono CJK JP
Noto Sans Mono CJK KR
Noto Sans Mono CJK SC
Noto Sans Mono CJK TC
Noto Sans Mro
Noto Sans Multani
Noto Sans Myanmar
Noto Sans Nabataean
Noto Sans Nandinagari
Noto Sans Newa
Noto Sans NewTaiLue
Noto Sans NKo
Noto Sans Nushu
Noto Sans Ogham
Noto Sans Ol Chiki
Noto Sans Old
Noto Sans Old Permic
Noto Sans Old Turkic
Noto Sans OldHung
Noto Sans OldNorArab
Noto Sans OldPersian
Noto Sans OldSogdian
Noto Sans OldSouArab
Noto Sans Oriya
Noto Sans Osage
Noto Sans Osmanya
Noto Sans Pahawh Hmong
Noto Sans Palmyrene
Noto Sans PauCinHau
Noto Sans PhagsPa
Noto Sans Phoenician
Noto Sans PsaPahlavi
Noto Sans Rejang
Noto Sans Runic
Noto Sans Samaritan
Noto Sans Saurashtra
Noto Sans Sharada
Noto Sans Shavian
Noto Sans Siddham
Noto Sans SignWrit
Noto Sans Sinhala
Noto Sans Sogdian
Noto Sans Sora Sompeng
Noto Sans Soyombo
Noto Sans Sundanese
Noto Sans Syloti Nagri
Noto Sans Symbols
Noto Sans Symbols2
Noto Sans Syriac
Noto Sans Tagalog
Noto Sans Tagbanwa
Noto Sans Tai Le
Noto Sans Tai Tham
Noto Sans Tai Viet
Noto Sans Takri
Noto Sans Tamil
Noto Sans Tamil Supplement
Noto Sans Tangsa
Noto Sans Telugu
Noto Sans Thaana
Noto Sans Thai
Noto Sans Tifinagh
Noto Sans Tifinagh Adrar
Noto Sans Tifinagh Agraw Imazighen
Noto Sans Tifinagh Ahaggar
Noto Sans Tifinagh Air
Noto Sans Tifinagh APT
Noto Sans Tifinagh Azawagh
Noto Sans Tifinagh Ghat
Noto Sans Tifinagh Hawad
Noto Sans Tifinagh Rhissa Ixa
Noto Sans Tifinagh SIL
Noto Sans Tifinagh Tawellemmet
Noto Sans Tirhuta
Noto Sans Ugaritic
Noto Sans Vai
Noto Sans Vithkuqi
Noto Sans Wancho
Noto Sans WarangCiti
Noto Sans Yi
Noto Sans Zanabazar
Noto Serif
Noto Serif Ahom
Noto Serif Armenian
Noto Serif Balinese
Noto Serif Bengali
Noto Serif CJK HK
Noto Serif CJK JP
Noto Serif CJK KR
Noto Serif CJK SC
Noto Serif CJK TC
Noto Serif Devanagari
Noto Serif Display
Noto Serif Dives Akuru
Noto Serif Dogra
Noto Serif Ethiopic
Noto Serif Georgian
Noto Serif Grantha
Noto Serif Gujarati
Noto Serif Gurmukhi
Noto Serif Hebrew
Noto Serif Hmong Nyiakeng
Noto Serif Kannada
Noto Serif Khmer
Noto Serif Khojki
Noto Serif Lao
Noto Serif Makasar
Noto Serif Malayalam
Noto Serif Myanmar
Noto Serif Old Uyghur
Noto Serif Oriya
Noto Serif Sinhala
Noto Serif Tamil
Noto Serif Tangut
Noto Serif Telugu
Noto Serif Thai
Noto Serif Tibetan
Noto Serif Toto
Noto Serif Vithkuqi
Noto Serif Yezidi
Noto Traditional Nushu
NotoSerifTamilSlanted
Open Sauce One
OpenDyslexic
OpenDyslexicMono
Permanent Marker
PT Mono
PT Sans
PT Sans Caption
PT Serif
Public Sans
Reforma 1918
Reforma 1969
Reforma 2018
Roboto
Roboto Mono
Roboto Serif
Roboto Slab
Source Code Pro
Source Sans Pro
Source Serif Pro
Spectral
STIX Two Math
STIX Two Text
Syne
Syne Mono
Syne Tactile
TeX Gyre Adventor
TeX Gyre Bonum
TeX Gyre Bonum Math
TeX Gyre Chorus
TeX Gyre Cursor
TeX Gyre Heros
TeX Gyre Pagella
TeX Gyre Pagella Math
TeX Gyre Schola
TeX Gyre Schola Math
TeX Gyre Termes
TeX Gyre Termes Math
TW-MOE-Std-Kai
Twitter Color Emoji
VG5000
Vollkorn
```
