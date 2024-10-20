---
tags: [code, layout]
---

# 代码块里多了空格/代码块的对齐非常奇怪

给 `par` 设置两端对齐时，同时也会影响代码块，因为代码块的本质也是 `par`，所以要手动关掉代码块的两端对齐。

```typst
#set par(justify: true)
#show raw.where(block: true): set par(justify: false)
```

...

````typst no-render
#set page(width: 16cm, height: auto)
#set par(justify: true)

```cpp
PolyManager::Poly PolyManager::mul(PolyManager::Poly a, PolyManager::PolyBasic p) {
    a = copy(a);
    for (auto cptr = a -> next; cptr != nullptr; cptr = cptr -> next)
        cptr -> coef *= p.coef, cptr -> expo += p.expo;
    return a;
}
```

#show raw.where(block: true): set par(justify: false)

```cpp
PolyManager::Poly PolyManager::mul(PolyManager::Poly a, PolyManager::PolyBasic p) {
    a = copy(a);
    for (auto cptr = a -> next; cptr != nullptr; cptr = cptr -> next)
        cptr -> coef *= p.coef, cptr -> expo += p.expo;
    return a;
}
```
````
