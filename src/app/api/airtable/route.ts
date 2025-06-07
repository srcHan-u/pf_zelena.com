import { type NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;

const base = new Airtable({ apiKey }).base(baseId);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tableName = searchParams.get("tableName") || "Contacts";

  const records = await base(tableName).select({ view: "Grid view" }).all();
  const items = records.map((record) => {
    const fields = record.fields;
    return fields;
  });

  return NextResponse.json(items);
}
