const VALID_TOKEN = process.env.TOKEN || 'xyz123';

export default function requireToken(req, res, next) {
  const token = req.query.token;

  if (token !== VALID_TOKEN) {
    const message = 'Unauthorized: Invalid token';
    if (req.accepts('html')) {
      return res
        .status(401)
        .type('html')
        .send(`<h1>401</h1><p>${message}</p>`);
    }
    return res.status(401).json({ error: message, status: 401 });
  }

  next();
}