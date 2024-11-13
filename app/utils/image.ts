interface LoadImageOptions {
    src?: string;
    srcSet?: string;
    sizes?: string;
  }
  
  /**
   * Use the browser's image loading to load an image and
   * grab the `src` it chooses from a `srcSet`
   */
  export async function loadImageFromSrcSet({
    src,
    srcSet,
    sizes,
  }: LoadImageOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (!src && !srcSet) {
          throw new Error('No image src or srcSet provided');
        }
  
        let tempImage = new Image();
  
        if (src) {
          tempImage.src = src;
        }
  
        if (srcSet) {
          tempImage.srcset = srcSet;
        }
  
        if (sizes) {
          tempImage.sizes = sizes;
        }
  
        const onLoad = () => {
          tempImage.removeEventListener('load', onLoad);
          const source = tempImage.currentSrc;
          tempImage = new  Image();
          resolve(source);
        };
  
        tempImage.addEventListener('load', onLoad);
      } catch (error) {
        reject(`Error loading ${srcSet}: ${error}`);
      }
    });
  }
  
  /**
   * Generates a transparent PNG of a given width and height
   */
  export async function generateImage(width = 1, height = 1): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      if (!ctx) {
        reject('Failed to get canvas 2D context');
        return;
      }
  
      canvas.width = width;
      canvas.height = height;
  
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);
  
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Video thumbnail failed to load'));
          return;
        }
        const image = URL.createObjectURL(blob);
        canvas.remove();
        resolve(image);
      });
    });
  }
  
  interface ResolveSrcOptions {
    srcSet: string ;
    sizes?: string;
  }
  
  /**
   * Use native HTML image `srcSet` resolution for non-HTML images
   */
  export async function resolveSrcFromSrcSet({
    srcSet,
    sizes,
  }: ResolveSrcOptions): Promise<string | undefined> {
    const sources = await Promise.all(
      srcSet.split(', ').map(async (srcString) => {
        const [src, width] = srcString.split(' ');
        const size = Number(width.replace('w', ''));
        const image = await generateImage(size);
        return { src, image, width };
      })
    );
  
    const fakeSrcSet = sources.map(({ image, width }) => `${image} ${width}`).join(', ');
    const fakeSrc = await loadImageFromSrcSet({ srcSet: fakeSrcSet, sizes });
  
    const output = sources.find(src => src.image === fakeSrc);
    return output?.src;
  }
  