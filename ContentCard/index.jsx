import PropTypes from 'prop-types';
import { CampaignChannels } from 'mocks';
import css from './css.module.scss';

const { featuresIcons } = CampaignChannels;

function ContentCard({
  amount,
  features,
  guideline,
  id,
  onDelete,
  onEdit,
  onlyReadCards,
  assignDate,
  AssignDateFn,
  dates,
}) {
  return (
    <div className={css.wrapper}>
      <div className={css.row1}>
        <p className={css.label}>Type:</p>
        {!onlyReadCards && (
          <i className="fas fa-trash-alt" onClick={() => onDelete(id)} />
        )}
        <div className={css.featuresList}>
          {features.map((featureName) => (
            <p key={`${id}-${featureName}`} className={css.feature}>
              {featuresIcons[featureName].label}
            </p>
          ))}
        </div>
      </div>
      <div className={css.row2}>
        <p className={css.label}>Quantity:</p>
        <p className={css.value}>{amount}</p>
      </div>
      {guideline && (
        <div className={css.row3}>
          <p className={css.label}>Guideline:</p>
          <p className={css.guideline}>{guideline}</p>
        </div>
      )}
      {!onlyReadCards && (
        <div className={css.editContainer}>
          <div className={css.edit} onClick={() => onEdit(id)}>
            <p>Edit</p>
            <i className="fas fa-pen" />
          </div>
        </div>
      )}
      {dates.length > 0 && assignDate && (
        <div className={css.assignDateContainer}>
          <div
            className={css.editDate}
            onClick={() => AssignDateFn(id, amount, dates)}
          >
            <p>Edit Date</p>
            <i className="fas fa-calendar-alt" />
          </div>
        </div>
      )}

      {dates.length <= 0 && assignDate && (
        <div className={css.assignDateContainer}>
          <div
            className={css.assignDate}
            onClick={() => AssignDateFn(id, amount, dates)}
          >
            <p>Assign Date</p>
            <i className="fas fa-calendar-alt" />
          </div>
        </div>
      )}
    </div>
  );
}

ContentCard.defaultProps = {
  dates: [],
};

ContentCard.propTypes = {
  amount: PropTypes.number.isRequired,
  features: PropTypes.array.isRequired,
  guideline: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onlyReadCards: PropTypes.bool.isRequired,
  assignDate: PropTypes.bool.isRequired,
  AssignDateFn: PropTypes.func.isRequired,
  dates: PropTypes.array,
};

export default ContentCard;
