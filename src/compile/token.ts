export interface Token {
  type: TokenType;
  value: string;
}

export const enum TokenType {
  LeftCurly,
  RightCurly,
  Equals,
  Text,
  EOF
}
