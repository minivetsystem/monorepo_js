export interface IImageSlider {
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
    dots: boolean;
  };
  className?: string;
  nextButtonClass?: string;
  prevButtonClass?: string;
}
