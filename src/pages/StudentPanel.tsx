import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, User, LogOut } from "lucide-react";

const StudentPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulate login
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elevation-3 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Login Siswa</CardTitle>
            <CardDescription>Masukkan username dan password untuk mengikuti ujian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-surface-variant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface-variant"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              variant="filled"
              disabled={!username || !password}
            >
              <User className="h-4 w-4 mr-2" />
              Masuk
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panel Siswa</h1>
            <p className="text-on-surface-variant">Selamat datang, {username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>

        {/* Available Exams */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Ujian Tersedia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((exam) => (
              <Card key={exam} className="shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Set Ujian {exam}
                  </CardTitle>
                  <CardDescription>
                    20 Soal Reading + 20 Soal Listening
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <Clock className="h-4 w-4" />
                      Waktu: 90 menit
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Instruksi:</div>
                      <ul className="text-sm text-on-surface-variant space-y-1">
                        <li>• Pastikan koneksi audio berfungsi</li>
                        <li>• Kerjakan dengan jujur dan mandiri</li>
                        <li>• Jawaban akan otomatis tersimpan</li>
                      </ul>
                    </div>

                    <Button variant="filled" className="w-full">
                      Mulai Ujian
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Previous Results */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Hasil Ujian Sebelumnya</h2>
          
          <Card className="shadow-elevation-1">
            <CardHeader>
              <CardTitle>Riwayat Nilai</CardTitle>
              <CardDescription>Hasil ujian yang telah diselesaikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { set: "Set Ujian 1", score: 85, date: "15 Jan 2024", status: "Selesai" },
                  { set: "Set Ujian 2", score: 92, date: "10 Jan 2024", status: "Selesai" },
                ].map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-surface-variant rounded-lg">
                    <div>
                      <div className="font-medium">{result.set}</div>
                      <div className="text-sm text-on-surface-variant">{result.date} • {result.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.score}</div>
                      <div className="text-sm text-on-surface-variant">/ 100</div>
                    </div>
                  </div>
                ))}
                
                {/* Empty state if no results */}
                <div className="text-center py-8 text-on-surface-variant">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada ujian yang diselesaikan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;