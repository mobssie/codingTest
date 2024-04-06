export type TRating = {
  rate: number
  count: number
}
export type TProduct = {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: TRating
  title: string
}
