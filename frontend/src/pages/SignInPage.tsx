
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignInPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Demo login - in a real app, this would authenticate with a backend
    if (loginEmail && loginPassword) {
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setError("Please enter both email and password");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Demo registration - in a real app, this would register with a backend
    if (registerName && registerEmail && registerPassword) {
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => {
        document.getElementById("login-tab")?.click();
      }, 1500);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="container max-w-md mx-auto pt-24 pb-16 px-4">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login" id="login-tab">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        {error && (
          <Alert className="mb-4 border-destructive">
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 border-primary">
            <AlertDescription className="text-primary">
              {success}
            </AlertDescription>
          </Alert>
        )}
        
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to login to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Sign up to enjoy exclusive benefits and faster checkout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="register-email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="register-password" className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input 
                      id="register-password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignInPage;
