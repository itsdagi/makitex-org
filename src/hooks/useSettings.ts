"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const useSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const settingsMap = data.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {} as Record<string, string>);
        setSettings(settingsMap);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  return { settings, loading };
};
