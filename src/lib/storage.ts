import { supabase } from "./supabase";

export const uploadFile = async (bucket: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicData.publicUrl;
};
