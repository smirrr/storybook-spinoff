/* eslint-disable no-unused-expressions,react/prop-types,react/jsx-props-no-spreading */
import React, { useEffect, useState, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/index.js';

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const image = new window.Image();
    image.src = src;

    image.onload = event => {
      if (isMounted.current) {
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onError = event => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
  }, [src, onLoad, onError]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
};

const NativeImage = forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img alt={alt} height={htmlHeight} ref={ref} width={htmlWidth} {...props} />
  )
);

const Image = forwardRef(
  ({ src, fallbackSrc, onError, onLoad, loading, ...props }, ref) => {
    const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
    const imageProps = { src: hasLoaded ? src : fallbackSrc };
    return hasLoaded ? (
      <Box
        as={NativeImage}
        ref={ref}
        {...imageProps}
        {...props}
        loading={loading}
      />
    ) : null;
  }
);

Image.propTypes = {
  /**
   * If `src` is invalid or absent, `fallbackSrc` is rendered.
   */
  fallbackSrc: PropTypes.string,
  /**
   * Loading type
   */
  loading: PropTypes.string,
  /**
   * Callback for when `src` is invalid
   */
  onError: PropTypes.func,
  /**
   * Callback for when the Image src has loaded successfully
   */
  onLoad: PropTypes.func,
  /**
   * Image source url
   */
  src: PropTypes.string.isRequired
};

Image.defaultProps = {
  fallbackSrc: '',
  loading: 'lazy',
  onError: null,
  onLoad: null
};

Image.displayName = 'Image';

export default Image;
