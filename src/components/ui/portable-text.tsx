"use client";

import Link from "next/link";
import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <BasePortableText
      value={value}
      components={{
        marks: {
          link: ({ value: mark, children }) => (
            <Link href={mark?.href ?? "#"} className="text-gold underline underline-offset-2">
              {children}
            </Link>
          ),
        },
      }}
    />
  );
}
