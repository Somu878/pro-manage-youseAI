"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { userSigninSchema, userSignupSchema } from "@/lib/validations/user-validation";
import { ZodError } from "zod";
function AuthComponent() {
    const [email, setEmail] = useState <string>("");
    const [password, setPassword] = useState <string>("");
    const [confirmPassword, setConfirmPassword] = useState <string>("");
    const [name, setName] = useState <string>("");
    const[error, setError] = useState <string>("");


    // const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const {name, value} = e.target;
    //     if(name === "email") {
    //         setEmail(value);
    //     } else if (name === "password") {
    //         setPassword(value);
    //     }
    //     else if (name === "confirm-signup-password") {
    //         setConfirmPassword(value);
    //     }
    //     else if (name === "signup-name") {
    //         setName(value);
    //     }
    // }
    const handleSignIn=()=>{
        try {
            userSigninSchema.parse({email, password});
            console.log("Sign in successful");
            
        } catch (error) {
            if(error instanceof ZodError){
                setError(error.issues[0].message as string);
            }
            else{
                setError(error as string);
            }
        }
    }

    const handleSignUp=()=>{
        try {
            userSignupSchema.parse({name, email, password, confirmPassword});
            console.log("Sign up successful");
            
        } catch (error) {
            if(error instanceof ZodError){
                setError(error.issues[0].message as string);
            }
            else{
                setError(error as string);
            }
        }
    }
  return <div className="w-[400px]">
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
                    <Button onClick={handleSignIn}>Sign In</Button>
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
                              
                            <Button onClick={handleSignUp}>Sign Up</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>

        {/* TODO: implemnet forgot passowrd in future */}
        <CardFooter> 
            {error && <Alert variant="destructive">
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>}
        </CardFooter>
    </Card>

  </div>;
}

export default AuthComponent;

