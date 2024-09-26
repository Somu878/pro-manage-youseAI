"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { userSigninSchema, userSignupSchema } from "@/lib/validations/user-validation";
import { handleError } from "@/lib/handleError";
import { SignInUser, SignUpUser } from "@/app/api/userApi";
import { useRouter } from "next/navigation";
import { GithubIcon } from "lucide-react";
import ButtonLoader from "../ui/buttonLoader";
function AuthComponent() {
    const router = useRouter();
    const [email, setEmail] = useState <string>("");
    const [password, setPassword] = useState <string>("");
    const [confirmPassword, setConfirmPassword] = useState <string>("");
    const [name, setName] = useState <string>("");
    const[error, setError] = useState <string>("");
    const [loading, setLoading] = useState <boolean>(false);


    const handleSignIn= async ()=>{
        
        try {
            setLoading(true);
           const userData = userSigninSchema.parse({email, password});
           const response = await SignInUser(userData as unknown as typeof userSigninSchema)
           if (response.status === 200){
            console.log("response", response)
           router.push("/dashboard");
           setError("");
           }
        } catch (error) {
            setError(handleError(error));
            
        }
        finally{
            setLoading(false);
        }
    }

    const handleSignUp= async()=>{
        try {
            setLoading(true);
           const userData = userSignupSchema.parse({name, email, password, confirmPassword});
           const response = await SignUpUser(userData as unknown as typeof userSignupSchema);
           if (response.status === 201){
            console.log("response", response)
           router.push("/dashboard");
           setError("");
           }
      
        } catch (error) {
          setError(handleError(error));
        
        }
        finally{
            setLoading(false);
        }
    }
  return <div className="w-[300px] md:w-[500px]">
    <Card className="p-2 rounded-lg backdrop-blur-lg">
        <CardHeader>
        <CardTitle>Welcome to Pro Manage</CardTitle>
        <CardDescription>Please login or signup to continue</CardDescription>
        </CardHeader>
      
        <CardContent>
            <Tabs defaultValue="sign-in" className="w-full">
                <TabsList className="grid grid-cols-2 gap-2  ">
                    <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                    <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                    {/* <SignInForm /> */}
                    <div className="flex flex-col gap-5">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      placeholder="Enter your email" 
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password" 
                      placeholder="Enter your password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      />
                    </div>
                    <Button onClick={handleSignIn}>
                        {loading ? <ButtonLoader /> : "Sign In"}
                    </Button>
                    </div>


                </TabsContent>
                <TabsContent value="sign-up">
                    {/* <SignUpForm /> */}
                    <div className="flex flex-col gap-5"  >  
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="signup-name">Name</Label>
                            <Input 
                              id="signup-name" 
                              placeholder="Enter your name" 
                            type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              
                            />
                            <Label htmlFor="signup-email">Email</Label>
                            <Input 
                              id="signup-email" 
                              placeholder="Enter your email" 
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                             <Label htmlFor="signup-password">Password</Label>
                            <Input 
                              id="signup-password" 
                              placeholder="Enter your password" 
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />   
                            <Label htmlFor="confirm-signup-password">Confirm Password</Label>
                            <Input 
                              id="confirm-signup-password" 
                              placeholder="Enter your password again" 
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />      
                              
                            <Button onClick={handleSignUp}> {loading ? <ButtonLoader /> : "Sign Up"}</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" className="w-full mt-4">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
        </CardContent>

        {/* TODO: implemnet forgot passowrd in future */}
        <CardFooter className="flex flex-col gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
            {error && <Alert variant="destructive">
                <AlertTitle>Error   </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>}
        </CardFooter>
    </Card>

  </div>;
}

export default AuthComponent;

