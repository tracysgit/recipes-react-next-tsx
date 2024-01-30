// 'use client';

// import { useState } from "react";
// import { capFirstLetter } from "@/app/utils/utils";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import H1Headline from "../headlines/h1Headline";
import FormatToggle from "./format-toggle/format-toggle";
import Search from "./search/search";

interface HeaderPageProps {
  h1Id: string;
  h1Text: string;
  hasBreadcrumbs?: boolean;
  hasSearch?: boolean;
  hasFormatToggle?: boolean;
  handleFormat?: void;
  children?: React.ReactNode;
}

export default function HeaderPage({ h1Id, h1Text, hasBreadcrumbs, hasSearch, hasFormatToggle }: HeaderPageProps) {
  // const [format, setFormat] = useState('cards');
  
  const addSpaceBelow = (hasBreadcrumbs || hasFormatToggle || hasSearch) ? "mb-4 md:mb-6" : "";

  return (
    <>
      <header className="header-page mb-2 md:mb-4 lg:mb-6">
        <div className={`flex flex-col md:flex-row gap-4 justify-between ${addSpaceBelow}`}>
          {hasBreadcrumbs && <Breadcrumbs />}
          {hasFormatToggle && <FormatToggle />}
          {hasSearch && <Search />}
        </div>
        <H1Headline id={h1Id}>{h1Text}</H1Headline>
      </header>
    </>
  )
}
