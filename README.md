# vue-docs-tr-helper README

Here is Vue documentation traslation helper! it will provide you useful commands for translation editing.

## Features

### anchor tag transform

Headings text of documentation are different in displaying languages, but markdown's heading anchor is just based on its content, so the original `[anchor text](#anchor-path)` is unavailable in different languages.

We've found a solution in VuePress/VitePress for this problem, for the foreseeable future, all language translations will use the following form of markup, appended to the end of a markdown heading.

```markdown
<!-- before transforming -->
## System Modifier Keys
### `.exact` Modifier
## `v-if` in `<template>`

<!-- after transforming -->
## System Modifier Keys {#system-modifier-keys}
### `.exact` Modifier {#exact-modifier}
## `v-if` in `<template>` {#v-if-in-template}
```

## Requirements

Nothing for now.

<!-- If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->

## Extension Settings

Nothing for now.

<!-- Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: enable/disable this extension
- `myExtension.thing`: set to `blah` to do something 
-->

## Known Issues

Nothing for now.

<!-- Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

<!-- Users appreciate release notes as you update your extension. -->

### 0.0.1

Initial release of Vue-docs-tr-helper.

Provide commands:
 - `anchor-tag`: replace selection text to a valid anchor tag form.
 - `anchor-tag-file`: replace all headings of a markdown file to valid anchor tags form.

-----
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
