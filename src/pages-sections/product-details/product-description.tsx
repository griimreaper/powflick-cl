"use client";

import { H3, H4 } from "components/Typography";

export default function ProductDescription({ content }: { content: string }) {
  return (
    <div>
      <H4>
        {content}
      </H4>
    </div>
  );
}
