import { NextResponse } from "next/server";

import DATA from "../db.json";

/**
 * The Recipe route.
 * @constructor
 */
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return NextResponse.json(DATA.recipes);
}