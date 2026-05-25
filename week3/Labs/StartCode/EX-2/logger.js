export default function logger(req, _res, next) {
  console.log(
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        query: req.query,
      },
      null, 2
    )
  );
  next();
}