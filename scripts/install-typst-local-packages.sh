#!/usr/bin/env bash
set -euxo pipefail

TYPST_LOCAL="$(typst info --format json | jq '.packages["package-path"]' --raw-output)/local"

WORKDIR="$(mktemp -d)"
pushd "$WORKDIR"

# Install citext
curl -o citext.zip -L https://github.com/Shuenhoy/citext/archive/refs/tags/v0.5.0.zip
7z x citext.zip citext-0.5.0/package
mkdir -p "$TYPST_LOCAL/citext"
mv citext-0.5.0/package "$TYPST_LOCAL/citext/0.5.0"

# Test citext
echo '#import "@local/citext:0.5.0"' | typst compile - test-citext.svg

popd
rm -rf "$WORKDIR"
