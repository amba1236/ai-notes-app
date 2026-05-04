// Shared Note model used across the app for creation, display, and updates
export interface Note {
  id?: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  summary?: string;
  pinned?: boolean;
  color?: string;
}
