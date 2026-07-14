---
name: lucide-vue
description: A custom skill to describe how to best utilise lucide icons in vue based on the documentation of Lucide icons
metadata:
  author: Chironjit Das
  version: "1.24"
---

# Lucide Vue
This skill aims to help you understand and utilise lucide's vue plugin. Refer to the documents in this skill to identify how best to utilise, manage, change and adapt the icons to the needs of the project.

## Installation
Use `bun add @lucide/vue` to install if not already installed

## Import and example
```
<script setup>
import { Camera } from '@lucide/vue';
</script>

<template>
  <Camera :size="48" color="red" :stroke-width="1" />
</template>
```

## References
The following is a list of references you should check out in the `./references` folder

- Installaing and examples: `getting-started.md`
- Colors for icons: `color.md`
- Stroke width for icons: `stroke-width.md`
- Sizing for icons: `sizing.md`
- Accessibility options: `accessibility.md`
- Types when using typescript: `typescript.md`
- Global styling options: `global-styling.md`
- Combining icons: `combining-icons.md`
- Filling icons: `filled-icons.md`
- Aliased names: `aliased-names.md`


