import { Comment } from '../../types/types';
import Review from '../review/review';
import { FilmInfo } from '../../types/films';
type ReviewsProps = {
  film: FilmInfo;
  idTab: number;
  isActive: number;
  reviews: Comment[];
}

function Reviews({ idTab, isActive, reviews }: ReviewsProps): JSX.Element {
  return (
    <div className={`film-card__reviews film-card__row ${(isActive !== idTab) ? 'visually-hidden' : ''}`}>
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
