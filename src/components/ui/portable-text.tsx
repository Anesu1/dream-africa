"use client";

import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <BasePortableText value={value} />;
}
