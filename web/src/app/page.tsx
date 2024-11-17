"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Truck, Clock, Star, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fffaef] text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fffaef] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Image
            src="/placeholder.svg"
            alt="Grocery App Logo"
            width={57}
            height={57}
            className="rounded-[9px]"
          />
          <nav className="hidden md:flex space-x-4">
            <Button variant="link">Home</Button>
            <Button variant="link">Features</Button>
            <Button variant="link">How it Works</Button>
            <Button variant="link">Testimonials</Button>
          </nav>
          <Button className="bg-[#3bff90] text-black hover:bg-[#2ee07d] transition-all duration-300">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fresh Groceries, Delivered to Your Door
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Shop for fresh produce, pantry staples, and more from the comfort of
            your home. Fast, reliable delivery right to your doorstep.
          </p>
          <Button className="bg-[#3bff90] text-black text-lg px-8 py-6 rounded-full hover:bg-[#2ee07d] transition-all duration-300">
            Start Shopping Now <ChevronRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Grocery App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: "Wide Selection",
                description:
                  "Choose from thousands of fresh and quality products",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Get your groceries delivered within hours",
              },
              {
                icon: Clock,
                title: "Convenient Scheduling",
                description: "Pick a delivery time that suits your schedule",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#3bff90]" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Browse & Select",
                description: "Choose from our wide range of products",
              },
              {
                step: 2,
                title: "Schedule Delivery",
                description: "Pick a convenient delivery time",
              },
              {
                step: 3,
                title: "Receive & Enjoy",
                description: "Get your fresh groceries delivered to your door",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#3bff90] text-black flex items-center justify-center text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah L.",
                comment:
                  "The app is so easy to use, and the delivery is always on time!",
              },
              {
                name: "Mike R.",
                comment:
                  "Great selection of organic produce. I'm a regular customer now.",
              },
              {
                name: "Emily T.",
                comment:
                  "The convenience is unbeatable. It's saved me so much time!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-[#3bff90]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Shopping Smarter?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have made grocery shopping
            easier with our app.
          </p>
          <Button className="bg-black text-white text-lg px-8 py-6 rounded-full hover:bg-gray-800 transition-all duration-300">
            Download the App Now <ChevronRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/placeholder.svg"
              alt="Grocery App Logo"
              width={72}
              height={72}
              className="rounded-[11px] mb-4"
            />
            <p>Fresh groceries, delivered to your door.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="text-white p-0">
                  Home
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white p-0">
                  Features
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white p-0">
                  How it Works
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white p-0">
                  Testimonials
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: support@groceryapp.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Main St, City, State 12345</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Grocery App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
