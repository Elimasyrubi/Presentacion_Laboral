/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */
// Dependence
import PropTypes from 'prop-types';
// hooks
 import { useEffect } from 'react';
import SinglePostView from './presentational';

const SinglePost = ({
  PostChangedFn,
  idp,
  optionSelected,
  date,
  time,
  range,
  campaingDates,
}) => {
  const { endDate, startdate } = campaingDates;
 useEffect(() => {
  const rangeSelect = document.getElementById(`rangeselect-${idp}`);
  const hour = document.getElementById(`hour-${idp}`);

  switch (optionSelected) {
    case 'specificTime':
      rangeSelect.disabled = true;
      rangeSelect.value = '';
      hour.disabled = false;
      break;

    case 'range':
      rangeSelect.disabled = false;
      hour.disabled = true;
      hour.value = null;
      break;

    case 'noTime':
      rangeSelect.disabled = true;
      hour.disabled = true;
      rangeSelect.value = '';
      hour.value = '';
      break;

    default:
      rangeSelect.disabled = true;
      hour.disabled = true;
      break;
  }
}, [optionSelected]);
     return (
       <SinglePostView
         optionSelected={optionSelected}
         PostChangedFn={PostChangedFn}
         idp={idp}
         date={date}
         time={time}
         range={range}
         campaignEndDate={endDate}
         campaignStartDate={startdate}

       />
);
 };
SinglePost.defaultProps = {
  PostChangedFn: () => {},
  optionSelected: '',
  date: '',
  time: '',
  range: '',
  campaingDates: {},

};

SinglePost.propTypes = {
  PostChangedFn: PropTypes.func,
  idp: PropTypes.number.isRequired,
  optionSelected: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  range: PropTypes.string,
  campaingDates: PropTypes.object,
};

export default SinglePost;
