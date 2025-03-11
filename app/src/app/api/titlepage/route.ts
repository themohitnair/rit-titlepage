import { type NextRequest, NextResponse } from "next/server"
import type { SubmissionParams } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const data: SubmissionParams = await request.json()

    const apiKey = process.env.API_KEY
    const apiUrl = process.env.NEXT_PUBLIC_RIT_TITLEPAGE_API_URL

    if (!apiUrl) {
      throw new Error("API URL is not defined in environment variables")
    }
    if (!apiKey) {
      throw new Error("API Key is not defined in environment variables")
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const blob = await response.blob()
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    })
  } catch (error) {
    console.error("Error in title page generation:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
