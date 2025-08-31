import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { img:'/images/banner1.jpg', title:'Professional Tiling Services', sub:'Expert craftsmanship for homes & offices', cta:'Find Tilers', href:'/tilers' },
  { img:'/images/banner2.jpg', title:'Certified Pros Near You', sub:'Background-checked, portfolio-reviewed', cta:'Browse Profiles', href:'/tilers' },
  { img:'/images/banner3.jpg', title:'Quick Cost Estimates', sub:'Transparent pricing per sq.ft', cta:'Get Estimate', href:'/estimator' },
]

export default function Banner(){
  return (
    <section className="banner container">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <a className="banner-card" href={s.href}>
              <img className="banner-img" src={s.img} alt={s.title} />
              <div className="banner-overlay">
                <h2 className="banner-title">{s.title}</h2>
                <p className="banner-sub">{s.sub}</p>
                <span className="banner-cta">{s.cta}</span>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
