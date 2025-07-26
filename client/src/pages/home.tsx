import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import testimoniImage1 from "@assets/WhatsApp Image 2025-07-27 at 06.27.41_a8ee6e66_1753572541213.jpg";
import testimoniImage2 from "@assets/WhatsApp Image 2025-07-27 at 06.27.41_89416eb6_1753572541214.jpg";

export default function Home() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const phoneNumber = '6285947094014';
  const message = 'Halo, gue mau konsultasi tugas dong :)';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      emoji: "🐍",
      title: "Python Programming",
      description: "Tugas algoritma, OOP, web scraping, automation, dan project Python lainnya",
      tags: ["Django", "Flask", "NumPy"],
      gradient: "from-blue-50 to-blue-100"
    },
    {
      emoji: "🤖",
      title: "Machine Learning",
      description: "Model ML, deep learning, classification, regression, dan AI projects",
      tags: ["TensorFlow", "Scikit-learn", "PyTorch"],
      gradient: "from-green-50 to-green-100"
    },
    {
      emoji: "📊",
      title: "Data Science",
      description: "Analisis data, visualisasi, statistical modeling, dan data mining",
      tags: ["Pandas", "Matplotlib", "Seaborn"],
      gradient: "from-purple-50 to-purple-100"
    },
    {
      emoji: "🧮",
      title: "MATLAB",
      description: "Numerical computing, simulasi, signal processing, dan engineering projects",
      tags: ["Simulink", "Image Processing", "Control Systems"],
      gradient: "from-orange-50 to-orange-100"
    }
  ];

  return (
    <div className="font-inter bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 w-full backdrop-blur-sm shadow-sm z-50 transition-all duration-300 ${
        headerScrolled ? 'bg-white' : 'bg-white/95'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              <i className="fas fa-code mr-2"></i>TaskHelper
            </div>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('layanan')} 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Layanan
              </button>
              <button 
                onClick={() => scrollToSection('testimoni')} 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Testimoni
              </button>
              <button 
                onClick={() => scrollToSection('kontak')} 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Kontak
              </button>
            </div>
            <Button 
              onClick={openWhatsApp} 
              className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Chat WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ✨ Solusi Terpercaya untuk Tugas Coding & ML
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stuck dengan <span className="text-blue-600">Tugas Coding</span>?<br/>
              Tenang, Gue Bantu! 🚀
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Bantuan profesional untuk tugas <strong>Python, Machine Learning, MATLAB,</strong> dan <strong>Data Science</strong>. 
              Dikerjain cepet, dijelasin detail, dijamin paham!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={openWhatsApp} 
                className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <i className="fab fa-whatsapp text-2xl"></i>
                <span>Konsultasi Gratis Sekarang!</span>
              </Button>
              <div className="flex items-center space-x-2 text-gray-600">
                <i className="fas fa-clock text-green-500"></i>
                <span>Respon dalam 5 menit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>100% Original</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-clock text-green-500"></i>
                <span>Pengerjaan Cepat</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <i className="fas fa-user-graduate text-green-500"></i>
                <span>Dijelasin Sampai Paham</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating animation elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce-gentle">💻</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-bounce-gentle" style={{animationDelay: '1s'}}>🤖</div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan yang Gue Tawarkan 💪
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dari coding dasar sampai machine learning advance, semua bisa gue handle!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className={`bg-gradient-to-br ${service.gradient} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border-0`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-white/60 text-gray-800 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={openWhatsApp} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Tanya Detail Layanan</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimoni" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Chat dari Client Puas 💬
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Liat sendiri gimana proses kerja gue dan testimoni asli dari mahasiswa!
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Chat Testimoni Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    📱 Proses Revisi Tugas Real-Time
                  </h3>
                  <p className="text-gray-600">
                    Chat asli dengan client yang puas dengan proses revisi tugas coding
                  </p>
                </div>
                <img 
                  src={testimoniImage1} 
                  alt="Chat testimoni proses revisi tugas coding"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </Card>

              <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    💬 Client Langsung Order!
                  </h3>
                  <p className="text-gray-600">
                    Respon cepet dan langsung siap bantu tugas coding apapun
                  </p>
                </div>
                <img 
                  src={testimoniImage2} 
                  alt="Chat testimoni client yang langsung order"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </Card>
            </div>

            {/* Text Testimonial */}
            <Card className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Student testimonial" 
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-xl">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">5.0</span>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 mb-4 leading-relaxed">
                    "Mantap banget! Tugas machine learning gue yang stuck 2 minggu, diselesaiin dalam 1 hari. 
                    Dijelasinnya detail banget sampe gue paham algoritmanya. Highly recommended deh! 🔥"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Andi Pratama</p>
                      <p className="text-gray-600 text-sm">Mahasiswa Teknik Informatika, ITB</p>
                    </div>
                    <div className="text-2xl">🎓</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Tugas Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600">Rating Rata-rata</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24h</div>
                <div className="text-gray-600">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Nyelesaiin Tugasmu Sekarang! 🚀
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Jangan biarkan deadline menghantui tidurmu. Chat gue sekarang dan dapatkan solusi terbaik!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={openWhatsApp} 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-lg"
              >
                <i className="fab fa-whatsapp text-green-600 text-2xl"></i>
                <span>Chat WhatsApp Sekarang</span>
              </Button>
              <div className="flex items-center space-x-2 text-white/80">
                <i className="fas fa-shield-alt"></i>
                <span>100% Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">
                <i className="fas fa-code mr-2"></i>TaskHelper
              </div>
              <p className="text-gray-400 mb-4">
                Solusi terpercaya untuk semua kebutuhan tugas coding dan machine learning mahasiswa Indonesia.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-telegram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Python Programming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MATLAB</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <i className="fab fa-whatsapp text-green-400"></i>
                  <span>+62 859-4709-4014</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-clock text-blue-400"></i>
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-red-400"></i>
                  <span>Indonesia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskHelper. All rights reserved. Made with ❤️ for Indonesian students.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={openWhatsApp} 
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transform hover:scale-110 transition-all duration-300 animate-bounce-gentle"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </Button>
      </div>
    </div>
  );
}
