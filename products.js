const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Predator Dome Pro HMS 3110",
    category: "laptops",
    price: 134999,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600",
    badge: "292 Products",
    badgeColor: "pink",
    specs: {
      "Processor": "Intel Core i9-13900HX",
      "Graphics": "NVIDIA GeForce RTX 4080 12GB",
      "Memory": "32GB DDR5 5600MHz",
      "Storage": "1TB NVMe PCIe Gen4 SSD",
      "Display": "16\" QHD+ 240Hz IPS",
      "Cooling": "Liquid Metal 5th Gen AeroBlade 3D"
    },
    popular: true,
    newArrival: false
  },
  {
    id: 2,
    name: "Predator CyberStation X",
    category: "pc",
    price: 249999,
    rating: 5.0,
    reviews: 87,
    image: "images/Predator_CyberStation_X.png",
    badge: "150 Products",
    badgeColor: "cyan",
    specs: {
      "Processor": "AMD Ryzen 9 7950X3D",
      "Graphics": "NVIDIA RTX 4090 24GB GDDR6X",
      "Memory": "64GB DDR5 RGB 6000MHz",
      "Storage": "2TB NVMe PCIe Gen4 SSD",
      "Power Supply": "1200W Platinum 3.0",
      "Cooling": "Custom Hardline Liquid Cooling Loop"
    },
    popular: true,
    newArrival: true
  },
  {
    id: 3,
    name: "Neon Strike Mechanical Keyboard",
    category: "accessories",
    price: 8499,
    rating: 4.5,
    reviews: 219,
    image: "images/Neon_Strike_Mechanical_Keyboard.png",
    badge: "92 Products",
    badgeColor: "purple",
    specs: {
      "Switch Type": "Hot-swappable Linear Optical Switches",
      "Form Factor": "75% Compact Layout",
      "Keycaps": "Double-shot PBT Cyberpunk Themed",
      "Connectivity": "USB-C, Bluetooth, 2.4GHz Wireless",
      "Backlight": "Per-key RGB + Acrylic Underglow Neon",
      "Battery Life": "Up to 150 hours (RGB off)"
    },
    popular: false,
    newArrival: true
  },
  {
    id: 4,
    name: "HoloClick CyberMouse v2",
    category: "accessories",
    price: 4299,
    rating: 4.6,
    reviews: 312,
    image: "images/HoloClick_CyberMouse_v2.png",
    badge: "75 Products",
    badgeColor: "green",
    specs: {
      "Sensor": "26,000 DPI Optical Sensor",
      "Weight": "62 grams Ultra-lightweight",
      "Switches": "80M Clicks Optical Mouse Switches",
      "Polling Rate": "4000Hz Wireless Polling Rate",
      "Connectivity": "Lag-free HyperSpeed Wireless",
      "Lighting": "Glow-zone RGB Wheel and Base"
    },
    popular: true,
    newArrival: false
  },
  {
    id: 5,
    name: "Predator HoloAudio 7.1 Wireless",
    category: "sound",
    price: 12999,
    rating: 4.7,
    reviews: 95,
    image: "images/Predator_HoloAudio_7_1_Wireless.jpg",
    badge: "115 Products",
    badgeColor: "cyan",
    specs: {
      "Drivers": "50mm Custom TriForce Titanium Drivers",
      "Sound Space": "THX Spatial Audio 7.1 Virtual Surround",
      "Microphone": "HyperClear Super Wideband Retractable Mic",
      "Connectivity": "2.4GHz Type-C Wireless & Bluetooth 5.2",
      "ANC": "Hybrid Active Noise Cancellation",
      "Haptics": "Lofelt L5 Intelligent Haptic Drivers"
    },
    popular: true,
    newArrival: false
  },
  {
    id: 6,
    name: "ROG Throne Cyberpunk Edition Chair",
    category: "chairs",
    price: 34999,
    rating: 4.9,
    reviews: 64,
    image: "images/ROG_Throne_Cyberpunk_Edition_Chair.png",
    badge: "40 Products",
    badgeColor: "yellow",
    specs: {
      "Material": "Premium Breathable PU Leather & Carbon Fiber Panels",
      "Recline": "90 to 180 degrees Tilt Lock",
      "Armrests": "4D Adjustable Armrests with Metallic Finishes",
      "Base": "Reinforced Steel Base, Class 4 Gas Lift",
      "Lumbar Support": "Built-in Adjustable Lumbar Support System",
      "Aesthetic": "Embroidered Neon Accents & Cyberpunk Stitching"
    },
    popular: false,
    newArrival: true
  },
  {
    id: 7,
    name: "NVIDIA RTX 5090 FE Cyber-Build",
    category: "pc",
    price: 189999,
    rating: 4.9,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600",
    badge: "15 Products",
    badgeColor: "pink",
    specs: {
      "VRAM": "32GB GDDR7",
      "Bus Width": "512-bit",
      "Architecture": "Blackwell 4nm Process",
      "Tensor Cores": "5th Generation RT Cores",
      "Power Draw": "450W TDP",
      "Cooling": "Cyber Vapor Chamber Triple Fan Edition"
    },
    popular: true,
    newArrival: true
  },
  {
    id: 8,
    name: "RGB Cyber-Desk Pad (XL)",
    category: "accessories",
    price: 2499,
    rating: 4.2,
    reviews: 512,
    image: "images/RGB_Cyber-Desk_Pad__XL_.png",
    badge: "128 Products",
    badgeColor: "purple",
    specs: {
      "Dimensions": "900mm x 400mm x 4mm",
      "Surface": "Micro-textured Speed/Control Cloth",
      "Base": "Anti-slip Rubberized Base",
      "Lighting": "2-zone RGB Fiber Optic Edge (14 modes)",
      "Power": "Detachable Braided USB-C Cable",
      "Charging": "Integrated 15W Fast Wireless Charger Pad"
    },
    popular: false,
    newArrival: false
  },
  {
    id: 9,
    name: "CyberGrip Neon Cable Set",
    category: "accessories",
    price: 1899,
    rating: 4.4,
    reviews: 183,
    image: "images/CyberGrip_Neon_Cable_Set.png",
    badge: "85 Products",
    badgeColor: "green",
    specs: {
      "Cable Type": "Double-sleeved Paracord + PET Coiled Cable",
      "Connector": "Aviation-grade Detachable GX16 5-Pin Metal plug",
      "Length": "1.8 meters total length",
      "Coil Length": "150mm coil",
      "Color": "Neon Pink/Cyan Dual Theme",
      "Glow": "UV Reactive Outer Sleeve Material"
    },
    popular: false,
    newArrival: false
  },
  {
    id: 10,
    name: "Predator Vesper-15 Gaming Laptop",
    category: "laptops",
    price: 95999,
    rating: 4.4,
    reviews: 104,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600",
    badge: "292 Products",
    badgeColor: "pink",
    specs: {
      "Processor": "Intel Core i7-13620H",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB",
      "Memory": "16GB DDR5 Dual Channel",
      "Storage": "512GB NVMe PCIe Gen4 SSD",
      "Display": "15.6\" FHD 165Hz IPS Slim-Bezel",
      "Weight": "2.1 kg Lightweight Tech Chassis"
    },
    popular: false,
    newArrival: false
  },
  {
    id: 11,
    name: "CyberDeck Handheld X1",
    category: "handhelds",
    price: 54999,
    rating: 4.6,
    reviews: 78,
    image: "images/CyberDeck_Handheld_X1.png",
    badge: "34 Products",
    badgeColor: "cyan",
    specs: {
      "Processor": "AMD Ryzen Z2 Extreme APU",
      "Graphics": "Integrated RDNA 3.5 12-Core",
      "Memory": "16GB LPDDR5X 7500MT/s",
      "Storage": "1TB NVMe SSD (Expandable)",
      "Display": "7\" OLED HDR 120Hz Touchscreen",
      "Battery": "50Wh, up to 6 Hours Gameplay"
    },
    popular: true,
    newArrival: true
  },
  {
    id: 12,
    name: "Predator Vortex 27 QHD Gaming Monitor",
    category: "monitors",
    price: 42999,
    rating: 4.7,
    reviews: 156,
    image: "images/Predator_Vortex_27_QHD_Gaming_Monitor.png",
    badge: "68 Products",
    badgeColor: "purple",
    specs: {
      "Panel": "27\" QHD Nano IPS 240Hz",
      "Response Time": "1ms GtG Overclocked",
      "HDR": "VESA DisplayHDR 600 Certified",
      "Sync": "NVIDIA G-Sync / AMD FreeSync Premium",
      "Ports": "DisplayPort 1.4, 2x HDMI 2.1, USB-C",
      "Adjustability": "Height, Tilt, Swivel & Pivot Stand"
    },
    popular: true,
    newArrival: false
  },
  {
    id: 13,
    name: "Predator NovaBeam 4K Cyber Projector",
    category: "projectors",
    price: 78999,
    rating: 4.5,
    reviews: 39,
    image: "images/Predator_NovaBeam_4K_Cyber_Projector.jpg",
    badge: "19 Products",
    badgeColor: "yellow",
    specs: {
      "Resolution": "Native 4K UHD (3840 x 2160)",
      "Brightness": "3200 ANSI Lumens Laser Light Source",
      "Throw Ratio": "Ultra-Short Throw 0.25:1",
      "Audio": "Dual 15W Harman Kardon Speakers",
      "Connectivity": "HDMI 2.1, Wi-Fi 6E, Bluetooth 5.3",
      "Lamp Life": "30,000 Hours Laser Diode Lifespan"
    },
    popular: false,
    newArrival: true
  },
  {
    id: 14,
    name: "CyberMesh WiFi 7 Gaming Router",
    category: "networking",
    price: 24999,
    rating: 4.6,
    reviews: 112,
    image: "images/CyberMesh_WiFi_7_Gaming_Router.png",
    badge: "27 Products",
    badgeColor: "green",
    specs: {
      "Standard": "WiFi 7 (802.11be) Tri-Band",
      "Speed": "Up to 19 Gbps Combined Throughput",
      "Ports": "2x 10G LAN/WAN, 4x 2.5G LAN",
      "Coverage": "Mesh-ready, up to 3500 sq ft",
      "Processor": "Quad-Core 2.6GHz Networking CPU",
      "Security": "WPA3 + Built-in Gaming VPN Accelerator"
    },
    popular: false,
    newArrival: true
  },
  {
    id: 15,
    name: "Predator Volt-E Electric Commuter Bike",
    category: "emobility",
    price: 89999,
    rating: 4.8,
    reviews: 23,
    image: "images/Predator_Volt-E_Electric_Commuter_Bike.png",
    badge: "12 Products",
    badgeColor: "pink",
    specs: {
      "Motor": "500W Brushless Hub Motor",
      "Battery": "48V 14Ah Removable Lithium-Ion",
      "Range": "Up to 65km Pedal-Assist Mode",
      "Top Speed": "32 km/h Electronically Limited",
      "Frame": "Aircraft-Grade Aluminum Alloy",
      "Extras": "Integrated LED Display & App Connectivity"
    },
    popular: true,
    newArrival: true
  }
];
