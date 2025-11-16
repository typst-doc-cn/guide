#!/usr/bin/env bash
set -euxo pipefail

# Downloading fonts is time consuming. Please cache them if possible.

mkdir -p fonts
cd fonts

curl -OL https://github.com/typst-doc-cn/guide/releases/download/files/fonts.7z
7z x fonts.7z

curl -OL https://github.com/matplotlib/matplotlib/raw/be68dfecf9d26ac1a8e1e30a0de6171ecf174cd5/lib/matplotlib/mpl-data/fonts/ttf/cmsy10.ttf

curl -OL https://github.com/typst-doc-cn/guide/releases/download/files/CMSY10-fix_cmap_kerning.otf

cd -
