"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";

export default function PayButton({ amount, credits, onCreditsUpdate }) {
  const { user } = useUser();

  const onPaymentSuccess = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) + credits })
      .eq("email", user?.email)
      .select();

    if (error) {
      toast.error("Failed to update credits");
      return;
    }

    toast("Credits Updated");
    if (onCreditsUpdate) onCreditsUpdate(Number(user?.credits) + credits);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
          Purchase Credits
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            You’re about to buy credits worth ${amount}.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
          >
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: amount, currency_code: "USD" },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();
                onPaymentSuccess();
              }}
              onCancel={() => toast("Payment Canceled!")}
            />
          </PayPalScriptProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
