import React, { useRef } from 'react'
import { gsap } from 'gsap';

import img1 from "./img/i1.png"
import img2 from "./img/i2.png"
import img3 from "./img/i3.png"
import img4 from "./img/i4.png"
import img5 from "./img/i5.png"
import img6 from "./img/i6.png"
import img7 from "./img/i7.png"
import img8 from "./img/i8.png"

const App = () => {

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  // 변수 선언
  let animationFrameId = null;  //프레임 관리를 위한 변수 선언
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01; // 속도

  // 마우스 이동 관리
  const mouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (animationFrameId == null) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  // 선형 보간을 이용하여 중간값을 계산하는 방법
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  // (1 - a)는 시작 값(x)에 대한 가중치, a는 y에 대한 가중치

  // animate 정의
  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null;
    }

  }


  return (
    <main className='main' onMouseMove={(e) => { mouseMove(e) }}>
      <div ref={plane1} className='imgs'>
        <img src={img1} alt="image01" className='i01' />
        <img src={img2} alt="image02" className='i02' />
        <img src={img3} alt="image03" className='i03' />
      </div>

      <div ref={plane2} className='imgs'>
        <img src={img4} alt="image04" className='i04' />
        <img src={img5} alt="image05" className='i05' />
        <img src={img6} alt="image06" className='i06' />
      </div>

      <div ref={plane3} className='imgs'>
        <img src={img7} alt="image07" className='i07' />
        <img src={img8} alt="image08" className='i08' />
      </div>

      <div className="main__title">
        <h2>Where there is a will, there is a way.</h2>
        <span>뜻이 있는 곳에 길이 있다.</span>
      </div>
    </main>
  )
}

export default App