"use client";

import React, { useState , useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PayButton from "./_components/PayButton";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";

export default function Billing() {
 const { user } = useUser();
  const [credits, setCredits] = useState(user?.credits || 0);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!user?.email) return;
      const { data, error } = await supabase
        .from("Users")
        .select("credits")
        .eq("email", user.email)
        .single();

      if (error) {
        toast.error("Failed to fetch credits");
      } else {
        setCredits(data.credits);
      }
    };

    fetchCredits();
  }, [user?.email]);

  return (
    <div className="p-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Billing</h1>
      <p className="text-muted-foreground mb-8 text-base">Manage your payment and credits</p>

      {/* Main Billing Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] md:grid-cols-1">
        
        {/* Your Credits */}
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Your Credits</CardTitle>
            <CardDescription>Current usage and remaining credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card p-6 text-center">
              <p className="text-2xl font-bold mb-4">{credits} Interviews left</p>
              <Button
                className="w-full text-base py-2.5"
                onClick={() =>
                  document.getElementById("purchase-section")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Add More Credits
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Credits Container */}
        <Card id="purchase-section" className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Purchase Credits</CardTitle>
            <CardDescription>Add more interview credits to your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              
              {/* Basic Plan */}
              <Card className="border shadow-sm hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Basic</CardTitle>
                  <CardDescription className="text-gray-800 font-semibold text-lg">$5</CardDescription>
                  <p className="text-gray-600 text-sm">20 interviews</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>Basic interview templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <PayButton amount={5} credits={20} onCreditsUpdate={setCredits} />
                </CardFooter>
              </Card>

              {/* Standard Plan */}
              <Card className="border shadow-sm hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Standard</CardTitle>
                  <CardDescription className="text-gray-800 font-semibold text-lg">$12</CardDescription>
                  <p className="text-gray-600 text-sm">50 interviews</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>All interview templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>Basic analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <PayButton amount={12} credits={50} onCreditsUpdate={setCredits} />
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="border shadow-sm hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Pro</CardTitle>
                  <CardDescription className="text-gray-800 font-semibold text-lg">$25</CardDescription>
                  <p className="text-gray-600 text-sm">120 interviews</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>All interview templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>24/7 support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <PayButton amount={25} credits={120} onCreditsUpdate={setCredits} />
                </CardFooter>
              </Card>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
