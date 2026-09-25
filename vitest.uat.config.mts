import { defineConfig } from "vitest/config";

// UAT tests hit a real, already-deployed Worker over HTTP, so they run as
// plain Node tests instead of inside the Workers runtime (see vitest.config.mts).
export default defineConfig({
	test: {
		include: ["tests-uat/**/*.spec.ts"],
		reporters: ["default", "junit"],
		outputFile: {
			junit: "./test-results/uat-junit.xml",
		},
	},
});
