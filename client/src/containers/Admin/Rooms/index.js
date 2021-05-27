import React, { useState, useEffect } from 'react'
import { EditIcon, TrashIcon } from 'assets/icons'
import PageTitle from 'components/Typography/PageTitle'
import * as services from 'services/roomService';

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'

function Rooms() {
  const [tablePage, setTablePage] = useState(1)
  const [totalResults, setTotalResults] = useState(10)
  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 10

  useEffect(() => {
    services.getRooms({page: tablePage}).then((res) => {
      setDataTable(res.data.results)
      setTotalResults(res.data.totalResults)
    })
  }, [tablePage])
 
  // pagination change control
  function onPageChangeTable(p) {
    setTablePage(p)
  }

  return (
    <>
      <PageTitle>Rooms</PageTitle>
      <div className="my-6">
        <Button className="bg-blue-500">
          Create room
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable && dataTable.map((room, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={room.photos} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{room.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{room.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {room.price}</span>
                </TableCell>
                <TableCell>
                  {(room && room.status === "Available") ? <Badge type="success">{room.status}</Badge> : <Badge type="danger">{room.status}</Badge>}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{room.price}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Rooms
