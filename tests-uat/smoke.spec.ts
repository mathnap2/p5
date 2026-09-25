import { describe, expect, it } from "vitest";

// UAT_URL is set by the pipeline to the Worker just deployed to the UAT
// environment (https://p5-uat.<your-subdomain>.workers.dev by default).
const targetUrl = process.env.UAT_URL;

describe.skipIf(!targetUrl)("UAT acceptance tests", () => {
	it("serves the expected payload from the deployed Worker", async () => {
		const response = await fetch(targetUrl as string);
		expect(response.status).toBe(200);

		const body = (await response.json()) as { message: string; dbData: unknown[] };
		expect(body.message).toBe("Hello from Cloudflare Workers!");
		expect(Array.isArray(body.dbData)).toBe(true);
	});
});
