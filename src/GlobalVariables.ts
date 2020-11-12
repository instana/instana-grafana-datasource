/* CONFIG */
export const PAGINATION_LIMIT = 15; // pagesize=200 => 3000 results in dropdown (~30sec.)
export const CACHE_MAX_AGE = 60000;
export const SEPARATOR = '|';

/* CATEGORIES */
export const BUILT_IN_METRICS = 0;
export const CUSTOM_METRICS = 1;
export const ANALYZE_APPLICATION_METRICS = 2;
export const ANALYZE_WEBSITE_METRICS = 3;
export const APPLICATION_SERVICE_ENDPOINT_METRICS = 4; // replaces previous ->
// APPLICATION_METRICS = '4';
// SERVICE_METRICS = '5';
// ENDPOINT_METRICS = '6';
export const SLO_INFORMATION = 7;

/* DROPDOWN DEFAULTS */
export const ALL_APPLICATIONS = '-- No Application Filter --';
export const ALL_WEBSITES = '-- No Website Filter --';
export const ALL_SERVICES = '-- No Service Filter --';
export const ALL_ENDPOINTS = '-- No Endpoint Filter --';

/* PLACEHOLDER */
export const PLEASE_SPECIFY = 'Please specify';
