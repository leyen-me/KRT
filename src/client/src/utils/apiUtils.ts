// apiUtils.js

import { getI18n } from "@app/i18n";

// 通用的 fetch 请求封装函数

// todo: type
// RequestInit

export const fetchRequest = async (url: string, options: any = {}) => {
  const i18n = getI18n().name;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-I18n": i18n,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // 如果响应状态不为 2xx，抛出错误
  let responseData = null;
  if (!response.ok) {
    // network error
    let errorMessage = "Failed to fetch";

    // 尝试从响应中提取错误信息
    try {
      responseData = await response.json();
      errorMessage = responseData.message || errorMessage;
    } catch (err) {
      // 如果没有响应体或者解析失败，使用默认的错误信息
      errorMessage = "Failed to fetch: Unable to parse error response";
    }

    throw new Error(errorMessage);
  } else {
    // 状态为200，但是逻辑错误
    try {
      responseData = await response.json();
      if (responseData.code !== 200) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      throw err;
    }
  }

  // 返回 JSON 数据
  return responseData;
};
