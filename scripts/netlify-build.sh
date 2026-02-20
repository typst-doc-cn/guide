#!/usr/bin/env bash
set -euxo pipefail

# Install 7z
curl -OL https://www.7-zip.org/a/7z2409-linux-x64.tar.xz
tar -xvf 7z2409-linux-x64.tar.xz 7zz
mv 7zz 7z

# Install typst v0.14
curl -OL https://github.com/typst/typst/releases/download/v0.14.2/typst-x86_64-unknown-linux-musl.tar.xz
tar -xvf typst-x86_64-unknown-linux-musl.tar.xz
mv typst-x86_64-unknown-linux-musl/typst typst
rm -r typst-x86_64-unknown-linux-musl

# Install typst v0.13
curl -OL https://github.com/typst/typst/releases/download/v0.13.1/typst-x86_64-unknown-linux-musl.tar.xz
tar -xvf typst-x86_64-unknown-linux-musl.tar.xz
mv typst-x86_64-unknown-linux-musl/typst typst-0.13.1
rm -r typst-x86_64-unknown-linux-musl

# Complete installations
export PATH=$PATH:$(pwd)

# Prepare
bash scripts/download-fonts.sh

# Build
pnpm install
VP_PROFILE=netlify pnpm build
