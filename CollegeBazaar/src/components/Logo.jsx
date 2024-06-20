import React from 'react'
import service from '../appwrite/config'

function Logo({width='100px',classname="w-1/2"}) {
  const featuredImage="6673cd05000b2e375d59"
  return (
    <div className={`mt-3 ${classname}`}>
       <img src={service.getFilePreview(featuredImage)}  />
    </div>

  )
}

export default Logo
