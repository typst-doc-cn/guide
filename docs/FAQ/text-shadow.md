---
tags: [layout, text, code]
---

# 如何给文本增加阴影

没在 FAQ 找到前人造的轮子，遂自己造了个能用的。
过两天写个更高级的（挖坑）。

原理就是放置两个不同颜色的`text`，第一个的作为阴影在第二个的后面。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#let shadowed-text(shadow-color: gray, offset: (0.1em, 0.05em), it) = {
  box(
    stack(
      dir: ltr,
      spacing: 0pt,
      place(
        dx: offset.at(0),
        dy: offset.at(1),
        text(fill: rgb(shadow-color))[#it],
      ),
      text[#it],
    ),
  )
}

#shadowed-text[文本阴影]
#shadowed-text(shadow-color: "93b6d2", offset: (0.1em, 0.05em))[淡蓝色文本阴影]
```

## 另法：利用 SVG 制作阴影

Typst 支持渲染自己生成的 SVG，而 SVG filter effect [`<feDropShadow>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDropShadow#attributes) 可以制作阴影，支持的效果比前法更丰富；不过这种方法需用 SVG 渲染文本，导致控制字体、字重不太方便。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#let xml-escape(s) = {
  s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
}

// 粗略实现`xml.encode`
#let xml-elem(tag, attrs: (:), ..children) = {
  assert(children.named() == (:) and children.pos().len() <= 1)

  "<" + tag
  for (k, v) in attrs {
    " {k}='{v}'"
      .replace("{k}", k)
      .replace("{v}", if type(v) == length {
        str(v.pt())
      } else if type(v) == color {
        v.to-hex()
      } else {
        str(v)
      })
  }
  ">"
  children.pos().first(default: none)
  "</" + tag + ">"
}

// SVG drop-shadow text, but its layout box is measured from native Typst text.
#let drop-shadow(
  // 只支持 str
  body,

  // 以下是阴影参数，详细含义可参考 SVG <feDropShadow>
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDropShadow
  shadow-dx: 12%,
  shadow-dy: 12%,
  shadow-std-deviation: 6%,
  shadow-color: black,
  shadow-opacity: 0.35,

  // 以下参数同 typst 的 text 元素，但要改成 SVG 写法
  // 只测试过单一字体
  font: "Noto Serif",
  // 只支持数字
  weight: 700,
) = context {
  let body-text = text.with(font: font, body)
  let layout-w = measure(body-text()).width

  // baseline metrics:
  // ascent  = text.top-edge -> "baseline"
  // descent = "baseline" -> text.bottom-edge
  let ascent = measure(body-text(bottom-edge: "baseline")).height
  let descent = measure(body-text(top-edge: "baseline")).height
  let layout-h = ascent + descent

  let dx = shadow-dx * text.size
  let dy = shadow-dy * text.size
  let blur = shadow-std-deviation * text.size

  let pad-left = 3 * blur
  let pad-right = dx + 3 * blur
  let pad-top = 3 * blur
  let pad-bottom = dy + 3 * blur

  let svg-w-len = layout-w + pad-left + pad-right
  let svg-h-len = layout-h + pad-top + pad-bottom

  let svg = xml-elem(
    "svg",
    attrs: (
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: (0pt, 0pt, svg-w-len, svg-h-len).map(x => str(x.pt())).join(" "),
    ),
    {
      xml-elem("defs", xml-elem(
        "filter",
        attrs: (
          id: "shadow",
          x: "-50%",
          y: "-50%",
          width: "200%",
          height: "200%",
        ),
        xml-elem("feDropShadow", attrs: (
          dx: dx,
          dy: dy,
          stdDeviation: blur,
          flood-color: shadow-color,
          flood-opacity: shadow-opacity,
        )),
      ))
      xml-elem(
        "text",
        attrs: (
          x: pad-left + layout-w / 2,
          y: pad-top + ascent,
          text-anchor: "middle",
          font-family: font,
          font-size: text.size,
          font-weight: weight,
          fill: text.fill,
          filter: "url(#shadow)",
          textLength: layout-w,
          lengthAdjust: "spacingAndGlyphs",
        ),
        xml-escape(body),
      )
    },
  )

  box(
    width: layout-w,
    height: layout-h,
    baseline: (at: bottom, shift: descent),
    clip: false,
    move(dx: -pad-left, dy: -pad-top, image(
      bytes(svg),
      format: "svg",
      width: svg-w-len,
      height: svg-h-len,
      alt: body,
    )),
  )
}

#let font = "Source Han Serif SC"
#set text(teal.darken(30%), font: font, weight: 900)
#drop-shadow("Typst", font: font, weight: 900, shadow-color: green)
is Typst.
```
