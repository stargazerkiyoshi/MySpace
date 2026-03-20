import { http } from "@/shared/lib/http";
import type { AuthPlaceholderResponse } from "./types";

export async function fetchAuthPlaceholder() {
  const { data } = await http.get<AuthPlaceholderResponse>("/auth/placeholder");
  return data;
}
