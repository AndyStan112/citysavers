export const STATUSES = ["rejected", "pending", "approved", "solved"];
export const STATUS_ORD = { approved: 2, pending: 1 };
export const P_TO_ISSUE = {
  low: 5,
  medium: 10,
  high: 20,
} as const;
export const P_TO_SOLUTION = {
  low: 30,
  medium: 60,
  high: 120,
} as const;
export type Priority = "medium" | "high" | "low";
export type Status = "rejected" | "pending" | "approved" | "solved";
export type StatusMod = "rejected" | "approved";
