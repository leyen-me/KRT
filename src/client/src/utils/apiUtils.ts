// apiUtils.js

// 通用的 fetch 请求封装函数

// todo: type
// RequestInit

export const fetchRequest = async (url: string, options: any = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-I18n": "zh-CN",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // 如果响应状态不为 2xx，抛出错误
  if (!response.ok) {
    let errorMessage = "Failed to fetch";

    // 尝试从响应中提取错误信息
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      // 如果没有响应体或者解析失败，使用默认的错误信息
      errorMessage = "Failed to fetch: Unable to parse error response";
    }

    throw new Error(errorMessage);
  }

  // 返回 JSON 数据
  return response.json();
};
