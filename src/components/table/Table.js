import React from "react";
import { CardWrapper } from "./Table.style";
import data from "../../mockData/pay-run";
import { TableInvoice } from "./Table.style";

const Table = () => {
  return (
    <CardWrapper>
      {data.pay_run.invoices.map((x) => {
        return (
          <TableInvoice>
            <tbody>
              <tr>
                <td>{x.supplier}</td>
                <td>{x.amount}</td>
              </tr>
            </tbody>
          </TableInvoice>
        );
      })}
    </CardWrapper>
  );
};

export default Table;
