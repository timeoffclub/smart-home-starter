import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function ProductReviewCarousel({ images }) {
    return (
        <div className='my-12'>
            <Carousel dynamicHeight={true}>
                {images.map((el) => (
                    <div key={el.id}>
                        <img src={el.sourceUrl} alt={el.altText}/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}