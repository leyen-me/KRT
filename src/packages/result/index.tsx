import { t } from "@app/i18n";

export type IResult<T = any> = {
  code: number;
  message: string;
  data?: T;
};

export type IResultMapping = Record<number, string>;

export type ILocale = {
  name: string;
  value: any;
};

export type IResultOptions = {
  /**
   * Whether to enable i18n
   */
  i18n?: {
    /**
     * The locales
     */
    locales: readonly ILocale[];
  };

  /**
   * The result code mapping table
   */
  mapping: IResultMapping;
};

export let resultMappingTable: IResultMapping = {};
export let i18nLocales: ILocale[] = [];

export class AbstractResult {
  public code: number = 0;
  public data?: any;
  public message: string = "";

  public json(ctx) {
    throw new Error("Method not implemented.");
  }
}

export class Result extends AbstractResult {
  constructor(code: number, data?: any) {
    super();
    this.code = code;
    this.data = data ? data : null;
    this.message = resultMappingTable[code];
  }

  public json() {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
    };
  }
}

export class I18nResult extends AbstractResult {
  constructor(code: number, data?: any) {
    super();
    this.code = code;
    this.data = data ? data : null;
    this.message = resultMappingTable[code];
  }

  public json(ctx) {
    return {
      code: this.code,
      data: this.data,
      message: t(this.message, ctx),
    };
  }
}

export const result = (options: IResultOptions) => {
  const { i18n, mapping } = options;
  resultMappingTable = mapping;
  if (i18n && i18n.locales) {
    i18nLocales = i18n.locales as unknown as ILocale[];
  }

  return async (ctx, next) => {
    ctx.send = (response: AbstractResult) => {
      ctx.status = 200;
      ctx.body = response.json(ctx);
    };
    await next();
  };
};
