import { invoke } from "@tauri-apps/api/core";
import { safeLocalStorage } from "../storage";
import { STORAGE_KEYS } from "@/config";

// Helper function to check if JamunAI API should be used
export async function shouldUseJamunAIAPI(): Promise<boolean> {
  try {
    // Check if JamunAI API is enabled in localStorage
    const jamunaiApiEnabled =
      safeLocalStorage.getItem(STORAGE_KEYS.PLUELY_API_ENABLED) === "true";
    if (!jamunaiApiEnabled) return false;

    // Check if license is available
    const hasLicense = await invoke<boolean>("check_license_status");
    return hasLicense;
  } catch (error) {
    console.warn("Failed to check JamunAI API availability:", error);
    return false;
  }
}
