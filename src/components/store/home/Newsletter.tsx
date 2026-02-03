"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-12 lg:py-16"
      aria-labelledby="newsletter-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Mail className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2
            id="newsletter-heading"
            className="mb-3 text-2xl font-bold text-white md:text-3xl"
          >
            Stay Updated
          </h2>
          <p className="mb-8 text-white/90">
            Subscribe to get special offers, free giveaways, and promotions
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 p-4 text-white"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Thanks for subscribing! Check your email for confirmation.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="h-12 border-0 bg-white/20 pl-4 pr-4 text-white placeholder:text-white/70 focus:bg-white/30 focus:ring-2 focus:ring-white/50"
                    aria-label="Email address"
                    aria-describedby={status === "error" ? "email-error" : undefined}
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 gap-2 bg-orange-500 px-6 text-white hover:bg-orange-600"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              {status === "error" && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center justify-center gap-1 text-sm text-red-300"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </motion.p>
              )}
            </form>
          )}

          <p className="mt-4 text-xs text-white/60">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
