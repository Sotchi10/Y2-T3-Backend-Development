function parseOptionalInt(value) {
    if (value === undefined) return { ok: true, value: undefined };
    if (Array.isArray(value)) return { ok: false, error: 'Expected a single value.' };

    const text = String(value).trim();
    if (!/^\d+$/.test(text)) return { ok: false, error: `Invalid non-negative integer: ${value}` };

    return { ok: true, value: Number.parseInt(text, 10) };
}

function sendBadRequest(req, res, message) {
    if (req.accepts('html')) {
        return res
            .status(400)
            .type('html')
            .send(`<h1><strong>400 BAD REQUEST</strong></h1><p>${message}</p>`);
    }

    return res.status(400).json({ error: message, status: 400 });
}

export default function validateQuery(req, res, next) {
    const minParsed = parseOptionalInt(req.query.minCredits);
    if (!minParsed.ok) {
        return sendBadRequest(req, res, `minCredits: ${minParsed.error}`);
    }

    const maxParsed = parseOptionalInt(req.query.maxCredits);
    if (!maxParsed.ok) {
        return sendBadRequest(req, res, `maxCredits: ${maxParsed.error}`);
    }

    if (minParsed.value !== undefined && maxParsed.value !== undefined && minParsed.value > maxParsed.value) {
        return sendBadRequest(req, res, 'minCredits must be <= maxCredits');
    }

    req.parsedCredits = {
        minCredits: minParsed.value,
        maxCredits: maxParsed.value,
    };

    next();
}
