import React, { useEffect, useRef, useState } from 'react'
import styles from './Banner.module.css'

export default function Banner({ items = [], interval = 3500 }){
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const [pause, setPause] = useState(false)

  const list = items.length ? items : [
    { img: '/images/banner-1.jpg', title: 'Professional Tiling Services', sub: 'Transform your space with expert craftsmanship', cta: 'Learn More', href:'#' },
    { img: '/images/banner-2.jpg', title: 'Certified Pros Near You', sub: 'Book inspections and get instant quotes', cta: 'Find Tilers', href:'/tilers' },
    { img: '/images/banner-3.jpg', title: 'Get a Quick Estimate', sub: 'Simple pricing per square foot', cta: 'Get Estimate', href:'/estimator' },
  ]

  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const onScroll = ()=>{
      const i = Math.round(el.scrollLeft / el.clientWidth)
      if(i !== idx) setIdx(i)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return ()=> el.removeEventListener('scroll', onScroll)
  }, [idx])

  useEffect(()=>{
    if(pause || list.length <= 1) return
    const id = setInterval(()=>{
      const el = ref.current
      if(!el) return
      const next = (idx + 1) % list.length
      el.scrollTo({ left: next * el.clientWidth, behavior:'smooth' })
      setIdx(next)
    }, interval)
    return ()=> clearInterval(id)
  }, [idx, list.length, pause, interval])

  const goTo = (i)=>{
    const el = ref.current; if(!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior:'smooth' })
    setIdx(i)
  }

  return (
    <div
      className={styles.wrap}
      onMouseEnter={()=>setPause(true)}
      onMouseLeave={()=>setPause(false)}
      onTouchStart={()=>setPause(true)}
      onTouchEnd={()=>setPause(false)}
    >
      <div className={styles.track} ref={ref}>
        {list.map((b,i)=> (
          <a key={i} className={styles.card} href={b.href || '#'} aria-label={b.title}>
            <img className={styles.img} src={b.img} alt={b.title} loading="lazy" />
            <div className={styles.overlay}>
              <h2 className={styles.title}>{b.title}</h2>
              {b.sub && <p className={styles.sub}>{b.sub}</p>}
              {b.cta && <span className={styles.cta}>{b.cta}</span>}
            </div>
          </a>
        ))}
      </div>
      <div className={styles.dots} role="tablist" aria-label="banner pagination">
        {list.map((_,i)=> (
          <button key={i} className={`${styles.dot} ${i===idx?styles.active:''}`} onClick={()=>goTo(i)} aria-label={`Go to banner ${i+1}`} />
        ))}
      </div>
    </div>
  )
}
