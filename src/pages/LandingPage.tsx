import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Award, Wifi, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-exam-hub.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Exam Hub <span className="text-primary">Offline</span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-8">
              Sistem ujian lokal berbasis Wi-Fi LAN untuk ruang ujian tanpa koneksi internet. 
              Mudah, aman, dan dapat diandalkan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/admin">
                <Button variant="filled" size="lg" className="flex items-center gap-2 w-full sm:w-auto">
                  <Users className="h-5 w-5" />
                  Admin Panel
                </Button>
              </Link>
              <Link to="/student">
                <Button variant="tonal" size="lg" className="flex items-center gap-2 w-full sm:w-auto">
                  <BookOpen className="h-5 w-5" />
                  Panel Siswa
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="animate-scale-in">
            <img 
              src={heroImage} 
              alt="Exam Hub Offline Interface" 
              className="w-full h-auto rounded-2xl shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Wifi,
              title: "100% Offline",
              description: "Bekerja tanpa koneksi internet. Cukup Wi-Fi lokal atau hotspot.",
              color: "text-primary"
            },
            {
              icon: Shield,
              title: "Aman & Terpercaya",
              description: "Data tersimpan lokal, tidak ada kebocoran ke internet.",
              color: "text-success"
            },
            {
              icon: Clock,
              title: "Real-time",
              description: "Monitoring ujian dan penilaian secara langsung.",
              color: "text-warning"
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="text-center">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Cara Kerja</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Setup Server",
                description: "Jalankan aplikasi di komputer utama dan sambungkan ke jaringan lokal"
              },
              {
                step: "2", 
                title: "Buat Soal",
                description: "Admin membuat set soal Reading dan Listening dengan gambar dan audio"
              },
              {
                step: "3",
                title: "Daftar Siswa",
                description: "Tambahkan akun siswa dengan username dan password"
              },
              {
                step: "4",
                title: "Mulai Ujian",
                description: "Siswa login dan mengerjakan ujian, nilai otomatis tersimpan"
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-on-surface-variant">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <Card className="shadow-elevation-2 mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Spesifikasi Teknis</CardTitle>
            <CardDescription>Kebutuhan sistem untuk menjalankan Exam Hub Offline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-primary">Teknologi Frontend</h4>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li>• Vite + React + TypeScript</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• Responsive design</li>
                  <li>• Material You design system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Teknologi Backend</h4>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li>• Node.js + Express</li>
                  <li>• SQLite atau JSON database</li>
                  <li>• File upload untuk audio/gambar</li>
                  <li>• RESTful API</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Info */}
        <Card className="shadow-elevation-1 bg-primary-light border-primary-light">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold text-primary-dark mb-4">Status Koneksi</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-primary-dark font-medium">Server Online</span>
            </div>
            <p className="text-primary-dark/80 text-sm">
              Akses melalui: <strong>http://192.168.4.1:3000</strong>
            </p>
            <p className="text-primary-dark/60 text-xs mt-2">
              8 perangkat terhubung
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;