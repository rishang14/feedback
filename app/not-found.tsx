import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex  flex-col w-full h-screen bg-neutral-900 items-center justify-center' >
      <h2 className='text-white text-3xl'>Not Found</h2>
      <p className='text-gray-200'>There is no page available </p>
      {/* <Link href="/" className='text-white underline'>Go back</Link> */}
    </div>
  )
}