import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl, options = {}) => {
  return proxy(serviceUrl, {
    parseReqBody: options.parseReqBody ?? true,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      }
      return proxyReqOpts;
    },
  });
};
