import hashlib
import base64
import re
import os
import tempfile
import subprocess


def get_hash(input_string: str):
    sha1_result = hashlib.sha1(input_string.encode()).digest()
    base64_result = base64.b64encode(sha1_result, altchars=b"!$").decode()
    return base64_result


def process_file(filename: str):
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = re.compile(r"```typst\n(.*?)\n```", re.DOTALL)
    matches = pattern.findall(content)
    for m in matches:
        # create a temporary file then use typst to compile it
        outfilename = f"generated/{get_hash(m)}_{{n}}.png"
        # if exists then skip
        if os.path.isfile(outfilename):
            print(f"Skipping {outfilename}")
            continue
        with tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8") as f:
            f.write("#set page(height: 4cm, width: 6cm)\n")
            f.write(m)
        # print(f"Compiling {f.name} to {outfilename}")
        # print("========== code:")
        # print(m)
        subprocess.run(["typst", "compile", f.name, outfilename])


if __name__ == "__main__":
    os.makedirs("generated", exist_ok=True)
    for root, dirs, files in os.walk("docs"):
        for file in files:
            if file.endswith(".md"):
                fullpath = os.path.join(root, file)
                print(f"Processing {fullpath}")
                process_file(fullpath)
