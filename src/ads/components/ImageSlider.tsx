import { Container } from "@mui/material";
import Slider from "react-slick";
import { Photo } from "../types/ad";
export default function ImageSlider({ photos }: { photos: Photo[] }) {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (photos.length > 0) {
    return (
      <Container>
        <Slider {...sliderSettings}>
          {photos.map((photo) => (
            <img src={photo.url =="string"? "https://placehold.co/600x400" : photo.url} alt={photo.description} />
          ))}
        </Slider>
      </Container>
    );
  } else {
    return (
      <Container>
        <Slider {...sliderSettings}>
          <img src="https://placehold.co/600x400" alt="" />
          <img src="https://placehold.co/600x400" alt="" />
        </Slider>
      </Container>
    );
  }
}
