import type { ChangeEvent, FormEvent } from 'react';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postReview } from '../../store/action';
import { NewComment } from '../../types/types';
//import { FilmInfo } from '../../types/films';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

const STARS_COUNT = 10;
type FormProps = {
  id: number;
}

function Form({ id }: FormProps): JSX.Element {
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const dispatch = useAppDispatch();
  //const { id } = film;

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const onFormSubmit = (formData: Omit<NewComment, 'id'>) => {
    dispatch(postReview({ id, ...formData }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit({
      comment: text,
      rating,
    });
    navigate(`${AppRoute.Films}/${id}`);
  };

  return (
    <form className="add-review__form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {Array.from({ length: STARS_COUNT }, (_, i) => (
            <Fragment key={`Star ${STARS_COUNT - i}`}>
              <input
                className="rating__input"
                id={`${STARS_COUNT - i}-stars`}
                type="radio"
                name="rating"
                defaultValue={STARS_COUNT - i}
                checked={STARS_COUNT - i === rating}
                onChange={handleInputChange}
              />
              <label className="rating__label" htmlFor={`${STARS_COUNT - i}-stars`}>
                Rating {STARS_COUNT - i}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={text}
          onChange={handleTextareaChange}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
