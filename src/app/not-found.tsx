import H1Headline from "./components/headlines/h1Headline";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center content-center text-center -my-32">
      <H1Headline id="not-found">That data was not found.</H1Headline>
      <p className="mt-4">Please try again later.</p>
    </div>
  )
}
