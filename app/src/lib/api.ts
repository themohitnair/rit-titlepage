import type { SubmissionParams } from "@/lib/types"

export async function generateTitlePage(params: SubmissionParams): Promise<Blob> {
  const response = await fetch("/api/title-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to generate title page: ${response.status}`)
  }

  return await response.blob()
}