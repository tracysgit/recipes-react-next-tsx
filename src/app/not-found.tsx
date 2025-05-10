import DynamicHeading from "./components/ui/headline/DynamicHeading";

export async function generateMetadata() {
  return {
    title: 'That recipe or category was not found.'
  };
} 

/**
 * The Not Found Page.
 * @constructor
 */
export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center content-center text-center -my-32">
      <DynamicHeading id="headline__not-found" level="h1">That recipe or category was not found.</DynamicHeading>
      <p className="text-lg mt-4">Please try again later.</p>
    </div>
  )
}
