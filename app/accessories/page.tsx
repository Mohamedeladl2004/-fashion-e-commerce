import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Headphones, Watch, Smartphone, Camera, Gamepad2, Speaker } from "lucide-react"

export default function AccessoriesPage() {
  const accessoryCategories = [
    {
      name: "Audio",
      icon: Headphones,
      description: "Headphones, earbuds, and speakers",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Wearables",
      icon: Watch,
      description: "Smartwatches and fitness trackers",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Mobile",
      icon: Smartphone,
      description: "Phone cases, chargers, and stands",
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Photography",
      icon: Camera,
      description: "Camera accessories and tripods",
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Controllers and gaming gear",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Smart Home",
      icon: Speaker,
      description: "Smart speakers and home devices",
      color: "bg-teal-100 text-teal-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-8 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Accessories</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Enhance your devices with our premium collection of accessories
          </p>
          <Button asChild className="bg-sky-500 hover:bg-sky-600">
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessoryCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.name}
                  className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button
                      variant="outline"
                      className="group-hover:bg-sky-50 group-hover:border-sky-300 bg-transparent"
                    >
                      Explore {category.name}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're working hard to bring you an amazing selection of accessories. In the meantime, check out our current
            product collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-sky-500 hover:bg-sky-600">
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/offers">View Offers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
