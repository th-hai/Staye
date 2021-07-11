import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey as locationList } from './constants';
import saga from './saga';
import reducer from './reducer';
import * as locationActions from 'containers/AdminLocations/actions';
import ConfirmDialog from 'components/Modal/ConfirmDialog';
import Title from './title';

import { makeSelectLocations } from './selectors';
import LocationModal from './LocationModal';

const AdminLocations = ({
  getLocations,
  locations,
  showLocationModal,
  addLocation,
  updateLocation,
  deleteLocation,
}) => {
  useInjectReducer({ key: locationList, reducer });
  useInjectSaga({ key: locationList, saga });
  useEffect(() => {
    getLocations();
  }, []);
  const [modalState, setModalState] = useState({
    visible: false,
    mode: undefined,
    myError: null,
  });
  const [confirmState, setConfirmState] = useState({
    visible: false,
  });

  const renderActions = (text, record) => (
    <Space className="ml-2">
      <EditOutlined
        onClick={() => {
          setModalState({ location: record });
          showLocationModal(true);
        }}
      />
      <DeleteOutlined
        onClick={() => {
          setConfirmState({
            visible: true,
            title: 'CONFIRMATION',
            message: `Do you want to delete room ${record.name}`,
            onCancel: () => setConfirmState({ visible: false }),
            onOk: () => {
              setConfirmState({ visible: false });
                deleteLocation(record.id);
            },
          });
        }}
      />
    </Space>
  );
  return (
    <div>
      <ConfirmDialog {...confirmState} />
      <LocationModal
        location={modalState.location}
        addLocation={addLocation}
        updateLocation={updateLocation}
        setModalState={setModalState}
        showLocationModal={showLocationModal}
      />
      <div className="flex justify-between items-center mx-8 py-8">
        <Title />
        <button
          className="btn btn-success"
          onClick={() => {
            showLocationModal(true);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} /> New location
        </button>
      </div>
      {locations && (
        <Table
          dataSource={locations}
          rowKey="id"
          columns={[
            {
              title: 'Photo',
              dataIndex: 'photo',
              key: 'photo',
              render: (photo) => {
                return (
                  <div className="m">
                    <img className="rounded w-16 h-16" alt="A" src={photo} />{' '}
                  </div>
                );
              },
              width: '6rem',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text) => {
                return <div className="text-lg overflow-hidden">{text}</div>;
              },
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              render: (text) => {
                return <div className="text-lg overflow-hidden">{text}</div>;
              },
            },
            {
              title: 'Actions',
              key: 'actions',
              render: renderActions,
            },
          ]}
        ></Table>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations,
});

AdminLocations.propTypes = {
  locations: PropTypes.array,
  getLocations: PropTypes.func,
  addLocation: PropTypes.func,
  updateLocation: PropTypes.func,
  deleteLocation: PropTypes.func,
  showLocationModal: PropTypes.func,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocations: locationActions.getLocations,
      showLocationModal: locationActions.showLocationModal,
      addLocation: locationActions.createLocation,
      updateLocation: locationActions.updateLocation,
      deleteLocation: locationActions.deleteLocation,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminLocations);