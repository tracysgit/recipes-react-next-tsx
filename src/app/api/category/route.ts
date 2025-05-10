import { NextResponse } from "next/server";

import DATA from "../db.json";

/**
 * The Category route.
 * @constructor
 */
export async function GET() {
  return NextResponse.json(DATA.categories);
}