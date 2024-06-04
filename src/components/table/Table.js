import React from "react";
import { CardWrapper } from "./Table.style";
import data from "../../mockData/pay-run";
import { TableInvoice } from "./Table.style";

const Table = () => {
  return (
    <CardWrapper>
      {data.pay_run.invoices.map((invoice) => {
        return (
          <TableInvoice>
            <tbody>
              <td>supplier's name</td>
              <td>ammount</td>
              <td>status</td>
              <td>Posted date</td>
              <td>due date</td>
              <tr>
                <td>{invoice.supplier}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.posted_date}</td>
                <td>{invoice.due_date}</td>
                
              </tr>
            </tbody>
          </TableInvoice>
        );
      })}
    </CardWrapper>
  );
};

export default Table;
