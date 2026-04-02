"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./Button";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  "Architectural Design",
  "General Construction",
  "Interior Design",
  "Renovation",
  "Landscape",
  "Other"
];

const BUDGET_RANGES = [
  "Under 1M ETB",
  "1M - 5M ETB",
  "5M - 15M ETB",
  "15M+ ETB",
  "Not Sure / Let's Discuss"
];

const TIMELINES = [
  "ASAP (within 1 month)",
  "1-3 Months",
  "3-6 Months",
  "Flexible"
];

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    custom_interest: "",
    budget: "",
    timeline: "",
    details: "",
  });

  const isOther = formData.project_type === "Other";

  const supabase = createClient();

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from("quote_requests")
      .insert([formData]);

    setLoading(false);

    if (dbError) {
      setError("Failed to submit request. Please try again.");
      console.error(dbError);
    } else {
      setSuccess(true);
      setStep(4); // Success step
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      if (!formData.project_type) return false;
      if (formData.project_type === "Other" && !formData.custom_interest.trim()) return false;
      return true;
    }
    if (step === 2) return !!formData.budget && !!formData.timeline && !!formData.details;
    if (step === 3) return !!formData.name && !!formData.email;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card rounded-[2rem] shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-border/50">
              <h2 className="font-heading font-bold text-2xl uppercase tracking-widest">
                Request an Estimate
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              {/* Progress */}
              {step < 4 && (
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                        i <= step ? "bg-primary" : "bg-muted"
                      }`} 
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm font-medium rounded-xl">
                  {error}
                </div>
              )}

              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">What are you looking to build?</h3>
                    <p className="text-muted-foreground text-sm">Select the primary service you require.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, project_type: type, custom_interest: type === "Other" ? formData.custom_interest : "" })}
                        className={`p-4 text-left border rounded-xl transition-all ${
                          formData.project_type === type
                            ? "border-primary bg-primary/5 shadow-inner"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="font-medium text-sm">{type}</span>
                      </button>
                    ))}
                  </div>

                  {isOther && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden"
                    >
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Describe Your Interest</label>
                      <textarea
                        autoFocus
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                        placeholder="Tell us what you have in mind — we're here for any idea..."
                        value={formData.custom_interest}
                        onChange={(e) => setFormData({ ...formData, custom_interest: e.target.value })}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Project Scope & Budget</h3>
                    <p className="text-muted-foreground text-sm">Help us understand the scale of your vision.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Estimated Budget</label>
                      <select 
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="" disabled>Select a budget range</option>
                        {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Timeline</label>
                      <select 
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      >
                        <option value="" disabled>When do you want to start?</option>
                        {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Brief Description</label>
                      <textarea 
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                        placeholder="Tell us a bit more about your project goals..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Your Contact Details</h3>
                    <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</label>
                      <input 
                        type="text"
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Email Address</label>
                      <input 
                        type="email"
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Phone Number (Optional)</label>
                      <input 
                        type="tel"
                        className="w-full p-4 border rounded-xl bg-background outline-none focus:border-primary transition-colors"
                        placeholder="+251 900 000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-heading font-black tracking-tight">Request Received</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for considering Makitex. One of our lead estimators will review your details and contact you shortly.
                  </p>
                  <Button onClick={onClose} size="lg" className="rounded-full mt-8">
                    Close Window
                  </Button>
                </motion.div>
              )}
            </div>

            {step < 4 && (
              <div className="p-6 md:p-8 border-t border-border/50 bg-muted/20 flex items-center justify-between">
                {step > 1 ? (
                  <button 
                    onClick={handlePrev}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div /> /* Spacer */
                )}

                {step < 3 ? (
                  <Button 
                    onClick={handleNext} 
                    disabled={!isStepValid()}
                    className="rounded-full px-8 gap-2 group"
                  >
                    Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!isStepValid() || loading}
                    className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Request"}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
