interface H1HeadlineProps {
  id?: string;
  extraclasses?: string;
  children?: React.ReactNode;
}

export default function H1Headline({ id, extraclasses, children }: H1HeadlineProps) {
  return (
    <h1 id={id} className={`text-3xl lg:text-4xl ${extraclasses}`}>{children}</h1>
  )
}
