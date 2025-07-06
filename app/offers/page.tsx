"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShoppingCart, Star, Percent, Clock, Zap } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import axios from "axios"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface Offer {
  id: number
  product: Product
  originalPrice: number
  discountPercent: number
  finalPrice: number
  isLimitedTime: boolean
  isFeatured: boolean
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { addToCart } = useCart()

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://fakestoreapi.com/products")
      const products: Product[] = response.data

      // Create mock offers from products
      const mockOffers: Offer[] = products.slice(0, 12).map((product, index) => {
        const discountPercent = [10, 15, 20, 25, 30, 35, 40, 45, 50][index % 9] + Math.floor(Math.random() * 10)
        const finalPrice = product.price * (1 - discountPercent / 100)

        return {
          id: product.id,
          product,
          originalPrice: product.price,
          discountPercent,
          finalPrice,
          isLimitedTime: index % 3 === 0,
          isFeatured: index < 3,
        }
      })

      setOffers(mockOffers)
      setError("")
    } catch (err) {
      setError("Failed to fetch offers. Please try again.")
      console.error("Error fetching offers:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.product.id,
      title: offer.product.title,
      price: offer.finalPrice,
      image: offer.product.image,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sky-500" />
          <p className="text-gray-600">Loading amazing offers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchOffers} className="bg-sky-500 hover:bg-sky-600">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const featuredOffers = offers.filter((offer) => offer.isFeatured)
  const regularOffers = offers.filter((offer) => !offer.isFeatured)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🔥 Amazing Offers</h1>
            <p className="text-xl mb-6 text-sky-100">
              Don't miss out on these incredible deals! Limited time offers with up to 50% off.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>Limited Time</span>
              </div>
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <Percent className="h-5 w-5 mr-2" />
                <span>Up to 50% Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Offers */}
        {featuredOffers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Deals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOffers.map((offer) => (
                <Card
                  key={offer.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-yellow-200"
                >
                  <CardContent className="p-4">
                    <div className="relative">
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-black font-bold z-10">FEATURED</Badge>
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white font-bold z-10">
                        -{offer.discountPercent}%
                      </Badge>
                      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={offer.product.image || "/placeholder.svg"}
                          alt={offer.product.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-2">
                      {offer.product.category}
                    </Badge>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{offer.product.title}</h3>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {offer.product.rating.rate} ({offer.product.rating.count})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">${offer.finalPrice.toFixed(2)}</span>
                        <span className="text-lg text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        You save ${(offer.originalPrice - offer.finalPrice).toFixed(2)}!
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button onClick={() => handleAddToCart(offer)} className="w-full bg-sky-500 hover:bg-sky-600">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Offers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularOffers.map((offer) => (
              <Card key={offer.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="relative">
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white font-bold z-10">
                      -{offer.discountPercent}%
                    </Badge>
                    {offer.isLimitedTime && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white font-bold z-10">
                        <Clock className="h-3 w-3 mr-1" />
                        LIMITED
                      </Badge>
                    )}
                    <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={offer.product.image || "/placeholder.svg"}
                        alt={offer.product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <Badge variant="secondary" className="mb-2">
                    {offer.product.category}
                  </Badge>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{offer.product.title}</h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {offer.product.rating.rate} ({offer.product.rating.count})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-red-600">${offer.finalPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">
                      Save ${(offer.originalPrice - offer.finalPrice).toFixed(2)}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button onClick={() => handleAddToCart(offer)} className="w-full bg-sky-500 hover:bg-sky-600">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't Miss Out!</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These amazing offers won't last forever. Shop now and save big on your favorite products!
          </p>
          <Button className="bg-sky-500 hover:bg-sky-600 text-lg px-8 py-3">
            <Percent className="h-5 w-5 mr-2" />
            Shop All Offers
          </Button>
        </div>
      </div>
    </div>
  )
}
