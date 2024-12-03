export const localStorageMiddleware = (req, res, next) => {
    console.log(req.body);
    console.log("hello");
    req.localStorage = req.localStorage || {};
    next();
  };
  