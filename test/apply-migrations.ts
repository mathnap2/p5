import { applyD1Migrations, env } from "cloudflare:test";

await applyD1Migrations(env.p6, env.TEST_MIGRATIONS);
