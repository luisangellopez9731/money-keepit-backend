module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/src/**/*.test.[jt]s?(x)",
  ],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.ts"],
};
