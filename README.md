## 발표

## 1. 설치
npx create-react-app .
npm i sass
npm i gsap

## 2. 중앙의 글귀 정해서 넣기

```js
<main className='main'>
    <div className="main__title">
    <h2>Where there is a will, there is a way.</h2>
    <span>뜻이 있는 곳에 길이 있다.</span>
    </div>
</main>

``` 

```scss
.main__title {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;

    h2 {
        text-transform: uppercase;
        font-family: var(--mainEn-font);
        font-size: 2vw;
        font-weight: lighter;
        font-size: 2vw;
        line-height: 1;
    }

    span {
        display: inline-block;
        margin-top: 3vh;
        text-transform: uppercase;
        font-family: var(--mainSub-font2);
        font-size: 1.5vw;
        letter-spacing: 1px;
        line-height: 1;
    }
}

```

## 3. 이미지들 모아둔 div 3개 만들기 (usRef => 직접 DOM에 접근하기 위해 사용)

```js

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

  return (
    <main className='main'>
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

```

```scss 

.imgs {
    width: 100%;
    height: 100%;
    position: absolute;

    img {
      position: absolute;
    }

    &:nth-child(1) {
      filter: brightness(0.7);

      img {

        &.i01 {
          width: 300px;
          height: 25vh;
          object-position: center;
          object-fit: cover;
          left: 90%;
          top: 70%;
        }

        &.i02 {
          width: 250px;
          height: 30vh;
          object-position: center;
          object-fit: cover;
          left: 5%;
          top: 65%;
        }

        &.i03 {
          width: 250px;
          height: 20vh;
          object-position: center;
          object-fit: cover;
          left: 35%;
          top: 0%;
        }
      }
    }

    &:nth-child(2) {
      filter: brightness(0.6);

      img {

        &.i04 {
          width: 240px;
          height: 25vh;
          object-position: center;
          object-fit: cover;
          left: 5%;
          top: 10%;
        }

        &.i05 {
          width: 250px;
          height: 30vh;
          object-position: center;
          object-fit: cover;
          left: 65%;
          top: 2.5%;
        }

        &.i06 {
          width: 225px;
          height: 25vh;
          object-position: center;
          object-fit: cover;
          left: 40%;
          top: 75%;
        }
      }
    }

    &:nth-child(3) {
      filter: brightness(0.5);

      img {

        &.i07 {
          width: 150px;
          height: 25vh;
          object-position: center;
          object-fit: cover;
          left: 90%;
          top: 10%;
        }

        &.i08 {
          width: 180px;
          height: 30vh;
          object-position: center;
          object-fit: cover;
          left: 72%;
          top: 50%;
        }
      }
    }
  }

```

## 4. 어떻게 짰는지 순서 코드

### 1. 첫번째 
plane1, plane2, plane3은 React의 useRef 훅을 사용하여 DOM 요소에 대한 참조를 생성하는 것으로 보입니다.<br>
speed는 마우스 이동에 대한 속도 계수로 사용됩니다.<br>
mouseMove 함수는 마우스 이동 이벤트를 처리하며, 각 plane에 대해 gsap을 사용하여 위치를 업데이트합니다.<br>

```js
const plane1 = useRef(null);
const plane2 = useRef(null);
const plane3 = useRef(null);
const speed = 0.01; // 나중에 보여주기

const mouseMove = (e) => {
    const { movementX, movementY } = e

    gsap.set(plane1.current, { x: `+=${movementX}`, y: `+=${movementY}`}) //mouseMove 정의했을 때 const와 함께 보여줄 코드

    gsap.set(plane2.current, { x: `+=${movementX * speed * 0.5}`, y: `+=${movementY * speed * 0.5}`})  // 나중에 보여주기와 같이 보여주기
    gsap.set(plane3.current, { x: `+=${movementX * speed * 0.25}`, y: `+=${movementY * speed * 0.25}`})

}
```

### 2. 두번째 (주석 표시한 건 이미 적은 내용들)
animationFrameId는 애니메이션 프레임을 관리하기 위한 변수입니다.<br>
xForce와 yForce는 마우스 이동에 따른 힘을 나타내는 변수입니다.<br>
easing은 애니메이션에서 사용되는 이징(가속, 감속) 계수로 보입니다.<br>
mouseMove 함수는 마우스 이동 이벤트를 처리하며 아무 동작도 하지 않습니다.<br>
animate 함수는 gsap을 사용하여 각 plane의 위치를 업데이트하고, 다음 애니메이션 프레임을 요청합니다.<br>
```js
//   const plane1 = useRef(null);
//   const plane2 = useRef(null);
//   const plane3 = useRef(null);

  // 변수 선언
  let animationFrameId = null;  //프레임 관리를 위한 변수 선언
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
//   const speed = 0.01; // 속도

const mouseMove = (e) => {
    const { movementX, movementY } = e
}

const animate = () => {
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, { x: `+=${xForce * speed * 0.5}`, y: `+=${yForce * speed * 0.5}`})
    gsap.set(plane3.current, { x: `+=${xForce * speed * 0.25}`, y: `+=${yForce * speed * 0.25}`})
    requestAnimationFrame(animate);
  }
```

