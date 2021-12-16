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

  lineAt(position: number): [number, Line] | undefined {
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]
      if (line.start <= position && line.end > position) return [i + 1, line]
    }
  }

  toString(): string {
    return `${this.constructor.name}(${JSON.stringify(this.str)})`
  }
}
