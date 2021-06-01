// PropTypes
import PropTypes from 'prop-types';
// Components
import {
  AsideBrandAddCreatorCampaign as Aside,
  ErrorOcurred,
  AssignDate,
  NoPostsCalendar,
} from 'components';
// Common
import {
  Modal,
  Loader,
  Chat,
  CampaignChannelsContentList,
  Contract,
  ActionRequest,
} from 'components/common';
// Styles
import { Link } from 'react-router-dom';
import css from './css.module.scss';
// Dependence

const BrandAddCreatorCampaign = ({
  campaign: nameCampaign,
  goBackFn,
  first_name,
  last_name,
  is_accepted,
  asideData,
  loadingResponse,
  errorResponse,
  reloadFn,
  loadingAccept,
  errorAccept,
  acceptFn,
  dataChat,
  postList,
  assignDateModal,
  showAssignDateModalFn,
  closeAssignDateModalFn,
  postId,
  qty,
  idCampaign,
  idCreator,
  postDates,
  dates,
  showContract,
  showContractFn,
  loadingContract,
  errorContract,
  dataContract,
  contractList,
  handleChangeContracts,
  option,
  price,
  errorsContract,
  handleClickContract,
  stepContract,
  loadingGenerate,
  errorGenerate,
  hasDateAssigned,
  showActionRequestModal,
  successfullyFn,
}) => (
  <>
{/* Asign Date Modal */}
    {assignDateModal ? (
      <Modal withClose onClose={closeAssignDateModalFn}>
        <AssignDate
          campaingDates={dates}
          closeAssignDateModalFn={closeAssignDateModalFn}
          idCampaign={idCampaign}
          idCreator={idCreator}
          postId={postId}
          qty={qty}
          postDates={postDates}
        />
      </Modal>
    ) : (
      ''
    )}
    {errorResponse || errorAccept || errorContract ? (
      <Modal>
        <ErrorOcurred reloadfn={reloadFn} />
      </Modal>
    ) : (
      ''
    )}
    {loadingResponse ? (
      <Loader />
    ) : (
      <section className={css.container}>
        <div className={css.top}>
          <div className={css['name-user']}>
            <i
              className={`fas fa-chevron-left ${css['go-back']}`}
              onClick={goBackFn}
            />

            <div className={css.breadCrumb}>
              <Link to="/campaigns" className={css.path}>
                {'Campaigns >'}
                {' '}
              </Link>
              <p
                onClick={goBackFn}
                className={`${css.path} ${css.breadCrumbHover}`}
              >
                {`${nameCampaign}  >`}
              </p>
              <p className={css.CreatorName}>
                {first_name}
                {' '}
                {last_name}
              </p>
            </div>
            <div className={css.name}>
              <i className="fas fa-user-circle" />
              <p>
                {first_name}
                {' '}
                {last_name}
              </p>
            </div>
          </div>
          {!is_accepted && (
            <div className={css.actions}>
              <button type="button" onClick={acceptFn}>
                {loadingAccept ? <Loader /> : 'Add Creator'}
              </button>

              <p>
                Once added, Brand Users will be able to assign post
                {' '}
                <br />
                dates and create a contract for this creator
              </p>
            </div>
          )}
        </div>
        <div className={css.down}>
          <div className={css.aside}>
            <Aside {...asideData} />
          </div>
          <div className={css.chat}>
            <Chat
              nameCampaign={nameCampaign}
              nameCreator={`${first_name} ${last_name}`}
              {...dataChat}
            />
          </div>
        </div>
        {is_accepted && (
          <>
            <div className={css.postSection}>
              <p className={css.postTitle}>Post For Campaigns </p>
              {!hasDateAssigned && <NoPostsCalendar />}
              <CampaignChannelsContentList
                contentsList={postList}
                onlyReadCards
                assignDate
                AssignDateFn={showAssignDateModalFn}
              />
            </div>
            {/* Contract section */}
            {loadingContract && <Loader />}
            {showActionRequestModal && (
              <Modal avoidMaxWidth>
                <ActionRequest
                  fn1={successfullyFn}
                  message={(
                    <p>
                      Your contract has been created and
                      <br />
                      sent successfully, hold on
                      <br />
                      the acceptance and signature from
                      <br />
                      the Creator.
                    </p>
                  )}
                />
              </Modal>
            )}
            {showContract && (
              <Modal withClose onClose={showContractFn} avoidMaxWidth>
                <Contract
                  errors={errorsContract}
                  brandView
                  price={price}
                  option={option}
                  step={stepContract}
                  postList={contractList}
                  handleChange={handleChangeContracts}
                  handleClick={handleClickContract}
                  loading={loadingGenerate}
                  error={errorGenerate}
                  {...dataContract}
                />
              </Modal>
            )}
            {hasDateAssigned && (
              <div className={css.contractsContainer}>
                <p className={css.title}>Contract</p>
                {dataContract.id ? (
                  <i
                    onClick={showContractFn}
                    className={`fas fa-file-contract ${css.file} ${
                      css[dataContract.terms_agreement.toLowerCase()]
                    }`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={showContractFn}
                    className={css.buttonContract}
                  >
                    New Contract +
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>
    )}
  </>
);

BrandAddCreatorCampaign.defaultProps = {
  campaign: 'Name Campaign',
  goBackFn() {},
  asideData: {},
  loadingResponse: false,
  loadingAccept: false,
  errorResponse: null,
  errorAccept: null,
  reloadFn: () => {},
  dataChat: {},
  dates: {},
  postList: [],
  postId: null,
  qty: null,
  idCampaign: '',
  idCreator: '',
  postDates: [],
  showContract: false,
  first_name: '',
  last_name: '',
  is_accepted: false,
  hasDateAssigned: false,
  loadingContract: false,
  errorContract: null,
  dataContract: {},
  contractList: [],
  option: '',
  price: null,
  errorsContract: {},
  loadingGenerate: false,
  errorGenerate: null,
  showActionRequestModal: false,
};

BrandAddCreatorCampaign.propTypes = {
  campaign: PropTypes.string,
  goBackFn: PropTypes.func,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  is_accepted: PropTypes.bool,
  asideData: PropTypes.object,
  loadingResponse: PropTypes.bool,
  loadingAccept: PropTypes.bool,
  errorResponse: PropTypes.any,
  errorAccept: PropTypes.any,
  reloadFn: PropTypes.func,
  acceptFn: PropTypes.func.isRequired,
  dataChat: PropTypes.object,
  postList: PropTypes.array,
  assignDateModal: PropTypes.bool.isRequired,
  showAssignDateModalFn: PropTypes.func.isRequired,
  closeAssignDateModalFn: PropTypes.func.isRequired,
  postId: PropTypes.number,
  qty: PropTypes.number,
  idCampaign: PropTypes.string,
  idCreator: PropTypes.string,
  postDates: PropTypes.array,
  dates: PropTypes.object,
  showContract: PropTypes.bool,
  showContractFn: PropTypes.func.isRequired,
  hasDateAssigned: PropTypes.bool,
  loadingContract: PropTypes.bool,
  errorContract: PropTypes.any,
  dataContract: PropTypes.object,
  contractList: PropTypes.array,
  handleChangeContracts: PropTypes.func.isRequired,
  option: PropTypes.string,
  price: PropTypes.number,
  errorsContract: PropTypes.object,
  handleClickContract: PropTypes.func.isRequired,
  stepContract: PropTypes.number.isRequired,
  loadingGenerate: PropTypes.bool,
  errorGenerate: PropTypes.any,
  showActionRequestModal: PropTypes.bool,
  successfullyFn: PropTypes.func.isRequired,
};

export default BrandAddCreatorCampaign;
