import React, { useRef, useEffect, useState } from 'react';

export default function FadeIn({ children, delay = '0s', duration = '0.6s' }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 仅触发一次动画
          observer.unobserve(entry.target);
        }
      });
    }, {
      // 触发阈值，可以根据需要调整
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' 
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: delay, transitionDuration: duration }}
    >
      {children}
    </div>
  );
}
