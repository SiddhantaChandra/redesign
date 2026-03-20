export interface Design {
  slug: string
  author: string | null
  content: string
}

export interface Index {
  generatedAt: string
  designs: Design[]
}
