const RECAPTCHA_SCRIPT_SOURCES = [
  "https://www.google.com/recaptcha/",
  "https://www.gstatic.com/recaptcha/",
];

const RECAPTCHA_FRAME_SOURCES = [
  "https://www.google.com/recaptcha/",
  "https://recaptcha.google.com/recaptcha/",
];

const RECAPTCHA_CONNECT_SOURCES = ["https://www.google.com/recaptcha/"];

const GOOGLE_FONT_STYLE_SOURCES = ["https://fonts.googleapis.com"];

const GSTATIC_STYLE_SOURCES = ["https://www.gstatic.com"];

export const buildContentSecurityPolicyDirectives = ({ isProduction } = {}) => {
  const directives = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", ...RECAPTCHA_SCRIPT_SOURCES],
    styleSrc: [
      "'self'",
      ...GOOGLE_FONT_STYLE_SOURCES,
      ...GSTATIC_STYLE_SOURCES,
    ],
    styleSrcElem: [
      "'self'",
      ...GOOGLE_FONT_STYLE_SOURCES,
      ...GSTATIC_STYLE_SOURCES,
    ],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", ...RECAPTCHA_CONNECT_SOURCES],
    fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"],
    frameSrc: ["'self'", ...RECAPTCHA_FRAME_SOURCES],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'none'"],
    formAction: ["'self'"],
  };

  if (isProduction) {
    directives.upgradeInsecureRequests = [];
  }

  return directives;
};

export const getHelmetContentSecurityPolicy = ({ isProduction } = {}) => {
  const directives = buildContentSecurityPolicyDirectives({ isProduction });
  const reportOnly = process.env.CSP_REPORT_ONLY === "true";

  return reportOnly
    ? { reportOnly: true, directives }
    : { directives };
};

export const logContentSecurityPolicyConfig = ({ isProduction } = {}) => {
  const reportOnly = process.env.CSP_REPORT_ONLY === "true";
  const mode = reportOnly ? "report-only" : "enforce";

  console.log(
    `[csp] mode=${mode} production=${Boolean(isProduction)} style-src without unsafe-inline; reCAPTCHA + Google Fonts allowlisted`
  );
};
