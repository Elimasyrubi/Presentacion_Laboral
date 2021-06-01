/* eslint-disable no-plusplus */
// Dependence
import PropTypes from 'prop-types';
// style
import css from './css.module.scss';
import SinglePost from './singlePost/container';

const AssignDateView = ({
  postList, PostChangedFn, handlesubmit, postDates, hasDates,
  campaingDates, // errorSubmit
}) => (
  <div className={css.container}>
    <h2 className={css.title}>Assign Date</h2>
    {postList.map((post) => (
      <SinglePost
        idp={post.id}
        key={post.id}
        PostChangedFn={PostChangedFn}
        optionSelected={post.optionSelected}
        date={post.date}
        time={post.time}
        range={post.range}
        postDates={postDates}
        campaingDates={campaingDates}

      />
    ))}
    <div className={css.buttonContainer}>
      {hasDates
        ? (
          <button
            onClick={(e) => handlesubmit(e, 'edit')}
            type="submit"
          >
            Edit Dates
          </button>
        )
        : (
          <button
            onClick={(e) => handlesubmit(e, 'save')}
            type="submit"
          >
            Save Dates
          </button>
        )}

    </div>

  </div>

);

AssignDateView.defaultProps = {
  postList: [],
  PostChangedFn: () => { },
  handlesubmit: () => { },
  campaingDates: {},
  postDates: [],
  // errorSubmit: false,
};

AssignDateView.propTypes = {
  postList: PropTypes.array,
  PostChangedFn: PropTypes.func,
  handlesubmit: PropTypes.func,
  postDates: PropTypes.array,
  hasDates: PropTypes.bool.isRequired,
  campaingDates: PropTypes.object,
  // errorSubmit: PropTypes.bool,
};

export default AssignDateView;
