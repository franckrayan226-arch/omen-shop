import { useEffect, useRef, useState } from 'react';

const VideoBackground = ({ videoName, overlayOpacity = 0.45 }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoaded(false);
    video.load();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      video.pause();
      return;
    }

    const startVideo = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        video.pause();
      } else {
        startVideo();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    video.addEventListener('loadeddata', startVideo);
    video.addEventListener('canplay', startVideo);
    video.addEventListener('ended', startVideo);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('canplay', startVideo);
      video.removeEventListener('loadeddata', startVideo);
      video.removeEventListener('ended', startVideo);
    };
  }, [videoName]);

  return (
    <div
      className="pointer-events-none overflow-hidden"
      style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#0A0A0A' }}
    >
      <video
        key={videoName}
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        onLoadedData={() => {
          setIsLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        <source src={`/videos/${videoName}.mp4`} type="video/mp4" />
      </video>

      {/* Dégradé sombre dédié à la lisibilité (indépendant de la vidéo) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity + 0.1}) 0%, rgba(0,0,0,${overlayOpacity}) 45%, rgba(0,0,0,${overlayOpacity + 0.15}) 100%)`
        }}
      />
    </div>
  );
};

export default VideoBackground;
