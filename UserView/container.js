// Dependencies
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// api
import AxiosCl from 'api';
// Hooks
import { useMergedState } from 'hooks';
// View
import BrandAddCreatorCampaignView from './presentational';

const BrandAddCreatorCampaign = () => {
  const { brandIdState, dates } = useSelector(({ BrandAddCreator }) => BrandAddCreator);
  const { budgetPrice } = useSelector(({ campaignDetailReducer }) => campaignDetailReducer);

  // hooks
  const history = useHistory();
  const { idCampaign, idCreator } = useParams();

  const [contractList, setContractList] = useState([]);
  const [dataContract, setDataContract] = useState({});
  const [stepContract, setStepContract] = useState(1);

  // State
  const [{
    showActionRequestModal,
    loadingContract,
    errorContract,
    loadingResponse,
    errorResponse,
    asideData,
    data,
    loadingAccept,
    errorAccept,
    loadingChat,
    errorChat,
    dataChat,
    postList,
    assignDateModal,
    postId,
    postDates,
    qty,
    reload,
    showContract,
    hasDateAssigned,
    price,
    option,
    loadingGenerate,
    errorGenerate,
    errorsContract,
  }, setState] = useMergedState({
    // data contract
    showActionRequestModal: false,
    errorsContract: {},
    option: '',
    price: null,
    loadingContract: false,
    errorContract: null,
    loadingGenerate: false,
    errorGenerate: false,
    loading: false,
    error: null,
    asideData: {},
    loadingAccept: false,
    errorAccept: null,
    loadingChat: false,
    errorChat: null,
    assignDateModal: false,
    postId: null,
    qty: null,
    postDates: [],
    dataChat: {},
    postList: [],
    reload: 1,
    showContract: false,
    hasDateAssigned: false,
  });
  // Validation ID Campaign
  useEffect(() => {
    if (!brandIdState) {
      history.push('/campaigns');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Did mount
  useEffect(() => {
    // config axios
    const axiosCl = new AxiosCl('brandAddCreator', {
      url: `/brands/campaigns/${idCampaign}/members/${idCreator}/`,
    });

    const request = new AxiosCl('chat', {
      url: `messages/campaigns/${idCampaign}/creators/${idCreator}/`,
    });

    (async () => {
      try {
        setState({ loadingResponse: true });
        const response = await axiosCl.send();
        const {
          birthday,
          campaign,
          first_name,
          last_name,
          is_accepted,
          location,
          manager,
          phone_number,
          social_accounts,
          user,

        } = response;

        // get publics ID
        const {
          creator_public_id,
          campaign_public_id,
          conversation_id,
        } = await request.send();

        // Ok
        setState({
          loadingResponse: false,
          asideData: {
            ...asideData,
            accounts: social_accounts,
            birthday,
            user,
            phone_number,
            location,
            manager,
          },
          data: {
            ...data,
            campaign,
            first_name,
            last_name,
            is_accepted,
          },
          dataChat: {
            ...dataChat,
            creator_public_id,
            campaign_public_id,
            conversation_id,
          },
        });
      } catch (error) {
        setState({ errorResponse: error, loadingResponse: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const { is_accepted } = data;
      if (is_accepted) {
        (
          async () => {
            const requestChannel = new AxiosCl('campaignChannelContentsWithDates', {
              url: `brands/campaigns/${idCampaign}/creators/${idCreator}/contents/`,
            });
            try {
              // get channelsContents
              const { results = [] } = await requestChannel.send();
              setState({
                postList: results,
                hasDateAssigned: results.assigned_contents,
              });
            } catch (error) {
              console.log(error);
            }
          }
        )();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reload]);

  // Function go back
  const goBackFn = () => {
    history.push(`/campaigns/${idCampaign}`);
  };

  // Redirect Modal error
  const reloadFn = () => {
    window.location.href = '/';
  };

  // Fn accept creator
  const acceptFn = () => {
    // Conf axios
    const axiosCl = new AxiosCl('acceptCreator', {
      url: `/brands/campaigns/${idCampaign}/members/${idCreator}/accept/`,
    });

    (async () => {
      try {
        setState({ loadingAccept: true });

        await axiosCl.send();

        // Ok
        setState({ loadingAccept: false });
        // Redirect
        history.push(`/campaigns/${idCampaign}`);
      } catch (error) {
        setState({ loadingAccept: false, errorAccept: error });
      }
    })();
  };

  // Show modal for assigns date to posts
  const showAssignDateModalFn = (id, qtyNumber, postdates) => {
    setState({
      assignDateModal: true,
      postId: id,
      qty: qtyNumber,
      postDates: postdates,
    });
  };

  // Close modal for assigns date to posts
  const closeAssignDateModalFn = () => {
    setState({
      assignDateModal: false,
      postId: null,
      reload: reload + 1,

    });
  };

  // Fn show contract
  const showContractFn = () => {
    setState({
      showContract: !showContract,
    });
  };

  // get data contracts
  useEffect(() => {
    (async () => {
      // Conf axios
      const axiosCl = new AxiosCl('dataContracts', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contracts/`,
      });
      const request = new AxiosCl('getContractList', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contracts/contents/`,
      });

      try {
        setState({ loadingContract: true });

        const response = await axiosCl.send();
        const { results } = await request.send();

        // Validation step contract
        if (response.id) {
          setStepContract(2);
        }

        setContractList(results);
        setDataContract(response);

        // Ok
        setState({
          loadingContract: false,
          errorContract: null,
        });
      } catch (error) {
        setState({ loadingContract: false, errorContract: error });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasDateAssigned]);

  // on Change event modal contracts
  const handleChangeContracts = (e) => {
    setState({ option: e.target.name, errorsContract: {}, errorGenerate: null });
    // validation type input = manual price user
    if (e.target.name === 'budget') {
      setState({ price: e.target.value < 0 ? 0 : e.target.value });
    }
  };

  // on submit event modal contract
  const handleClickContract = () => {
    // Validation fields
    let errors = {};

    if (option.trim() === '') {
      errors.option = 'Please select an option.';
    }

    if (option === 'manual' && !price) {
      errors = {
        price: 'Please enter a value',
      };
    }

    if (Object.keys(errors).length > 0) {
      setState({ errorsContract: errors });
      return;
    }

    (async () => {
      // Config axios
      const axiosCl = new AxiosCl('generateContract', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contracts/create/`,
        data: {
          price: option === 'manual' ? price : budgetPrice,
        },
      });

      try {
        setState({ loadingGenerate: true });

        await axiosCl.send();

        // ok
        setState({
          errorGenerate: null,
          loadingGenerate: false,
          showActionRequestModal: true,
          showContract: false,
        });
      } catch (error) {
        setState({ loadingGenerate: false, errorGenerate: error });
      }
    })();
  };

  // Successfully contract Fn
  const successfullyFn = () => {
    (async () => {
      // Conf axios
      const axiosCl = new AxiosCl('dataContracts', {
        url: `/brands/campaigns/${idCampaign}/creators/${idCreator}/contracts/`,
      });

      try {
        setState({ loadingContract: true });

        const response = await axiosCl.send();

        // Validation step contract
        if (response.id) {
          setStepContract(2);
        }

        setDataContract(response);

        // Ok
        setState({
          loadingContract: false,
          errorContract: null,
          showActionRequestModal: false,
        });
      } catch (error) {
        setState({ loadingContract: false, errorContract: error });
      }
    })();
  };

  return (
    <BrandAddCreatorCampaignView
      hasDateAssigned={hasDateAssigned}
      postList={postList}
      reloadFn={reloadFn}
      goBackFn={goBackFn}
      loadingResponse={loadingResponse}
      errorResponse={errorResponse}
      asideData={asideData}
      acceptFn={acceptFn}
      loadingAccept={loadingAccept}
      errorAccept={errorAccept}
      loadingChat={loadingChat}
      errorChat={errorChat}
      dataChat={dataChat}
      assignDateModal={assignDateModal}
      showAssignDateModalFn={showAssignDateModalFn}
      closeAssignDateModalFn={closeAssignDateModalFn}
      postId={postId}
      qty={qty}
      idCampaign={idCampaign}
      idCreator={idCreator}
      postDates={postDates}
      {...data}
      dates={dates}
      showContract={showContract}
      showContractFn={showContractFn}
      loadingContract={loadingContract}
      errorContract={errorContract}
      dataContract={{ ...dataContract, budgetPrice }}
      contractList={contractList}
      handleChangeContracts={handleChangeContracts}
      option={option}
      price={price}
      loadingGenerate={loadingGenerate}
      errorGenerate={errorGenerate}
      handleClickContract={handleClickContract}
      errorsContract={errorsContract}
      stepContract={stepContract}
      showActionRequestModal={showActionRequestModal}
      successfullyFn={successfullyFn}
    />
  );
};

export default BrandAddCreatorCampaign;
