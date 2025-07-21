import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Award, Plus, Settings } from "lucide-react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("exams");

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-on-surface-variant">Kelola soal ujian, siswa, dan nilai</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-surface-variant border border-outline-variant rounded-lg p-1">
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Soal</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Siswa</span>
            </TabsTrigger>
            <TabsTrigger value="scores" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Nilai</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Pengaturan</span>
            </TabsTrigger>
          </TabsList>

          {/* Exam Management */}
          <TabsContent value="exams" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manajemen Soal</h2>
              <Button variant="filled" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Buat Set Soal Baru
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Exam Sets */}
              {[1, 2, 3].map((exam) => (
                <Card key={exam} className="shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Set Ujian {exam}
                      <span className="text-sm font-normal bg-primary-light text-primary-dark px-2 py-1 rounded-full">
                        40 Soal
                      </span>
                    </CardTitle>
                    <CardDescription>
                      20 Reading + 20 Listening
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-on-surface-variant">
                        Dibuat: 15 Jan 2024
                      </div>
                      <div className="flex gap-2">
                        <Button variant="tonal" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Preview</Button>
                        <Button variant="destructive" size="sm">Hapus</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Student Management */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manajemen Siswa</h2>
              <Button variant="filled" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Tambah Siswa
              </Button>
            </div>

            <Card className="shadow-elevation-1">
              <CardHeader>
                <CardTitle>Daftar Siswa</CardTitle>
                <CardDescription>Total: 25 siswa terdaftar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((student) => (
                    <div key={student} className="flex items-center justify-between p-3 bg-surface-variant rounded-lg">
                      <div>
                        <div className="font-medium">Siswa {student}</div>
                        <div className="text-sm text-on-surface-variant">username: siswa{student}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Hapus</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scores */}
          <TabsContent value="scores" className="space-y-6">
            <h2 className="text-2xl font-semibold">Panel Nilai</h2>
            
            <Card className="shadow-elevation-1">
              <CardHeader>
                <CardTitle>Hasil Ujian Terbaru</CardTitle>
                <CardDescription>Nilai siswa per set ujian</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((score) => (
                    <div key={score} className="flex items-center justify-between p-4 bg-surface-variant rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">Siswa {score}</div>
                        <div className="text-sm text-on-surface-variant">Set Ujian 1 • 20 Jan 2024</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">85</div>
                        <div className="text-sm text-on-surface-variant">/ 100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Pengaturan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-elevation-1">
                <CardHeader>
                  <CardTitle>Pengaturan Ujian</CardTitle>
                  <CardDescription>Konfigurasi waktu dan aturan ujian</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Waktu ujian default</span>
                      <span className="text-primary font-medium">90 menit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Auto submit</span>
                      <span className="text-primary font-medium">Aktif</span>
                    </div>
                    <Button variant="tonal" size="sm">Edit Pengaturan</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elevation-1">
                <CardHeader>
                  <CardTitle>Informasi Sistem</CardTitle>
                  <CardDescription>Status server dan jaringan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Status Server</span>
                      <span className="text-success font-medium">Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IP Address</span>
                      <span className="text-primary font-medium">192.168.4.1:3000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Perangkat terhubung</span>
                      <span className="text-primary font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;