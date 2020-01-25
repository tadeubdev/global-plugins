#!/usr/bin/env node

var shell = require('shelljs')
var fs = require('fs')

let [,, ...title] = process.argv
title = title.join(' ');

const name = title.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).split(' ').join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const slug = title.replace(/\w\S*/g, txt => (txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase())).split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const code = Math.random().toString().replace('0.', '')
const dir = "resources/assets/js/"
const path = `modulos/${slug}`
const file = `${path}/data.json`

const data = {
  title: title,
  name: name,
  slug: slug,
  code: code,
  active: false,
  development: true,
}

shell.mkdir('-p', dir+path)
fs.writeFileSync(dir + file, JSON.stringify(data))

let content = `import ${name} from './${name}';\n\nexport default {\n\tinstall(Vue) {\n\t\tVue.component('${name}', ${name});\n\t}\n}`;
fs.writeFileSync(`${dir}${path}/index.js`, content);

content = `<template>\n\t<div>\n\t\t<h1>${title}</h1>\n\t</div>\n</template>\n\n<script>\nexport default {\n};\n</script>`
fs.writeFileSync(`${dir}${path}/${name}.vue`, content)
