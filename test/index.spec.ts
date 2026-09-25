import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

const expectedUsers = [{ id: 1, name: "mathias", email: "mathias@example.com" }];

describe("Hello World worker", () => {
	it("responds with the worker message and seeded users (unit style)", async () => {
		const request = new IncomingRequest("http://example.com");
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);

		const body = await response.json<{ message: string; dbData: unknown }>();
		expect(body.message).toBe("Hello from Cloudflare Workers!");
		expect(body.dbData).toEqual(expectedUsers);
	});

	it("responds with the worker message and seeded users (integration style)", async () => {
		const response = await SELF.fetch("https://example.com");

		const body = await response.json<{ message: string; dbData: unknown }>();
		expect(body.message).toBe("Hello from Cloudflare Workers!");
		expect(body.dbData).toEqual(expectedUsers);
	});
});
