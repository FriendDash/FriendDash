import {
    chakra,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";

export default chakra(function ItemsTable({ completeOrder }) {
    return (
        <TableContainer>
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Item Name</Th>
                        <Th>Quantity</Th>
                        <Th isNumeric>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {completeOrder.map((e, i) => {
                        return (
                            <Tr key={i}>
                                <Td>{e.menuItem}</Td>
                                <Td>{e.quantity}</Td>
                                <Td isNumeric>
                                    ${e.price} x {e.quantity} = ${e.price * e.quantity}
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th> </Th>
                        <Th>
                            <b>TOTAL COST:</b>
                        </Th>
                        <Th isNumeric>
                            <b>
                                $
                                {completeOrder.reduce(
                                    (previousValue, currentElement) =>
                                        previousValue +
                                        currentElement.price * currentElement.quantity,
                                    0
                                )}
                            </b>
                        </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
})