
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Bell, Shield, User, Trash2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
  });

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    achievements: true,
    streakReminders: true,
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    anonymousUsage: true,
  });

  const { toast } = useToast();

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved",
    });
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved",
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Data export initiated",
      description: "You'll receive an email with your data within 24 hours",
    });
  };

  const handleAccountDelete = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="p-6 flex items-center">
        <Link to="/dashboard" className="flex items-center space-x-2 mr-4">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        {/* Profile Settings */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-green-600" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Daily Check-in Reminders</div>
                <div className="text-sm text-gray-600">Get reminded to log your daily mood</div>
              </div>
              <Switch
                checked={notifications.dailyReminders}
                onCheckedChange={(checked) => handleNotificationChange('dailyReminders', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-gray-600">Receive your weekly mental health summary</div>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Achievement Notifications</div>
                <div className="text-sm text-gray-600">Get notified when you earn badges</div>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) => handleNotificationChange('achievements', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Streak Reminders</div>
                <div className="text-sm text-gray-600">Don't let your streak break</div>
              </div>
              <Switch
                checked={notifications.streakReminders}
                onCheckedChange={(checked) => handleNotificationChange('streakReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span>Privacy & Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Anonymous Usage Analytics</div>
                <div className="text-sm text-gray-600">Help improve MindMate with anonymous data</div>
              </div>
              <Switch
                checked={privacy.anonymousUsage}
                onCheckedChange={(checked) => handlePrivacyChange('anonymousUsage', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Data Sharing</div>
                <div className="text-sm text-gray-600">
                  Share data with mental health researchers
                  <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                </div>
              </div>
              <Switch
                checked={privacy.dataSharing}
                onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium">Export Your Data</div>
                <div className="text-sm text-gray-600">Download all your MindMate data</div>
              </div>
              <Button variant="outline" onClick={handleDataExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
              <div>
                <div className="font-medium text-red-700">Delete Account</div>
                <div className="text-sm text-red-600">Permanently remove your account and all data</div>
              </div>
              <Button variant="destructive" onClick={handleAccountDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>MindMate v1.0.0</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            {" • "}
            <Link to="/terms" className="hover:text-gray-700">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
