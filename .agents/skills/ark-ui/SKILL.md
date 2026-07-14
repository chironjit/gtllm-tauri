---
name: ark-ui
description: Utilise Ark UI components 
license: MIT
metadata:
    author: Chironjit Das<https://github.com/chironjit>
    version: "v5.x"
compatibility: Requires Vue 3 (or above)
---

# Ark UI
This skill dictates the use of ark-ui unstyled components for the components of the app. Utilise this skill only when there isn't an already created component in the `src/components` folder.


## When to Apply

- Utilise this skill when you need components for the task at hand, and that component has not already been created previously
- Always check that the component is available in Ark UI before creting a custom component
- Consider utilising ark ui components to build more complex components when needed rather than creating custom components
- Ark UI components are unstyled. Utilise only tailwind css to style the components according to the theme (see section on styling)
- Utilise `llms-vue.txt` to get code snippets, guides and steps to implement the component. Utilise only Vue code and never use jsx.
- Utilise the `llms.txt` in the `./references` folder of this directory to get a list of all available document links for Ark UI when you need to check the online documentation

## References
Utilise these files in the `./references` folder to find the necessary references:
- `styling.md` for styling
- `composition.md` for compositions
- `componentstate.md` for component states
- `animation.md` for animations
- `forms.md` for forms
- `refs.md` for refs
- `llms.txt` for a list of components and links
- `llms-vue.txt` for a longer list of all components, examples and explanations


## Styling
### Overview

Ark UI is a headless component library that works with any styling solution. It provides functional styles for elements
like popovers for positioning, while leaving presentation styles up to you. Some components also expose CSS variables
that can be used for styling or animations.

> **Tip:** Looking for a ready-to-use solution? Checkout [Park UI](https://park-ui.com) for a collection of pre-designed
> styles based on Ark UI components.

#### Data Attributes

Ark UI components use `data-scope` and `data-part` attributes to target specific elements within a component.
Interactive components often include `data-*` attributes to indicate their state. For example, here's what an open
accordion item looks like:

```html
<div data-scope="accordion" data-part="item" data-state="open"></div>
```

For more details on each component's data attributes, refer to their respective documentation.

### Z-Index

Ark UI does not prescribe a global z-index scale. You decide the base z-index value for overlays, and Ark exposes Zag's
`--layer-index` variable to keep stacked overlays in the right order.

`--layer-index` is a zero-based index for open dismissible layers. Use it as an offset from your base z-index, not as
the full z-index value.

Use one shared base z-index for all dismissible overlays. This lets Zag order any combination of nested layers
correctly, regardless of component type.

For example, this should stack correctly:

- A dialog opened from a popover
- A menu opened inside a dialog
- A select opened inside a drawer
- A nested dialog opened from another dialog

If each component type uses a different base z-index, those base values can fight the layer order. Keep the base the
same, then let `--layer-index` do the stacking.

For dialogs and drawers, apply it to the content. Zag syncs the content's computed z-index to the backdrop and
positioner as `--z-index`, so set the z-index property for those parts:

```css
[data-scope='dialog'][data-part='content'] {
  z-index: calc(1000 + var(--layer-index, 0));
}

[data-scope='dialog'][data-part='positioner'] {
  z-index: var(--z-index, 1000);
}

[data-scope='dialog'][data-part='backdrop'] {
  z-index: calc(var(--z-index, 1000) - 1);
}
```

For popper-style components, apply it to the floating content. Zag syncs the content's computed z-index to the
positioner as `--z-index`, and the positioner already uses `z-index: var(--z-index)`:

```css
[data-scope='popover'][data-part='content'],
[data-scope='menu'][data-part='content'],
[data-scope='select'][data-part='content'],
[data-scope='combobox'][data-part='content'],
[data-scope='date-picker'][data-part='content'] {
  z-index: calc(1000 + var(--layer-index, 0));
}
```

If your design system exposes z-index tokens, prefer one shared overlay token for dismissible layers:

```css
[data-scope='dialog'][data-part='content'] {
  z-index: calc(var(--z-index-overlay) + var(--layer-index, 0));
}

[data-scope='dialog'][data-part='positioner'] {
  z-index: var(--z-index, var(--z-index-overlay));
}

[data-scope='dialog'][data-part='backdrop'] {
  z-index: calc(var(--z-index, var(--z-index-overlay)) - 1);
}

[data-scope='popover'][data-part='content'] {
  z-index: calc(var(--z-index-overlay) + var(--layer-index, 0));
}
```

**Caution:** Avoid using `--layer-index` as the entire z-index:

```css
[data-scope='dialog'][data-part='positioner'] {
  z-index: var(--layer-index);
}
```

This produces values like `0`, `1`, and `2`, which can appear below headers, sidebars, or other app chrome.

Zag also exposes `data-nested`, `data-has-nested`, and `--nested-layer-count` for styling layers that contain nested
layers.

```css
[data-scope='dialog'][data-part='content'][data-has-nested='dialog'] {
  scale: 0.98;
}
```

Use portals for overlays that need to escape parent stacking contexts. CSS properties like `transform`, `filter`,
`opacity`, `contain`, `isolation`, and `perspective` can create stacking contexts that trap inline overlays.


### Styling with Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework providing a flexible way to style your
components.

#### Styling a Part

To style a part, apply classes directly to the parts using either `class` or `className`, depending on the JavaScript
framework.

```js
<Accordion.Root>
  <Accordion.Item className="border-b border-gray-300">{/* … */}</Accordion.Item>
</Accordion.Root>
```

#### Styling a State

Leverage Tailwind CSS's variant selector to style a component based on its data-state attribute.

```js
<Accordion.Root>
  <Accordion.Item className="border-b border-gray-300 data-[state=open]:bg-gray-100">{/* … */}</Accordion.Item>
</Accordion.Root>
```