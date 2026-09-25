import path from "node:path";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
	const migrationsPath = path.join(import.meta.dirname, "migrations");
	const migrations = await readD1Migrations(migrationsPath);

	return {
		test: {
			include: ["test/**/*.spec.ts"],
			setupFiles: ["./test/apply-migrations.ts"],
			reporters: ["default", "junit"],
			outputFile: {
				junit: "./test-results/junit.xml",
			},
			coverage: {
				provider: "istanbul",
				reporter: ["text", "html", "lcov", "json-summary"],
				reportsDirectory: "./coverage",
				include: ["src/**/*.ts"],
			},
		},
		plugins: [
			cloudflareTest({
				wrangler: { configPath: "./wrangler.jsonc" },
				miniflare: {
					bindings: { TEST_MIGRATIONS: migrations },
				},
			}),
		],
	};
});
