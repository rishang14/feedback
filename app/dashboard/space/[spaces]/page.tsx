import React from 'react'

const page = ({params}:{params:any}) => {
    const { spaces } = params;
  return (
    <div className='text-white '>space {spaces}
    </div>
  )
}

export default page