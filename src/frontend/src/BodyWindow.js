import { Component, useRef, useEffect, useState } from 'react'
import { subscribe, unsubscribe, publish } from './events'
import Anatomy from './Anatomy'

import './BodyWindow.css'

const imgBody = new Image()

const drawBody = (ctx, imgBody) => {
  imgBody.src = '/body.png'
  ctx.fillStyle = "#202020"
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.drawImage(imgBody, 0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawHit = (ctx, id, geography) => {
  //if (geography.angle <= 90) {
  //}
  //if (geography.angle <= 180) {
  //}
  //if (geography.angle <= 270 {
  //}
  //if (geography.angle <= 360 {
  //}
  const xh = parseInt(Math.random() * 10)
  const yh = parseInt(Math.random() * 10)
  let y = Object.keys(Anatomy).reduce(function(prev, curr) {
    return (Math.abs(curr - yh) < Math.abs(prev - yh) ? curr : prev)
  })
  const xs = Object.keys(Anatomy.y).map(function(n) {
    return n.x
  })
  let x = xs.reduce(function(prev, curr) {
    return (Math.abs(curr - xh) < Math.abs(prev - xh) ? curr : prev)
  });
  console.log(xs, x, y, id)
  ctx.fillStyle = 'rgba(255, 255, 0, 1)'
  ctx.fillRect(x, y, '4', '4')
  ctx.fillText(id, x, y)
}

export default function BodyWindow(props) {
  const ref = useRef(null)
  const [hitState, setHitState] = useState([])
  
  subscribe('onBodyHit', (e) => {
    setHitState(e.detail.hits)
  })

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    drawBody(ctx, imgBody)
    hitState.map(hit => {
      drawHit(ctx, hit.id, hit.geography)
    })
  })

  return (
    <div id="body-map">
      <div className="hitmap">
        <canvas className="body-image" ref={ref} {...props}/>
      </div>
    </div>
  )
}
