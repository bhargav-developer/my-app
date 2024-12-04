"use client"
import React from 'react'

const userProfile =  ({params}) => {
  return (
    <div>Hello {params.id}</div>
  )
}

export default userProfile