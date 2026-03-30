// Empty mock for Expo 54 winter runtime to prevent lazy global installation issues in Jest.
// The winter runtime installs lazy-evaluated globals (structuredClone, URL, etc.)
// that fail when Jest tries to access them because the dynamic require inside
// the lazy getter is blocked by Jest's module resolution during tests.
