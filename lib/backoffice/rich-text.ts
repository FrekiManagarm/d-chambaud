import type { Post } from "@/payload-types";

type LexicalNode = {
  children?: LexicalNode[];
  text?: string;
  type?: string;
};

export const plainTextToLexical = (value: string): Post["content"] => {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    root: {
      type: "root",
      children: (paragraphs.length ? paragraphs : [""]).map((paragraph) => ({
        type: "paragraph",
        version: 1,
        direction: "ltr",
        format: "",
        indent: 0,
        children: [
          {
            type: "text",
            text: paragraph,
            version: 1,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
};

export const lexicalToPlainText = (content?: Post["content"] | null) => {
  if (!content?.root?.children) {
    return "";
  }

  const readNode = (node: LexicalNode): string => {
    if (typeof node.text === "string") {
      return node.text;
    }

    return node.children?.map(readNode).join("") ?? "";
  };

  return content.root.children
    .map((node) => readNode(node as LexicalNode).trim())
    .filter(Boolean)
    .join("\n\n");
};
