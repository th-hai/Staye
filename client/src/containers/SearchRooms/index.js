import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getURLSearchParams } from 'utils/urlUtils'
import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './saga';
import { searchRooms } from './actions';
import { reducerKey } from './constants';
import { makeSelectRooms } from './selectors';
import RoomCard from 'components/Rooms/RoomCard';
import { Pagination } from 'antd';

const SearchRooms = ({ rooms, searchRooms }) => {

    const location = useLocation();

    useInjectReducer({ key: reducerKey, reducer });
    useInjectSaga({ key: reducerKey, saga });

    useEffect(() => {
        searchRooms(getURLSearchParams(location.search));
    }, [location]);

    return (
        <div className="flex flex-col flex-wrap mx-8 my-10">
            <div className="flex flex-row flex-wrap">
                { rooms && rooms.map(item =>
                    <RoomCard room={item} />)}
            </div>
            <Pagination />
        </div>
    )
};

SearchRooms.propTypes = {
    searchRooms: PropTypes.func,
    rooms: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
    rooms: makeSelectRooms
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            searchRooms: searchRooms,
        },
        dispatch
    );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SearchRooms);
