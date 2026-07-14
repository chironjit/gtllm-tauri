---
title: Typescript - Vue
description: Learn about the different types exported by the `@lucide/vue` package and how to use them in your Vue application.
---
# TypeScript Support

List of exported types from the `@lucide/vue` package.
These can be used to type your components when using Lucide icons in a TypeScript Vue project.

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `LucideProps`
You can use the `LucideProps` interface to type props for your custom icon components.

::: code-group
```vue [IconWrapper.vue]
<script lang="ts" setup>
import { type LucideProps } from '@lucide/vue';
import { Camera } from '@lucide/vue';

defineProps<LucideProps>();
</script>

<template>
  <div>
    <Camera v-bind="$props" />
  </div>
</template>
```
:::

## `LucideIcon`

Type for individual icon components, this is use full when you want to type a variable or prop that holds an icon component.

```ts
type LucideIcon = React.FC<LucideProps>;
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

::: code-group
```vue [IconButton.vue]
<script lang="ts" setup>
import { type LucideProps } from '@lucide/vue';
import { Camera } from '@lucide/vue';

defineProps<{
  icon: LucideIcon;
  label: string;
}>();
</script>

<template>
  <button :aria-label="label">
    <component :is="icon" :size="16" />
  </button>
</template>
```
:::

## `IconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide Lab.

```ts
type IconNode = [elementName: string, attrs: Record<string, string | number>][];
```

### Using `IconNode`
You can use the `IconNode` type when you need to work with the raw SVG structure of an icon.

::: code-group
```vue [CustomIcon.vue]
<script lang="ts" setup>
import { type IconNode, Icon } from '@lucide/vue';

const customIcon: IconNode = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];
</script>---
title: Stroke width - Vue
description: Learn how to adjust the stroke width of icons in your Vue application using the `strokeWidth` prop or adjust the strokeWidth appearance using the `absoluteStrokeWidth` prop.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: sandpack {template=vue showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="@lucide/vue"}

```vue src/App.vue [active]
<script setup>
import { FolderLock } from "@lucide/vue";
</script>

<template>
  <FolderLock :strokeWidth="1" />
</template>
```
:::

## Absolute stroke width

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `absoluteStrokeWidth` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

![Absolute stroke width comparison](../../../images/absolute-stroke-width-compare.png?raw=true "Absolute stroke width comparison")

### Adjusting stroke width with `absoluteStrokeWidth` prop

Setting `absoluteStrokeWidth` to `true` will make the stroke width absolute.

::: sandpack {template=vue showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="@lucide/vue"}

```vue src/App.vue [active]
<script setup>
import { RollerCoaster } from "@lucide/vue";
</script>

<template>
  <RollerCoaster
    :size="96"
    absoluteStrokeWidth
  />
</template>

```
:::

<template>
  <Icon :iconNode="customIcon" size="24" color="blue" />
</template>
```
:::