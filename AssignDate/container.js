import PropTypes from 'prop-types';
import { useEffect } from 'react';
import AxiosCl from 'api';
// hooks
import { useMergedState } from 'hooks';
// View
import AssignDateView from './presentational';

const AssignDate = ({
  qty,
  idCampaign,
  idCreator,
  postId,
  closeAssignDateModalFn,
  postDates,
  campaingDates,
}) => {
  const [{ errorSubmit, postList, loading }, setState] = useMergedState({
    errorSubmit: false,
    postList: [],
    loading: false,
  });
  const { endDate, startdate } = campaingDates;

  useEffect(() => {
    const createPostObjet = (n, dates) => {
      let qtyArray = [];
      if (dates.length > 0) {
        let i;
        // eslint-disable-next-line no-plusplus
        for (i = 0; i < n; i++) {
          const singlepost = {
            id: i + 1,
            optionSelected: '',
            date: dates[i].date,
            time: dates[i].time,
            range: dates[i].range,
          };
          qtyArray = [...qtyArray, singlepost];
        }
      }
      if (dates.length <= 0) {
        let i;
        // eslint-disable-next-line no-plusplus
        for (i = 0; i < n; i++) {
          const singlepost = {
            id: i + 1,
            optionSelected: '',
            date: '',
            time: '',
            range: '',
          };
          qtyArray = [...qtyArray, singlepost];
        }
      }

      setState({
        postList: qtyArray,
      });
    };
    createPostObjet(qty, postDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get postId selected
  const PostChangedFn = (e, idp) => {
    const indexPost = postList.findIndex(({ id }) => id === idp);
    const newListPost = postList;

    if (e.target.type.trim() === 'time') {
      newListPost[indexPost] = {
        ...newListPost[indexPost],
        [e.target.name]: `${e.target.value}:00`,
      };
      setState({
        postList: newListPost,
      });
    }
    switch (e.target.value.trim()) {
      case 'specificTime':
        newListPost[indexPost] = {
          ...newListPost[indexPost],
          range: '',
        };
        setState({
          postList: newListPost,
        });

        break;
      case 'range':
        newListPost[indexPost] = {
          ...newListPost[indexPost],
          time: '',
        };
        setState({
          postList: newListPost,
        });

        break;
      case 'noTime':
        newListPost[indexPost] = {
          ...newListPost[indexPost],
          time: '',
          range: '',
        };
        setState({
          postList: newListPost,
        });

        break;
      default:
    }

    newListPost[indexPost] = {
      ...newListPost[indexPost],
      [e.target.name]: e.target.value,
    };
    setState({
      postList: newListPost,
    });
  };

  // Submit
  const handlesubmit = (e, type) => {
    e.preventDefault();
    setState({
      loading: true,
    });
    let errorValidation = false;

    // validation
    postList.forEach((post) => {
      const errors = {};

      if (post.date.trim() === '') {
        errors.date = 'You should enter a date';
      }

      if (post.date.trim() !== '') {
        if (new Date(post.date) <= new Date()) {
          errors.date = 'the start date most be higher than today';
        }
      }
      if (post.date.trim() !== '') {
        // eslint-disable-next-line max-len
        if (
          new Date(post.date) < new Date(startdate)
          || new Date(post.date) > new Date(endDate)
        ) {
          errors.date = 'the day should be between the start and end day of the campaign';
        }
      }

      const indexPost = postList.findIndex(({ id }) => id === post.id);
      const newList = postList;
      newList[indexPost] = {
        ...newList[indexPost],
        errors,
      };

      const postHasError = Object.keys(errors).length > 0;

      if (postHasError) {
        errorValidation = true;
      }

      setState({
        postList: newList,
        errorSubmit: postHasError,
      });
    });

    if (!errorValidation) {
      // new data
      const newListdata = [];
      postList.forEach((post) => {
        let newData = {};
        let newTime;
        let newRange;
        if (post.time) {
          newTime = `${post.time}:00`;
          newRange = null;
          newData = {
            date: post.date,
            time: newTime,
          };
        } else if (post.range) {
          newTime = null;
          newRange = window.parseInt(post.range);
          newData = {
            date: post.date,
            range: newRange,
          };
        } else {
          newData = {
            date: post.date,
          };
        }

        newListdata.push(newData);
      });

      // axio save config
      const axiosCl = new AxiosCl('assigDateToPost', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contents/${postId}/create/`,
        data: { dates: newListdata },
      });

      // axios edit config
      const edit = new AxiosCl('editDateToPost', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contents/${postId}/update/`,
        data: { dates: newListdata },
      });

      if (type === 'edit') {
        (async () => {
          try {
            await edit.send();
            // ok
            closeAssignDateModalFn();
            setState({
              loading: false,
            });
          } catch (error) {
            setState({
              loading: false,
            });
            closeAssignDateModalFn();
          }
        })();
      }
      if (type === 'save') {
        (async () => {
          try {
            await axiosCl.send();
            // ok

            closeAssignDateModalFn();
            setState({
              loading: false,
            });
          } catch (error) {
            setState({
              loading: false,
            });
            closeAssignDateModalFn();
          }
        })();
      }
    }
  };
  return (
    <AssignDateView
      postList={postList}
      PostChangedFn={PostChangedFn}
      handlesubmit={handlesubmit}
      errorSubmit={errorSubmit}
      hasDates={postDates.length > 0}
      loading={loading}
      campaingDates={campaingDates}
    />
  );
};
AssignDate.defaultProps = {
  postDates: [],
  campaingDates: {},
};

AssignDate.propTypes = {
  qty: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  idCampaign: PropTypes.string.isRequired,
  idCreator: PropTypes.string.isRequired,
  closeAssignDateModalFn: PropTypes.func.isRequired,
  postDates: PropTypes.array,
  campaingDates: PropTypes.object,
};

export default AssignDate;
