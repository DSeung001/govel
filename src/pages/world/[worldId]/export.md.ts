import fs from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";
import { listWorldIds } from "../../../lib/worlds";

export async function getStaticPaths() {
  const worldIds = await listWorldIds();
  return worldIds.map((worldId) => ({ params: { worldId } }));
}

export const GET: APIRoute = async ({ params }) => {
  const worldId = params.worldId;
  if (!worldId) {
    return new Response("worldId is required", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "worlds", worldId, "export.md");
  const body = await fs.readFile(filePath, "utf-8");
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "content-disposition": `attachment; filename="${worldId}-export.md"`,
    },
  });
};
