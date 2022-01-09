import CodePosition from './CodePosition'

export default class RuntimeError extends Error {
  readonly fileName: string
  readonly line: string
  readonly position: CodePosition

  constructor(
    message: string,
    fileName: string,
    line: string,
    position: CodePosition
  ) {
    super(message)
    this.name = 'RuntimeError'

    this.fileName = fileName
    this.line = line
    this.position = position
  }
}
