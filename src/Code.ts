export interface Line {
  str: string
  start: number
  end: number
}

export default class Code {
  readonly str: string
  readonly lines: Line[]

  constructor(input: string) {
    this.str = input
    this.lines = []

    let pos = 0,
      nextLine
    while ((nextLine = input.indexOf('\n', pos)) !== -1) {
      this.lines.push({
        str: input.slice(pos, nextLine),
        start: pos,
        end: nextLine + 1,
      })
      pos = nextLine + 1
    }

    this.lines.push({
      str: input.slice(pos),
      start: pos,
      end: input.length,
    })
  }

  lineAt(position: number): Line | undefined {
    for (const line of this.lines) {
      if (line.start <= position && line.end > position) return line
    }
  }

  toString(): string {
    return `${this.constructor.name}(${JSON.stringify(this.str)})`
  }
}
