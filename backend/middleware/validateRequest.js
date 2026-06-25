const formatIssues = (issues) =>
  issues.map((issue) => ({
    field: issue.path.join(".") || "root",
    message: issue.message,
  }));

const validateRequest = (schemas) => (req, res, next) => {
  for (const target of ["params", "query", "body"]) {
    const schema = schemas[target];
    if (!schema) continue;

    const result = schema.safeParse(req[target]);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request data",
        details: formatIssues(result.error.issues),
      });
    }

    req[target] = result.data;
  }

  next();
};

export default validateRequest;
