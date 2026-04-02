export type BlockType = "navbar" | "hero" | "text" | "button" | "footer";

export type Block = {
  id: string;
  type: BlockType;
  props: {
    text?: string;
  };
  style: {
    padding?: number;
    margin?: number;
    background?: string;
    color?: string;
    fontSize?: number;
    align?: "left" | "center" | "right";
  };
};

export type Section = {
  id: string;
  blocks: Block[];
};
