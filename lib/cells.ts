export interface TextCell {
  id: string;
  type: "text";
  content: string; // markdown
}

export interface InteractiveCell {
  id: string;
  type: "interactive";
  component: string; // component name to render
  props?: Record<string, unknown>;
}

export type Cell = TextCell | InteractiveCell;

export interface NotebookPageData {
  title: string;
  description?: string;
  cells: Cell[];
}
