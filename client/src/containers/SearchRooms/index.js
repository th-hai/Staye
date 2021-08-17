import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Select, Pagination, Col, Row } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getURLSearchParams, createURLSearchParams } from 'utils/urlUtils'
import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './saga';
import { searchRooms,  setSortBy} from './actions';
import { reducerKey } from './constants';
import { makeSelectSearchRoomsResult, makeSelectSortBy } from './selectors';
import RoomCard from 'components/Rooms/RoomCard';


const { Option } = Select;

const SearchRooms = ({ searchRoomsResult, searchRooms }) => {

    const location = useLocation();
    const history = useHistory();

    useInjectReducer({ key: reducerKey, reducer });
    useInjectSaga({ key: reducerKey, saga });

    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        let params = getURLSearchParams(location.search);
        searchRooms(params);
        setSortBy(params.sortBy)
    }, [location]);

    const handleChangePage = (page, pageSize) => {
        let params = getURLSearchParams(location.search);
        if (page < 2) {
            params = { ...params, page: '' }
        }
        else params = { ...params, limit: pageSize, page };
        history.push(`/search?${createURLSearchParams(params)}`)
    }

    const handleSortPriceChange = (value) => {
        setSortBy(value)
       let params = getURLSearchParams(location.search);
       params = { ...params, sortBy: value}
       history.push(`/search?${createURLSearchParams(params)}`)
    }

    return (
        <div className="lg:mx-24 md:my-10 sm:mx-8 xs:mx-4">
            {searchRoomsResult.results.length > 0 ?
                (<div>
                    <div className="flex flex-wrap border-box">
                        <h2 className="text-2xl font-black lg:w-4/5 md:w-4/6 sm:w-2/4">{searchRoomsResult.totalResults} homestay</h2>
                        <div className="flex flex-wrap border-box justify-end lg:w-1/5 md:w-2/6 sm:w-2/4 ">
                            <Select
                                size='large'
                                placeholder="Sort by"
                                className="relative block w-full text-lg"
                                onChange={handleSortPriceChange}
                                value={sortBy}
                                >
                                    
                                <Option key="0" value="price:asc">Price ascending</Option>
                                <Option key="1" value="price:desc">Price descending</Option>
                            </Select>
                        </div>
                    </div>
                    <Row>
                        {searchRoomsResult?.results && searchRoomsResult.results.map(item =>
                            <Col xs={22} sm={16} md={8} lg={6} xxl={4}>
                                <RoomCard room={item} />
                            </Col>
                        )}
                    </Row>
                    <Pagination
                        showLessItems
                        showSizeChanger={false}
                        pageSize={searchRoomsResult.limit}
                        current={searchRoomsResult.page}
                        total={searchRoomsResult.totalResults}
                        onChange={handleChangePage}
                        className="flex justify-center" />
                </div>)
                :
                (<div className="flex">
                    <span className="w-full text-center">No suitable rooms found!</span>
                </div>)}
        </div>
    )
};

SearchRooms.propTypes = {
    searchRooms: PropTypes.func,
    searchRoomsResult: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    searchRoomsResult: makeSelectSearchRoomsResult,
 
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
