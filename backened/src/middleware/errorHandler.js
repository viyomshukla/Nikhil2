const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;

  console.error(`[ERROR] ${req.method} ${req.originalUrl} → ${statusCode}: ${message}`);
  if (details) {
    console.error('[ERROR] Details:', details);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: details
    }),
  });
};

module.exports = errorHandler;