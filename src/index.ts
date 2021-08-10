import { argv, exit } from 'process'

import Code from './Code'
import Parser from './parser/Parser'
import { createInterface } from 'readline'

function parseAndPrint(input: string) {
  const code = new Code(input)

  for (const node of new Parser(code)) {
    console.log(node.toString())
  }
}

function input(query: string) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<string>(resolve =>
    rl.question(query, ans => {
      rl.close()
      resolve(ans)
    })
  )
}

async function parserRepl() {
  let line: string,
    codeStr = ''
  while ((line = await input('> ')) != '.exit') {
    if (line != '') codeStr += line + '\n'
    else parseAndPrint(codeStr)
  }
}

if (argv.length > 2) parseAndPrint(argv[2])
else parserRepl().then(() => exit())
