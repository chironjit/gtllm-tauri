---
name: nueglow
description: A custom skill to describe how to utilise the nueglow module for syntax highlighting, including for html, markdown and many more
metadata:
  author: Chironjit Das
  version: "0.25"
---

# Neuglow
Utilise nueglow to highlight syntax. Note that examples here may utilise basic CSS but you must change it to TailwindCSS for the actual implementation. When implementing syntax highlighting note that it will need to match the theme.

## Install Nueglow
USe `bun install nue-glow` to install if not already installed

## How it works

Nueglow generates clean, semantic HTML:

```
<pre>
  <code language="javascript">
    <b>const</b> total <i>=</i> items<i>.</i><strong>reduce</strong><i>((</i>sum<i>,</i> item<i>)</i> <i>=></i> <i>{</i>
      <b>return</b> sum <i>+</i> item<i>.</i>price
    <i>},</i> <em>0</em><i>)</i>
  </code>
</pre>
```

The CSS defines the appearance:

```
pre {
  /* Keywords */
  b { color: var(--keyword) }

  /* Values */
  em { color: var(--value) }

  /* Punctuation */
  i { color: var(--punct) }

  /* Comments */
  sup { color: var(--comment) }
}
```

## Features

- Line highlighting - Mark specific lines as added, removed, or emphasized
- Region selection - Highlight code sections with bullet markers
- Line numbers - CSS counter-based numbering that matches your typography
- Error marking - Visual indicators for syntax errors or problems
- Language detection - Automatic recognition from fenced code block languages
- Custom classes - Add specific styling for different contexts

## Syntax highlighting reference
Refer to `./references/syntax-highlighting.md` for full syntax highlighting. The following is a snippet:

### How it works

Nueglow generates semantic HTML without class names. Your design system controls the appearance through CSS element selectors.

#### Basic example
This Markdown code block:

 ```javascript
 // Calculate total
 const total = items.reduce((sum, item) => {
   return sum + item.price
 }, 0)
 ```

Generates this HTML:
```
<pre>
  <code language="javascript">
    <sup>// Calculate total
    <b>const</b> total <i>=</i> items<i>.</i>reduce<i>((</i>sum<i>,</i> item<i>)</i> <i>=></i> <i>{</i>
      <b>return</b> sum <i>+</i> item<i>.</i>price
    <i>},</i> <em>0</em><i>)</i>
  </code>
</pre>
```
No classes, just semantic HTML elements. Your CSS defines how keywords, comments, and punctuation look.

### HTML elements

Nueglow maps code tokens to semantic HTML elements:
| Element   | Purpose                 | Common use                |
| <b>       |	Keywords                |	const, function, class, if, return
| <em>      |	Values                  |	Strings, numbers, booleans
| <strong>  |	Special emphasis        |	Important identifiers, class names
| <i>	      | Punctuation             |	Brackets, commas, operators
| <sup>	    | Comments                |	Single and multi-line comments
| <del>	    | Deleted lines           |	Diff removals
| <ins>	    | Inserted lines          |	Diff additions
| <dfn>	    | Highlighted lines       |	Focus lines
| <u>	      |Errors                   |	Syntax errors, problems
| <mark>	  |Marked regions           |	Selected code
| <label>	  |Special tokens           |	Standout words, annotations

### Language support

Specify the language after the opening fence:

  ```python
  def hello():
      return "Hello world"
  ```

  ```html
  <!doctype html>
  <body>
    <h1>Title</h1>
  </body>
  ```

  ```css
  .container {
    display: grid;
    gap: 2rem;
  }
  ```

Nue supports virtually all programming, markup, and markdown syntaxes including javascript, typescript, python, html, css, yaml, json, markdown, bash, sql. The trick is to study features (strings, comments, keywords) regardless of the language. This way there is no need for specialized grammar file for each language.
