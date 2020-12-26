export type IApiBodyParams<Type> = {
  readonly [Key in keyof Type]?: Type[Key];
};
