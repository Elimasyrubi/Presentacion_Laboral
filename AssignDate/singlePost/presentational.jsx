/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */
// Dependencies
import PropTypes from 'prop-types';

// Style
import css from './css.module.scss';

const SinglePostView = ({
  date,
  time,
  range,
  idp,
  optionSelected,
  PostChangedFn,
  campaignEndDate,
  campaignStartDate,
}) => (
  <div className={css.container}>
    <p className={css.title}>
      {' '}
      Post
      {' '}
      {`${idp}`}
      {' '}
    </p>
    <div className={css.content}>
      <form>
        {/* Date */}
        <div className={css.date}>
          <label htmlFor={`date-${idp}`}>Date</label>
          <input
            isRequired
            id={`date-${idp}`}
            type="date"
            name="date"
            value={date}
            onChange={(e) => PostChangedFn(e, idp)}
            min={campaignStartDate}
            max={campaignEndDate}
          />
        </div>
        {/* SpecificTime */}
        <div className={css.spesificTime}>
          <div className={css.radio}>
            <input
              id={`time-${idp}`}
              type="radio"
              name="optionSelected"
              value="specificTime"
              onChange={(e) => PostChangedFn(e, idp)}
              checked={optionSelected === 'specificTime'}
            />
            <label htmlFor={`time-${idp}`}>Specific time</label>
          </div>
          <input
            className={css.time}
            type="time"
            name="time"
            onChange={(e) => PostChangedFn(e, idp)}
            id={`hour-${idp}`}
            value={time}
          />
        </div>
        {/* Date Range */}
        <div className={css.dateRange}>
          <div className={css.radio}>
            <input
              id={`range-${idp}`}
              name="optionSelected"
              value="range"
              type="radio"
              onChange={(e) => PostChangedFn(e, idp)}
              checked={optionSelected === 'range'}
            />

            <label htmlFor={`range-${idp}`}>Date Range</label>
          </div>

          <select
            defaultValue=""
            id={`rangeselect-${idp}`}
            name="range"
            className={css.select}
            onChange={(e) => PostChangedFn(e, idp)}
            value={range}
          >
            <option disabled value="">
              {' '}
              Select a days range
            </option>
            <option value="3"> Within 3 business days</option>
            <option value="5"> Within 5 business days </option>
            <option value="10"> Within 10 business days</option>
          </select>
        </div>
        {/* No spesific Time */}
        <div className={css.spesificTime}>
          <div className={css.radio}>
            <input
              id={`noTime-${idp}`}
              type="radio"
              name="optionSelected"
              value="noTime"
              checked={optionSelected === 'noTime'}
              onChange={(e) => PostChangedFn(e, idp)}
            />
            <label htmlFor={`noTime-${idp}`}>No specific Time</label>
          </div>
        </div>
      </form>
      <div className={css.message}>
        {date === '' ? (
          <p className={css.enterADate}>Please Select a date</p>
        ) : null}

        {new Date(date) < new Date(campaignStartDate)
        || new Date(date) > new Date(campaignEndDate) ? (
          <p className={css.BadDate}>
            Please select a date between
            {' '}
            {campaignStartDate}
            {' '}
            and
            {' '}
            {campaignEndDate}
          </p>
        ) : null}

        {new Date(date) >= new Date(campaignStartDate)
        && new Date(date) <= new Date(campaignEndDate) ? (
          <p className={css.goodDate}>
            This post should be post on
            <span>{date}</span>
            {time !== null && time !== '' ? `at ${time}hr` : null}
            {range !== null && range !== ''
              ? `with a Range of ${range ? `${range}  business days` : ''} `
              : null}
            {time !== null && time !== '' && range !== null && range !== ''
              ? 'at any time of the day'
              : null}
          </p>
        ) : null}
      </div>
    </div>
  </div>
);
SinglePostView.defaultProps = {
  date: '',
  time: '',
  range: '',
  optionSelected: '',
  campaignEndDate: '',
  campaignStartDate: '',
};

SinglePostView.propTypes = {
  PostChangedFn: PropTypes.func.isRequired,
  date: PropTypes.string,
  time: PropTypes.string,
  range: PropTypes.string,
  campaignEndDate: PropTypes.string,
  campaignStartDate: PropTypes.string,
  optionSelected: PropTypes.string,
  idp: PropTypes.number.isRequired,
};

export default SinglePostView;
