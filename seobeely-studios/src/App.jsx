"use client"

import { useState } from "react"
// import { Heart } from "lucide-react"

// Product data
const products = [
  {
    id: 1,
    name: "Bunny Keychain",
    price: 12.99,
    category: "Keychain",
    image: "/placeholder.svg?height=300&width=300",
    description: "Adorable bunny keychain with pastel colors",
  },
  {
    id: 2,
    name: "Cat Clay Model",
    price: 18.99,
    category: "Clay Model",
    image: "/placeholder.svg?height=300&width=300",
    description: "Handmade clay cat figurine",
  },
  {
    id: 3,
    name: "Strawberry Charm",
    price: 9.99,
    category: "Keychain",
    image: "/placeholder.svg?height=300&width=300",
    description: "Sweet strawberry charm for bags or keys",
  },
  {
    id: 4,
    name: "Pastel Mushroom Set",
    price: 24.99,
    category: "Clay Model",
    image: "/placeholder.svg?height=300&width=300",
    description: "Set of 3 clay mushroom figurines",
  },
  {
    id: 5,
    name: "Cloud Plushie",
    price: 15.99,
    category: "Plushie",
    image: "/placeholder.svg?height=300&width=300",
    description: "Soft cloud plushie with a happy face",
  },
  {
    id: 6,
    name: "Frog Keychain",
    price: 11.99,
    category: "Keychain",
    image: "/placeholder.svg?height=300&width=300",
    description: "Cute frog keychain with big eyes",
  },
  {
    id: 7,
    name: "Flower Pot Friends",
    price: 22.99,
    category: "Clay Model",
    image: "/placeholder.svg?height=300&width=300",
    description: "Clay figurines of flowers in tiny pots",
  },
  {
    id: 8,
    name: "Rainbow Charm",
    price: 8.99,
    category: "Keychain",
    image: "/placeholder.svg?height=300&width=300",
    description: "Colorful rainbow charm for bags",
  },
]

function App() {
  const [favorites, setFavorites] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalAnimation, setModalAnimation] = useState("") 
  const whatsappRedirect = (productName) => {
    const message = `Hi Seobeely Studios, I would like to order: ${productName}`
    const url = `https://wa.me/918828089814?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const customProductRedirect = () => {
    const message = `Hi Seobeely Studios, I'm interested in ordering a custom product. Can you help me create something unique?`
    const url = `https://wa.me/918828089814?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const categories = ["All", ...new Set(products.map((product) => product.category))]

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const openModal = (product) => {
  setSelectedProduct(product)
  setIsModalOpen(true)
  document.body.style.overflow = "hidden"

  // Trigger animation on next frame
  requestAnimationFrame(() => {
    setModalAnimation("modal-enter")
  })
}

  const closeModal = () => {
    setModalAnimation("modal-exit")
    // Wait for animation to complete before fully closing
    setTimeout(() => {
      setIsModalOpen(false)
      document.body.style.overflow = "auto" // Re-enable scrolling
    }, 300)
  }

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className="min-h-screen bg-[#e9f6ce]/30 font-sans text-gray-800 antialiased">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-normal mb-2 text-[#e3919f] font-serif">seobeely studios</h1>
          <p className="text-sm mb-10 text-[#e3919f]/70">handmade keychains & clay models</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1 text-xs transition-colors border ${
                  activeCategory === category
                    ? "border-[#e3919f] text-[#e3919f]"
                    : "border-transparent text-[#e3919f]/60 hover:text-[#e3919f]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group" onClick={() => openModal(product)}>
              <div className="relative mb-3">
                <img
                  // src={product.image || "https://i.pinimg.com/236x/b4/05/ec/b405eca239a398ddff33112d769690d6.jpg" || "/placeholder.svg"}
                  src="https://i.pinimg.com/236x/b4/05/ec/b405eca239a398ddff33112d769690d6.jpg"
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute bottom-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {/* <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.includes(product.id) ? "fill-[#e3919f] text-[#e3919f]" : "text-[#e3919f]"
                    }`}
                  /> */}
                </button>
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                <span className="text-sm text-[#e3919f]">${product.price.toFixed(2)}</span>
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-1.5 border border-[#e3919f] text-[#e3919f] text-xs hover:bg-[#e3919f] hover:text-white transition-colors"
                onClick={() => whatsappRedirect(product.name)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 mb-12 py-12 px-6 bg-[#bbddce]/20 rounded-lg text-center">
          <h2 className="text-2xl font-normal mb-4 text-[#e3919f] font-serif">Looking for something unique?</h2>
          <p className="text-sm mb-6 max-w-md mx-auto text-gray-700">
            We love creating custom pieces tailored to your imagination. From personalized keychains to special clay figurines, let's bring your ideas to life.
          </p>
          <button 
            onClick={customProductRedirect}
            className="px-8 py-2 border-2 border-[#e3919f] bg-transparent text-[#e3919f] text-sm hover:bg-[#e3919f] hover:text-white transition-colors rounded-full"
          >
            Request Custom Order
          </button>
        </div>

        <footer className="mt-16 py-8 border-t border-[#e3919f]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-normal text-[#e3919f] font-serif mb-2">seobeely studios</h3>
                <p className="text-sm text-gray-600">Handmade with love ♡</p>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center md:text-right">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Contact Us</h4>
                  <p className="text-sm text-gray-600">
                    <a
                      href="https://wa.me/918828089814"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e3919f] hover:underline"
                    >
                      +91 88280 89814
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} seobeely studios. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      
      {isModalOpen && selectedProduct && (
        <div 
          className={`fixed inset-0 bg-black/0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out ${
            modalAnimation === "modal-enter" ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={handleModalBackdropClick}
          style={{
            backdropFilter: "blur(3px)",
          }}
        >
          <div 
            className={`bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl transition-all duration-300 ease-in-out ${
              modalAnimation === "modal-enter" 
                ? "opacity-100 scale-100 translate-y-0" 
                : "opacity-0 scale-95 translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                // src={selectedProduct.image || "/placeholder.svg"} 
                src="https://i.pinimg.com/236x/b4/05/ec/b405eca239a398ddff33112d769690d6.jpg"
                alt={selectedProduct.name} 
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-[#e3919f] transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/70 to-transparent"></div>
            </div>
            <div className="p-6 bg-[#e9f6ce]/10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-normal text-[#e3919f] font-serif">{selectedProduct.name}</h3>
                <span className="text-lg font-medium text-[#e3919f]">${selectedProduct.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{selectedProduct.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f2c0bd]/30 text-xs font-medium text-[#e3919f]">
                  {selectedProduct.category}
                </span>
                <button 
                  onClick={() => whatsappRedirect(selectedProduct.name)}
                  className="px-6 py-2 bg-[#e3919f] text-white text-sm rounded-full hover:bg-[#e3919f]/90 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        
        .modal-enter {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .modal-exit {
          animation: fadeOut 0.3s ease-in forwards;
        }
        
        .modal-enter > div {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .modal-exit > div {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  )
}

export default App
