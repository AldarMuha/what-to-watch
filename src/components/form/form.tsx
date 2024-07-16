import type { ChangeEvent } from 'react';
import { Fragment, useState } from 'react';

const STARS_COUNT = 10;

function Form(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  return (
    <form className="add-review__form" action="#" method="post">
      <div className="rating">
        <div className="rating__stars">
          {Array.from({ length: STARS_COUNT }, (_, i) => (
            <Fragment key={`Star ${STARS_COUNT - i}`}>
              <input
                className="rating__input"
                id={`${STARS_COUNT}-stars`}
                type="radio"
                name="rating"
                defaultValue={STARS_COUNT - i}
                checked={STARS_COUNT - i === rating}
                onChange={handleInputChange}
              />
              <label className="rating__label" htmlFor={`${STARS_COUNT}-stars`}>
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
