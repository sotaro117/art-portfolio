import { logEvent } from "firebase/analytics";
import { googleAnalytics } from "firebase-config";

export const searchLog = logEvent(googleAnalytics, "search");

export const searchContentLog = logEvent(googleAnalytics, "select_content");

export const shareLog = logEvent(googleAnalytics, "share");