### 3. 세번째 (주석 표시한 건 이미 적은 내용들)
mouseMove 함수에서 movementX와 movementY를 사용하여 xForce와 yForce를 업데이트하고, 애니메이션 프레임 요청을 시작합니다.<br>
animate 함수에서는 주석 처리된 부분이 있으나, 애니메이션 프레임 요청이 주석 처리되어 있습니다.<br>
```js
//   const plane1 = useRef(null);
//   const plane2 = useRef(null);
//   const plane3 = useRef(null);

//   // 변수 선언
//   let animationFrameId = null;  //프레임 관리를 위한 변수 선언
//   let xForce = 0;
//   let yForce = 0;
//   const easing = 0.08;
//   const speed = 0.01; // 속도

const mouseMove = (e) => {
    // const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (animationFrameId == null) {
      animationFrameId = requestAnimationFrame(animate);
    }
}

const animate = () => {
    // gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}`})
    // gsap.set(plane2.current, { x: `+=${xForce * speed * 0.5}`, y: `+=${yForce * speed * 0.5}`})
    // gsap.set(plane3.current, { x: `+=${xForce * speed * 0.25}`, y: `+=${yForce * speed * 0.25}`})
    // requestAnimationFrame(animate);
  }
```

### 4-1. 선형 보간(Linear Interpolation 또는 Lerp)을 사용하여 목표 값으로 조금씩 이동시키는 것(사용전에 설명 해주기) => 사이트 
`https://www.trysmudford.com/blog/linear-interpolation-functions/` => 설명 사이트

선형 보간은 두값 사이의 중간 값을 계산하는 방법으로 일반적으로 lerp(x,y,a)으로 사용한다. <br>
`x= 시작값`
`y= 목표값`
`a= 보간 계수(0에서 1사이의 값)`

```js
//첫번째 예제
let value = 10;

const lerp = (x, y, a) => x * (1 - a) + y * a
value = lerp(value, 0, 0.1);    // x= vlaue, y = 0, a = 0.1 (즉 10%)

console.log(value) // 9


// 2번째 예제
// x * (1 - a) + y * a 의 값을 구하는 것이므로
lerp(20, 80, 0)   // 20  => 20 * (1-0) + 80 * 0 = 20
lerp(20, 80, 1)   // 80  => 20 * (1-1) + 80 * 1 = 80
lerp(20, 80, 0.5) // 50  => 20 * (1-0.5) + 80 * 0.5 = 10 + 40 = 50

```

### 4. 네번째 
lerp 함수를 사용하여 xForce와 yForce 값을 선형 보간하여 부드럽게 이동시킵니다.<br>
나머지 부분은 주석 처리되어 있으며, gsap을 사용하여 plane의 위치를 업데이트하고 다음 애니메이션 프레임을 요청하고 있습니다.<br>
requestAnimationFrame은 웹 브라우저에서 제공하는 함수로, 주로 웹 애니메이션 및 그래픽 업데이트를 위해 사용하고 잇습니다.<br>
```js
// let animationFrameId = null;  //프레임 관리를 위한 변수 선언
// let xForce = 0;
// let yForce = 0;
const easing = 0.08;
// const speed = 0.01; // 속도

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
    // gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    // gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    // gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })
    // requestAnimationFrame(animate);
}
```

### 5. 다섯번째
animate 함수에서는 추가적으로 xForce와 yForce가 일정 값 이하로 작아지면 애니메이션 프레임 요청을 중지하는 부분이 추가되었습니다.
```js
//  완성 코드

// 변수 선언
//   let animationFrameId = null;  //프레임 관리를 위한 변수 선언
//   let xForce = 0;
//   let yForce = 0;
//   const easing = 0.08;
//   const speed = 0.01; // 속도

//   // 마우스 이동 관리
//   const mouseMove = (e) => {
//     const { movementX, movementY } = e
//     xForce += movementX * speed;
//     yForce += movementY * speed;

//     if (animationFrameId == null) {
//       animationFrameId = requestAnimationFrame(animate);
//     }
//   }

//   // 선형 보간을 이용하여 중간값을 계산하는 방법
//   const lerp = (x, y, a) => x * (1 - a) + y * a;
//   // (1 - a)는 시작 값(x)에 대한 가중치, a는 y에 대한 가중치

//   // animate 정의
//   const animate = () => {
//     xForce = lerp(xForce, 0, easing);
//     yForce = lerp(yForce, 0, easing);
//     gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
//     gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
//     gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null;
    }

//   }
```

### 완성 코드 
```js
//  완성 코드

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
```
