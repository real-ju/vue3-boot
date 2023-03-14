module.exports = {
  // 代码换行的行长度
  printWidth: 120,
  // 代码每一个水平缩进的空格数
  tabWidth: 2,
  // 使用tab（制表位）缩进而非空格
  useTabs: false,
  // 在语句末尾添加分号
  semi: true,
  // 使用单引号而非双引号
  singleQuote: true,
  // as-needed - 仅在需要时在对象属性周围添加引号
  // consistent - 如果对象中的至少一个属性需要加引号，就对所有属性加引号
  // preserve - 按照对象属性中引号的输入用法
  quoteProps: 'as-needed',
  // 在JSX中使用单引号
  jsxSingleQuote: true,
  // none - 无尾逗号
  // es5 - 添加es5中被支持的尾逗号
  // all - 所有可能的地方都被添加尾逗号
  trailingComma: 'none',
  // 括号空格
  bracketSpacing: true,
  // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
  jsxBracketSameLine: false,
  // 为单行箭头函数的参数添加圆括号
  arrowParens: 'avoid', // 单个参数的箭头函数不加括号 x => x
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 文本样式进行折行
  // always - 当超出print width（上面有这个参数）时就折行
  // never - 不折行
  // preserve - 按照文件原样折行
  proseWrap: 'preserve',
  // html空格敏感度 css|strict|ignore
  htmlWhitespaceSensitivity: 'css',
  // vue缩进脚本和样式
  vueIndentScriptAndStyle: true,
  // 设置统一的行结尾样式
  // lf – 仅换行（\ n），在Linux和macOS以及git repos内部通用
  // crlf - 回车符+换行符（\ r \ n），在Windows上很常见
  // cr - 仅回车符（\ r），很少使用
  // auto - 保持现有的行尾（通过查看第一行后的内容对一个文件中的混合值进行归一化）
  endOfLine: 'auto'
}