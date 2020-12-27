export type IApiQueryParams<Type = any> = {
  readonly [Key in keyof Type]?: Type[Key];
};
