import { getStore } from "@netlify/blobs";

// Shared store for the whole team — cases yang masih berjalan (belum di-export ke Riwayat).
function casesStore() {
  return getStore({ name: "phk-resign-cases", consistency: "strong" });
}

export default async (req) => {
  const store = casesStore();
  const method = req.method;
  const corsHeaders = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
    "access-control-allow-headers": "Content-Type",
  };

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (method === "GET") {
      const { blobs } = await store.list();
      const records = await Promise.all(
        blobs.map(async (b) => {
          const data = await store.get(b.key, { type: "json" });
          return data;
        })
      );
      records.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return new Response(JSON.stringify(records.filter(Boolean)), { status: 200, headers: corsHeaders });
    }

    if (method === "POST") {
      // Upsert: kalau body punya id yang sudah ada, timpa record itu (supaya progress yang sama terus ter-update,
      // bukan bikin duplikat tiap kali user mengetik/checklist).
      const body = await req.json();
      const id = body.id || ("c" + Date.now() + Math.random().toString(36).slice(2, 8));
      const now = new Date().toISOString();
      let existing = null;
      try { existing = await store.get(id, { type: "json" }); } catch (e) { existing = null; }
      const record = {
        ...body,
        id,
        createdAt: (existing && existing.createdAt) || now,
        updatedAt: now,
      };
      await store.setJSON(id, record);
      return new Response(JSON.stringify(record), { status: 201, headers: corsHeaders });
    }

    if (method === "DELETE") {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      if (id === "all") {
        const { blobs } = await store.list();
        await Promise.all(blobs.map((b) => store.delete(b.key)));
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
      }

      if (id) {
        await store.delete(id);
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ error: "Missing id" }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), { status: 500, headers: corsHeaders });
  }
};

export const config = { path: "/api/cases" };
